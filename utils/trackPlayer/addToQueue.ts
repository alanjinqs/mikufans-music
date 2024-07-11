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

export const addPlaylistToQueue = async (playlistId: number) => {
  const songs = await db.query.songToPlaylist.findMany({
    with: {
      song: true,
    },
    where: eq(songToPlaylist.playlistId, playlistId),
    orderBy: asc(songToPlaylist.order),
  });

  const songsInRandomOrder = songs.sort(() => Math.random() - 0.5);

  for (const s of songsInRandomOrder) {
    let cid = s.song.cid;
    if (!s.song || !s.song.bvid) continue;
    if (!cid) {
      // TODO: 分p
      const [c] = await bv2Cid(s.song.bvid);
      await db
        .update(schema.song)
        .set({ cid: c.cid })
        .where(eq(schema.song.id, s.song.id));
      cid = c.cid;
    }

    const track = await bvCid2Track(cid, s.song.bvid);

    await TrackPlayer.add(track);
  }

  // const ids = await db
  //   .insert(currentQueue)
  //   .values(songs.map((s) => ({ songId: s.songId })))
  //   .returning({ queueId: currentQueue.id });

  // const metaObj = await getCurrentQueueMeta();
  // // update queue
  // let queue = [];
  // if (metaObj.queue) {
  //   queue = JSON.parse(metaObj.queue);
  // }
  // queue = queue.concat(ids.map((i) => i.queueId));
  // await updateMeta("queue", JSON.stringify(queue));

  // // update playlists
  // let playlists = [];
  // if (metaObj.playlists) {
  //   playlists = JSON.parse(metaObj.playlists);
  // }
  // playlists.push(playlistId);
  // await updateMeta("playlists", JSON.stringify(playlists));

  // console.log("queue", queue);
  // if ((await TrackPlayer.getQueue()).length <= 3) {
  //   await addQueueToTrackPlayer();
  // }
};

export const addQueueToTrackPlayer = async () => {
  const metaObj = await getCurrentQueueMeta();
  console.log(metaObj);
  if (metaObj.queue) {
    const queue = JSON.parse(metaObj.queue);
    if (queue.length === 0) return;

    const queueThree = queue.slice(0, 3);
    console.log("queueThree", queueThree);
    const songs = await db.query.currentQueue.findMany({
      with: {
        song: true,
      },
      where: inArray(currentQueue.id, queueThree),
    });
    console.log("songs", songs);

    for (const s of songs) {
      let cid = s.song.cid;
      if (!s.song || !s.song.bvid) continue;
      if (!cid) {
        // TODO: 分p
        const [c] = await bv2Cid(s.song.bvid);
        await db
          .update(schema.song)
          .set({ cid: c.cid })
          .where(eq(schema.song.id, s.song.id));
        cid = c.cid;
      }

      const track = await bvCid2Track(cid, s.song.bvid);
      await TrackPlayer.add(track);
    }

    await db
      .update(currentQueueMeta)
      .set({ value: JSON.stringify(queue.slice(3)) });
  }
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
