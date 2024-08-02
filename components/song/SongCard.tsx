import {
  replaceCurrentPlaying,
  addSongToQueue,
} from "@/utils/trackPlayer/addToQueue";
import { router, useNavigation } from "expo-router";
import { memo, useEffect, useState } from "react";
import {
  Image,
  Dimensions,
  Share,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import Animated, { withTiming } from "react-native-reanimated";
import { User } from "@/lib/icons/User";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import {
  addOrRemoveToId0Playlist,
  removeSongFromPlaylist,
} from "@/utils/db/playlists";
import { Trash2 } from "@/lib/icons/Trash2";
import { Download } from "@/lib/icons/Download";
import clsx from "clsx";
import { Heart } from "@/lib/icons/Heart";
import { Ellipsis } from "@/lib/icons/Ellipsis";
import { Portal } from "@rn-primitives/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useColorScheme } from "@/lib/useColorScheme";
import { ListVideo } from "@/lib/icons/ListVideo";
import { ListPlus } from "@/lib/icons/ListPlus";
import { ExternalLink } from "@/lib/icons/ExternalLink";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import { mmkvStorage } from "@/utils/storage/storage";
import Toast from "react-native-toast-message";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import { eq } from "drizzle-orm";
import { songDownloadAndEncode } from "@/utils/file/songDownloadAndEncode";
import { Star } from "@/lib/icons/Star";
import { addOrRemoveToMyFav, videoFavInfo } from "@/utils/bili/biliFavList";
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
import { FileMusic } from "@/lib/icons/FileMusic";

export type SongCardItem = {
  id: number;
  title: string | null;
  artistName: string | null;
  artistAvatar?: string | null;
  artistMid?: number | string | null;
  color?: string | null;
  artwork?: string | null;
  downloadedMp3Path?: string | null;
  downloadedCoverPath?: string | null;
  downloadedMp3Duration?: number | null;
  bvid: string | null;
  cid?: number | null;
  description?: string | null;
  duration?: number | string | null;
};

export const SongCard = memo(
  ({
    song,
    setMenuSong,
  }: {
    song: SongCardItem;
    setMenuSong: (song: SongCardItem) => void;
  }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            replaceCurrentPlaying(song);
          }}
          onLongPress={() => {
            setMenuSong(song);
          }}
        >
          <View className="flex py-2 flex-row items-center text-secondary-foreground">
            {song.artwork && (
              <Image
                src={song.downloadedCoverPath || song.artwork + "@200w"}
                alt="cover"
                className="h-10 rounded-md"
                style={{
                  aspectRatio: 1.67,
                }}
              />
            )}
            <View className="pl-2 pr-2 flex-1 flex flex-col justify-center gap-1">
              <Text
                className="text-[0.85rem] text-secondary-foreground"
                numberOfLines={1}
              >
                {song.title}
              </Text>

              <View className="flex flex-row w-full items-center justify-between">
                <View className="flex flex-row items-center gap-1">
                  {song.artistAvatar && (
                    <Image
                      src={song.artistAvatar + "@64w"}
                      alt="cover"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <Text className="text-secondary-foreground/50 text-xs">
                    {song.artistName}
                  </Text>
                  {/* {song.duration ? (
                    <Text className="text-secondary-foreground/50 text-xs">
                      {song.duration}
                    </Text>
                  ) : <></>} */}
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setMenuSong(song);
              }}
            >
              <View className="p-2 pr-3">
                <Ellipsis
                  size={20}
                  className=" color-secondary-foreground rotate-90"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
  (prev, next) => {
    return prev.song.id === next.song.id;
  }
);

