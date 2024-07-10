import { playlist, song, songToPlaylist } from "@/db/schema";
import { db } from "./db";
import { fetchFavList, fetchFavMeta } from "../bili/favList";
import dayjs from "dayjs";
import { artworkToDarkColor } from "../artworkToColor";

const createNewPlaylist = async ({
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
