import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { getColors } from "react-native-image-colors";
import TrackPlayer, {
  Event,
  isPlaying,
  State,
  Track,
} from "react-native-track-player";
import { Text } from "../ui/text";
import { Image } from "react-native";
import { Button } from "../ui/button";
import { Play } from "@/lib/icons/Play";
import { Pause } from "@/lib/icons/Pause";
import { Marquee } from "@animatereactnative/marquee";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { schema } from "@/utils/db/db";
import { cidToSong } from "@/utils/db/song";

type Song = typeof schema.song.$inferSelect;

export default function MiniPlayer() {
  const [currentTrack, setCurrentTrack] = useState<undefined | Track>();
  const [currentSong, setCurrentSong] = useState<undefined | Song>();

  const [isPlaying, setIsPlaying] = useState(true);

  const updateIsPlaying = async () => {
    const state = (await TrackPlayer.getPlaybackState()).state;
    setIsPlaying(state === State.Playing || state === State.Buffering);
  };

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
    if (e.track && e.track.id === currentTrack?.id) return;
    setCurrentTrack(e.track);
  });

  TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
    updateIsPlaying();
  });

  useEffect(() => {
    TrackPlayer.getActiveTrack().then((track) => {
      if (track && track.id === currentTrack?.id) return;
      setCurrentTrack(track);
    });
    updateIsPlaying();
  }, []);

  const [nextTrack, setNextTrack] = useState<undefined | Track>();
  const [prevTrack, setPrevTrack] = useState<undefined | Track>();

  useEffect(() => {
    console.log("currentTrack", currentTrack);
    cidToSong(currentTrack?.id).then((song) => {
      console.log("song", song);
      setCurrentSong(song);
    });
    TrackPlayer.getActiveTrackIndex().then((index) => {
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

  const swipeableRef = useRef<Swipeable>(null);

  return (
    <View
      className="p-4 rounded-lg"
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
        leftThreshold={0}
        rightThreshold={0}
        onSwipeableOpen={(direction) => {
          console.log("swipe open", direction);

          if (direction === "right") {
            setCurrentTrack(nextTrack);
            TrackPlayer.skipToNext().then(() => {
              swipeableRef.current?.reset();

              TrackPlayer.play();
            });
          }
          if (direction === "left") {
            setCurrentTrack(prevTrack);
            TrackPlayer.skipToPrevious().then(() => {
              swipeableRef.current?.reset();
              TrackPlayer.play();
            });
          }
        }}
      >
        <View
          className="flex flex-row items-center"
          style={{
            backgroundColor: currentSong?.color || "#333",
          }}
        >
          {currentTrack?.artwork && (
            <Image
              src={currentTrack?.artwork + "@256w"}
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

            <Text className="text-white/50 text-sm">
              {currentTrack?.artist || "暂无歌手信息"}
            </Text>
          </View>
          <View className="flex justify-center align-middle w-6">
            {isPlaying ? (
              <Pressable
                onPress={() => {
                  TrackPlayer.pause();
                }}
              >
                <Pause className="!color-white" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  TrackPlayer.play();
                }}
              >
                <Play className="!color-white" />
              </Pressable>
            )}
          </View>
        </View>
      </Swipeable>
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
          {track?.artistName || "暂无歌手信息"}
        </Text>
      </View>
      <View className="flex justify-center align-middle w-6"></View>
    </View>
  );
};
