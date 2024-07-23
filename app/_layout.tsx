import "@/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { router, SplashScreen, Stack, usePathname } from "expo-router";
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
import { addQueueToTrackPlayer } from "@/utils/trackPlayer/trackPlayerUpdating";
import Toast from "react-native-toast-message";
import { MikufansMusicContext } from "./context";
import { createId0Playlist } from "@/utils/db/playlists";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

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

  if (__DEV__) {
    useDrizzleStudio(expoDb);
  }

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
  const [isDevMode, setIsDevMode] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    (async () => {
      AsyncStorage.getItem("isDevMode").then((devMode) => {
        if (devMode && devMode === "true") {
          setIsDevMode(true);
          Toast.show({
            type: "dev",
            text1: "开发者模式已开启",
          });
        }
      });

      await initTrackPlayer();

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
    })().finally(() => {
      console.log("hideSplashScreen");
      SplashScreen.hideAsync();
      addQueueToTrackPlayer();
      createId0Playlist();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <MikufansMusicContext.Provider value={{ isDevMode, setIsDevMode }}>
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
            <Stack.Screen
              name="fullScreenPlayer"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
          </Stack>
        </GestureHandlerRootView>
        <PortalHost />
        <Toast
          config={{
            dev: ({ text1, text2 }) => (
              <View className="bg-black !text-white rounded-lg p-4 m-4 border border-white flex flex-col gap-2">
                <Text className="!text-white">{text1}</Text>
                <Text className="!text-white text-sm">{text2}</Text>
                <Text className="!text-white/70 text-xs">{pathname}</Text>
              </View>
            ),
          }}
        />
      </ThemeProvider>
    </MikufansMusicContext.Provider>
  );
}
