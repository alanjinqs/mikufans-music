import { db, schema, SongDB } from "@/utils/db/db";
import { isNotNull } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { memo, useEffect, useState } from "react";

import { ActivityIndicator, View } from "react-native";
import { Text } from "@/components/ui/text";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import {
  SongCard,
  SongCardBottomDrawer,
  SongCardItem,
} from "@/components/song/SongCard";
import { useMMKVObject } from "react-native-mmkv";
import { mmkvStorage } from "@/utils/storage/storage";
import { Image } from "react-native";
import { bvToSongWithoutFetch } from "@/utils/db/song";
import { RotateCcw } from "@/lib/icons/RotateCcw";
import { songDownloadAndEncode } from "@/utils/file/songDownloadAndEncode";

export default function DownloadedView() {
  const { data: songs } = useLiveQuery(
    db.query.song.findMany({
      where: isNotNull(schema.song.downloadedMp3Path),
    })
  );

  const [currentMenuSong, setCurrentMenuSong] = useState<SongCardItem | null>(
    null
  );

  const [isDownloading] = useMMKVObject("isDownloading", mmkvStorage);

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">已下载</Text>
      </View>
      <View className="flex flex-row items-center justify-end gap-3"></View>
      <View className="flex-1">
        <Text>{}</Text>
        <FlatList
          data={[...Object.keys(isDownloading as any), ...songs]}
          renderItem={({ item }) => {
            return typeof item === "string" ? (
              (isDownloading as any)[item] ? (
                <DownloadingSongCard bvid={item} />
              ) : (
                <></>
              )
            ) : (
              <SongCard
                key={item.id}
                song={item}
                setMenuSong={setCurrentMenuSong}
              />
            );
          }}
          keyExtractor={(item) =>
            typeof item === "string" ? item : item.id.toString() || ""
          }
        ></FlatList>
      </View>
      <SongCardBottomDrawer
        song={currentMenuSong}
        onClose={() => setCurrentMenuSong(null)}
      />
    </View>
  );
}

const DownloadingSongCard = memo(({ bvid }: { bvid: string }) => {
  const [song, setSong] = useState<SongDB>();
  const [downloadingData, setDownloadingData] = useState<{
    status: "downloading" | "done" | "error";
    progress?: {
      totalBytesWritten: number;
      totalBytesExpectedToWrite: number;
    };
  }>();

  useEffect(() => {
    bvToSongWithoutFetch(bvid).then((res) => {
      setSong(res);
    });

    const objStr = mmkvStorage.getString(`download_${bvid}`);
    if (objStr) {
      setDownloadingData(JSON.parse(objStr));
    }
  }, [bvid]);

  return (
    <View>
      <View className="flex pt-2 pb-2 flex-row items-center text-secondary-foreground">
        {song ? (
          <>
            {song.artwork && (
              <Image
                src={song.downloadedCoverPath || song.artwork + "@200w"}
                alt="cover"
                className="h-10 rounded-md"
                style={{
                  aspectRatio: 1.67,
                }}
              />
            )}
            <View className="pl-2 pr-2 flex-1 flex flex-col justify-center gap-1">
              <Text
                className="text-[0.85rem] text-secondary-foreground"
                numberOfLines={1}
              >
                {song.title}
              </Text>

              <View className="flex flex-row w-full items-center justify-between">
                <View className="flex flex-row items-center gap-1">
                  {song.artistAvatar && (
                    <Image
                      src={song.artistAvatar + "@64w"}
                      alt="cover"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <Text className="text-secondary-foreground/50 text-xs">
                    {song.artistName}
                  </Text>
                  {/* {song.duration ? (
            <Text className="text-secondary-foreground/50 text-xs">
              {song.duration}
            </Text>
          ) : <></>} */}
                </View>
              </View>
            </View>
            {downloadingData?.status === "error" ? (
              <TouchableOpacity
                onPress={() => {
                  songDownloadAndEncode({ song });
                }}
              >
                <View className="p-2 pr-3">
                  <RotateCcw
                    size={20}
                    className=" color-secondary-foreground rotate-90"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <ActivityIndicator
                  size={"large"}
                  className="!color-foreground"
                />
              </View>
            )}
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
});
