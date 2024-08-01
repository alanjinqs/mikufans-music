import { Button } from "@/components/ui/button";
import { db, schema, SongDB } from "@/utils/db/db";
import {
  replacePlaylistByQueue,
  replaceCurrentPlaying,
  addSongToQueue,
} from "@/utils/trackPlayer/addToQueue";
import { desc, eq, isNotNull } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { memo, useEffect, useRef, useState } from "react";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Edit3 } from "@/lib/icons/Edit3";
import { Play } from "@/lib/icons/Play";
import { Shuffle } from "@/lib/icons/Shuffle";
import {
  FlatList,
  ScrollView,
  Swipeable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import {
  SongCard,
  SongCardBottomDrawer,
  SongCardItem,
} from "@/components/song/SongCard";

export default function DownloadedView() {
  const { data: songs } = useLiveQuery(
    db.query.song.findMany({
      where: isNotNull(schema.song.downloadedMp3Path),
    })
  );

  const [currentMenuSong, setCurrentMenuSong] = useState<SongCardItem | null>(
    null
  );

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">已下载</Text>
      </View>
      <View className="flex flex-row items-center justify-end gap-3">
        {/* <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            replacePlaylistByQueue(playlistId, true);
          }}
        >
          <Shuffle className="text-primary" size={13} />
        </Button>
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            replacePlaylistByQueue(playlistId);
          }}
        >
          <Play className="text-primary" size={13} />
        </Button> */}
      </View>
      <View className="flex-1">
        <FlatList
          data={songs}
          renderItem={({ item }) => {
            return (
              <SongCard
                key={item.id}
                song={item}
                setMenuSong={setCurrentMenuSong}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString() || ""}
        ></FlatList>
      </View>
      <SongCardBottomDrawer
        song={currentMenuSong}
        onClose={() => setCurrentMenuSong(null)}
      />
    </View>
  );
}
