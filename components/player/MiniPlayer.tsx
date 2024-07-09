import { useEffect, useState } from "react";
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

export default function MiniPlayer() {
  const [currentTrack, setCurrentTrack] = useState<undefined | Track>();

  const [colors, setColors] = useState<undefined | string>();
  const [isPlaying, setIsPlaying] = useState(true);

  const updateIsPlaying = async () => {
    const state = (await TrackPlayer.getPlaybackState()).state;
    setIsPlaying(state === State.Playing || state === State.Buffering);
  };

  const updateTrack = async (track: undefined | Track) => {
    setCurrentTrack(track);
    console.log(track?.artwork);
    getColors(track?.artwork || "", {
      fallback: "#9897E1",
      key: track?.artwork || "",
    }).then((colors) => {
      let color = "#9897E1";
      console.log(colors);
      if (colors.platform === "android") {
        color =
          colors.darkMuted === "#9897E1"
            ? colors.darkVibrant
            : colors.darkMuted;
      }
      if (colors.platform === "web") {
        color =
          colors.darkMuted === "#9897E1"
            ? colors.darkVibrant
            : colors.darkMuted;
      }
      if (colors.platform === "ios") {
        color = colors.primary;
      }

      setColors(color);
    });
  };
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
    updateTrack(e.track);
  });

  TrackPlayer.addEventListener(Event.PlaybackState, async (e) => {
    updateIsPlaying();
  });

  useEffect(() => {
    TrackPlayer.getActiveTrack().then((track) => {
      updateTrack(track);
    });
    updateIsPlaying();
  }, []);

  return (
    <View
      className="flex flex-row p-4 my-4 rounded-lg"
      style={{
        backgroundColor: colors,
      }}
    >
      {currentTrack?.artwork && (
        <Image src={currentTrack?.artwork} alt="cover" className="w-12 h-12" />
      )}
      <View className="text-white pl-3 pr-2 flex-1">
        <Text className="text-white text-md" numberOfLines={1}>
          {currentTrack?.title || " - 播放列表为空 - "}
        </Text>
        <Text className="text-white/50 text-sm">{currentTrack?.artist}</Text>
      </View>
      <View className="flex justify-center align-middle">
        {isPlaying ? (
          <Pressable
            onPress={() => {
              TrackPlayer.pause();
            }}
          >
            <Pause className="color-white" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              TrackPlayer.play();
            }}
          >
            <Play className="color-white" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
