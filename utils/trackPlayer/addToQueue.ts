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

export const addPlaylistToQueue = async (playlistId: number) => {
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
  let queue = [];
  if (metaObj.queue) {
    queue = JSON.parse(metaObj.queue);
  }
  queue = queue.concat(ids.map((i) => i.queueId));
  await updateMeta("queue", JSON.stringify(queue));

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
  const track = await bvCid2Track(cid, song.bvid);
  await TrackPlayer.load(track);
};
