import TrackPlayer from "react-native-track-player";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BackHandler, View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";
import { useContext, useEffect, useState } from "react";
import { HeartPulse } from "@/lib/icons/HeartPulse";
import { HeartOff } from "@/lib/icons/HeartOff";
import { MikufansMusicContext } from "@/app/context";
import { Bug } from "@/lib/icons/Bug";
import { BugOff } from "@/lib/icons/BugOff";
import Toast from "react-native-toast-message";

export default function TestView() {
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));
  const { data: songToPlaylists } = useLiveQuery(
    db.select().from(schema.songToPlaylist)
  );
  const { data: song } = useLiveQuery(db.select().from(schema.song));

  const [isHeartbeatDisabled, setIsHeartbeatDisabled] = useState(false);

  const { isDevMode, setIsDevMode } = useContext(MikufansMusicContext);

  useEffect(() => {
    AsyncStorage.getItem("disableHeartbeat").then((heartBeatSetting) => {
      if (heartBeatSetting) {
        setIsHeartbeatDisabled(true);
      }
    });
  }, []);

  const toggleHeartbeat = async () => {
    if (isHeartbeatDisabled) {
      await AsyncStorage.removeItem("disableHeartbeat");
    } else {
      await AsyncStorage.setItem("disableHeartbeat", "true");
    }
    setIsHeartbeatDisabled(!isHeartbeatDisabled);
  };

  const toggleDevMode = async () => {
    if (isDevMode) {
      await AsyncStorage.removeItem("isDevMode");
    } else {
      await AsyncStorage.setItem("isDevMode", "true");
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
            <HeartOff size={20} className="text-white" />
          ) : (
            <HeartPulse size={20} className="text-white" />
          )}
        </Button>

        <Button
          onPress={() => {
            toggleDevMode();
          }}
        >
          {isDevMode ? (
            <Bug size={20} className="text-white" />
          ) : (
            <BugOff size={20} className="text-white" />
          )}
        </Button>
        <Button
          onPress={() => {
            TrackPlayer.stop();
            AsyncStorage.clear();
            CookieManager.clearAll();
            BackHandler.exitApp();
          }}
        >
          <Text>Logout</Text>
        </Button>
      </View>
      <Text className="w-full text-xl font-bold">playlists</Text>
      <Text className="w-full">{JSON.stringify(playlists)}</Text>
      <Text className="w-full text-xl font-bold">song</Text>
      <Text className="w-full">{JSON.stringify(song)}</Text>
      <Text className="w-full text-xl font-bold">songToPlaylists</Text>
      <Text className="w-full">{JSON.stringify(songToPlaylists)}</Text>
    </View>
  );
}
