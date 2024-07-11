import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import TrackPlayer, { Event, State, Track } from "react-native-track-player";
import { Text } from "@/components/ui/text";
import { Image } from "react-native";
import { Play } from "@/lib/icons/Play";
import { Pause } from "@/lib/icons/Pause";
import { Marquee } from "@animatereactnative/marquee";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { schema } from "@/utils/db/db";
import { cidToSong } from "@/utils/db/song";
import _ from "lodash";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import dayjs from "dayjs";
import { sendHeartbeat } from "@/utils/bili/heartbeat";
import { addQueueToTrackPlayer } from "@/utils/trackPlayer/trackPlayerUpdating";

type Song = typeof schema.song.$inferSelect;

const secToStrTime = (sec: number) => {
  sec = Math.floor(sec);
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s.toString().padStart(2, "0")}`;
};

const tpLog = () => {
  TrackPlayer.getQueue().then((queue) => {
    TrackPlayer.getActiveTrackIndex().then((index) => {
      console.log("TP CURRENT STATUS: ", index, queue);
    });
  });
};

export default function MiniPlayer({
  onShowFullScreenPlayer,
}: {
  onShowFullScreenPlayer: () => void;
}) {
  const [currentTrack, setCurrentTrack] = useState<undefined | Track>();
  const [currentSong, setCurrentSong] = useState<undefined | Song>();

  const [isPlaying, setIsPlaying] = useState(true);

  // only needed for testing, but no harm in keeping it
  const [eventsRegistered, setEventsRegistered] = useState(false);

  const updateIsPlaying = async () => {
    const state = (await TrackPlayer.getPlaybackState()).state;
    setIsPlaying(state === State.Playing || state === State.Buffering);
    setTimeout(updateNextPrev, 1000);
  };

  useEffect(() => {
    if (!eventsRegistered) {
      TrackPlayer.getActiveTrack().then((track) => {
        if (track && track.id === currentTrack?.id) return;
        setCurrentTrack(track);
      });

      updateIsPlaying();
      TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (e) => {
        setCurrentTrack(e.track);
        console.log("active track changed", e.track);
        addQueueToTrackPlayer().then(() => {
          tpLog();
          updateNextPrev();
        });
      });

      TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
        _.debounce(updateIsPlaying, 100)();
      });

      TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
        setCurrentProgress(e.position);
        setDuration(e.duration);
        if (lastHeartbeat.diff(dayjs(), "s") > 15 && currentSong) {
          tpLog();
          _.debounce(() => {
            heartbeat(currentSong);
          }, 100)();
        }
      });

      setEventsRegistered(true);
    }
  }, []);

  const [nextTrack, setNextTrack] = useState<undefined | Track>();
  const [prevTrack, setPrevTrack] = useState<undefined | Track>();

  const [lastHeartbeat, setLastHeartbeat] = useState(dayjs().subtract(15, "s"));

  const heartbeat = async (song: Song) => {
    console.log(
      "heartbeat",
      song.bvid,
      song.cid,
      Math.floor(currentProgress),
      isPlaying
    );
    if (!song?.bvid || !song?.cid) return;
    sendHeartbeat(song.bvid, song.cid, Math.floor(currentProgress), isPlaying);
    setLastHeartbeat(dayjs());
  };

  const updateNextPrev = async () => {
    TrackPlayer.getActiveTrackIndex().then(async (index) => {
      if (!index) {
        setNextTrack(undefined);
        setPrevTrack(undefined);
        return;
      }
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
  };

  useEffect(() => {
    cidToSong(currentTrack?.id.split("$")).then((song) => {
      setCurrentSong(song);
      if (!song) return;
      _.debounce(() => {
        heartbeat(song);
      }, 100)();
    });
    updateNextPrev();
  }, [currentTrack]);

  const swipeableRef = useRef<Swipeable>(null);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(100000);

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${(currentProgress / duration) * 100}%`, {
        duration: 1000,
      }),
    };
  });

  return (
    <View
      className="rounded-lg"
      style={{
        backgroundColor: currentSong?.color || "#333",
      }}
    >
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={() => (
          <LeftRight track={prevTrack} isPlaying={isPlaying} />
        )}
        renderRightActions={() => (
          <LeftRight track={nextTrack} isPlaying={isPlaying} />
        )}
        leftThreshold={50}
        rightThreshold={50}
        onSwipeableOpen={(direction) => {
          console.log("swipe open", direction);

          if (direction === "right") {
            // if (!nextTrack) {
            //   TrackPlayer.reset();
            //   setCurrentProgress(0);
            //   setDuration(100000);
            //   swipeableRef.current?.reset();
            //   setCurrentTrack(undefined);
            //   return;
            // }
            setCurrentTrack(nextTrack);
            TrackPlayer.skipToNext().then((e) => {
              swipeableRef.current?.reset();
              TrackPlayer.play();
            });
          }
          if (direction === "left") {
            // if (!prevTrack) {
            //   TrackPlayer.reset();
            //   setCurrentProgress(0);
            //   setDuration(100000);
            //   swipeableRef.current?.reset();
            //   setCurrentTrack(undefined);
            //   return;
            // }
            setCurrentTrack(prevTrack);
            TrackPlayer.skipToPrevious().then(() => {
              swipeableRef.current?.reset();
              TrackPlayer.play();
            });
          }
        }}
      >
        <TouchableWithoutFeedback onPress={onShowFullScreenPlayer}>
          <View
            className="flex flex-row items-center mx-4 mt-4"
            style={{
              backgroundColor: currentSong?.color || "#333",
            }}
          >
            {currentTrack?.artwork && (
              <Image
                src={currentTrack?.artwork + "@500w"}
                alt="cover"
                className="w-16 h-10 rounded-md"
              />
            )}
            <View className="text-white pl-3 pr-2 flex-1 flex flex-col justify-center">
              {currentTrack?.title && currentTrack?.title.length > 20 ? (
                <Marquee spacing={40} speed={0.5}>
                  <Text className="text-white text-md">
                    {currentTrack?.title || " - 播放列表为空 - "}
                  </Text>
                </Marquee>
              ) : (
                <Text numberOfLines={1} className="text-white text-md">
                  {currentTrack?.title || "- 播放列表为空 -"}
                </Text>
              )}

              <View className="flex flex-row justify-between">
                <Text className="text-white/50 text-sm">
                  {currentTrack?.artist || "暂无歌手信息"}
                </Text>
                {duration != 100000 && (
                  <Text className="text-white/50 text-sm">
                    {secToStrTime(currentProgress)} / {secToStrTime(duration)}
                  </Text>
                )}
              </View>
            </View>
            <View className="flex justify-center align-middle w-6 mx-2">
              {currentTrack && (
                <>
                  {isPlaying ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsPlaying(false);
                        TrackPlayer.pause();
                      }}
                    >
                      <Pause className="!color-white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setIsPlaying(true);
                        TrackPlayer.play();
                      }}
                    >
                      <Play className="!color-white" />
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
      <View className="w-full  h-1 mt-2">
        <Animated.View
          className="h-full bg-white/70 rounded-r-full"
          style={progressBarStyle}
        ></Animated.View>
      </View>
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
    <View className="flex flex-row w-full items-center mt-4 px-4">
      {track?.artwork && (
        <Image
          src={track?.artwork + "@500w"}
          alt="cover"
          className="w-16 h-10 rounded-md"
        />
      )}
      <View className="text-white pl-3 pr-2 flex-1 flex flex-col justify-center">
        <Text numberOfLines={1} className="text-white text-md">
          {track?.title || " "}
        </Text>

        <Text className="text-white/50 text-sm">{track?.artist || " "}</Text>
      </View>
      <View className="flex justify-center align-middle w-6"></View>
    </View>
  );
};
