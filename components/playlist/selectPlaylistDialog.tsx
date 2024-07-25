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

export default function SelectPlaylistDialog({
  isPLSelectionDialogOpen,
  setIsPLSelectionDialogOpen,
  onPlaylistSelected,
  portalHost,
}: {
  isPLSelectionDialogOpen: boolean;
  setIsPLSelectionDialogOpen: (open: boolean) => void;
  onPlaylistSelected: (playlistId: number) => void;
  portalHost?: string;
}) {
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

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
                  onPlaylistSelected(playlist.id);
                  setIsPLSelectionDialogOpen(false);
                }}
              >
                <View
                  className={clsx(
                    "flex flex-row p-2 dark rounded-md",
                    playlist.id === 0
                      ? "bg-red-50 dark:bg-red-400"
                      : "bg-secondary"
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
                </View>
              </RNTouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
}
