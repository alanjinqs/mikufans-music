import { currentQueueMeta } from "@/db/schema";
import { db, schema } from "./db";
import { arrayContained, arrayContains, eq, inArray } from "drizzle-orm";

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
  if (queue.length === 0) return [];
  const s = await db.query.currentQueue.findMany({
    with: {
      song: true,
    },
    where: inArray(schema.currentQueue.id, queue),
  });

  const res = s.sort((a, b) => {
    return queue.indexOf(a.id) - queue.indexOf(b.id);
  });
  return res;
};
