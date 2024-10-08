import { Button } from "@/components/ui/button";
import { db, schema } from "@/utils/db/db";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Shuffle } from "@/lib/icons/Shuffle";
import { Trash2 } from "@/lib/icons/Trash2";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { currentQueueIdsToSongs } from "@/utils/db/queue";
import { cidBvToSong } from "@/utils/db/song";
import {
  dpQueueSkipTo,
  shuffleQueue,
} from "@/utils/trackPlayer/trackPlayerUpdating";
import { useRouter } from "expo-router";
import _ from "lodash";
import Toast from "react-native-toast-message";
import { useMMKVString } from "react-native-mmkv";
import { mmkvStorage } from "@/utils/storage/storage";

type Row = {
  song: typeof schema.song.$inferSelect;
  id: number;
  songId: number;
  type: "db" | "tp";
  quality?: string;
};
export default function PlaylistView() {
  const [queueStr] = useMMKVString("songQueue", mmkvStorage);

  const [songs, setSongs] = useState<Row[]>([]);

  const loadSongs = async () => {
    let data: Row[] = [];
    if (queueStr && queueStr.length > 0) {
      const queueIdList = JSON.parse(queueStr);
      const res = await currentQueueIdsToSongs(queueIdList);

      data = res.map((song) => ({
        id: song!.id,
        song: song!.song,
        songId: song!.id,
        type: "db",
      }));
    }
    const tpList: Row[] = [];

    if (currentTrack) {
      const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

      const [cid, bvid, quality] = currentTrack.id.split("$");
      const currentTrackSong = await cidBvToSong(cid, bvid);
      tpList.push({
        id: currentTrackIndex!,
        song: currentTrackSong!,
        songId: currentTrackSong!.id,
        type: "tp",
        quality,
      });

      const trackQuue = await TrackPlayer.getQueue();
      let i = 1;
      for (const nextTrack of trackQuue.slice(currentTrackIndex! + 1)) {
        if (!nextTrack) continue;
        const [nextTrackCid, nextTrackBvid, nextTrackQuality] =
          nextTrack.id.split("$");

        const nextTrackSong = await cidBvToSong(nextTrackCid, nextTrackBvid);
        tpList.push({
          id: currentTrackIndex! + i,
          song: nextTrackSong!,
          songId: nextTrackSong!.id,
          type: "tp",
          quality: nextTrackQuality,
        });
        i += 1;
      }

      data = tpList.concat(data);
      setSongs(data);
    }
  };

  const currentTrack = useActiveTrack();
  useEffect(() => {
    _.debounce(loadSongs, 500)();
  }, [queueStr, currentTrack]);

  const [isSkipping, setIsSkipping] = useState(false);

  const skipToSong = async (row: Row) => {
    setIsSkipping(true);
    if (row.type === "tp") {
      await TrackPlayer.skip(row.id);
    }
    if (row.type === "db") {
      await dpQueueSkipTo(row.id);
    }
    setTimeout(() => {
      setIsSkipping(false);
    }, 1000);
  };

  const [isShuffling, setIsShuffling] = useState(false);
  const shuffle = async () => {
    setIsShuffling(true);
    await shuffleQueue();
    setTimeout(() => {
      setIsShuffling(false);
    }, 1000);
  };

  const router = useRouter();

  const emptyList = async () => {
    await db.delete(schema.currentQueue);
    mmkvStorage.delete("songQueue");
    await TrackPlayer.reset();
    router.replace("/home");
  };
  return (
    <View className="w-full h-full flex flex-col">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">播放列表</Text>
      </View>
      <View className="flex flex-row items-center justify-end gap-3">
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={emptyList}
        >
          <View className="flex flex-row items-center gap-2">
            <Trash2 className="text-primary" size={13} />
          </View>
        </Button>
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={shuffle}
          disabled={isShuffling}
        >
          <View className="flex flex-row items-center gap-2">
            <Shuffle className="text-primary" size={13} />
          </View>
        </Button>
      </View>
      <View className="flex-1">
        <FlatList
          data={songs}
          keyExtractor={(item) => item.songId + "_" + item.id}
          renderItem={({ item: song }) => {
            return (
              <View
                style={{
                  paddingBottom: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => skipToSong(song)}
                  className=""
                  disabled={isSkipping}
                >
                  <View className="flex flex-row p-2 items-center text-secondary-foreground">
                    {song.song.artwork && (
                      <Image
                        src={
                          song.song.downloadedCoverPath ||
                          song.song.artwork + "@200w"
                        }
                        alt="cover"
                        className="w-16 h-10 rounded-md "
                      />
                    )}
                    <View className="pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
                      <Text className="text-md" numberOfLines={1}>
                        {song.song.title}
                      </Text>

                      <View className="flex flex-row items-center gap-2">
                        {song.song.artistAvatar && (
                          <Image
                            src={song.song.artistAvatar + "@128w"}
                            alt="cover"
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <Text className="text-secondary-foreground/50 text-xs">
                          {song.song.artistName}
                        </Text>

                        {song.quality ? (
                          <Text className="text-secondary-foreground/30 text-xs ml-3">
                            {song.quality}
                          </Text>
                        ) : (
                          <Text className="text-secondary-foreground/10 text-xs ml-3">
                            {song.type === "tp" ? "Stream fetched" : ""}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
