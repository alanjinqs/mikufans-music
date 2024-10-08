import { Text } from "@/components/ui/text";
import { useWindowDimensions, View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Image } from "react-native";
import { TestTubeDiagonal } from "@/lib/icons/TestTubeDiagonal";
import { Sun } from "@/lib/icons/Sun";
import { MoonStar } from "@/lib/icons/MoonStar";
import { Search } from "@/lib/icons/Search";
import { TouchableOpacity } from "react-native-gesture-handler";
import CreateNewPlaylist from "@/components/playlist/createNewPlaylist";
import { useColorScheme } from "@/lib/useColorScheme";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { ListMusic } from "@/lib/icons/ListMusic";
import { Heart } from "@/lib/icons/Heart";
import clsx from "clsx";
import { mmkvStorage } from "@/utils/storage/storage";
import { Download } from "@/lib/icons/Download";
import { Rss } from "@/lib/icons/Rss";
import { Settings2 } from "@/lib/icons/Settings2";

export default function HomeView() {
  const { width, height } = useWindowDimensions();
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();

  const [itemPerRow, setItemPerRow] = useState(2);

  useEffect(() => {
    if (width > 1000) {
      setItemPerRow(Math.floor(width / 300));
    } else {
      setItemPerRow(2);
    }
  }, [playlists]);

  const toggleColorSchemeComponent = () => {
    toggleColorScheme();
    mmkvStorage.set("theme", colorScheme === "dark" ? "light" : "dark");
  };

  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <View className="w-full flex h-full">
      <View className="flex flex-row items-center justify-end gap-3">
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            router.push("/home/search");
          }}
        >
          <View className="flex flex-row items-center gap-2">
            <Search className="text-primary" size={13} />
          </View>
        </Button>
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={toggleColorSchemeComponent}
        >
          <View className="flex flex-row items-center gap-2">
            {colorScheme === "dark" ? (
              <Sun className="text-primary" size={13} />
            ) : (
              <MoonStar className="text-primary" size={13} />
            )}
          </View>
        </Button>
        <CreateNewPlaylist />

        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            router.push("/home/setting");
          }}
        >
          <View className="flex flex-row items-center gap-2">
            <Settings2 className="text-primary" size={13} />
          </View>
        </Button>
      </View>
      <View className="flex-1">
        <ScrollView ref={scrollViewRef}>
          <View className="flex flex-row gap-4 items-center">
            <View className="flex-1">
              <TouchableOpacity onPress={() => router.push(`/home/download`)}>
                <View className="bg-secondary rounded-md overflow-hidden flex flex-row items-center">
                  <View
                    className={clsx(
                      "bg-sky-200 w-[5rem] h-[5rem]",
                      "flex items-center justify-center"
                    )}
                  >
                    <Download className="text-black/30" size={30} />
                  </View>

                  <Text className="text-secondary-foreground font-bold pl-4 text-lg">
                    已下载
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <TouchableOpacity onPress={() => router.push(`/home/feed`)}>
                <View className="bg-secondary rounded-md overflow-hidden flex flex-row items-center">
                  <View
                    className={clsx(
                      "bg-lime-200 w-[5rem] h-[5rem]",
                      "flex items-center justify-center"
                    )}
                  >
                    <Rss className="text-black/30" size={30} />
                  </View>

                  <Text className="text-secondary-foreground font-bold pl-4 text-lg">
                    我关注的
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            className="flex flex-row flex-wrap mt-4"
            style={{
              gap: 10,
            }}
          >
            {playlists?.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                onPress={() => router.push(`/home/playlists/${playlist.id}`)}
              >
                <View className="bg-secondary rounded-md overflow-hidden">
                  <View className="relative">
                    {playlist?.cover ? (
                      <Image
                        src={playlist?.cover + "@480w"}
                        alt="cover"
                        style={{
                          width: (width - 18) / itemPerRow - 10,
                          aspectRatio: 1.77777778,
                        }}
                      />
                    ) : (
                      <View
                        className={clsx(
                          playlist.id == 0 ? "bg-red-300" : "bg-gray-400",
                          "flex items-center justify-center"
                        )}
                        style={{
                          width: (width - 18) / itemPerRow - 10,
                          aspectRatio: 1.77777778,
                        }}
                      >
                        {playlist.id !== 0 && (
                          <ListMusic className="text-white/50" size={40} />
                        )}
                      </View>
                    )}

                    {playlist.id === 0 && (
                      <View className="absolute w-full h-full ">
                        <View className="w-full h-full items-center justify-center">
                          <Heart className="text-white fill-white" size={40} />
                        </View>
                      </View>
                    )}
                  </View>
                  <Text className="text-secondary-foreground font-bold p-2 text-lg">
                    {playlist?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
