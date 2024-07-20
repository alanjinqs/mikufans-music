import { Button } from "@/components/ui/button";
import { useLocalSearchParams } from "expo-router";

import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { FlatList } from "react-native-gesture-handler";
import {
  SearchResult,
  SearchResultCard,
} from "@/components/song/SearchResultCard";
import { useEffect, useState } from "react";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import { getUserVideos } from "@/utils/bili/biliUserVides";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Music } from "@/lib/icons/Music";
import { getArtistInfo } from "@/utils/bili/userInfo";

export default function UserPage() {
  const { mid } = useLocalSearchParams();
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
  const [currentSelectedSongBvid, setCurrentSelectedSongBvid] =
    useState<string>("");
  const [isMusicFilterOn, setIsMusicFilterOn] = useState(false);

  const [artistName, setArtistName] = useState("");
  const [artistAvatar, setArtistAvatar] = useState("");
  const [artistSign, setArtistSign] = useState("");

  const updateSearchResult = (res: any[]) => {
    const parsedRes: SearchResult[] = res.map((item: any) => {
      return {
        aid: parseInt(item.aid),
        artistName: item.author,
        artistMid: item.mid,
        typeId: item.typeid,
        bvid: item.bvid,
        title: item.title.replace(/<[^>]+>/g, ""),
        description: item.description.replace(/<[^>]+>/g, ""),
        artwork: item.pic.replace("http://", "https://"),
        play: item.play,
        danmu: item.video_review,
        favorite: item.favorites,
        tag: item.tag,
        publishedAt: item.pubdate,
        duration: item.duration,
      };
    });

    setSearchResult((current) => {
      const res = [...current, ...parsedRes];
      return res.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.bvid === item.bvid)
      );
    });
  };

  const loadNextPage = async () => {
    const res = await getUserVideos({
      page: currentSearchPage + 1,
      mid: parseInt(mid as string),
      musicFilter: isMusicFilterOn,
    });
    setCurrentSearchPage(currentSearchPage + 1);
    updateSearchResult(res);
  };

  const loadFirstPage = async (musicFilter?: boolean) => {
    setSearchResult([]);
    setCurrentSearchPage(1);
    getUserVideos({
      page: 1,
      mid: parseInt(mid as string),
      musicFilter: musicFilter === null ? isMusicFilterOn : musicFilter,
    }).then((res) => {
      setCurrentSearchPage(res.page);
      updateSearchResult(res);
    });
  };

  const loadMusicFilter = async () => {
    const res = await AsyncStorage.getItem("isMusicFilterOn");
    if (res === "true") {
      setIsMusicFilterOn(true);
      return true;
    } else {
      setIsMusicFilterOn(false);
      return false;
    }
  };

  useEffect(() => {
    loadMusicFilter().then((res) => {
      loadFirstPage(res);
    });
    getArtistInfo(parseInt(mid as string)).then((res) => {
      setArtistName(res.data.name);
      setArtistAvatar(res.data.face);
      setArtistSign(res.data.sign);
    });
  }, [mid]);

  const onSetMusicFilter = () => {
    AsyncStorage.setItem("isMusicFilterOn", isMusicFilterOn ? "false" : "true");
    setIsMusicFilterOn(!isMusicFilterOn);
    loadFirstPage(!isMusicFilterOn);
  };

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full flex flex-row items-center gap-2">
        {artistAvatar && (
          <Image
            src={artistAvatar + "@128w"}
            alt="cover"
            className="w-14 h-14 rounded-full"
          />
        )}
        <View className="flex-1">
          <Text className="text-foreground text-3xl font-bold">
            {artistName}
          </Text>
          <Text className="text-sm opacity-50" numberOfLines={1}>
            {artistSign}
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-end gap-3">
        <View className="flex flex-row items-center justify-end gap-3">
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
        </View>
      </View>
      <View className="flex-1">
        <FlatList
          data={searchResult}
          onEndReached={loadNextPage}
          renderItem={({ item }) => {
            return (
              <SearchResultCard
                result={item}
                setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
                setCurrentSelectedSongBvid={setCurrentSelectedSongBvid}
              />
            );
          }}
          keyExtractor={(item) => item.bvid.toString() || ""}
        ></FlatList>
      </View>
      <AddToPlaylistsDialog
        setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
        isPLSelectionDialogOpen={isPLSelectionDialogOpen}
        currentSelectedSongBvid={currentSelectedSongBvid}
      />
    </View>
  );
}
