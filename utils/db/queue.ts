import { db, schema } from "./db";
import { arrayContained, arrayContains, eq, inArray } from "drizzle-orm";

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
