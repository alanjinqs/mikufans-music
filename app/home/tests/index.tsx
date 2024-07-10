import TrackPlayer from "react-native-track-player";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import {
  createNewPlaylistByBiliFav,
  deleteAllPlaylist,
} from "@/utils/db/playlists";
import { addPlaylistToQueue } from "@/utils/trackPlayer/addToQueue";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TestView() {
  const [favId, setFavId] = useState("");

  const getQueue = async () => {
    const queue = await TrackPlayer.getQueue();
    console.log(queue);
  };

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
        <Input
          onChangeText={(e) => {
            setFavId(e);
          }}
          value={favId}
        ></Input>
        <Button
          onPress={() => {
            createNewPlaylistByBiliFav(parseInt(favId));
          }}
        >
          <Text>Create New PL by BiliFav</Text>
        </Button>
        <Button onPress={deleteAllPlaylist}>
          <Text>Delete All</Text>
        </Button>
        <Button onPress={() => addPlaylistToQueue(4)}>
          <Text>Load playlist</Text>
        </Button>
        <Button onPress={getQueue}>
          <Text>getCurrentQueue</Text>
        </Button>
        <Button
          onPress={() => {
            TrackPlayer.skipToNext();
          }}
        >
          <Text>skipToNext</Text>
        </Button>
        <Button
          onPress={() => {
            TrackPlayer.skipToPrevious();
          }}
        >
          <Text>skipToPrevious</Text>
        </Button>
        <Button
          onPress={() => {
            TrackPlayer.setQueue([]);
          }}
        >
          <Text>emptyQueue</Text>
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
