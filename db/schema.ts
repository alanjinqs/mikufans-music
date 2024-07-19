import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  numeric,
} from "drizzle-orm/sqlite-core";

export const playlist = sqliteTable("playlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  cover: text("cover"),
  description: text("description"),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export const song = sqliteTable("song", {
  id: integer("id").primaryKey({ autoIncrement: true }), //AVID!!!!
  cid: integer("cid"),
  bvid: text("bvid"),
  title: text("title"),
  artistMid: integer("artistMid"),
  artistName: text("artistName"),
  artistAvatar: text("artistAvatar"),
  artwork: text("artwork"),
  color: text("color"),
  addedAt: integer("addedAt", { mode: "timestamp" }),
  qqMusicMid: text("mid"),
  lyrics: text("lyrics"),
  translatedLyrics: text("translatedLyrics"),
  lyricsOffset: integer("lyricsOffset"),
  downloadedMp3Path: text("downloadedPath"),
  downloadedCoverPath: text("downloadedCoverPath"),
  downloadedMp3Duration: integer("downloadedMp3Duration"),
});

export const songToPlaylist = sqliteTable(
  "songToPlaylist",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    songId: integer("songId")
      .references(() => song.id)
      .notNull(),
    playlistId: integer("playlistId")
      .references(() => playlist.id)
      .notNull(),
    order: integer("order").notNull().default(0),
    createdAt: integer("createdAt", { mode: "timestamp" }),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
  },
  (table) => {
    return {
      nameIdx: index("songId_idx").on(table.songId),
      emailIdx: index("playlistId_idx").on(table.playlistId),
    };
  }
);

export const songRelations = relations(song, ({ many }) => ({
  songToPlaylist: many(songToPlaylist),
}));

export const playlistRelations = relations(playlist, ({ many }) => ({
  songToPlaylist: many(songToPlaylist),
}));

export const songPlaylistRelations = relations(songToPlaylist, ({ one }) => ({
  song: one(song, {
    fields: [songToPlaylist.songId],
    references: [song.id],
  }),
  playlist: one(playlist, {
    fields: [songToPlaylist.playlistId],
    references: [playlist.id],
  }),
}));

export const currentQueue = sqliteTable("currentQueue", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  songId: integer("songId")
    .references(() => song.id)
    .notNull(),
});

export const currentQueueRelations = relations(currentQueue, ({ one }) => ({
  song: one(song, {
    fields: [currentQueue.songId],
    references: [song.id],
  }),
}));

export const currentQueueMeta = sqliteTable("currentQueueMeta", {
  key: text("key").primaryKey(),
  value: text("value"),
});
