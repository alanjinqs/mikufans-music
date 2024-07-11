import { currentQueueMeta } from "@/db/schema";
import { db, schema } from "./db";
import { arrayContained, arrayContains, eq } from "drizzle-orm";
import TrackPlayer from "react-native-track-player";
import { addQueueToTrackPlayer } from "@/utils/trackPlayer/trackPlayerUpdating";

export const getCurrentQueueMeta = async () => {
  const metaArr = await db.select().from(currentQueueMeta);
  // match meta to an obj
  const metaObj: { [key: string]: string } = metaArr.reduce((acc, curr) => {
    acc[curr.key as string] = curr.value || "";
    return acc;
  }, {} as { [key: string]: string });
  return metaObj;
};

export const updateMeta = async (key: string, value: string) => {
  await db
    .insert(currentQueueMeta)
    .values({ key: key, value })
    .onConflictDoUpdate({
      target: currentQueueMeta.key,
      set: { value },
    });
};

export const currentQueueIdsToSongs = async (queue: number[]) => {
  const res = [];
  for (const id of queue) {
    const s = await db.query.currentQueue.findFirst({
      with: {
        song: true,
      },
      where: eq(schema.currentQueue.id, id),
    });
    console.log(s);
    res.push(s);
  }
  return res;
};