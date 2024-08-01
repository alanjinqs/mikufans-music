import { SearchResult } from "@/components/song/SearchResultCard";
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
import { Button } from "@/components/ui/button";
import { ListPlus } from "@/lib/icons/ListPlus";
import Toast from "react-native-toast-message";
import { addSeasonsSeriesToPlaylist } from "@/utils/db/playlists";
import SelectPlaylistDialog from "@/components/playlist/selectPlaylistDialog";
import {
  SongCard,
  SongCardBottomDrawer,
  SongCardItem,
} from "@/components/song/SongCard";

export default function FavoriteList() {
  const { type_id } = useLocalSearchParams();

  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(0);
  const [favoriteTitle, setFavoriteTitle] = useState("");
  const [favoriteCover, setFavoriteCover] = useState("");
  const [mid, setMid] = useState("");

  const [addToPlaylistLoading, setAddToPlaylistLoading] = useState(false);

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
        setMid(res.meta.mid);
        setRecommendVideos((current) => [...current, ...res.list]);
        setFavoriteCover(res.meta.cover.replace("http://", "https://"));
        setFavoriteTitle(res.meta.name);
      });
    }
  }, [type_id]);

  const [menuSong, setMenuSong] = useState<SongCardItem | null>(null);

  const [isPLSelection2DialogOpen, setIsPLSelection2DialogOpen] =
    useState(false);
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
      <View className="flex flex-row items-center justify-end gap-3">
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            setIsPLSelection2DialogOpen(true);
          }}
          disabled={addToPlaylistLoading}
        >
          <ListPlus className="text-primary" size={13} />
        </Button>
      </View>

      <View className="flex-1">
        <FlatList
          data={recommendVideos}
          renderItem={({ item }) => {
            return (
              <SongCard
                song={{ ...item, id: item.aid }}
                setMenuSong={setMenuSong}
              />
            );
          }}
          keyExtractor={(item) => item.bvid.toString() || ""}
          onEndReached={getNextPage}
        ></FlatList>
      </View>
      <SongCardBottomDrawer song={menuSong} onClose={() => setMenuSong(null)} />

      <SelectPlaylistDialog
        isPLSelectionDialogOpen={isPLSelection2DialogOpen}
        setIsPLSelectionDialogOpen={setIsPLSelection2DialogOpen}
        onPlaylistSelected={(playlistId) => {
          const [type, id] = (type_id as string).split("_");
          setAddToPlaylistLoading(true);

          setAddToPlaylistLoading(true);
          addSeasonsSeriesToPlaylist(type as any, mid, id, playlistId, false)
            .then(() => {
              Toast.show({
                type: "success",
                text1: "已添加到播放列表",
              });
            })
            .finally(() => {
              setAddToPlaylistLoading(false);
            });
        }}
      />
    </View>
  );
}
