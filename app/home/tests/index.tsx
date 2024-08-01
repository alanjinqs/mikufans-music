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

export default function TestView() {
  const [isHeartbeatDisabled, setIsHeartbeatDisabled] = useState(false);

  const { isDevMode, setIsDevMode } = useContext(MikufansMusicContext);

  useEffect(() => {
    if (mmkvStorage.getBoolean("disableHeartbeat")) {
      setIsHeartbeatDisabled(true);
    }
  }, []);

  const toggleHeartbeat = async () => {
    if (isHeartbeatDisabled) {
      mmkvStorage.delete("disableHeartbeat");
    } else {
      mmkvStorage.set("disableHeartbeat", true);
    }
    setIsHeartbeatDisabled(!isHeartbeatDisabled);
  };

  const toggleDevMode = async () => {
    if (isDevMode) {
      mmkvStorage.delete("isDevMode");
    } else {
      mmkvStorage.set("isDevMode", true);
      Toast.show({
        type: "dev",
        text1: "已进入开发模式",
        text2: "开发模式下会显示大量调试信息，截图时请注意保护账户 Cookie",
      });
    }
    setIsDevMode(!isDevMode);
  };

  return (
    <View className="w-full flex">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">TEST AREA</Text>
      </View>
      <View className="flex flex-row gap-2 flex-wrap">
        <Button
          onPress={() => {
            toggleHeartbeat();
          }}
        >
          {isHeartbeatDisabled ? (
            <HeartOff size={20} className="text-secondary" />
          ) : (
            <HeartPulse size={20} className="text-secondary" />
          )}
        </Button>

        <Button
          onPress={() => {
            toggleDevMode();
          }}
        >
          {isDevMode ? (
            <Bug size={20} className="text-secondary" />
          ) : (
            <BugOff size={20} className="text-secondary" />
          )}
        </Button>
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
