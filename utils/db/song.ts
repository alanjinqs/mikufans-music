import { song } from "@/db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export const cidToSong = async (cid: number) => {
  return db.query.song.findFirst({ where: eq(song.cid, cid) });
};
