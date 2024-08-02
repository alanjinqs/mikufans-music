import TrackPlayer, {
  Event,
  PlaybackProgressUpdatedEvent,
  State,
  Track,
} from "react-native-track-player";
import { addQueueToTrackPlayer } from "./trackPlayerUpdating";
import { sendHeartbeat } from "../bili/heartbeat";
import { bvCid2Track } from "../bili/biliVideo";
import { continueFollowRecommendationQueue } from "./followRecommendationMode";
import { mmkvStorage } from "../storage/storage";
import { cidBvToSong } from "../db/song";

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

const playbackFinishedHeartbeat = async ({
  activeTrack,
}: {
  activeTrack: Track;
}) => {
  console.log("playbackFinishedHeartbeat");
  const [cid, bvid] = activeTrack.id.split("$");
  if (!bvid || !cid || !activeTrack.duration) return;

  sendHeartbeat(bvid, cid, -1, true);
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
    if (
      e.lastTrack?.duration &&
      Math.abs(e.lastTrack?.duration - e.lastPosition) < 1
    ) {
      playbackFinishedHeartbeat({
        activeTrack: e.lastTrack,
      });
    }

    if (e.track) {
      const [cid, bvid] = e.track.id.split("$");
      cidBvToSong(cid, bvid).then(async (song) => {
        if (!song) mmkvStorage.set("currentSong", JSON.stringify({}));
        mmkvStorage.set("currentSong", JSON.stringify(song));
      });
    } else {
      mmkvStorage.set("currentSong", JSON.stringify({}));
    }

    const inFollowRecommendationMode = mmkvStorage.getBoolean(
      "followRecommendationMode"
    );
    if (inFollowRecommendationMode) {
      await continueFollowRecommendationQueue();
    } else {
      await addQueueToTrackPlayer();
    }
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
    if (Math.floor(e.position) % 15 === 0) {
      await heartbeat(e);
    }
  });

  TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
    if (e.state === State.Error) {
      console.log("Error", e.error);
      const activeTrack = await TrackPlayer.getActiveTrack();
      console.log("activeTrack", activeTrack);
      if (activeTrack) {
        const [cid, bvid] = activeTrack.id.split("$");
        if (!bvid || !cid) return;
        const lastTrackErrorId = mmkvStorage.getString("last-track-error-cvbv");
        if (lastTrackErrorId === `${cid}_${bvid}`) {
          return;
        }

        const track = await bvCid2Track(
          {
            cid,
            bvid,
          },
          true
        );
        if (track) {
          mmkvStorage.set("last-track-error-cvbv", `${cid}_${bvid}`);
          await TrackPlayer.load(track);
          TrackPlayer.play();
        }
      }
    }
  });
};
