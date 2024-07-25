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
import { Button } from "@/components/ui/button";
import { ListPlus } from "@/lib/icons/ListPlus";
import SelectPlaylistDialog from "@/components/playlist/selectPlaylistDialog";
import { addFavoriteToPlaylist } from "@/utils/db/playlists";
import Toast from "react-native-toast-message";

export default function FavoriteList() {
  const { mediaId } = useLocalSearchParams();

  const [recommendVideos, setRecommendVideos] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(0);
  const [favoriteTitle, setFavoriteTitle] = useState("");
  const [favoriteCover, setFavoriteCover] = useState("");

  const getNextPage = () => {
    getFavListByPage(mediaId as string, page + 1).then((res) => {
      setPage(page + 1);
      setRecommendVideos((current) => [...current, ...res.songList]);
      setFavoriteCover(res.meta.cover.replace("http://", "https://"));
      setFavoriteTitle(res.meta.title);
    });
  };
  useEffect(() => {
    setRecommendVideos([]);
    setPage(0);
    setFavoriteCover("");
    setFavoriteTitle("");
    getNextPage();
  }, [mediaId]);

  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
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
          {favoriteTitle || mediaId}
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
        >
          <ListPlus className="text-primary" size={13} />
        </Button>
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
      <SelectPlaylistDialog
        isPLSelectionDialogOpen={isPLSelection2DialogOpen}
        setIsPLSelectionDialogOpen={setIsPLSelection2DialogOpen}
        onPlaylistSelected={(playlistId) => {
          addFavoriteToPlaylist(
            parseInt(mediaId as string),
            playlistId,
            false
          ).then(() => {
            Toast.show({
              type: "success",
              text1: "已添加到播放列表",
            });
          });
        }}
      />
    </View>
  );
}
