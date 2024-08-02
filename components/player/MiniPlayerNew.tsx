import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { Text } from "@/components/ui/text";
import { Image } from "react-native";
import { Play } from "@/lib/icons/Play";
import { Pause } from "@/lib/icons/Pause";
import { X } from "@/lib/icons/X";
import { Marquee } from "@animatereactnative/marquee";
import { db, schema } from "@/utils/db/db";
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
import { router, useNavigation } from "expo-router";
import { SkipBack } from "@/lib/icons/SkipBack";
import { SkipForward } from "@/lib/icons/SkipForward";
import { Heart } from "@/lib/icons/Heart";
import { addOrRemoveToId0Playlist } from "@/utils/db/playlists";
import { and, eq } from "drizzle-orm";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { SongCardBottomDrawer, SongCardItem } from "../song/SongCard";
import { Ellipsis } from "@/lib/icons/Ellipsis";

type Song = typeof schema.song.$inferSelect;

const secToStrTime = (sec: number) => {
  sec = Math.floor(sec);
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s.toString().padStart(2, "0")}`;
};

export default function MiniPlayerNew() {
  const [currentSong] = useMMKVObject<Song>("currentSong");
  const [isCurrentSongInId0Playlist, setIsCurrentSongInId0Playlist] =
    useState(false);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(100000);

  useEffect(() => {
    if (!progress || !progress.position || !progress.duration) {
      setCurrentProgress(1);
      setDuration(100000);
      return;
    }
    setCurrentProgress(progress.position);
    setDuration(progress.duration);
  }, [progress]);

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

  const navigation = useNavigation();

  useEffect(() => {
    console.log("setting navigation bar color", currentSong?.color || "#333");

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
  }, [currentSong]);

  const [bottonDrawerSong, setBottonDrawerSong] = useState<SongCardItem | null>(
    null
  );

  return (
    <View
      className="rounded-t-lg"
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
          {currentSong?.artwork && (
            <Image
              src={
                currentSong.artwork +
                (currentSong.artwork.includes("file://") ? "" : "@500w")
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
            {currentSong?.title && currentSong?.title.length > 20 ? (
              <Marquee spacing={40} speed={0.5}>
                <Text className="text-white text-md">
                  {currentSong?.title || " - 播放列表为空 - "}
                </Text>
              </Marquee>
            ) : (
              <Text numberOfLines={1} className="text-white text-md">
                {currentSong?.title || "- 播放列表为空 -"}
              </Text>
            )}

            <View className="flex flex-row justify-between">
              <Text className="text-white/50 text-sm">
                {currentSong?.artistName || "暂无歌手信息"}
              </Text>
              {duration != 100000 && (
                <Text className="text-white/50 text-sm">
                  {secToStrTime(currentProgress)} / {secToStrTime(duration)}
                </Text>
              )}
            </View>
          </View>
          {currentSong && (
            <View className="flex flex-row gap-2">
              {/* {currentSong && (
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
              )} */}
              {/* <TouchableOpacity
                className="bg-white/5 rounded-full p-2"
                onPress={() => {
                  TrackPlayer.skipToPrevious();
                }}
              >
                <SkipBack className="!color-white" />
              </TouchableOpacity> */}
              {playbackState.state && playbackState.state === State.Error ? (
                <View>
                  <X className="!color-white" />
                </View>
              ) : playbackState.state &&
                playbackState.state === State.Playing ? (
                <TouchableOpacity
                  onPress={() => {
                    TrackPlayer.pause();
                  }}
                >
                  <View>
                    <Pause className="!color-white" />
                  </View>
                </TouchableOpacity>
              ) : playbackState.state && playbackState.state === State.Ended ? (
                <View>
                  <X className="!color-white" />
                </View>
              ) : playbackState.state &&
                playbackState.state === State.Buffering ? (
                <View>
                  <ActivityIndicator size={"small"} className="!color-white" />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    TrackPlayer.play();
                  }}
                >
                  <Play className="!color-white" />
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity
                className="bg-white/5 rounded-full p-2"
                onPress={() => {
                  TrackPlayer.skipToNext();
                }}
              >
                <SkipForward className="!color-white" />
              </TouchableOpacity> */}
              {
                <TouchableOpacity
                  className="bg-white/5 rounded-full p-2"
                  onPress={() => {
                    setBottonDrawerSong(currentSong);
                  }}
                >
                  <Ellipsis className="!color-white rotate-90" />
                </TouchableOpacity>
              }
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
      <SongCardBottomDrawer
        song={bottonDrawerSong}
        onClose={() => {
          setBottonDrawerSong(null);
        }}
      />
    </View>
  );
}
