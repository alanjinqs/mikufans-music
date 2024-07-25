import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { Plus } from "@/lib/icons/Plus";
import { Input } from "@/components/ui/input";
import {
  createNewPlaylist,
  createNewPlaylistByBiliFav,
  editPlaylistName,
} from "@/utils/db/playlists";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Edit3 } from "@/lib/icons/Edit3";

export default function EditPlaylistName({
  playlistId,
  showDialog,
  setShowDialog,
}: {
  playlistId: number;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}) {
  const [playlistName, setPlaylistName] = React.useState("");

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="w-[300px] p-10">
        <DialogHeader>
          <DialogTitle>修改歌单名称</DialogTitle>
          <Input
            placeholder="歌单名称"
            onChangeText={(e) => {
              setPlaylistName(e);
            }}
          ></Input>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onPress={() => {
                editPlaylistName(playlistId, playlistName);
              }}
            >
              <Text>修改</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
