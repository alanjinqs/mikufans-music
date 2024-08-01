import {
  replaceCurrentPlaying,
  addSongToQueue,
} from "@/utils/trackPlayer/addToQueue";
import { router, useNavigation } from "expo-router";
import { memo, useEffect, useState } from "react";
import { Image, Dimensions, Share } from "react-native";
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
import { biliCoverImgDownload, biliVideoDownload } from "@/utils/file/download";
import { getBiliBsetAudioDash } from "@/utils/bili/biliVideo";
import {
  addSongDownloadedCoverPath,
  addSongDownloadedPath,
} from "@/utils/db/song";
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
                </View>
              </View>
            </View>
            <View className="pr-3">
              <TouchableOpacity
                onPress={() => {
                  setMenuSong(song);
                }}
                className="rounded-full p-2"
              >
                <Ellipsis
                  size={20}
                  className=" color-secondary-foreground rotate-90"
                />
              </TouchableOpacity>
            </View>
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

  useEffect(() => {
    setHeart(id0Songs.find((s) => s.songId === song?.id) ? true : false);
    if (song) {
      height.value = withTiming(
        windowHeight * 0.8 > 350 ? 350 : windowHeight * 0.8
      );
      opacity.value = withTiming(0.5);
      // console.log(
      //   "setting navigation bar color",
      //   isDarkColorScheme ? "#27272a" : "#f4f4f5"
      // );

      navigation.setOptions({
        navigationBarColor: isDarkColorScheme ? "#000" : "#fff",
      });
    } else {
      height.value = 0;
      opacity.value = 0;
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
                    if (!song.cid || !song.bvid) return;
                    biliCoverImgDownload({
                      url: song.artwork + "@500w",
                      fileName: `${song.bvid}_cover`,
                    }).then((path) => {
                      addSongDownloadedCoverPath(path, song.id);
                    });
                    getBiliBsetAudioDash(song.cid, song.bvid).then((dash) => {
                      biliVideoDownload({
                        url: dash.base_url,
                        fileName: `${song.bvid}_${song.cid}`,
                        callback: (res) => {
                          console.log(res);
                        },
                      }).then((path) => {
                        addSongDownloadedPath(path, song.id, dash.duration);
                        if (mmkvStorage.getBoolean("isDevMode")) {
                          Toast.show({
                            type: "dev",
                            text1: "下载成功",
                            text2: JSON.stringify({
                              path,
                              id: song.id,
                              duration: dash.duration,
                            }),
                          });
                        }
                      });
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
            </View>
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
