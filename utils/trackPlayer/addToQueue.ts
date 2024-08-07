import { asc, desc, eq, inArray } from "drizzle-orm";
import { db, schema, SongDB } from "../db/db";
import { currentQueue, song, songToPlaylist } from "@/db/schema";
import { bv2Cid } from "../bili/avBvCid";
import TrackPlayer, { Track } from "react-native-track-player";
import { bvCid2Track } from "../bili/biliVideo";
import { addQueueToTrackPlayer } from "./trackPlayerUpdating";
import { mmkvStorage } from "../storage/storage";
import { showDebugMessage } from "../showDebugMessage";
import { artworkToDarkColor } from "../artworkToColor";
import { SongCardItem } from "@/components/song/SongCard";

export const addSongToQueue = async (song: SongCardItem) => {
  console.log("adding to queue", song.title);
  if (!song || !song.bvid) return;
  const currentIndex = await TrackPlayer.getActiveTrackIndex();
  let cid = song.cid;
  if (!cid) {
    const [c] = await bv2Cid(song.bvid);
    await db
      .update(schema.song)
      .set({ cid: c.cid })
      .where(eq(schema.song.id, song.id));
    cid = c.cid;
  }

  if ((!song.color || song.color === "#333") && song.artwork) {
    artworkToDarkColor(song.artwork).then(async (color) => {

      await db
        .update(schema.song)
        .set({ color })
        .where(eq(schema.song.id, song.id));
    });
  }

  const track = await bvCid2Track({
    cid,
    bvid: song.bvid,
    song,
  });
  if (currentIndex === undefined) {
    TrackPlayer.add(track);
  } else {
    await TrackPlayer.add(track, currentIndex + 1);
  }

  showDebugMessage({
    message: (await TrackPlayer.getQueue())
      .map((song) => {
        return song.title;
      })
      .join(", "),
    title: "Added to queue",
  });
};

export const replacePlaylistByQueue = async (
  playlistId: number,
  shuffled = false
) => {
  const songs = await db.query.songToPlaylist.findMany({
    with: {
      song: true,
    },
    where: eq(songToPlaylist.playlistId, playlistId),
    orderBy: (song, { desc }) => [desc(song.order), desc(song.id)],
  });

  const ids = await db
    .insert(currentQueue)
    .values(songs.map((s) => ({ songId: s.songId })))
    .returning({ queueId: currentQueue.id });

  // update queue
  let queue = ids.map((i) => i.queueId);

  if (shuffled) {
    queue = queue.sort(() => Math.random() - 0.5);
  }

  mmkvStorage.set("songQueue", JSON.stringify(queue));

  await TrackPlayer.reset();
  await TrackPlayer.setPlayWhenReady(true);

  const hasNext = await addQueueToTrackPlayer();
  await TrackPlayer.play();
};

export const replaceCurrentPlaying = async (song: SongCardItem) => {
  if (!song || !song.bvid) return;
  let cid = song.cid;
  if (!cid) {
    const [c] = await bv2Cid(song.bvid);
    await db
      .update(schema.song)
      .set({ cid: c.cid })
      .where(eq(schema.song.id, song.id));
    cid = c.cid;
  }

  if ((!song.color || song.color === "#333") && song.artwork) {
    artworkToDarkColor(song.artwork).then(async (color) => {
      mmkvStorage.set("currentSong", JSON.stringify({ ...song, color }));

      await db
        .update(schema.song)
        .set({ color })
        .where(eq(schema.song.id, song.id));
    });
  }

  const track = await bvCid2Track({
    cid,
    bvid: song.bvid,
    song,
  });
  await TrackPlayer.load(track);
  await TrackPlayer.play();
};
