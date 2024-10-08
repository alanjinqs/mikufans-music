import { loadAndSetCookies } from "@/utils/bili/biliFetch";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserFavorites, getUserInfo } from "@/utils/bili/userInfo";
import AvatarOrLoginBtn from "@/components/user/AvatarOrLoginBtn";

import { Dimensions, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Slot,
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { Text } from "@/components/ui/text";
import { ChevronLeft } from "@/lib/icons/ChevronLeft";
import MiniPlayerNew from "@/components/player/MiniPlayerNew";
import { PortalHost } from "@rn-primitives/portal";
import PlaybackDevice from "@/components/player/PlaybackDevice";
import { mmkvStorage } from "@/utils/storage/storage";

export default function HomeIndex() {
  const pathname = usePathname();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<BiliUserInfo | null>(null);

  const updateUserInfo = () => {
    getUserInfo().then((data) => {
      setUserInfo({
        avatarURL: data.data.face + "@120w_120h_1c",
        username: data.data.uname,
        mid: data.data.mid,
      });
      mmkvStorage.set("my-mid", data.data.mid.toString());

      getUserFavorites(parseInt(data.data.mid.toString())).then((res) => {
        mmkvStorage.set("my-fav-list", JSON.stringify(res));
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

  return (
    <>
      <SafeAreaView>
        <View className="flex flex-col h-full">
          <View className="flex flex-row justify-between items-center mb-4 p-4">
            <View>
              {pathname !== "/home" ? (
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
                <Text className="text-foreground text-3xl font-bold">Home</Text>
              )}
            </View>
            <View className="flex flex-row items-center gap-2">
              <PlaybackDevice />
              <AvatarOrLoginBtn
                userInfo={userInfo}
                onSuccess={updateUserInfo}
              />
            </View>
          </View>
          <View className="flex-1 px-4">
            <Slot />
          </View>
          <View>
            {/* <MiniPlayer /> */}
            <MiniPlayerNew />
          </View>
        </View>
      </SafeAreaView>
      {/* <View className="absolute top-0 left-0 h-screen"> */}
      <PortalHost name="song-options-bottom-portal" />
      {/* </View> */}
    </>
  );
}
