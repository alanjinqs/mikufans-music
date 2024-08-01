import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, Platform, View } from "react-native";
import TrackPlayer, {
  Event,
  State,
  Track,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { Text } from "@/components/ui/text";
import { Image } from "react-native";
import { Play } from "@/lib/icons/Play";
import { X } from "@/lib/icons/X";
import { Pause } from "@/lib/icons/Pause";
import { db, schema } from "@/utils/db/db";
import { cidToSong } from "@/utils/db/song";
import _ from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SkipForward } from "@/lib/icons/SkipForward";
import { SkipBack } from "@/lib/icons/SkipBack";
import { ChevronDown } from "@/lib/icons/ChevronDown";
import { List } from "@/lib/icons/List";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import SongSearchDialog from "@/components/lyrics/SongSearch";
import LyricsView from "@/components/lyrics/LyricsView";
import { useKeepAwake } from "expo-keep-awake";
import { Tv } from "@/lib/icons/Tv";
import { Dices } from "@/lib/icons/Dices";
import { CaseSensitive } from "@/lib/icons/CaseSensitive";
import { ListPlus } from "@/lib/icons/ListPlus";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import { ListVideo } from "@/lib/icons/ListVideo";
import { enterFollowRecommendationMode } from "@/utils/trackPlayer/followRecommendationMode";
import Toast from "react-native-toast-message";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { and, eq } from "drizzle-orm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "@/lib/icons/Menu";
import { Heart } from "@/lib/icons/Heart";
import clsx from "clsx";
import { bv2av } from "@/utils/bili/avBvCid";
import { addOrRemoveToId0Playlist } from "@/utils/db/playlists";
import { PortalHost, useModalPortalRoot } from "@rn-primitives/portal";
import { mmkvStorage } from "@/utils/storage/storage";
import { useMMKVObject } from "react-native-mmkv";

type Song = typeof schema.song.$inferSelect;

