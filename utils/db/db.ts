import { useLiveQuery, drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { Text } from "react-native";
import * as _schema from "@/db/schema";
const expo = openDatabaseSync("db.playlists", { enableChangeListener: true });
export const db = drizzle(expo, {
  schema: _schema,
});
export const schema = _schema;

export type SongDB = typeof schema.song.$inferSelect;
export type PlaylistDB = typeof schema.playlist.$inferSelect;
