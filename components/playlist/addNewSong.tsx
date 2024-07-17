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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { addCollectionToPlaylist, addFavoriteToPlaylist, addSongToPlaylist } from "@/utils/db/playlists";

export default function AddNewSong({ playlistId }: { playlistId: number }) {
  const [bvid, setBvid] = React.useState("");
  const [favId, setFavId] = React.useState("");
  const [videoCollectionId, setVideoCollectionId] = React.useState("");

  const [updateCover, setUpdateCover] = React.useState(false);

  const [currentTab, setCurrentTab] = React.useState("bvid");

  const addSong = () => {
    switch (currentTab) {
      case "bvid":
        addSongToPlaylist(bvid, playlistId, updateCover);
        break;
      case "favorite":
        addFavoriteToPlaylist(parseInt(favId), playlistId, updateCover);
        break;
      case "videoCollection":
        addCollectionToPlaylist(parseInt(videoCollectionId), playlistId, updateCover);
        break;
    }
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加歌曲</DialogTitle>
        </DialogHeader>
        <View>
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full mx-auto flex-col gap-1.5"
          >
            <TabsList className="flex-row w-full mb-4">
              <TabsTrigger value="bvid" className="flex-1">
                <Text>Bv</Text>
              </TabsTrigger>
              <TabsTrigger value="favorite" className="flex-1">
                <Text>收藏</Text>
              </TabsTrigger>
              <TabsTrigger value="videoCollection" className="flex-1">
                <Text>合集</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bvid">
              <Input
                placeholder="BV 号"
                onChangeText={(e) => {
                  setBvid(e);
                }}
                value={bvid}
              ></Input>
            </TabsContent>
            <TabsContent value="favorite">
              <Input
                placeholder="收藏夹 ID"
                onChangeText={(e) => {
                  setFavId(e);
                }}
                value={favId}
              ></Input>
            </TabsContent>
            <TabsContent value="videoCollection">
              <Input
                placeholder="视频合集 ID"
                onChangeText={(e) => {
                  setVideoCollectionId(e);
                }}
                value={videoCollectionId}
              ></Input>
            </TabsContent>
          </Tabs>
          <View className="flex-row items-center gap-2 mt-6">
            <Switch
              checked={updateCover}
              onCheckedChange={setUpdateCover}
              nativeID="update-cover"
            />
            <Label
              nativeID="update-cover"
              onPress={() => {
                setUpdateCover(!updateCover);
              }}
            >
              更新播放列表封面
            </Label>
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={addSong}>
              <Text>添加</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
