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
import { debounce } from "lodash";
import { isMusicType } from "@/utils/bili/biliTypeIdFilters";

export default function HomeView() {
  const { width, height } = useWindowDimensions();
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();

  const [itemPerRow, setItemPerRow] = useState(2);
  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [isGettingNewRecommend, setIsGettingNewRecommend] = useState(false);
  const getNewRecommend = async () => {
    if (isGettingNewRecommend) return;
    setIsGettingNewRecommend(true);
    console.log("get new recommend");
    const res = await indexRecommend();
    const recommendVideos: SearchResult[] = res.item
      .map((item: any) => ({
        aid: parseInt(item.id),
        artistName: item.owner.name,
        artistMid: item.owner.mid,
        artistAvatar: item.owner.face.replace("http://", "https://"),
        bvid: item.bvid,
        title: item.title,
        artwork: item.pic.replace("http://", "https://"),
        publishedAt: item.pubdate,
        duration: item.duration,
        danmu: item.stat.danmaku,
        view: item.stat.view,
        like: item.stat.like,
      }));
    setRecommendVideos((current) => [...current, ...recommendVideos]);
    setIsGettingNewRecommend(false);
  };
  useEffect(() => {
    if (indexRecommend.length > 0) return;
    getNewRecommend();
  }, []);

  useEffect(() => {
    if (playlists.length === 1) {
      setItemPerRow(1);
    } else if (playlists.length % 2 === 0) {
      setItemPerRow(2);
    } else if (playlists.length % 3 === 0) {
      setItemPerRow(3);
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
              minHeight: height - 100,
            }}
          >
            {playlists?.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                onPress={() => router.push(`/home/playlists/${playlist.id}`)}
              >
                <View className="bg-secondary rounded-md overflow-hidden">
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
                      className="bg-gray-400 flex items-center justify-center"
                      style={{
                        width: (width - 18) / itemPerRow - 10,
                        aspectRatio: 1.77777778,
                      }}
                    >
                      <ListMusic className="text-white/50" size={40} />
                    </View>
                  )}
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
              gap: 4,
            }}
          >
            {recommendVideos.map((video) => (
              <SearchResultCardSq
                key={video.bvid}
                width={(width - 18) / 3 - 6}
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
