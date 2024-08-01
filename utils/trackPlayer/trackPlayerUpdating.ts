import TrackPlayer from "react-native-track-player";
import { db, schema } from "../db/db";
import { currentQueue } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { bv2Cid } from "../bili/avBvCid";
import { bvCid2Track } from "../bili/biliVideo";
import { mmkvStorage } from "../storage/storage";
import { artworkToDarkColor } from "../artworkToColor";

export const addQueueToTrackPlayer = async () => {
  const isUpdating = mmkvStorage.getBoolean("isTPQueueUpdating");
  if (isUpdating) return true;
  mmkvStorage.set("isTPQueueUpdating", true);
  // return: hasNext
  const currentTPQueue = await TrackPlayer.getQueue();
  const currentTPIndex = await TrackPlayer.getActiveTrackIndex();
  const hasNext = await (async () => {
    if (
      !currentTPIndex ||
      currentTPQueue.length === 0 ||
      currentTPQueue.length <= currentTPIndex + 3
    ) {
      const songQueue = mmkvStorage.getString("songQueue");
      if (songQueue) {
        const queue = JSON.parse(songQueue);
        if (queue.length === 0) return false;
        mmkvStorage.set("songQueue", JSON.stringify(queue.slice(3)));
        const songs = await db.query.currentQueue.findMany({
          with: {
            song: true,
          },
          where: inArray(currentQueue.id, queue.slice(0, 3)),
        });

        for (const s of songs) {
          if (!s || !s.song || !s.song.bvid) return false;

          let cid = s.song.cid;
          if (!cid) {
            // TODO: 分p
            const [c] = await bv2Cid(s.song.bvid);
            await db
              .update(schema.song)
              .set({ cid: c.cid })
              .where(eq(schema.song.id, s.song.id));
            cid = c.cid;
          }

          if ((!s.song.color || s.song.color === "#333") && s.song.artwork) {
            artworkToDarkColor(s.song.artwork).then(async (color) => {
              await db
                .update(schema.song)
                .set({ color })
                .where(eq(schema.song.id, s.song.id));
            });
          }

          const track = await bvCid2Track({
            cid,
            bvid: s.song.bvid,
            song: s.song,
          });
          await TrackPlayer.add(track);
        }
        return true;
      } else {
        return true;
      }
    }
  })();
  mmkvStorage.set("isTPQueueUpdating", false);
  return hasNext;
};

export const dpQueueSkipTo = async (id: number) => {
  const queue = JSON.parse(mmkvStorage.getString("songQueue") || "[]");
  const index = queue.indexOf(id);
  if (index === -1) return;
  queue.splice(0, index);
  mmkvStorage.set("songQueue", JSON.stringify(queue));
  await TrackPlayer.reset();
  // await addQueueToTrackPlayer();
  // await TrackPlayer.play();
  await TrackPlayer.setPlayWhenReady(true);
};

export const shuffleQueue = async () => {
  const queue = JSON.parse(mmkvStorage.getString("songQueue") || "[]");
  const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
  const trackQueue = await TrackPlayer.getQueue();

  const trackPendingQueue = trackQueue.slice(currentTrackIndex! + 1);

  const trackPendingQueueCids = trackPendingQueue.map((t) => {
    return t.id.split("$")[0];
  });

  for (const cid of trackPendingQueueCids) {
    const song = await db.query.song.findFirst({
      where: eq(schema.song.cid, cid),
    });
    const [{ id: currentQueueId }] = await db
      .insert(currentQueue)
      .values({
        songId: song!.id,
      })
      .returning({
        id: currentQueue.id,
      });

    queue.push(currentQueueId);
  }

  await TrackPlayer.removeUpcomingTracks();

  mmkvStorage.set(
    "songQueue",
    JSON.stringify(queue.sort(() => Math.random() - 0.5))
  );

  await addQueueToTrackPlayer();
};
