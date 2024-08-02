import TrackPlayer from "react-native-track-player";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BackHandler, View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import CookieManager from "@react-native-cookies/cookies";
import { useContext, useEffect, useState } from "react";
import { HeartPulse } from "@/lib/icons/HeartPulse";
import { HeartOff } from "@/lib/icons/HeartOff";
import { MikufansMusicContext } from "@/app/context";
import { Bug } from "@/lib/icons/Bug";
import { BugOff } from "@/lib/icons/BugOff";
import Toast from "react-native-toast-message";
import { mmkvStorage } from "@/utils/storage/storage";
import { Switch } from "@/components/ui/switch";

export default function TestView() {
  const [isHeartbeatDisabled, setIsHeartbeatDisabled] = useState(false);

  const { isDevMode, setIsDevMode } = useContext(MikufansMusicContext);

  useEffect(() => {
    if (mmkvStorage.getBoolean("disableHeartbeat")) {
      setIsHeartbeatDisabled(true);
    }
  }, []);

  const toggleHeartbeat = (checked: boolean) => {
    if (checked) {
      mmkvStorage.set("disableHeartbeat", true);
      setIsHeartbeatDisabled(true);
    } else {
      mmkvStorage.delete("disableHeartbeat");
      setIsHeartbeatDisabled(false);
    }
  };

  const toggleDevMode = async (checked: boolean) => {
    if (checked) {
      mmkvStorage.set("isDevMode", true);
      Toast.show({
        type: "dev",
        text1: "已进入开发模式",
        text2: "开发模式下会显示大量调试信息，截图时请注意保护账户 Cookie",
      });
      setIsDevMode(true);
    } else {
      mmkvStorage.delete("isDevMode");
      setIsDevMode(false);
    }
  };

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">设置</Text>
      </View>
      <View className="flex flex-col gap-4 mt-6 flex-wrap">
        <View className="flex flex-row justify-between">
          <Text>禁用心跳</Text>
          <Switch
            checked={isHeartbeatDisabled}
            onCheckedChange={toggleHeartbeat}
            nativeID="toggle-heartbeat"
          />
        </View>
        <View className="flex flex-row justify-between">
          <Text>开发模式</Text>
          <Switch
            checked={isDevMode}
            onCheckedChange={toggleDevMode}
            nativeID="toggle-heartbeat"
          />
        </View>

        <Button
          onPress={() => {
            TrackPlayer.stop();
            mmkvStorage.clearAll();
            CookieManager.clearAll();
            BackHandler.exitApp();
          }}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    </View>
  );
}