export const SongCardBottomDrawer = ({
  song,
  onClose,
  playlistId,
}: {
  song: SongCardItem | null;
  onClose: () => void;
  playlistId?: number;
}) => {
  const { data: id0Songs } = useLiveQuery(
    db
      .select({
        songId: schema.songToPlaylist.songId,
      })
      .from(schema.songToPlaylist)
      .where(eq(schema.songToPlaylist.playlistId, 0))
  );

  const windowHeight = Dimensions.get("window").height;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { isDarkColorScheme } = useColorScheme();
  const [heart, setHeart] = useState(false);

  const height = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);

  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);

  const [prevColor, setPrevColor] = useState<string | null>(null);
  useEffect(() => {
    setHeart(id0Songs.find((s) => s.songId === song?.id) ? true : false);
    if (song) {
      navigation.getParent()?.setOptions({
        navigationBarColor: isDarkColorScheme ? "#000" : "#fff",
      });

      let targetHeight = 420;
      if (playlistId) targetHeight += 50;
      if (song.description) targetHeight += 100;
      height.value = withTiming(
        windowHeight * 0.8 > targetHeight ? targetHeight : windowHeight * 0.8
      );
      opacity.value = withTiming(isDarkColorScheme ? 0.8 : 0.5);
    } else {
      height.value = 0;
      opacity.value = 0;

      const currentSong = mmkvStorage.getString("currentSong");
      const currentSongObj = currentSong ? JSON.parse(currentSong) : null;
      let navigationBarColor = "#333";
      if (currentSongObj && currentSongObj.color) {
        navigationBarColor = currentSongObj.color;
      }
      navigation.getParent()?.setOptions({
        navigationBarColor,
      });
    }
  }, [song]);

  const onGoingToClose = () => {
    height.value = withTiming(0, { duration: 200 });
    opacity.value = withTiming(0);

    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    song && (
      <Portal
        name="song-options-bottom-drawer"
        hostName="song-options-bottom-portal"
      >
        <View className="absolute top-0 z-30 h-screen w-screen">
          <TouchableWithoutFeedback onPress={onGoingToClose}>
            <Animated.View
              className="w-screen bg-black"
              style={{
                opacity: opacity,
                height: windowHeight + insets.top,
              }}
            ></Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <Animated.View
          className="absolute w-screen bg-background z-50 rounded-t-xl"
          style={{
            height: height,
            bottom: 0,
          }}
        >
          <ScrollView className="w-full h-full p-4">
            <View className="flex py-2 flex-row items-center text-secondary-foreground">
              {song.artwork && (
                <Image
                  src={song.downloadedCoverPath || song.artwork + "@200w"}
                  alt="cover"
                  className="h-10 rounded-md"
                  style={{
                    aspectRatio: 1.67,
                  }}
                />
              )}
              <View className="pl-2 pr-2 flex-1 flex flex-col justify-center gap-1">
                <Text
                  className="text-[0.85rem] text-secondary-foreground"
                  numberOfLines={1}
                >
                  {song.title}
                </Text>

                <View className="flex flex-row w-full items-center justify-between">
                  <View className="flex flex-row items-center gap-1">
                    {song.artistAvatar && (
                      <Image
                        src={song.artistAvatar + "@64w"}
                        alt="cover"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <Text className="text-secondary-foreground/50 text-xs">
                      {song.artistName}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="pr-3">
                <TouchableOpacity
                  onPress={() => {
                    setHeart(!heart);
                    addOrRemoveToId0Playlist(song);
                  }}
                  className="rounded-full p-2"
                >
                  <Heart
                    size={25}
                    className={clsx(
                      heart
                        ? "fill-red-400 text-red-400"
                        : "text-foreground fill-none"
                    )}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-full flex flex-row justify-evenly mt-4">
              <TouchableOpacity
                onPress={() => {
                  addSongToQueue(song);
                  onGoingToClose();
                }}
              >
                <View className="flex flex-col items-center">
                  <View className="rounded-lg bg-secondary px-10 py-4 text-secondary-foreground">
                    <ListVideo className="color-secondary-foreground" />
                  </View>
                  <Text>下一首播放</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsPLSelectionDialogOpen(true);
                }}
              >
                <View className="flex flex-col items-center">
                  <View className="rounded-lg bg-secondary px-10 py-4 text-secondary-foreground">
                    <ListPlus className="color-secondary-foreground" />
                  </View>
                  <Text>添加到播放列表</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Share.share({
                    message: `【${song.title}】 https://b23.tv/${song.bvid}`,
                    url: `https://b23.tv/${song.bvid}`,
                  });
                }}
              >
                <View className="flex flex-col items-center">
                  <View className="rounded-lg bg-secondary px-10 py-4 text-secondary-foreground">
                    <ExternalLink className="color-secondary-foreground" />
                  </View>
                  <Text>分享</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-4 flex flex-col">
              <TouchableOpacity
                disabled={song.downloadedMp3Path ? true : false}
                onPress={() => {
                  if (!song.downloadedMp3Path) {
                    songDownloadAndEncode({ song }).then(() => {
                      onGoingToClose();
                      router.push(`/home/download`);
                    });
                  }
                }}
              >
                <View className="w-full py-4 px-6 flex flex-row items-center gap-4">
                  <Download className="text-foreground" />
                  <Text>{song.downloadedMp3Path && "已"}下载</Text>
                </View>
              </TouchableOpacity>
              {playlistId !== undefined ? (
                <TouchableOpacity
                  onPress={() => {
                    removeSongFromPlaylist(song.id, playlistId);
                    onGoingToClose();
                  }}
                >
                  <View className="w-full py-4 px-6 flex flex-row items-center gap-4">
                    <Trash2 className="text-foreground" />
                    <Text>从播放列表删除</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              <TouchableOpacity
                onPress={() => {
                  if (!song.artistMid) return;
                  router.push(`/home/user/${song.artistMid}`);
                }}
              >
                <View className="w-full py-4 px-6 flex flex-row items-center gap-4">
                  <User className="text-foreground" />
                  <Text>UP 主个人空间</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (!song.artistMid) return;
                  router.push(`/home/videos/recommend/${song.bvid}`);
                }}
              >
                <View className="w-full py-4 px-6 flex flex-row items-center gap-4">
                  <FileMusic className="text-foreground" />
                  <Text>相关推荐</Text>
                </View>
              </TouchableOpacity>

              <AddToBiliFav song={song} />
            </View>
            {song.description && (
              <View className="mt-4 px-6">
                <Text className="text font-bold mb-1">视频简介</Text>
                <Text className="text-sm">{song.description}</Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>

        <AddToPlaylistsDialog
          isPLSelectionDialogOpen={isPLSelectionDialogOpen}
          setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
          currentSelectedSongBvid={song.bvid || ""}
        />
      </Portal>
    )
  );
};

