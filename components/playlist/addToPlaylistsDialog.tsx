import {
  View,
  Image,
  ScrollView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "@/lib/icons/CircleCheckBig";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { addSongToPlaylist } from "@/utils/db/playlists";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import { useEffect, useState } from "react";
import { bv2av, bv2Cid } from "@/utils/bili/avBvCid";
import { cidToSong } from "@/utils/db/song";

export default function AddToPlaylistsDialog({
  isPLSelectionDialogOpen,
  setIsPLSelectionDialogOpen,
  currentSelectedSongBvid,
  portalHost,
}: {
  isPLSelectionDialogOpen: boolean;
  setIsPLSelectionDialogOpen: (open: boolean) => void;
  currentSelectedSongBvid: string;
  portalHost?: string;
}) {
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));
  const [currentSelectedPlaylists, setCurrentSelectedPlaylists] = useState<
    number[]
  >([]);

  // useEffect(() => {
  //   setCurrentSelectedPlaylists([]);
  // }, [currentSelectedSongBvid]);

  return (
    <Dialog
      open={isPLSelectionDialogOpen}
      onOpenChange={(open) => {
        setIsPLSelectionDialogOpen(open);
      }}
    >
      <DialogContent className="w-[300px] h-[400px]" portalHost={portalHost}>
        <DialogHeader>
          <DialogTitle>添加到播放列表</DialogTitle>
        </DialogHeader>
        <ScrollView>
          <View className="flex flex-col gap-2">
            {playlists?.map((playlist) => (
              <RNTouchableOpacity
                key={playlist.id}
                onPress={() => {
                  setCurrentSelectedPlaylists((current) => {
                    if (current.includes(playlist.id)) {
                      return current.filter((item) => item !== playlist.id);
                    } else {
                      return [...current, playlist.id];
                    }
                  });
                }}
              >
                <View
                  className={clsx(
                    "flex flex-row p-2 dark rounded-md",
                    playlist.id === 0 ? "bg-red-50" : "bg-secondary"
                  )}
                >
                  {playlist?.cover && (
                    <Image
                      src={playlist?.cover + "@200w"}
                      alt="cover"
                      className="w-16 h-10 rounded-md"
                    />
                  )}

                  <View className="text-secondary-foreground pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
                    <Text className="text-secondary-foreground text-md">
                      {playlist?.name}
                    </Text>
                  </View>
                  <View className="flex flex-col items-center justify-center">
                    {currentSelectedPlaylists.includes(playlist.id) && (
                      <CircleCheckBig className="text-green-600" size={20} />
                    )}
                  </View>
                </View>
              </RNTouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onPress={async () => {
                for (const playlistId of currentSelectedPlaylists) {
                  await addSongToPlaylist(currentSelectedSongBvid, playlistId);
                }
                setIsPLSelectionDialogOpen(false);
              }}
            >
              <Text>确认</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
