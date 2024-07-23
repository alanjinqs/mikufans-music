import {
  View,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/lib/icons/Search";
import { biliUserSearch, biliVideoSearch } from "@/utils/bili/biliSearch";
import {
  FlatList,
  Swipeable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import {
  SearchResult,
  SearchResultCard,
} from "@/components/song/SearchResultCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Music } from "@/lib/icons/Music";
import { router } from "expo-router";

export default function SearchPage() {
  const [keywodInput, setKeywordInput] = useState("");
  const [currentSearchingKeyword, setCurrentSearchingKeyword] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
  const [currentSelectedSongBvid, setCurrentSelectedSongBvid] =
    useState<string>("");
  const [isMusicFilterOn, setIsMusicFilterOn] = useState(false);

  const [searchUserResult, setSearchUserResult] = useState<
    {
      mid: string;
      name: string;
      sign: string;
      videos: string;
      cover: string;
    }[]
  >([]);

  useEffect(() => {
    AsyncStorage.getItem("isMusicFilterOn").then((res) => {
      if (res === "true") {
        setIsMusicFilterOn(true);
      } else {
        setIsMusicFilterOn(false);
      }
    });
  }, []);

  const updateSearchResult = (res: any[]) => {
    const parsedRes: SearchResult[] = res.map((item: any) => ({
      aid: parseInt(item.aid),
      artistName: item.author,
      artistMid: item.mid,
      typeId: item.typeid,
      bvid: item.bvid,
      title: item.title.replace(/<[^>]+>/g, ""),
      description: item.description.replace(/<[^>]+>/g, ""),
      artwork: "https:" + item.pic,
      play: item.play,
      danmu: item.video_review,
      favorite: item.favorites,
      tag: item.tag,
      publishedAt: item.pubdate,
      duration: item.duration,
    }));

    setSearchResult((current) => {
      const res = [...current, ...parsedRes];
      return res.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.bvid === item.bvid)
      );
    });
  };

  const loadNextPage = async () => {
    const res = await biliVideoSearch(
      currentSearchingKeyword,
      currentSearchPage + 1,
      isMusicFilterOn
    );
    setCurrentSearchPage(res.page);
    updateSearchResult(res.result);
  };
  const onSearchPress = () => {
    setSearchResult([]);
    setCurrentSearchPage(1);
    setCurrentSearchingKeyword(keywodInput);
    biliVideoSearch(keywodInput, 1, isMusicFilterOn).then((res) => {
      setCurrentSearchPage(res.page);
      updateSearchResult(res.result);
    });

    biliUserSearch(keywodInput).then((res) => {
      console.log(res.result);
      setSearchUserResult(
        res.result.map((item: any) => {
          return {
            mid: item.mid,
            name: item.uname,
            sign: item.usign,
            videos: item.videos,
            cover: item.upic,
          };
        })
      );
    });
  };
  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          {currentSearchingKeyword || "搜索"}
        </Text>
      </View>
      <View className="flex flex-row items-center mt-2 mb-4">
        <Input
          onChangeText={setKeywordInput}
          className="flex-1 rounded-l-full !rounded-r-none"
          onSubmitEditing={onSearchPress}
        />

        <Button
          className="flex flex-row items-center gap-2 !rounded-none !w-10"
          variant={isMusicFilterOn ? "default" : "outline"}
          onPress={() => {
            AsyncStorage.setItem(
              "isMusicFilterOn",
              isMusicFilterOn ? "false" : "true"
            );
            setIsMusicFilterOn(!isMusicFilterOn);
          }}
        >
          <Music
            className={
              isMusicFilterOn ? "text-primary-foreground" : "text-primary"
            }
            size={16}
          />
        </Button>
        <Button
          onPress={onSearchPress}
          className="flex flex-row items-center gap-2 rounded-r-full !rounded-l-none"
        >
          <Search className="text-background" size={16} />
        </Button>
      </View>
      <View className="flex-1">
        {searchUserResult.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row gap-2">
              {searchUserResult.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.mid}
                    onPress={() => {
                      router.push("/home/user/" + item.mid);
                    }}
                  >
                    <View
                      className="flex flex-col items-center"
                      style={{
                        height: 165,
                      }}
                    >
                      <Image
                        src={"https:" + item.cover}
                        className="!rounded-full w-16 h-16"
                      />
                      <Text className="text-md w-26" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-sm opacity-50">
                        {item.videos} 视频
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
        <FlatList
          data={searchResult}
          onEndReached={() => {
            loadNextPage();
          }}
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
