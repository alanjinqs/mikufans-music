import TrackPlayer from "react-native-track-player";
import { getCurrentQueueMeta, updateMeta } from "../db/queue";
import { db, schema } from "../db/db";
import { currentQueue, currentQueueMeta } from "@/db/schema";
import { eq } from "drizzle-orm";
import { bv2Cid } from "../bili/avBvCid";
import { bvCid2Track } from "../bili/biliVideo";

export const addQueueToTrackPlayer = async () => {
  // return: hasNext
  const currentTPQueue = await TrackPlayer.getQueue();
  const currentTPIndex = await TrackPlayer.getActiveTrackIndex();
  if (
    !currentTPIndex ||
    currentTPQueue.length === 0 ||
    currentTPQueue.length === currentTPIndex + 1
  ) {
    const metaObj = await getCurrentQueueMeta();

    if (metaObj.queue) {
      const queue = JSON.parse(metaObj.queue);
      if (queue.length === 0) return false;
      const songs = await db.query.currentQueue.findMany({
        with: {
          song: true,
        },
        where: eq(currentQueue.id, queue[0]),
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
        .set({ value: JSON.stringify(queue.slice(1)) });
      return true;
    } else {
      return true;
    }
  }
};

export const dpQueueSkipTo = async (id: number) => {
  const metaObj = await getCurrentQueueMeta();
  const queue = JSON.parse(metaObj.queue);
  const index = queue.indexOf(id);
  if (index === -1) return;
  queue.splice(0, index);
  await updateMeta("queue", JSON.stringify(queue));
  await TrackPlayer.reset();
  console.log(queue);
  // await addQueueToTrackPlayer();
  // await TrackPlayer.play();
  await TrackPlayer.setPlayWhenReady(true);
};

export const shuffleQueue = async () => {
  const metaObj = await getCurrentQueueMeta();
  const queue = JSON.parse(metaObj.queue);
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

  console.log("queue", queue);

  await updateMeta(
    "queue",
    JSON.stringify(queue.sort(() => Math.random() - 0.5))
  );
  await addQueueToTrackPlayer();
};
