import { biliFetch, loadAndSetCookies } from "@/utils/bili/biliFetch";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
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
import { getUserInfo } from "@/utils/bili/userInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginStateToText = {
  pending: "等待扫码",
  success: "登录成功",
  scanned: "请在手机 APP 确认登陆",
  timeout: "登录超时",
  unknown: "未知状态",
};

export default function AvatarOrLoginBtn({
  userInfo,
}: {
  userInfo: BiliUserInfo | null;
}) {
  const [loginState, setLoginState] = useState<
    "pending" | "success" | "scanned" | "timeout" | "unknown"
  >("unknown");

  const [showLoginSheet, setShowLoginSheet] = useState(false);

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
      {userInfo ? (
        <Avatar
          onPress={onLogin}
          circular
          size="$4"
          borderWidth={1.5}
          borderColor={"white"}
        >
          <Avatar.Image accessibilityLabel="Cam" src={userInfo.avatarURL} />
          <Avatar.Fallback backgroundColor="$color12" />
        </Avatar>
      ) : (
        <Button circular themeInverse onPress={onLogin}>
          登录
        </Button>
      )}

      <Sheet
        modal
        open={showLoginSheet}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center">
          <Text>
            {loginStateToText[loginState as keyof typeof loginStateToText]}
          </Text>
          {loginState === "timeout" || loginState === "unknown" ? (
            <Button onPress={onLogin}>重新发起登录</Button>
          ) : null}
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
