import { useEffect, useRef, useState } from "react";
import { Touchable, TouchableOpacity, View } from "react-native";
import TrackPlayer, {
  Event,
  isPlaying,
  State,
  Track,
} from "react-native-track-player";
import { Text } from "@/components/ui/text";
import { Image } from "react-native";
import { Play } from "@/lib/icons/Play";
import { Pause } from "@/lib/icons/Pause";
import { schema } from "@/utils/db/db";
import { cidToSong } from "@/utils/db/song";
import _ from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

// import { StepBack } from "@/lib/icons/StepBack";
// import { StepForward } from "@/lib/icons/StepForward";
// import { RotateCcw } from "@/lib/icons/RotateCcw";
// import { RotateCw } from "@/lib/icons/RotateCw";
import { SkipForward } from "@/lib/icons/SkipForward";
import { SkipBack } from "@/lib/icons/SkipBack";
import { ChevronDown } from "@/lib/icons/ChevronDown";
import { List } from "@/lib/icons/List";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { useRouter } from "expo-router";

type Song = typeof schema.song.$inferSelect;

const secToStrTime = (sec: number) => {
  sec = Math.floor(sec);
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s.toString().padStart(2, "0")}`;
};

export default function FullScreenPlayer({
  onCloseTab,
}: {
  onCloseTab: () => void;
}) {
  const screenHeight = Dimensions.get("screen").height;
  const router = useRouter();
  const [currentTrack, setCurrentTrack] = useState<undefined | Track>();
  const [currentSong, setCurrentSong] = useState<undefined | Song>();

  const [isPlaying, setIsPlaying] = useState(true);

  // only needed for testing, but no harm in keeping it
  const [eventsRegistered, setEventsRegistered] = useState(false);

  const updateIsPlaying = async () => {
    const state = (await TrackPlayer.getPlaybackState()).state;
    setIsPlaying(state === State.Playing || state === State.Buffering);
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
    updateProgress();
    if (!eventsRegistered) {
      TrackPlayer.getActiveTrack().then((track) => {
        if (track && track.id === currentTrack?.id) return;
        setCurrentTrack(track);
      });
      updateIsPlaying();
      TrackPlayer.addEventListener(
        Event.PlaybackActiveTrackChanged,
        async (e) => {
          if (e.track && e.track.id === currentTrack?.id) return;
          setCurrentTrack(e.track);
        }
      );

      TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
        _.debounce(updateIsPlaying, 500)();
      });

      TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
        setCurrentProgress(e.position);
        setDuration(e.duration);
      });

      setEventsRegistered(true);
    }
  }, []);

  const [nextTrack, setNextTrack] = useState<undefined | Track>();
  const [prevTrack, setPrevTrack] = useState<undefined | Track>();

  useEffect(() => {
    updateProgress();
    cidToSong(currentTrack?.id.split("$")[0]).then((song) => {
      setCurrentSong(song);
    });
    TrackPlayer.getActiveTrackIndex().then(async (index) => {
      if (!index) return; //不在播放
      TrackPlayer.getTrack(index + 1).then((track) => {
        if (!track) {
          setNextTrack(undefined);
          //TODO: 重新构建队列
          return;
        } else {
          setNextTrack(track);
        }
      });

      if (index === 0) {
        setPrevTrack(undefined);
      } else {
        TrackPlayer.getTrack(index - 1).then((track) => {
          if (!track) {
            //TODO: 重新构建队列
            setPrevTrack(undefined);
            return;
          } else {
            setPrevTrack(track);
          }
        });
      }
    });
  }, [currentTrack]);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(-1);

  // const progressBarStyle = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(`${(currentProgress / duration) * 100}%`, {
  //       duration: 1000,
  //     }),
  //   };
  // });

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

  return (
    <View
      className="w-screen"
      style={{
        backgroundColor: currentSong?.color || "#333",
        height: screenHeight,
      }}
    >
      <SafeAreaView>
        <View className="flex flex-col items-center justify-center h-full gap-8 mx-10">
          <TouchableOpacity
            className="absolute top-0 left-0 rounded-full"
            onPress={onCloseTab}
          >
            <ChevronDown size={30} className="text-white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="absolute top-0 right-0 rounded-full"
            onPress={() => {
              router.push("/home/currentQueue");
              onCloseTab();
            }}
          >
            <List size={30} className="text-white" />
          </TouchableOpacity>
          {currentTrack?.artwork && (
            <Image
              src={currentTrack?.artwork + "@500w"}
              alt="cover"
              className="rounded-md"
              style={{
                width: "100%",
                aspectRatio: 1.77777778,
              }}
            />
          )}
          <View className="w-full text-white flex flex-col justify-center gap-4">
            <Text className="text-white text-xl">
              {currentTrack?.title || "- 播放列表为空 -"}
            </Text>

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
          </View>
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
            {/* <View className="w-full h-1 mt-2 bg-white/10">
              <GestureDetector gesture={gesturePan}>
                <Animated.View
                  className="h-full bg-white/70 rounded-r-full"
                  style={progressBarStyle}
                ></Animated.View>
              </GestureDetector>
            </View> */}
            <View>
              <Text className="text-white/50 text-sm">
                {duration != -1
                  ? `${secToStrTime(currentProgress)} / ${secToStrTime(
                      duration
                    )}`
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
            {/* <TouchableOpacity
              className="bg-white/5 rounded-full p-2 relative"
              onPress={() => {
                TrackPlayer.seekBy(5);
              }}
            >
              <RotateCcw size={30} className="!color-white" />
            </TouchableOpacity> */}
            {isPlaying ? (
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
        </View>
      </SafeAreaView>
    </View>
  );
}

export const LeftRight = ({
  track,
  isPlaying,
}: {
  track?: Track;
  isPlaying: boolean;
}) => {
  return (
    <View className="flex flex-row w-full items-center">
      {track?.artwork && (
        <Image
          src={track?.artwork + "@256w"}
          alt="cover"
          className="w-16 h-10 rounded-md"
        />
      )}
      <View className="text-white pl-3 pr-2 flex-1 flex flex-col justify-center">
        <Text numberOfLines={1} className="text-white text-md">
          {track?.title || "- 播放列表为空 -"}
        </Text>

        <Text className="text-white/50 text-sm">
          {track?.artist || "暂无歌手信息"}
        </Text>
      </View>
      <View className="flex justify-center align-middle w-6"></View>
    </View>
  );
};
