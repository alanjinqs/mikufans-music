import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Image } from "react-native";
import dayjs from "dayjs";
import { playlist } from "@/db/schema";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

export default function PlaylistsView() {
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

  const router = useRouter();
  return (
    <View className="w-full flex">
      <Button
        className="mb-5"
        onPress={() => {
          router.push("/home/tests");
        }}
      >
        <Text>GO TO TEST PAGE</Text>
      </Button>
      <View className="flex flex-col gap-2">
        {playlists?.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            onPress={() => router.push(`/home/playlists/${playlist.id}`)}
          >
            <View className="flex flex-row p-2 bg-secondary dark rounded-md">
              {playlist?.cover && (
                <Image
                  src={playlist?.cover + "@256w"}
                  alt="cover"
                  className="w-16 h-10 rounded-md"
                />
              )}
              <View className="text-secondary-foreground pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
                <Text className="text-secondary-foreground text-md">{playlist?.name}</Text>

                <Text className="text-secondary-foreground/50 text-xs">
                  最近更新：
                  {dayjs(playlist.updatedAt).format("MM-DD HH:mm")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
