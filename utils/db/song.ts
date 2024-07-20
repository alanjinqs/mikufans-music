import { song } from "@/db/schema";
import { db, SongDB } from "./db";
import { eq } from "drizzle-orm";
import { qqMusicMidToLrc } from "../qqmusic/qqMusicSearch";
import { bv2Song } from "./playlists";
import { Track } from "react-native-track-player";
import { bv2av } from "../bili/avBvCid";

export const cidToSong = async (cid: number) => {
  return db.query.song.findFirst({ where: eq(song.cid, cid) });
};

export const cidBvToSong = async (cid: number, bvId: string) => {
  const res = await db.query.song.findFirst({ where: eq(song.cid, cid) });
  if (res) return res;

  const [resSong] = await db
    .insert(song)
    .values(await bv2Song(bvId, cid))
    .onConflictDoNothing()
    .returning();

  return resSong;
};

export const updateSongQQMid = async (songId: number, mid: string) => {
  await db.update(song).set({ qqMusicMid: mid }).where(eq(song.id, songId));
  const lrc = await qqMusicMidToLrc(mid);
  await db
    .update(song)
    .set({ lyrics: lrc.lyric, translatedLyrics: lrc.transLyric })
    .where(eq(song.id, songId));
  return;
};

export const updateSongOffset = async (songId: number, offset: number) => {
  await db
    .update(song)
    .set({ lyricsOffset: offset })
    .where(eq(song.id, songId));
  return;
};

export const addSongDownloadedPath = async (
  path: string,
  songId: number,
  duration: number
) => {
  await db
    .update(song)
    .set({ downloadedMp3Path: path, downloadedMp3Duration: duration })
    .where(eq(song.id, songId));
};

export const addSongDownloadedCoverPath = async (
  path: string,
  songId: number
) => {
  await db
    .update(song)
    .set({ downloadedCoverPath: path })
    .where(eq(song.id, songId));
};