const secToStrTime = (sec: number) => {
  sec = Math.floor(sec);
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s.toString().padStart(2, "0")}`;
};

export default function FullScreenPlayer() {
  useKeepAwake();

  const query = useLocalSearchParams();
  const router = useRouter();
  const [currentSong] = useMMKVObject<Song>("currentSong");
  const [isCurrentSongInId0Playlist, setIsCurrentSongInId0Playlist] =
    useState(false);

  const [isPlaying, setIsPlaying] = useState(true);

  const progress = useProgress();

  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);

  const playbackState = usePlaybackState();

  const updateIsPlaying = async () => {
    setIsPlaying(
      playbackState.state === State.Playing ||
        playbackState.state === State.Buffering
    );
  };

  useEffect(() => {
    navigation.setOptions({ navigationBarColor: currentSong?.color || "#333" });
    if (!currentSong) return;
    db.select()
      .from(schema.songToPlaylist)
      .where(
        and(
          eq(schema.songToPlaylist.songId, currentSong.id),
          eq(schema.songToPlaylist.playlistId, 0)
        )
      )
      .then((res) => {
        if (res.length > 0) {
          setIsCurrentSongInId0Playlist(true);
        } else {
          setIsCurrentSongInId0Playlist(false);
        }
      });

    if (!currentSong?.lyrics || currentSong.lyrics.length === 0) {
      setIsShowingLyrics(false);
    }
  }, [currentSong]);

  useEffect(() => {
    updateIsPlaying();
  }, [playbackState]);

  useEffect(() => {
    updateIsPlaying();
  }, []);

  const navigation = useNavigation();
  const progressShared = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  useEffect(() => {
    if (progress.duration <= 0) {
      max.value = 100;
    } else {
      max.value = progress.duration;
    }
    progressShared.value = progress.position;
  }, [progress.duration, progress.position]);

  const [isShowingLyrics, setIsShowingLyrics] = useState(false);

  const insets = useSafeAreaInsets();
  const { sideOffset, ...rootProps } = useModalPortalRoot();
  const contentInsets = {
    top: insets.top,
    // Make sure the content is not hidden by the bottom safe area
    bottom: insets.bottom + Math.abs(sideOffset),
    left: 16,
    right: 16,
  };

  return (
    <View
      {...rootProps}
      className="w-full h-full"
      style={{
        backgroundColor:
          currentSong?.color || (query.color as string) || "#333",
      }}
    >
      <View
        className="w-full flex flex-row justify-between"
        style={{
          paddingTop: insets.top,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        }}
      >
        <View className="flex flex-row items-center justify-start gap-4">
          <Link href="../">
            <TouchableOpacity>
              <ChevronDown size={30} className="text-white" />
            </TouchableOpacity>
          </Link>
          {currentSong &&
            currentSong.lyrics &&
            currentSong.lyrics.length > 0 && (
              <TouchableOpacity
                onPress={() => setIsShowingLyrics(!isShowingLyrics)}
              >
                <CaseSensitive size={30} className="text-white" />
              </TouchableOpacity>
            )}
        </View>
        <View className="flex flex-row items-center justify-end gap-4">
          {currentSong && (
            <TouchableOpacity
              onPress={() => {
                addOrRemoveToId0Playlist(currentSong);
                setIsCurrentSongInId0Playlist(!isCurrentSongInId0Playlist);
              }}
            >
              <Heart
                size={28}
                className={
                  isCurrentSongInId0Playlist
                    ? "fill-red-400 text-red-400"
                    : "text-white fill-none"
                }
              />
            </TouchableOpacity>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu size={28} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              insets={contentInsets}
              sideOffset={sideOffset}
              className="w-64 native:w-72"
              portalHost={"modal-fullScreenPlayer"}
            >
              {currentSong && (
                <DropdownMenuItem
                  onPress={() => {
                    setIsPLSelectionDialogOpen(true);
                  }}
                >
                  <ListPlus size={28} className="text-primary" />
                  <Text>添加到播放列表</Text>
                </DropdownMenuItem>
              )}
              {currentSong && (
                <DropdownMenuItem
                  onPress={() => {
                    router.dismiss();
                    router.push(`/home/videos/recommend/${currentSong?.bvid}`);
                  }}
                >
                  <ListVideo size={28} className="text-primary" />
                  <Text>相关推荐</Text>
                </DropdownMenuItem>
              )}
              {currentSong && (
                <DropdownMenuItem
                  onPress={() => {
                    const currentInFollowRecommendationMode =
                      mmkvStorage.getBoolean("followRecommendationMode");

                    if (currentInFollowRecommendationMode) {
                      mmkvStorage.delete("followRecommendationMode");
                      Toast.show({
                        type: "info",
                        text1: "退出推荐模式",
                      });
                    } else {
                      enterFollowRecommendationMode();
                      Toast.show({
                        type: "info",
                        text1: "进入推荐模式",
                        text2:
                          "推荐模式下，播放列表将会自动从当前播放的推荐列表中随机更新音乐区视频",
                      });
                    }
                  }}
                >
                  <Dices size={28} className="text-primary" />
                  <Text>推荐跟随模式</Text>
                </DropdownMenuItem>
              )}
              {currentSong && Platform.OS === "android" && (
                <DropdownMenuItem
                  onPress={() => {
                    TrackPlayer.pause();
                    Linking.openURL(`bilibili://video/${currentSong?.bvid}`);
                  }}
                >
                  <Tv size={28} className="text-primary" />
                  <Text>在哔哩哔哩中打开</Text>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <TouchableOpacity
            onPress={() => {
              router.dismiss();
              router.push("/home/currentQueue");
            }}
          >
            <ListVideo size={30} className="text-white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-col items-center justify-center flex-1 gap-8 px-10 pb-10 w-full">
        {isShowingLyrics &&
        currentSong &&
        currentSong.lyrics &&
        currentSong.lyrics.length > 0 ? (
          <View className="flex-1 w-full">
            <LyricsView
              song={currentSong}
              portalHost="modal-fullScreenPlayer"
            />
          </View>
        ) : (
          <View className="flex flex-col gap-8 w-full">
            <View className="flex flex-col items-center justify-center">
              {currentSong?.artwork && (
                <Image
                  src={
                    currentSong.artwork +
                    (currentSong.artwork.includes("file://") ? "" : "@500w")
                  }
                  alt="cover"
                  className="rounded-md"
                  style={{
                    width: "100%",
                    maxHeight: Dimensions.get("window").height / 2 - 100,
                    aspectRatio: 1.77777778,
                  }}
                />
              )}
            </View>
            <View className="w-full text-white flex flex-col justify-center gap-4">
              <Text className="text-white text-xl w-full">
                {currentSong?.title || "- 播放列表为空 -"}
              </Text>
              {currentSong?.artistMid && (
                <Link href={`/home/user/${currentSong?.artistMid}`}>
                  <View className="w-full">
                    <View className="flex flex-row items-center gap-4">
                      {currentSong?.artistAvatar && (
                        <Image
                          src={currentSong?.artistAvatar + "@128w"}
                          alt="cover"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <Text className="text-white/90 text-md">
                        {currentSong?.artistName || "暂无歌手信息"}
                      </Text>
                    </View>
                  </View>
                </Link>
              )}
            </View>
          </View>
        )}
        <View className="flex flex-col w-full items-center gap-2">
          <Slider
            style={{
              width: "100%",
              borderRadius: 100,
            }}
            containerStyle={{
              borderRadius: 100,
              opacity: 0.5,
            }}
            progress={progressShared}
            minimumValue={min}
            maximumValue={max}
            onValueChange={(e) => {
              TrackPlayer.seekTo(e);
            }}
            renderMark={() => <></>}
            renderBubble={() => <></>}
            renderThumb={() => <></>}
            theme={{
              disableMinTrackTintColor: "#fff",
              maximumTrackTintColor: "#999",
              minimumTrackTintColor: "#fff",
              cacheTrackTintColor: "#333",
              bubbleBackgroundColor: "#666",
              heartbeatColor: "#999",
            }}
          />
          <View>
            <Text className="text-white/50 text-sm">
              {progress.duration > 0
                ? `${secToStrTime(progress.position)} / ${secToStrTime(
                    progress.duration
                  )}`
                : ""}
            </Text>
          </View>
        </View>
        <View
          className="flex flex-row items-center h-16 justify-between w-2/3"
          style={{
            backgroundColor: currentSong?.color || "#333",
          }}
        >
          <TouchableOpacity
            className="bg-white/5 rounded-full p-2"
            onPress={() => {
              TrackPlayer.skipToPrevious();
            }}
          >
            <SkipBack size={25} className="!color-white" />
          </TouchableOpacity>
          {playbackState.state && playbackState.state === State.Buffering ? (
            <View className="p-3">
              <ActivityIndicator size={"large"} className="!color-white" />
            </View>
          ) : playbackState.state && playbackState.state === State.Error ? (
            <View className="p-3">
              <X size={40} className="!color-white" />
            </View>
          ) : isPlaying ? (
            <TouchableOpacity
              onPress={() => {
                setIsPlaying(false);
                TrackPlayer.pause();
              }}
            >
              <View className="bg-white/5 rounded-full p-3">
                <Pause size={40} className="!color-white" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsPlaying(true);
                TrackPlayer.play();
              }}
              className="bg-white/5 rounded-full p-3"
            >
              <Play size={40} className="!color-white" />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
              className="bg-white/5 rounded-full p-2 relative"
              onPress={() => {
                TrackPlayer.seekBy(5);
              }}
            >
              <RotateCw size={30} className="!color-white" />
            </TouchableOpacity> */}
          <TouchableOpacity
            className="bg-white/5 rounded-full p-2"
            onPress={() => {
              TrackPlayer.skipToNext();
            }}
          >
            <SkipForward size={25} className="!color-white" />
          </TouchableOpacity>
        </View>
        {currentSong && !currentSong.lyrics && (
          <View className="flex flex-col gap-2 items-center">
            <SongSearchDialog
              song={currentSong}
              portalHost="modal-fullScreenPlayer"
            />
          </View>
        )}
      </View>

      {currentSong && currentSong.bvid && (
        <AddToPlaylistsDialog
          isPLSelectionDialogOpen={isPLSelectionDialogOpen}
          setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
          currentSelectedSongBvid={currentSong.bvid}
          portalHost="modal-fullScreenPlayer"
        />
      )}
      <PortalHost name="modal-fullScreenPlayer" />
    </View>
  );
}
