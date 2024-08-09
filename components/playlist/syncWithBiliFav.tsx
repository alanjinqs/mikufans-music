import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { FolderSync } from "@/lib/icons/FolderSync";
import clsx from "clsx";
import { mmkvStorage } from "@/utils/storage/storage";
import { Star } from "@/lib/icons/Star";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getUserFavorites, UserCreatedFavorite } from "@/utils/bili/userInfo";
import { syncPlaylistWithBiliFav } from "@/utils/db/playlists";
import Toast from "react-native-toast-message";

export default function SyncWithBiliFav({
  playlistId,
}: {
  playlistId: number;
}) {
  const [userFavoriteList, setUserFavoriteList] = useState<
    UserCreatedFavorite[]
  >([]);

  const onOpen = () => {
    const myFavStr = mmkvStorage.getString("my-fav-list");
    const myFav = JSON.parse(myFavStr || "[]");
    setUserFavoriteList(myFav);
  };
  const onBiliFavPress = (favId: number) => {
    setIsOpen(false);
    syncPlaylistWithBiliFav({ playlistId, favId }).then(
      ({ toAddToPlaylist, toAddToBiliFav }) => {
        Toast.show({
          type: "success",
          text1: `成功同步 ${toAddToPlaylist.length} 个视频到播放列表，成功同步 ${toAddToBiliFav.length} 个视频到收藏夹`,
        });
      }
    );
  };
  const [isOpoen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpoen}
      onOpenChange={(o) => {
        setIsOpen(o);
        if (o) {
          onOpen();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="mb-5 mt-2" variant={"outline"} size={"sm"}>
          <View className="flex flex-row items-center gap-2">
            <FolderSync className="text-primary" size={13} />
          </View>
        </Button>
      </DialogTrigger>
      <DialogContent className="m-10 w-[20rem]">
        <DialogHeader>
          <DialogTitle>与 Bilibili 收藏夹同步</DialogTitle>
        </DialogHeader>
        {userFavoriteList.map((item) => {
          return (
            <RNTouchableOpacity
              key={item.id}
              onPress={() => {
                onBiliFavPress(item.id);
              }}
            >
              <View className="pl-2 pr-2 w-full flex flex-col justify-center gap-1">
                <Text
                  className="text-[0.85rem] text-secondary-foreground"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                <View className="flex flex-row w-full items-center justify-between">
                  <View className="flex flex-row items-center gap-1">
                    <Text className="text-secondary-foreground/50 text-xs">
                      共 {item.mediaCount} 个视频
                    </Text>
                  </View>
                </View>
              </View>
            </RNTouchableOpacity>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
