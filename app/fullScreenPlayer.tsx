import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, Platform, View } from "react-native";
import TrackPlayer, {
  Event,
  State,
  Track,
  useActiveTrack,
  usePlaybackState,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enterFollowRecommendationMode } from "@/utils/trackPlayer/followRecommendationMode";
import Toast from "react-native-toast-message";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
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
  const [currentSong, setCurrentSong] = useState<undefined | Song>();
  const [currentBvid, setCurrentBvid] = useState("");
  const [isCurrentSongInId0Playlist, setIsCurrentSongInId0Playlist] =
    useState(false);

  const [isPlaying, setIsPlaying] = useState(true);

  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);

  // only needed for testing, but no harm in keeping it
  const [eventsRegistered, setEventsRegistered] = useState(false);

  const playbackState = usePlaybackState();
  const currentTrack = useActiveTrack();

  const updateIsPlaying = async () => {
    setIsPlaying(
      playbackState.state === State.Playing ||
        playbackState.state === State.Buffering
    );
  };

  const updateProgress = () => {
    TrackPlayer.getProgress().then((progress) => {
      if (progress.position === currentProgress) return;
      if (isNaN(progress.position) || isNaN(progress.duration)) return;
      if (
        progress.position > progress.duration ||
        progress.duration <= 0 ||
        progress.position < 0
      ) {
        setCurrentProgress(0);
        setDuration(-1);
        return;
      }
      setCurrentProgress(progress.position);
      setDuration(progress.duration);
    });
  };

  useEffect(() => {
    updateIsPlaying();
  }, [playbackState]);

  useEffect(() => {
    updateProgress();
    if (!eventsRegistered) {
      setEventsRegistered(true);

      updateIsPlaying();

      TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
        setCurrentProgress(e.position);
        setDuration(e.duration);
      });
    }
  }, []);

  const navigation = useNavigation();

  const onSongUpdated = () => {
    cidToSong(currentTrack?.id.split("$")[0]).then((song) => {
      setCurrentSong(song);
      navigation.setOptions({ navigationBarColor: song?.color || "#333" });

      if (!song?.lyrics || song.lyrics.length === 0) {
        setIsShowingLyrics(false);
      }
    });

    db.query.songToPlaylist
      .findMany({
        with: {
          song: true,
        },
        where: eq(schema.songToPlaylist.playlistId, 0),
      })
      .then((res) => {
        if (
          res.find((item) => item.song.bvid === currentTrack?.id.split("$")[1])
        ) {
          setIsCurrentSongInId0Playlist(true);
        } else {
          setIsCurrentSongInId0Playlist(false);
        }
      });
  };

  useEffect(() => {
    updateProgress();
    onSongUpdated();
    setCurrentBvid(currentTrack?.id.split("$")[1] || "");
  }, [currentTrack]);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(-1);

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  useEffect(() => {
    if (duration <= 0) {
      max.value = 100;
    } else {
      max.value = duration;
    }
    progress.value = currentProgress;
  }, [currentProgress, duration]);

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
            <DropdownMenuTrigger asChild>
              <Menu size={28} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              insets={contentInsets}
              sideOffset={sideOffset}
              className="w-64 native:w-72"
              portalHost={"modal-fullScreenPlayer"}
            >
              {currentTrack && (
                <DropdownMenuItem
                  onPress={() => {
                    setIsPLSelectionDialogOpen(true);
                  }}
                >
                  <ListPlus size={28} className="text-primary" />
                  <Text>添加到播放列表</Text>
                </DropdownMenuItem>
              )}
              {currentTrack && (
                <DropdownMenuItem
                  onPress={() => {
                    router.dismiss();
                    router.push(`/home/videos/recommend/${currentBvid}`);
                  }}
                >
                  <ListVideo size={28} className="text-primary" />
                  <Text>相关推荐</Text>
                </DropdownMenuItem>
              )}
              {currentTrack && (
                <DropdownMenuItem
                  onPress={() => {
                    AsyncStorage.getItem("followRecommendationMode").then(
                      (currentInFollowRecommendationMode) => {
                        if (
                          currentInFollowRecommendationMode &&
                          currentInFollowRecommendationMode == "true"
                        ) {
                          AsyncStorage.removeItem("followRecommendationMode");
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
                      }
                    );
                  }}
                >
                  <Dices size={28} className="text-primary" />
                  <Text>推荐跟随模式</Text>
                </DropdownMenuItem>
              )}
              {currentTrack && Platform.OS === "android" && (
                <DropdownMenuItem
                  onPress={() => {
                    TrackPlayer.pause();
                    Linking.openURL(`bilibili://video/${currentBvid}`);
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
              onSongUpdated={onSongUpdated}
              portalHost="modal-fullScreenPlayer"
            />
          </View>
        ) : (
          <View className="flex flex-col gap-8">
            {currentTrack?.artwork && (
              <Image
                src={
                  currentTrack.artwork +
                  (currentTrack.artwork.includes("file://") ? "" : "@500w")
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
            <View className="w-full text-white flex flex-col justify-center gap-4">
              <Text className="text-white text-xl">
                {currentTrack?.title || "- 播放列表为空 -"}
              </Text>
              {currentSong?.artistMid && (
                <Link href={`/home/user/${currentSong?.artistMid}`}>
                  <View className="flex flex-row justify-between items-end">
                    <View className="flex flex-row items-center gap-4">
                      {currentSong?.artistAvatar && (
                        <Image
                          src={currentSong?.artistAvatar + "@128w"}
                          alt="cover"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <Text className="text-white/90 text-md">
                        {currentTrack?.artist || "暂无歌手信息"}
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
            progress={progress}
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
              {duration != -1
                ? `${secToStrTime(currentProgress)} / ${secToStrTime(duration)}`
                : ""}
            </Text>
          </View>
        </View>
        <View
          className="flex flex-row items-center justify-between w-2/3"
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
            <View className="bg-white/5 rounded-full p-3">
              <ActivityIndicator size={"large"} className="!color-white" />
            </View>
          ) : playbackState.state && playbackState.state === State.Error ? (
            <View className="bg-white/5 rounded-full p-3">
              <X size={40} className="!color-white" />
            </View>
          ) : isPlaying ? (
            <TouchableOpacity
              className="bg-white/5 rounded-full p-3"
              onPress={() => {
                setIsPlaying(false);
                TrackPlayer.pause();
              }}
            >
              <Pause size={40} className="!color-white" />
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
              onSongUpdated={onSongUpdated}
              portalHost="modal-fullScreenPlayer"
            />
          </View>
        )}
      </View>

      {currentTrack && (
        <AddToPlaylistsDialog
          isPLSelectionDialogOpen={isPLSelectionDialogOpen}
          setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
          currentSelectedSongBvid={currentBvid}
          portalHost="modal-fullScreenPlayer"
        />
      )}
      <PortalHost name="modal-fullScreenPlayer" />
    </View>
  );
}
