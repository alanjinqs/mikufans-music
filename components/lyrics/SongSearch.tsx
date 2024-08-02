import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { qqMusicSearchSong, QQMusicSong } from "@/utils/qqmusic/qqMusicSearch";
import clsx from "clsx";
import { updateSongQQMid } from "@/utils/db/song";
import { SongDB } from "@/utils/db/db";
import { X } from "@/lib/icons/X";

import { TouchableOpacity as RNGHTouchableOpacity } from "react-native-gesture-handler";

export default function SongSearchDialog({
  song,
  portalHost,
  children,
}: {
  song: SongDB;
  portalHost?: string;
  children?: React.ReactNode;
}) {
  const [keyword, setKeyword] = useState("");
  const [selectedMid, setSelectedMid] = useState("");

  const [qqMusicSongs, setQqMusicSongs] = useState<QQMusicSong[]>([]);

  const midConfirm = () => {
    updateSongQQMid(song.id, selectedMid).then(() => {});
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setKeyword(song.title || "");
          setSelectedMid("");
        }
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <RNGHTouchableOpacity>
            <Text className="text-white">搜索歌词</Text>
          </RNGHTouchableOpacity>
        )}
      </DialogTrigger>
      <DialogContent className="w-[300px]" portalHost={portalHost}>
        <DialogHeader>
          <DialogTitle>搜索歌词</DialogTitle>
        </DialogHeader>
        <View>
          <View className="flex flex-row items-center mb-4 gap-2">
            <Input
              className="flex-1"
              defaultValue={keyword}
              onChangeText={setKeyword}
              placeholder="歌曲名"
              clearButtonMode="while-editing"
            />
            <Button
              disabled={keyword.length === 0}
              onPress={() => {
                setQqMusicSongs([]);
                qqMusicSearchSong(keyword).then((songs) => {
                  setQqMusicSongs(songs);
                });
              }}
            >
              <Text>搜索</Text>
            </Button>
          </View>
          {/* <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-full">
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder=""
              />
            </SelectTrigger>
            <SelectContent className="w-full">
              {qqMusicSongs.map((song) => (
                <SelectItem label={song.title} value={song.mid} key={song.mid}>
                  <View className="">
                    <Text>{song.title}</Text>
                    <View className="flex gap-4 items-center text-sm opacity-80">
                      <Text>{song.subtitle}</Text>
                      <Text>{song.singer}</Text>
                    </View>
                  </View>
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          <View className="max-h-[350px]">
            <ScrollView>
              {qqMusicSongs.map((song) => (
                <TouchableOpacity
                  key={song.mid}
                  onPress={() => setSelectedMid(song.mid)}
                >
                  <View
                    className={clsx(
                      "p-2 border-b border-foreground",
                      selectedMid === song.mid && "bg-gray-500/30 bg-opacity-10"
                    )}
                  >
                    <View className="flex-1">
                      <View className="flex flex-row gap-4 justify-between">
                        <Text>{song.title}</Text>
                        <Text className="text-sm opacity-80">
                          {song.singer}
                        </Text>
                      </View>
                      {song.subtitle && (
                        <Text className="text-sm opacity-80">
                          {song.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={selectedMid.length === 0} onPress={midConfirm}>
              <Text>确认</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
