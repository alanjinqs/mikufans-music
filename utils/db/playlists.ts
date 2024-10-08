import { playlist, song, songToPlaylist } from "@/db/schema";
import { db, SongDB } from "./db";
import { addOrRemoveToMyFav, fetchFavListAsSong } from "../bili/biliFavList";
import { and, eq } from "drizzle-orm";
import { bv2av } from "../bili/avBvCid";
import { getBiliVideoMeta } from "../bili/biliVideo";
import { fetchSeasonSeriesToSongs } from "../bili/biliSeasonsSeriesList";
import { SongCardItem } from "@/components/song/SongCard";
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

export const bv2Song = async (bvId: string, cid?: number) => {
  const songId = bv2av(bvId as any);

  const meta = await getBiliVideoMeta(bvId);
  const artwork = meta.data.pic.replace("http://", "https://");
  return {
    id: songId,
    title: meta.data.title,
    artwork,
    bvid: bvId,
    cid: cid ? cid : null,
    artistMid: meta.data.owner.mid,
    artistName: meta.data.owner.name,
    artistAvatar: meta.data.owner.face,
    addedAt: new Date(),
    color: null,
  } as SongDB;
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

  const songItem = await bv2Song(bvId);
  const [resSong] = await db
    .insert(song)
    .values(songItem)
    .onConflictDoNothing()
    .returning();

  await db.insert(songToPlaylist).values({
    playlistId,
    songId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const thePlaylist = await db.query.playlist.findFirst({
    where: eq(playlist.id, playlistId),
  });
  if (
    (updatePlaylistCover ||
      thePlaylist?.cover === null ||
      thePlaylist?.cover === "") &&
    thePlaylist?.id !== 0 &&
    songItem.artwork
  ) {
    await db
      .update(playlist)
      .set({
        cover: songItem.artwork,
        updatedAt: new Date(),
      })
      .where(eq(playlist.id, playlistId));
  }
  return resSong;
};

export const addSeasonsSeriesToPlaylist = async (
  type: "season" | "series",
  mid: string,
  seriesId: string,
  playlistId: number,
  updatePlaylistCover = false
) => {
  const { songList, seasonsInfo } = await fetchSeasonSeriesToSongs(
    type,
    mid,
    seriesId
  );
  await db.insert(song).values(songList).onConflictDoNothing();
  await db
    .insert(songToPlaylist)
    .values(
      songList.map((s) => ({
        playlistId,
        songId: s.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )
    .onConflictDoNothing();

  if (updatePlaylistCover) {
    await db
      .update(playlist)
      .set({
        cover: seasonsInfo.cover.replace("http://", "https://"),
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
  const { favInfo, songList } = await fetchFavListAsSong(mediaId);

  const playlistCurrentSongs = await db.query.songToPlaylist.findMany({
    where: eq(songToPlaylist.playlistId, playlistId),
  });

  const playlistCurrentSongIds = playlistCurrentSongs.map((s) => s.songId);

  const favCover = favInfo.cover;
  // for (const s of songList) {
  //   if (playlistCurrentSongIds.includes(s.id)) continue;
  //   await db
  //     .insert(song)
  //     .values({
  //       ...s,
  //       color,
  //     })
  //     .onConflictDoNothing();
  //   await db.insert(songToPlaylist).values({
  //     playlistId,
  //     songId: s.id,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // }

  await db.insert(song).values(songList).onConflictDoNothing();
  await db
    .insert(songToPlaylist)
    .values(
      songList
        .filter((s) => {
          return !playlistCurrentSongIds.includes(s.id);
        })
        .map((s) => ({
          playlistId,
          songId: s.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
    )
    .onConflictDoNothing();

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
  const { favInfo, songList } = await fetchFavListAsSong(mediaId);

  const favName = favInfo.title;
  const favCover = favInfo.cover;
  const id = await createNewPlaylist({ name: favName, cover: favCover });
  // for (const s of songList) {
  //   await db
  //     .insert(song)
  //     .values({
  //       ...s,
  //       color,
  //     })
  //     .onConflictDoNothing();
  //   await db.insert(songToPlaylist).values({
  //     playlistId: id,
  //     songId: s.id,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // }
  await db.insert(song).values(songList).onConflictDoNothing();
  await db
    .insert(songToPlaylist)
    .values(
      songList.map((s) => ({
        playlistId: id,
        songId: s.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )
    .onConflictDoNothing();
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
};

export const removePlaylist = async (playlistId: number) => {
  await db
    .delete(songToPlaylist)
    .where(eq(songToPlaylist.playlistId, playlistId));
  await db.delete(playlist).where(eq(playlist.id, playlistId));
};

export const createId0Playlist = async () => {
  if (await db.query.playlist.findFirst({ where: eq(playlist.id, 0) }))
    return 0;
  const insertingRes = await db
    .insert(playlist)
    .values({
      name: "我的收藏",
      cover: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
    })
    .onConflictDoNothing()
    .returning();
  return insertingRes[0].id;
};

export const addOrRemoveToId0Playlist = async (song: SongCardItem) => {
  const playlistCurrentSongs = await db.query.songToPlaylist.findFirst({
    where: and(
      eq(songToPlaylist.playlistId, 0),
      eq(songToPlaylist.songId, song.id)
    ),
  });
  if (playlistCurrentSongs) {
    removeSongFromPlaylist(song.id, 0);
  } else {
    if (!song.bvid) throw new Error("song.bvid is null");
    await addSongToPlaylist(song.bvid, 0);
  }
};

export const editPlaylistName = async (playlistId: number, name: string) => {
  await db
    .update(playlist)
    .set({
      name,
      updatedAt: new Date(),
    })
    .where(eq(playlist.id, playlistId));
};

export const syncPlaylistWithBiliFav = async ({
  playlistId,
  favId,
}: {
  playlistId: number;
  favId: number;
}) => {
  const { favInfo, songList } = await fetchFavListAsSong(favId);

  const playlistCurrentSongs = await db.query.songToPlaylist.findMany({
    where: eq(songToPlaylist.playlistId, playlistId),
    with: {
      song: true,
    },
  });

  const toAddToPlaylist = songList.filter(
    (s) => !playlistCurrentSongs.map((s) => s.songId).includes(s.id)
  );

  const toAddToBiliFav = playlistCurrentSongs.filter(
    (s) => !songList.map((s) => s.id).includes(s.songId)
  );

  if (toAddToPlaylist.length > 0) {
    await db.insert(song).values(toAddToPlaylist).onConflictDoNothing();
    await db
      .insert(songToPlaylist)
      .values(
        toAddToPlaylist.map((s) => ({
          playlistId,
          songId: s.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      )
      .onConflictDoNothing();
  }

  for (const s of toAddToBiliFav) {
    if (!s.song.bvid) continue;
    await addOrRemoveToMyFav({
      addMids: [favId],
      removeMids: [],
      bvid: s.song.bvid,
    });
  }

  return {
    toAddToPlaylist,
    toAddToBiliFav,
  };
};
