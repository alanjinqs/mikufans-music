import { biliFetch } from "@/utils/bili/biliFetch";
import { useState } from "react";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const loginStateToText = {
  pending: "等待扫码",
  success: "登录成功",
  scanned: "请在手机 APP 确认登陆",
  timeout: "登录超时",
  unknown: "未知状态",
};

export default function AvatarOrLoginBtn({
  userInfo,
  onSuccess,
}: {
  userInfo: BiliUserInfo | null;
  onSuccess: () => void;
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
          onSuccess();
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
        <Avatar alt="头像">
          <AvatarImage source={{ uri: userInfo.avatarURL }} />
          <AvatarFallback>
            <view></view>
          </AvatarFallback>
        </Avatar>
      ) : (
        <Button onPress={onLogin} className=" rounded-full">
          <Text>登录</Text>
        </Button>
      )}
      {/* 
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
        <Sheet.Handle
          collapsable={loginState === "success" || loginState === "unknown"}
        />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center">
          <Text>
            {loginStateToText[loginState as keyof typeof loginStateToText]}
          </Text>
          {loginState === "timeout" || loginState === "unknown" ? (
            <Button onPress={onLogin}>重新发起登录</Button>
          ) : null}
        </Sheet.Frame>
      </Sheet> */}
    </>
  );
}
