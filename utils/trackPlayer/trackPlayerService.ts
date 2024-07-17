import TrackPlayer, {
  Event,
  PlaybackProgressUpdatedEvent,
  State,
} from "react-native-track-player";
import { addQueueToTrackPlayer } from "./trackPlayerUpdating";
import { sendHeartbeat } from "../bili/heartbeat";
import { cidToSong } from "../db/song";
import { replaceCurrentPlaying } from "./addToQueue";

const heartbeat = async (e: PlaybackProgressUpdatedEvent) => {
  const activeTrack = await TrackPlayer.getActiveTrack();
  const playbackState = await TrackPlayer.getPlaybackState();
  if (!activeTrack) return;
  const [cid, bvid] = activeTrack.id.split("$");
  if (!bvid || !cid) return;
  sendHeartbeat(
    bvid,
    cid,
    Math.floor(e.position),
    // Math.floor(dayjs().diff(currentSongStarted, "second")),
    playbackState.state === State.Playing
  );
};

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext()
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious()
  );
  TrackPlayer.addEventListener(Event.RemoteSeek, (e) =>
    TrackPlayer.seekTo(e.position)
  );
  TrackPlayer.addEventListener(Event.RemoteJumpForward, () =>
    TrackPlayer.seekBy(5)
  );
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () =>
    TrackPlayer.seekBy(-5)
  );
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
    await addQueueToTrackPlayer();
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
    if (Math.floor(e.position) % 15 === 0) {
      await heartbeat(e);
    }
  });
  
  TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
    if (e.state === State.Error) {
      const activeTrack = await TrackPlayer.getActiveTrack();
      if (activeTrack) {
        const currentSongCid: number = activeTrack.id.split("$")[0];
        cidToSong(currentSongCid).then((song) => {
          if (!song) return;
          replaceCurrentPlaying(song);
        });
      }
    }
  })
};
