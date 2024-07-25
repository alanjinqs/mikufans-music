import { Text } from "@/components/ui/text";
import { useWindowDimensions, View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Image } from "react-native";
import dayjs from "dayjs";
import { TestTubeDiagonal } from "@/lib/icons/TestTubeDiagonal";
import { Sun } from "@/lib/icons/Sun";
import { MoonStar } from "@/lib/icons/MoonStar";
import { Search } from "@/lib/icons/Search";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CreateNewPlaylist from "@/components/playlist/createNewPlaylist";
import { useColorScheme } from "@/lib/useColorScheme";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { ListMusic } from "@/lib/icons/ListMusic";
import { indexRecommend } from "@/utils/bili/biliRecommend";
import {
  SearchResult,
  SearchResultCardSq,
} from "@/components/song/SearchResultCard";
import { Heart } from "@/lib/icons/Heart";
import clsx from "clsx";
import { getFeed } from "@/utils/bili/biliFeed";

export default function HomeView() {
  const { width, height } = useWindowDimensions();
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();

  const [itemPerRow, setItemPerRow] = useState(2);
  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [isGettingNewRecommend, setIsGettingNewRecommend] = useState(false);
  const [offset, setOffset] = useState(0);

  const getNewRecommend = async () => {
    if (isGettingNewRecommend) return;
    setIsGettingNewRecommend(true);
    console.log("get new recommend");
    const res = await getFeed(offset);

    setRecommendVideos((current) => [...current, ...res.results]);
    setIsGettingNewRecommend(false);
    setOffset(res.nextOffset);
  };
  useEffect(() => {
    if (indexRecommend.length > 0) return;
    getNewRecommend();
  }, []);

  useEffect(() => {
    if (width > 1000) {
      setItemPerRow(Math.floor(width / 300));
    } else {
      setItemPerRow(2);
    }
  }, [playlists]);

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
          onPress={toggleColorScheme}
        >
          <View className="flex flex-row items-center gap-2">
            {colorScheme === "dark" ? (
              <Sun className="text-primary" size={13} />
            ) : (
              <MoonStar className="text-primary" size={13} />
            )}
          </View>
        </Button>
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            router.push("/home/tests");
          }}
        >
          <View className="flex flex-row items-center gap-2">
            <TestTubeDiagonal className="text-primary" size={13} />
          </View>
        </Button>
        <CreateNewPlaylist />
      </View>
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          // onScrollEndDrag={(e) => {
          //   if (
          //     e.nativeEvent.contentOffset.y +
          //       e.nativeEvent.layoutMeasurement.height >=
          //     e.nativeEvent.contentSize.height - 20
          //   ) {
          //     getNewRecommend();
          //   }
          // }}
        >
          <View
            className="flex flex-row flex-wrap"
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
          <View
            className="mt-5 flex flex-row flex-wrap"
            style={{
              gap: 10,
            }}
          >
            {recommendVideos.map((video) => (
              <SearchResultCardSq
                key={video.bvid + "_" + video.artistMid}
                width={(width - 18) / itemPerRow - 10}
                result={video}
              />
            ))}
          </View>
          <View className="flex flex-row items-center justify-center my-5">
            <Button onPress={getNewRecommend} variant="outline" size="sm">
              <Text>加载更多</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
