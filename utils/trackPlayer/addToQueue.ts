import { eq } from "drizzle-orm";
import { db, schema } from "../db/db";
import { songToPlaylist } from "@/db/schema";
import { bv2Cid } from "../bili/avBvCid";
import TrackPlayer from "react-native-track-player";
import { bvCid2Track } from "../bili/biliVideo";

export const addPlaylistToQueue = async (playlistId: number) => {
  const songs = await db.query.songToPlaylist.findMany({
    with: {
      song: true,
    },
    where: eq(songToPlaylist.playlistId, playlistId),
  });

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
};
