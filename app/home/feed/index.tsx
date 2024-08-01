import { SearchResult } from "@/components/song/SearchResultCard";
import {
  SongCardItem,
  SongCard,
  SongCardBottomDrawer,
} from "@/components/song/SongCard";
import { Button } from "@/components/ui/button";
import { Music } from "@/lib/icons/Music";
import { getFeed } from "@/utils/bili/biliFeed";
import { indexRecommend } from "@/utils/bili/biliRecommend";
import { mmkvStorage } from "@/utils/storage/storage";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function FeedPage() {
  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [isGettingNewRecommend, setIsGettingNewRecommend] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isMusicFilterOn, setIsMusicFilterOn] = useState(false);

  const loadMusicFilter = async () => {
    const res = mmkvStorage.getBoolean("isMusicFilterOn") || false;
    setIsMusicFilterOn(res);
    return res;
  };

  const getNewRecommend = async () => {
    if (isGettingNewRecommend) return;
    setIsGettingNewRecommend(true);
    console.log("get new recommend");
    const res = await getFeed(offset);

    setRecommendVideos((current) => [...current, ...res.results]);
    setOffset(res.nextOffset);
    setIsGettingNewRecommend(false);
  };

  useEffect(() => {
    if (indexRecommend.length > 0) return;
    getNewRecommend();
    loadMusicFilter();
  }, []);

  const [menuSong, setMenuSong] = useState<SongCardItem | null>(null);

  const onSetMusicFilter = () => {};

  return (
    <>
      {/* <View className="flex flex-row items-center justify-end gap-3">
        <Button
          className="mb-5 mt-2"
          variant={isMusicFilterOn ? "default" : "outline"}
          size={"sm"}
          onPress={onSetMusicFilter}
        >
          <Music
            className={
              isMusicFilterOn ? "text-primary-foreground" : "text-primary"
            }
            size={13}
          />
        </Button>
      </View> */}
      <FlatList
        data={recommendVideos}
        onEndReached={getNewRecommend}
        renderItem={({ item }) => {
          return (
            <SongCard
              key={item.bvid}
              song={{ ...item, id: item.aid }}
              setMenuSong={setMenuSong}
            />
          );
        }}
        keyExtractor={(item) => item.bvid.toString() || ""}
      ></FlatList>
      <SongCardBottomDrawer song={menuSong} onClose={() => setMenuSong(null)} />
    </>
  );
}
