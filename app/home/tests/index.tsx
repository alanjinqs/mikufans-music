import TrackPlayer from "react-native-track-player";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BackHandler, View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";
import { qqMusicMidToLrc, qqMusicSearchSong } from "@/utils/qqmusic/qqMusicSearch";

export default function TestView() {
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));
  const { data: songToPlaylists } = useLiveQuery(
    db.select().from(schema.songToPlaylist)
  );
  const { data: song } = useLiveQuery(db.select().from(schema.song));

  return (
    <View className="w-full flex">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">TEST AREA</Text>
      </View>
      <View className="flex flex-row gap-2 flex-wrap">
        <Button
          onPress={() => {
            AsyncStorage.setItem("heartbeat", "off");
          }}
        >
          <Text>heartbeat OFF</Text>
        </Button>
        <Button
          onPress={() => {
            AsyncStorage.setItem("heartbeat", "on");
          }}
        >
          <Text>heartbeat ON</Text>
        </Button>
        <Button
          onPress={() => {
            TrackPlayer.setQueue([]);
          }}
        >
          <Text>emptyTPQueue</Text>
        </Button>
        <Button
          onPress={async () => {
            await db.delete(schema.currentQueue);
            await db.delete(schema.currentQueueMeta);
            console.log(await db.select().from(schema.currentQueue));
          }}
        >
          <Text>emptyDBQueue</Text>
        </Button>
        <Button
          onPress={async () => {
            const currentTrack = await TrackPlayer.getActiveTrack();
            if (!currentTrack) return;
            qqMusicSearchSong(currentTrack.title as string).then((res) => {
              // console.log(res);
              qqMusicMidToLrc(res[0].mid).then((lrcs) => {
                console.log(lrcs);
              })
            });
          }}
        >
          <Text>Search Current track title</Text>
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
