import { loadAndSetCookies } from "@/utils/bili/biliFetch";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInfo } from "@/utils/bili/userInfo";
import { bvCid2Track } from "@/utils/bili/biliVideo";
import { bv2Cid } from "@/utils/bili/avBvCid";
import TrackPlayer from "react-native-track-player";
import AvatarOrLoginBtn from "@/components/user/AvatarOrLoginBtn";
import { fatchFavList } from "@/utils/bili/favList";
import MiniPlayer from "@/components/player/MiniPlayer";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { Sun } from "@/lib/icons/Sun";

export default function HomeIndex() {
  const [userInfo, setUserInfo] = useState<BiliUserInfo | null>(null);

  const test = () => {
    fatchFavList(3200089126).then((data) => {
      console.log(data);
      data.forEach((bv: string) => {
        bv2Cid(bv).then((cid) => {
          bvCid2Track(cid[0].cid, bv).then((track) => {
            console.log(track);
            TrackPlayer.add(track);
            TrackPlayer.play();
          });
        });
      });
    });
  };

  const updateUserInfo = () => {
    getUserInfo().then((data) => {
      setUserInfo({
        avatarURL: data.data.face + "@120w_120h_1c",
        username: data.data.uname,
      });
    });
  };
  useEffect(() => {
    loadAndSetCookies().then((loginned) => {
      if (loginned) {
        updateUserInfo();
      }
    });
  }, []);

  const getQueue = async () => {
    const queue = await TrackPlayer.getQueue();
    console.log(queue);
  };

  return (
    <>
      <SafeAreaView>
        <View className="p-4">
          <View className="flex flex-row justify-end">
            <AvatarOrLoginBtn userInfo={userInfo} onSuccess={updateUserInfo} />
          </View>
          <View className="flex flex-wrap flex-row gap-3 mt-2 bg-slate-200 rounded-lg p-5">
            <View className="w-full">
              <Text className="text-foreground text-3xl font-bold">
                Track test, {userInfo?.username}
              </Text>
            </View>
            <Button onPress={test}>
              <Text>Load Test Queue</Text>
            </Button>
            <Button onPress={getQueue}>
              <Text>getCurrentQueue</Text>
            </Button>
            <Button
              onPress={() => {
                TrackPlayer.skipToNext();
              }}
            >
              <Text>skipToNext</Text>
            </Button>
            <Button
              onPress={() => {
                TrackPlayer.skipToPrevious();
              }}
            >
              <Text>skipToPrevious</Text>
            </Button>
            <Button
              onPress={() => {
                TrackPlayer.setQueue([]);
              }}
            >
              <Text>emptyQueue</Text>
            </Button>
          </View>
          <MiniPlayer />
        </View>
      </SafeAreaView>
    </>
  );
}
