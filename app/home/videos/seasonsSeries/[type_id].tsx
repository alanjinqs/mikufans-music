import {
  SearchResult,
  SearchResultCard,
} from "@/components/song/SearchResultCard";
import { videoRecommend } from "@/utils/bili/biliRecommend";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "@/components/ui/text";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import { getFavListByPage } from "@/utils/bili/biliFavList";
import {
  getSeasons,
  getSeries,
  getSeriesMeta,
} from "@/utils/bili/biliSeasonsSeriesList";

export default function FavoriteList() {
  const { type_id } = useLocalSearchParams();

  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(0);
  const [favoriteTitle, setFavoriteTitle] = useState("");
  const [favoriteCover, setFavoriteCover] = useState("");
  const [mid, setMid] = useState("");

  const getNextPage = () => {
    const [type, id] = (type_id as string).split("_");

    if (type === "season") {
      getSeasons(id, page + 1).then((res) => {
        setPage(page + 1);
        setRecommendVideos((current) => [...current, ...res.list]);
        setFavoriteCover(res.meta.cover.replace("http://", "https://"));
        setFavoriteTitle(res.meta.name);
      });
    } else if (type === "series") {
      getSeries(mid, id, page + 1).then((res) => {
        setPage(page + 1);
        setRecommendVideos((current) => [...current, ...res.list]);
      });
    }
  };
  useEffect(() => {
    const [type, id] = (type_id as string).split("_");
    setRecommendVideos([]);
    setPage(0);
    setFavoriteCover("");
    setMid("");
    setFavoriteTitle("");
    if (type === "series") {
      getSeriesMeta(id).then((res) => {
        setMid(res.mid);
        setFavoriteTitle(res.name);
        getSeries(res.mid, id, 1).then((res) => {
          setPage(1);
          setRecommendVideos((current) => [...current, ...res.list]);
        });
      });
    } else {
      getSeasons(id, 1).then((res) => {
        setPage(1);
        setRecommendVideos((current) => [...current, ...res.list]);
        setFavoriteCover(res.meta.cover.replace("http://", "https://"));
        setFavoriteTitle(res.meta.name);
      });
    }
  }, [type_id]);

  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
  const [currentSelectedSongBvid, setCurrentSelectedSongBvid] = useState("");

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full flex flex-row items-center gap-4 mb-2">
        {favoriteCover && (
          <Image
            className="rounded-md"
            source={{ uri: favoriteCover }}
            style={{ height: 40, aspectRatio: 1.77777778 }}
          />
        )}
        <Text className="text-foreground text-3xl font-bold" numberOfLines={1}>
          {favoriteTitle || ""}
        </Text>
      </View>

      <View className="flex-1">
        <FlatList
          data={recommendVideos}
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
          onEndReached={getNextPage}
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
