import { biliFetch, loadAndSetCookies } from "@/utils/bili/biliFetch";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Sheet,
  Text,
  View,
  XStack,
  YStack,
  ZStack,
} from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "@/utils/bili/userInfo";

export default function Index() {
  const [loginState, setLoginState] = useState<
    "pending" | "success" | "scanned" | "timeout" | "unknown"
  >("unknown");

  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    loadAndSetCookies().then((loginned) => {
      if (loginned) {
        getUserInfo().then((data) => {
          console.log(data.data);
          setAvatarUrl(data.data.face + "@120w_120h_1c");
        });
      }
    });
  }, []);

  const onLogin = async () => {
    try {
      const res = await biliFetch(
        "https://passport.bilibili.com/x/passport-login/web/qrcode/generate"
      );
      const data = await res.json();
      console.log(data);
      setShowLoginSheet(true);
      setLoginState("pending");
      Linking.openURL(data.data.url);

      const fetching = setInterval(async () => {
        console.log("fetching");
        const res = await biliFetch(
          `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${data.data.qrcode_key}`
        );
        const pollData = await res.json();
        console.log("pollData", pollData);
        if (pollData.data.code === 86038) {
          setLoginState("timeout");
          clearInterval(fetching);
        }
        if (pollData.data.code === 86090) {
          setLoginState("scanned");
        }
        if (pollData.data.code === 0) {
          clearInterval(fetching);
          setLoginState("success");
          // DedeUserID DedeUserID__ckMd5 SESSDATA bili_jct
          const cookies = res.headers.get("set-cookie");
          const refreshToken = pollData.data.refresh_token;
          await AsyncStorage.setItem("auth-refreshToken", refreshToken);
          await AsyncStorage.setItem("auth-cookies", cookies as string);
        }
      }, 2000);

      setTimeout(() => {
        setLoginState("timeout");
        clearInterval(fetching);
      }, 180 * 1000);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <SafeAreaView>
        <YStack justifyContent="flex-end">
          <XStack alignSelf="flex-end">
            <Avatar circular size="$4" bordered borderBlockColor={"white"} borderWidth={2}>
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://i2.hdslb.com/bfs/face/aa302ae2beac0457cfe520bea1062c25b51d1973.jpg@120w_120h_1c"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <Button onPress={onLogin}>Login</Button>
          </XStack>
        </YStack>
      </SafeAreaView>
      <Sheet open={showLoginSheet}>
        <Text>{loginState}</Text>
      </Sheet>
    </>
  );
}
