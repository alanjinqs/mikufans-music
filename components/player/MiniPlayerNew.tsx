import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
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
import { Pause } from "@/lib/icons/Pause";
import { X } from "@/lib/icons/X";
import { Marquee } from "@animatereactnative/marquee";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { db, schema } from "@/utils/db/db";
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
import { router } from "expo-router";
import { SkipBack } from "@/lib/icons/SkipBack";
import { SkipForward } from "@/lib/icons/SkipForward";
import { Heart } from "@/lib/icons/Heart";
import { addOrRemoveToId0Playlist } from "@/utils/db/playlists";
import { and, eq } from "drizzle-orm";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";

type Song = typeof schema.song.$inferSelect;

const secToStrTime = (sec: number) => {
  sec = Math.floor(sec);
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s.toString().padStart(2, "0")}`;
};

export default function MiniPlayerNew() {
  const [currentSong, setCurrentSongString] =
    useMMKVObject<Song>("currentSong");

  const [isPlaying, setIsPlaying] = useState(true);

  const currentTrack = useActiveTrack();

  const [isCurrentSongInId0Playlist, setIsCurrentSongInId0Playlist] =
    useState(false);

  // only needed for testing, but no harm in keeping it
  const [eventsRegistered, setEventsRegistered] = useState(false);
  const playbackState = usePlaybackState();

  const updateIsPlaying = async () => {
    try {
      const state = (await TrackPlayer.getPlaybackState()).state;
      setIsPlaying(state === State.Playing || state === State.Buffering);
    } catch {
      setTimeout(updateIsPlaying, 1000);
    }
  };

  useEffect(() => {
    if (!eventsRegistered) {
      updateIsPlaying();

      TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
        _.debounce(updateIsPlaying, 100)();
      });

      TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
        setCurrentProgress(e.position);
        setDuration(e.duration);
      });

      setEventsRegistered(true);
    }
  }, []);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(100000);

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${(currentProgress / duration) * 100}%`, {
        duration: 1000,
      }),
    };
  });

  const onShowFullScreenPlayer = () => {
    router.push(`fullScreenPlayer?color=` + (currentSong?.color || "#333"));
  };

  useEffect(() => {
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
  }, [currentSong]);

  return (
    <View
      className="rounded-lg"
      style={{
        backgroundColor: currentSong?.color || "#333",
      }}
    >
      <TouchableWithoutFeedback onPress={onShowFullScreenPlayer}>
        <View
          className="flex flex-row items-center mx-3 mt-3"
          style={{
            backgroundColor: currentSong?.color || "#333",
          }}
        >
          {currentTrack?.artwork && (
            <Image
              src={
                currentTrack.artwork +
                (currentTrack.artwork.includes("file://") ? "" : "@500w")
              }
              alt="cover"
              className=" rounded-md"
              style={{
                aspectRatio: 1.6666666667,
                width: 60,
              }}
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
          {currentTrack && (
            <View className="flex flex-row gap-2">
              {currentSong && (
                <TouchableOpacity
                  className="bg-white/5 rounded-full p-2"
                  onPress={() => {
                    addOrRemoveToId0Playlist(currentSong);
                    setIsCurrentSongInId0Playlist(!isCurrentSongInId0Playlist);
                  }}
                >
                  <Heart
                    className={
                      isCurrentSongInId0Playlist
                        ? "fill-red-400 text-red-400"
                        : "text-white fill-none"
                    }
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className="bg-white/5 rounded-full p-2"
                onPress={() => {
                  TrackPlayer.skipToPrevious();
                }}
              >
                <SkipBack className="!color-white" />
              </TouchableOpacity>
              {playbackState.state &&
              playbackState.state === State.Buffering ? (
                <ActivityIndicator size={"small"} className="!color-white" />
              ) : playbackState.state && playbackState.state === State.Error ? (
                <X className="!color-white" />
              ) : isPlaying ? (
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
              <TouchableOpacity
                className="bg-white/5 rounded-full p-2"
                onPress={() => {
                  TrackPlayer.skipToNext();
                }}
              >
                <SkipForward className="!color-white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View className="w-full h-1 mt-2">
        <Animated.View
          className="h-full bg-white/70 rounded-r-full"
          style={progressBarStyle}
        ></Animated.View>
      </View>
    </View>
  );
}
