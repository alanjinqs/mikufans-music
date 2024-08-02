import { SearchResult } from "@/components/song/SearchResultCard";
import { videoRecommend } from "@/utils/bili/biliRecommend";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Music } from "@/lib/icons/Music";
import { isMusicType } from "@/utils/bili/biliTypeIdFilters";
import { mmkvStorage } from "@/utils/storage/storage";
import {
  SongCard,
  SongCardBottomDrawer,
  SongCardItem,
} from "@/components/song/SongCard";

export default function RecommendVideosPage() {
  const { bvid } = useLocalSearchParams();

  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [isMusicFilterOn, setIsMusicFilterOn] = useState(false);

  useEffect(() => {
    setIsMusicFilterOn(mmkvStorage.getBoolean("isMusicFilterOn") || false);
  }, []);

  useEffect(() => {
    console.log(bvid);
    videoRecommend(bvid as string).then((res: any) => {
      const parsedResults: SearchResult[] = res.map((item: any) => ({
        aid: parseInt(item.id),
        artistName: item.owner.name,
        artistMid: item.owner.mid,
        artistAvatar: item.owner.face.replace("http://", "https://"),
        bvid: item.bvid,
        title: item.title,
        artwork: item.pic.replace("http://", "https://"),
        publishedAt: item.pubdate,
        duration: item.duration,
        typeId: item.tid,
      }));
      setRecommendVideos(parsedResults);
    });
  }, [bvid]);

  const [menuSong, setMenuSong] = useState<SongCardItem | null>(null);

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          相关推荐 - {bvid}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-end gap-3">
        <Button
          className="mb-5 mt-2"
          variant={isMusicFilterOn ? "default" : "outline"}
          size={"sm"}
          onPress={() => {
            mmkvStorage.set("isMusicFilterOn", isMusicFilterOn);
            setIsMusicFilterOn(!isMusicFilterOn);
          }}
        >
          <Music
            className={
              isMusicFilterOn ? "text-primary-foreground" : "text-primary"
            }
            size={13}
          />
        </Button>
      </View>
      <View className="flex-1">
        <FlatList
          data={recommendVideos.filter((res) => {
            if (isMusicFilterOn) {
              return isMusicType(parseInt(res.typeId || "0"));
            } else {
              return true;
            }
          })}
          renderItem={({ item }) => {
            return (
              <SongCard
                song={{ ...item, id: item.aid }}
                setMenuSong={setMenuSong}
              />
            );
          }}
          keyExtractor={(item) => item.bvid.toString() || ""}
        ></FlatList>
      </View>
      <SongCardBottomDrawer song={menuSong} onClose={() => setMenuSong(null)} />
    </View>
  );
}
