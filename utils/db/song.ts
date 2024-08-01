import { song } from "@/db/schema";
import { db, SongDB } from "./db";
import { eq } from "drizzle-orm";
import { qqMusicMidToLrc } from "../qqmusic/qqMusicSearch";
import { bv2Song } from "./playlists";
import { Track } from "react-native-track-player";
import { bv2av } from "../bili/avBvCid";
import { mmkvStorage } from "../storage/storage";

export const bvToSongWithoutFetch = async (bvId: string) => {
  const songId = bv2av(bvId as any);
  return await db.query.song.findFirst({ where: eq(song.id, songId) });
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
  const lrc = await qqMusicMidToLrc(mid);
  const resSong = await db
    .update(song)
    .set({
      lyrics: lrc.lyric,
      translatedLyrics: lrc.transLyric,
      qqMusicMid: mid,
    })
    .where(eq(song.id, songId))
    .returning();

  mmkvStorage.set("currentSong", JSON.stringify(resSong[0]));
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
