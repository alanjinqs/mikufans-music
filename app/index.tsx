import { loadAndSetCookies } from "@/utils/bili/biliFetch";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  XStack,
  YStack,
} from "tamagui";
import { getUserInfo } from "@/utils/bili/userInfo";
import { bvCid2Track } from "@/utils/bili/biliVideo";
import { bv2Cid } from "@/utils/bili/avBvCid";
import TrackPlayer from "react-native-track-player";
import { InitTrackPlayer } from "@/utils/trackPlayer/init";
import AvatarOrLoginBtn from "@/components/user/AvatarOrLoginBtn";

InitTrackPlayer();

export default function HomeIndex() {
  const [userInfo, setUserInfo] = useState<BiliUserInfo | null>(null);

  const test = () => {
    const BV = "BV1KU421Z7Qt";
    bv2Cid(BV).then((cid) => {
      bvCid2Track(cid[0].cid, BV).then((track) => {
        console.log(track);
        TrackPlayer.add(track);
        TrackPlayer.play();
      });
    });
  };

  useEffect(() => {
    loadAndSetCookies().then((loginned) => {
      if (loginned) {
        getUserInfo().then((data) => {
          console.log(data.data);
          setUserInfo({
            avatarURL: data.data.face + "@120w_120h_1c",
            username: data.data.uname,
          });
        });
      }
    });
  }, []);

  return (
    <>
      <SafeAreaView>
        <YStack justifyContent="flex-end" marginRight="$2">
          <XStack alignSelf="flex-end">
            <AvatarOrLoginBtn userInfo={userInfo} />
          </XStack>
          <XStack>
            <Button onPress={test}>Test</Button>
          </XStack>
        </YStack>
      </SafeAreaView>
    </>
  );
}
