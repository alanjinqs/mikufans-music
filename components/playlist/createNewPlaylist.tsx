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
} from "@/utils/db/playlists";

export default function CreateNewPlaylist() {
  const [playlistname, setPlaylistName] = React.useState("");

  const createPlaylist = async () => {
    // create playlist
    createNewPlaylist({
      name: playlistname,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-5 mt-2" variant={"outline"} size={"sm"}>
          <View className="flex flex-row items-center gap-2">
            <Plus className="text-primary" size={13} />
          </View>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px] p-10">
        <DialogHeader>
          <DialogTitle>创建歌单</DialogTitle>
          <Input
            placeholder="歌单名称"
            onChangeText={(e) => {
              setPlaylistName(e);
            }}
            value={playlistname}
          ></Input>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={createPlaylist}>
              <Text>创建</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
