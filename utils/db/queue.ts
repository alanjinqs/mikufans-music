import { currentQueueMeta } from "@/db/schema";
import { db } from "./db";

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
