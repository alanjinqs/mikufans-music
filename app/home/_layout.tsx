import { loadAndSetCookies } from "@/utils/bili/biliFetch";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInfo } from "@/utils/bili/userInfo";
import AvatarOrLoginBtn from "@/components/user/AvatarOrLoginBtn";
import MiniPlayer from "@/components/player/MiniPlayer";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Slot,
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ChevronLeft } from "@/lib/icons/ChevronLeft";
import { MotiView } from "moti";
import FullScreenPlayer from "@/components/player/FullScreenPlayer";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  Easing,
  withTiming,
} from "react-native-reanimated";

export default function HomeIndex() {
  const pathname = usePathname();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<BiliUserInfo | null>(null);

  const [willShowingFullScreenPlayer, setWillShowingFullScreenPlayer] =
    useState(false);
  const [isShowingFullScreenPlayer, setIsShowingFullScreenPlayer] =
    useState(false);

  const onCloseFullScreenPlayer = () => {
    setWillShowingFullScreenPlayer(false);
    setTimeout(() => {
      setIsShowingFullScreenPlayer(false);
    }, 400);
  };

  const onShowFullScreenPlayer = () => {
    setIsShowingFullScreenPlayer(true);
    setWillShowingFullScreenPlayer(true);
  };

  const updateUserInfo = () => {
    getUserInfo().then((data) => {
      setUserInfo({
        avatarURL: data.data.face + "@120w_120h_1c",
        username: data.data.uname,
      });
    });
  };
  useEffect(() => {
    loadAndSetCookies().then((loginned) => {
      if (loginned) {
        updateUserInfo();
      }
    });
  }, []);
  const screenHeight = Dimensions.get("screen").height;

  const fullscreenPlayerStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(willShowingFullScreenPlayer ? 0 : screenHeight, {
        duration: 400,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System,
      }),
    };
  });

  return (
    <>
      <SafeAreaView>
        <View className="p-4 flex flex-col h-full">
          <View className="flex flex-row justify-between items-center mb-6">
            <View>
              {pathname !== "/home/playlists" ? (
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                  }}
                >
                  <View className="flex flex-row items-center">
                    <ChevronLeft className="text-primary" />
                    <Text className="text-primary">返回</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <Text className="text-foreground text-3xl font-bold">
                  Playlists
                </Text>
              )}
            </View>
            <AvatarOrLoginBtn userInfo={userInfo} onSuccess={updateUserInfo} />
          </View>
          <View className="flex-1">
            <Slot />
          </View>
          <View>
            <MiniPlayer onShowFullScreenPlayer={onShowFullScreenPlayer} />
          </View>
        </View>
        <Animated.View
          className="absolute left-0"
          style={fullscreenPlayerStyle}
        >
          <FullScreenPlayer onCloseTab={onCloseFullScreenPlayer} />
        </Animated.View>
      </SafeAreaView>
    </>
  );
}
