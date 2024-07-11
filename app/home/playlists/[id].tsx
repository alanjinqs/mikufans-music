import { Button } from "@/components/ui/button";
import { db, schema } from "@/utils/db/db";
import {
  addPlaylistToQueue,
  replaceCurrentPlaying,
} from "@/utils/trackPlayer/addToQueue";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Play } from "@/lib/icons/Play";
import TrackPlayer from "react-native-track-player";
import { MotiView } from "moti";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PlaylistView() {
  const { id } = useLocalSearchParams();
  const [playlist, setPlaylist] = useState<
    typeof schema.playlist.$inferSelect | undefined
  >();

  const { data: songs } = useLiveQuery(
    db.query.songToPlaylist.findMany({
      with: {
        song: true,
      },
      where: eq(schema.songToPlaylist.playlistId, parseInt(id as string)),
    })
  );

  useEffect(() => {
    console.log(id);
    db.query.playlist
      .findFirst({
        where: eq(schema.playlist.id, parseInt(id as string)),
      })
      .then(setPlaylist);
  }, [id]);

  const playSong = async (song: typeof schema.song.$inferSelect) => {
    console.log(song);
    await replaceCurrentPlaying(song);
    TrackPlayer.play();
  };
  return (
    <View className="w-full flex">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          {playlist?.name || ""}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-end">
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            if (!playlist?.id) return;
            addPlaylistToQueue(playlist?.id);
            TrackPlayer.play();
          }}
        >
          <View className="flex flex-row items-center gap-2">
            <Play className="text-primary" size={13} />
            {/* <Text> </Text> */}
          </View>
        </Button>
      </View>
      <View className="flex flex-col gap-2">
        {songs?.map((song) => (
          <TouchableOpacity
            onPress={() => playSong(song.song)}
            key={song.id}
            className=""
          >
            <View className="flex flex-row p-2 bg-secondary rounded-md items-center text-secondary-foreground">
              {song.song.artwork && (
                <Image
                  src={song.song.artwork + "@256w"}
                  alt="cover"
                  className="w-16 h-10 rounded-md "
                />
              )}
              <View className="pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
                <Text className="text-md" numberOfLines={1}>
                  {song.song.title}
                </Text>

                <View className="flex flex-row items-center gap-1">
                  {song.song.artistAvatar && (
                    <Image
                      src={song.song.artistAvatar + "@256w"}
                      alt="cover"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <Text className="text-secondary-foreground/50 text-xs">
                    {song.song.artistName}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
