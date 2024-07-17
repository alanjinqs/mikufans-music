import { playlist, song, songToPlaylist } from "@/db/schema";
import { db } from "./db";
import { fetchFavList, fetchFavMeta } from "../bili/favList";
import dayjs from "dayjs";
import { artworkToDarkColor } from "../artworkToColor";
import { and, eq } from "drizzle-orm";
import { bv2av } from "../bili/avBvCid";
import { getBiliVideoMeta } from "../bili/biliVideo";
import { fetchVideoCollection } from "../bili/videoCollection";

export const createNewPlaylist = async ({
  name,
  cover,
}: {
  name?: string;
  cover?: string;
}) => {
  const insertingRes = await db
    .insert(playlist)
    .values({
      name,
      cover: cover ? cover.replace("http://", "https://") : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return insertingRes[0].id;
};

export const deleteAllPlaylist = async () => {
  await db.delete(playlist);
  await db.delete(song);
  await db.delete(songToPlaylist);
};

export const addSongToPlaylist = async (
  bvId: string,
  playlistId: number,
  updatePlaylistCover = false
) => {
  const songId = bv2av(bvId as any);

  const playlistCurrentSongs = await db.query.songToPlaylist.findMany({
    where: eq(songToPlaylist.playlistId, playlistId),
  });
  if (playlistCurrentSongs.map((s) => s.songId).includes(songId)) return;

  const meta = await getBiliVideoMeta(bvId);

  const artwork = meta.data.pic.replace("http://", "https://");
  const color = await artworkToDarkColor(artwork);
  await db
    .insert(song)
    .values({
      id: songId,
      title: meta.data.title,
      artwork,
      bvid: bvId,
      cid: null,
      artistMid: meta.data.owner.mid,
      artistName: meta.data.owner.name,
      artistAvatar: meta.data.owner.face,
      addedAt: new Date(),
      color,
    })
    .onConflictDoNothing();
  await db.insert(songToPlaylist).values({
    playlistId,
    songId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (updatePlaylistCover) {
    await db
      .update(playlist)
      .set({
        cover: artwork,
        updatedAt: new Date(),
      })
      .where(eq(playlist.id, playlistId));
  }
};

export const addFavoriteToPlaylist = async (
  mediaId: number,
  playlistId: number,
  updatePlaylistCover = false
) => {
  const { favInfo, songList } = await fetchFavList(mediaId);

  const playlistCurrentSongs = await db.query.songToPlaylist.findMany({
    where: eq(songToPlaylist.playlistId, playlistId),
  });

  const playlistCurrentSongIds = playlistCurrentSongs.map((s) => s.songId);

  const favCover = favInfo.cover;
  for (const s of songList) {
    if (playlistCurrentSongIds.includes(s.id)) continue;

    const color = await artworkToDarkColor(s.artwork || undefined);
    await db
      .insert(song)
      .values({
        ...s,
        color,
      })
      .onConflictDoNothing();
    await db.insert(songToPlaylist).values({
      playlistId,
      songId: s.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  if (updatePlaylistCover) {
    await db
      .update(playlist)
      .set({
        cover: favCover,
        updatedAt: new Date(),
      })
      .where(eq(playlist.id, playlistId));
  }
};

export const addCollectionToPlaylist = async (
  mediaId: number,
  playlistId: number,
  updatePlaylistCover = false
) => {
  const { collectionInfo, songList } = await fetchVideoCollection(mediaId);

  const playlistCurrentSongs = await db.query.songToPlaylist.findMany({
    where: eq(songToPlaylist.playlistId, playlistId),
  });

  const playlistCurrentSongIds = playlistCurrentSongs.map((s) => s.songId);

  const favCover = collectionInfo.cover;
  for (const s of songList) {
    if (playlistCurrentSongIds.includes(s.id)) continue;

    const color = await artworkToDarkColor(s.artwork || undefined);
    await db
      .insert(song)
      .values({
        ...s,
        color,
      })
      .onConflictDoNothing();
    await db.insert(songToPlaylist).values({
      playlistId,
      songId: s.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  if (updatePlaylistCover) {
    await db
      .update(playlist)
      .set({
        cover: favCover,
        updatedAt: new Date(),
      })
      .where(eq(playlist.id, playlistId));
  }
};

export const createNewPlaylistByBiliFav = async (mediaId: number) => {
  const { favInfo, songList } = await fetchFavList(mediaId);

  const favName = favInfo.title;
  const favCover = favInfo.cover;
  const id = await createNewPlaylist({ name: favName, cover: favCover });
  console.log("id", id);
  console.log("list", songList);

  for (const s of songList) {
    const color = await artworkToDarkColor(s.artwork || undefined);
    await db
      .insert(song)
      .values({
        ...s,
        color,
      })
      .onConflictDoNothing();
    await db.insert(songToPlaylist).values({
      playlistId: id,
      songId: s.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

export const removeSongFromPlaylist = async (
  songId: number,
  playlistId: number
) => {
  console.log("remove", songId, playlistId);
  const res = await db
    .delete(songToPlaylist)
    .where(
      and(
        eq(songToPlaylist.songId, songId),
        eq(songToPlaylist.playlistId, playlistId)
      )
    );
  console.log(res);
};