const AddToBiliFav = ({ song }: { song: SongCardItem }) => {
  const [myFavs, setMyFavs] = useState<
    {
      mid: string;
      title: string;
      mediaCount: number;
      isInFav: boolean;
      isNowInFav: boolean;
    }[]
  >([]);

  const onSave = () => {
    const addMids = myFavs
      .filter((item) => item.isNowInFav && !item.isInFav)
      .map((item) => item.mid);
    const removeMids = myFavs
      .filter((item) => !item.isNowInFav && item.isInFav)
      .map((item) => item.mid);

    if (!song.bvid) return;
    addOrRemoveToMyFav({
      bvid: song.bvid,
      addMids,
      removeMids,
    }).then((res) => {
      Toast.show({
        type: "info",
        text1: res?.message || "操作成功",
      });
    });
  };

  const onOpen = () => {
    const myMid = mmkvStorage.getString("my-mid");
    if (!song.bvid || !myMid) return;
    videoFavInfo({
      userId: myMid,
      bvid: song.bvid,
    }).then((res) => {
      console.log(res);
      setMyFavs(
        (res || []).map((item: any) => {
          return {
            ...item,
            isNowInFav: item.isInFav,
          };
        })
      );
    });
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (isOpen) {
          onOpen();
        }
      }}
    >
      <DialogTrigger asChild>
        <TouchableOpacity>
          <View className="w-full py-4 px-6 flex flex-row items-center gap-4">
            <Star className="text-foreground" />
            <Text>添加到 Bilibili 收藏夹</Text>
          </View>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent className="m-10 w-[20rem]">
        <DialogHeader>
          <DialogTitle>Bilibili 收藏夹</DialogTitle>
        </DialogHeader>

        {myFavs.map((fav) => (
          <RNTouchableOpacity
            key={fav.mid}
            onPress={() => {
              setMyFavs((prev) => {
                return prev.map((item) => {
                  if (item.mid === fav.mid) {
                    return {
                      ...item,
                      isNowInFav: !item.isNowInFav,
                    };
                  }
                  return item;
                });
              });
            }}
          >
            <View
              key={fav.mid}
              className="w-full flex flex-row items-center gap-2"
            >
              <Star
                className={clsx(
                  fav.isNowInFav
                    ? " fill-yellow-400 color-yellow-400"
                    : "fill-none color-foreground"
                )}
              />
              <View className="flex flex-col gap-2 flex-1">
                <Text>{fav.title}</Text>
                <Text className="text-sm">{fav.mediaCount} 个视频</Text>
              </View>
            </View>
          </RNTouchableOpacity>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={onSave}>
              <Text>保存</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
