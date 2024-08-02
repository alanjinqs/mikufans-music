import {
  View,
  Image,
  ScrollView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Check } from "@/lib/icons/Check";
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
import { and, eq, inArray } from "drizzle-orm";
import { Heart } from "@/lib/icons/Heart";

export default function AddToPlaylistsDialog({
  isPLSelectionDialogOpen,
  setIsPLSelectionDialogOpen,
  currentSelectedSongBvid,
  currentSelectedSongId,
  portalHost,
}: {
  isPLSelectionDialogOpen: boolean;
  setIsPLSelectionDialogOpen: (open: boolean) => void;
  currentSelectedSongBvid: string;
  currentSelectedSongId: number;
  portalHost?: string;
}) {
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

  const [currentSelectedPlaylists, setCurrentSelectedPlaylists] = useState<
    number[]
  >([]);

  const [originalSelectedPlaylists, setOriginalSelectedPlaylists] = useState<
    number[]
  >([]);

  useEffect(() => {
    db.select()
      .from(schema.songToPlaylist)
      .where(eq(schema.songToPlaylist.songId, currentSelectedSongId))
      .then((res) => {
        setCurrentSelectedPlaylists(res.map((item) => item.playlistId));
        setOriginalSelectedPlaylists(res.map((item) => item.playlistId));
      });
  }, [currentSelectedSongId]);

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
                <View className={clsx("flex flex-row p-2")}>
                  <View className="flex flex-col items-center justify-center w-4 mr-4">
                    {currentSelectedPlaylists.includes(playlist.id) && (
                      <Check className="text-green-600" size={20} />
                    )}
                  </View>
                  {playlist?.cover ? (
                    <Image
                      src={playlist?.cover + "@200w"}
                      alt="cover"
                      className="w-16 rounded-md"
                      style={{ aspectRatio: 1.667 }}
                    />
                  ) : (
                    <View
                      className={clsx(
                        "w-16 rounded-md flex justify-center items-center",
                        playlist.id === 0 ? "bg-red-300" : "bg-gray-200 "
                      )}
                      style={{ aspectRatio: 1.667 }}
                    >
                      {
                        <Heart
                          className="text-white fill-white"
                          size={20}
                          fill="currentColor"
                        />
                      }
                    </View>
                  )}

                  <View className="text-secondary-foreground pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
                    <Text className="text-secondary-foreground text-md">
                      {playlist?.name}
                    </Text>
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
                setIsPLSelectionDialogOpen(false);

                const toAdd = currentSelectedPlaylists.filter(
                  (item) => !originalSelectedPlaylists.includes(item)
                );

                const toRemove = originalSelectedPlaylists.filter(
                  (item) => !currentSelectedPlaylists.includes(item)
                );

                for (const playlistId of toAdd) {
                  await addSongToPlaylist(currentSelectedSongBvid, playlistId);
                }
                if (toRemove.length > 0) {
                  db.delete(schema.songToPlaylist)
                    .where(
                      and(
                        eq(schema.songToPlaylist.songId, currentSelectedSongId),
                        inArray(schema.songToPlaylist.playlistId, toRemove)
                      )
                    )
                    .execute();
                }
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
