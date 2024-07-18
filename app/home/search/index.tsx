import {
  View,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/lib/icons/Search";
import { biliVideoSearch } from "@/utils/bili/biliSearch";
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

export default function SearchPage() {
  const [keywodInput, setKeywordInput] = useState("");
  const [currentSearchingKeyword, setCurrentSearchingKeyword] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
  const [currentSelectedSongBvid, setCurrentSelectedSongBvid] =
    useState<string>("");

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
      currentSearchPage + 1
    );
    setCurrentSearchPage(res.page);
    updateSearchResult(res.result);
  };
  const onSearchPress = () => {
    setSearchResult([]);
    setCurrentSearchingKeyword(keywodInput);
    console.log("onSearchPress", keywodInput);
    biliVideoSearch(keywodInput).then((res) => {
      setCurrentSearchPage(res.page);
      updateSearchResult(res.result);
    });
  };
  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          {currentSearchingKeyword || "搜索"}
        </Text>
      </View>
      <View className="flex flex-row items-center gap-3 mt-2 mb-4">
        <Input onChangeText={setKeywordInput} className="flex-1" />
        <Button
          onPress={onSearchPress}
          className="flex flex-row items-center gap-2"
        >
          <Search className="text-background" size={16} />
        </Button>
      </View>
      <View className="flex-1">
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
