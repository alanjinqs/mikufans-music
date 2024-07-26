import { biliFetch } from "@/utils/bili/biliFetch";
import { useState } from "react";
import { Linking } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import QRCode from "react-native-qrcode-svg";
import { mmkvStorage } from "@/utils/storage/storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

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
  const [loginUrl, setLoginUrl] = useState("");

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
      setLoginUrl(data.data.url);

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
          mmkvStorage.set("auth-refreshToken", refreshToken);
          mmkvStorage.set("auth-cookies", cookies as string);
          onSuccess();
        }
      }, 3000);

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
        <TouchableOpacity>
          <Link href={`/home/user/${userInfo.mid}`}>
            <Avatar alt="头像">
              <AvatarImage source={{ uri: userInfo.avatarURL }} />
              <AvatarFallback>
                <view></view>
              </AvatarFallback>
            </Avatar>
          </Link>
        </TouchableOpacity>
      ) : (
        <Dialog open={showLoginSheet} onOpenChange={setShowLoginSheet}>
          <DialogTrigger asChild>
            <Button onPress={onLogin} className="rounded-full">
              <Text>登录</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>登录</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {loginStateToText[loginState as keyof typeof loginStateToText]}
            </DialogDescription>
            {loginState === "pending" && loginUrl.length > 0 && (
              <QRCode value={loginUrl} />
            )}
            {loginState === "timeout" || loginState === "unknown" ? (
              <DialogFooter>
                <Button onPress={onLogin}>
                  <Text>重新发起登录</Text>
                </Button>
              </DialogFooter>
            ) : null}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
