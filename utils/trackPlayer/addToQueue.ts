import { asc, desc, eq, inArray } from "drizzle-orm";
import { db, schema } from "../db/db";
import {
  currentQueue,
  currentQueueMeta,
  song,
  songToPlaylist,
} from "@/db/schema";
import { bv2Cid } from "../bili/avBvCid";
import TrackPlayer, { Track } from "react-native-track-player";
import { bvCid2Track } from "../bili/biliVideo";
import { getCurrentQueueMeta, updateMeta } from "../db/queue";
import { addQueueToTrackPlayer } from "./trackPlayerUpdating";

export const addSongToQueue = async (songId: number) => {
  const song = await db.query.song.findFirst({
    where: eq(schema.song.id, songId),
  });
  if (!song) return;

  const [id] = await db
    .insert(currentQueue)
    .values({ songId: song.id })
    .returning({ queueId: currentQueue.id });

  const metaObj = await getCurrentQueueMeta();

  const queue = metaObj.queue ? JSON.parse(metaObj.queue) : [];
  queue.push(id.queueId);
  await updateMeta("queue", JSON.stringify(queue));

  await addQueueToTrackPlayer();
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
    orderBy: asc(songToPlaylist.order),
  });

  const ids = await db
    .insert(currentQueue)
    .values(songs.map((s) => ({ songId: s.songId })))
    .returning({ queueId: currentQueue.id });

  const metaObj = await getCurrentQueueMeta();
  // update queue
  let queue = ids.map((i) => i.queueId);

  if (shuffled) {
    queue = queue.sort(() => Math.random() - 0.5);
  }

  await updateMeta("queue", JSON.stringify(queue));

  await TrackPlayer.reset();
  await TrackPlayer.setPlayWhenReady(true);

  // update playlists
  let playlists = [];
  if (metaObj.playlists) {
    playlists = JSON.parse(metaObj.playlists);
  }
  if (!playlists.includes(playlistId)) {
    playlists.push(playlistId);
    await updateMeta("playlists", JSON.stringify(playlists));
  }

  await addQueueToTrackPlayer();
};

export const replaceCurrentPlaying = async (
  song: typeof schema.song.$inferSelect
) => {
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
  const track = await bvCid2Track({
    cid,
    bvid: song.bvid,
    song,
  });
  await TrackPlayer.load(track);
};
