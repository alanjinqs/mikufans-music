import "@/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { initTrackPlayer } from "@/utils/trackPlayer/init";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Text } from "@/components/ui/text";
import { PortalHost } from "@rn-primitives/portal";
import "react-native-reanimated";
import "react-native-gesture-handler";
import TrackPlayer, {
  Event,
  State,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { addQueueToTrackPlayer } from "@/utils/trackPlayer/trackPlayerUpdating";
import { sendHeartbeat } from "@/utils/bili/heartbeat";
import { SongDB } from "@/utils/db/db";
import dayjs from "dayjs";
import { cidToSong } from "@/utils/db/song";
import { debounce } from "lodash";
import { replaceCurrentPlaying } from "@/utils/trackPlayer/addToQueue";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

const expoDb = openDatabaseSync("db.playlists");
const db = drizzle(expoDb);

export default function DrizzleLoad() {
  const { success, error } = useMigrations(db, migrations);
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }
  return <RootLayout />;
}

function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [lastHeartbeat, setLastHeartbeat] = React.useState(dayjs());
  const [currentSongStarted, setCurrentSongStarted] = React.useState(dayjs());

  const { position: currentProgress } = useProgress();
  const playbackState = usePlaybackState();
  const activeTrack = useActiveTrack();

  React.useEffect(() => {
    if (dayjs().diff(lastHeartbeat, "second") > 15) {
      heartbeat();
    }

    if (playbackState.state === State.Error) {
      if (activeTrack) {
        const currentSongCid: number = activeTrack.id.split("$")[0];
        cidToSong(currentSongCid).then((song) => {
          if (!song) return;
          replaceCurrentPlaying(song);
        });
      }
    }
  }, [currentProgress, playbackState]);

  const [trackPlayerReady, setTrackPlayerReady] = React.useState(false);

  React.useEffect(() => {
    if (trackPlayerReady) {
      addQueueToTrackPlayer();
      setCurrentSongStarted(dayjs());
    }
  }, [activeTrack]);

  const heartbeat = async () => {
    if (!activeTrack) return;
    const [cid, bvid] = activeTrack.id.split("$");
    if (!bvid || !cid) return;
    setLastHeartbeat(dayjs());
    sendHeartbeat(
      bvid,
      cid,
      Math.floor(currentProgress),
      Math.floor(dayjs().diff(currentSongStarted, "second")),
      playbackState.state === State.Playing
    );
  };

  const { success, error } = useMigrations(db, migrations);

  React.useEffect(() => {
    (async () => {
      await initTrackPlayer();
      setTrackPlayerReady(true);
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })()
      .then()
      .finally(() => {
        console.log("hideSplashScreen");
        SplashScreen.hideAsync();
      });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <GestureHandlerRootView>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="home"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
      <PortalHost />
    </>
  );
}
