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
import { Text } from "@/components/ui/text";
import { ChevronLeft } from "@/lib/icons/ChevronLeft";

export default function HomeIndex() {
  const pathname = usePathname();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<BiliUserInfo | null>(null);

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

  return (
    <>
      <SafeAreaView>
        <View className="p-4 flex flex-col h-full">
          <View className="flex flex-row justify-between items-center mb-6">
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
            <AvatarOrLoginBtn userInfo={userInfo} onSuccess={updateUserInfo} />
          </View>
          <View className="flex-1">
            <Slot />
          </View>
          <View>
            <MiniPlayer />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
