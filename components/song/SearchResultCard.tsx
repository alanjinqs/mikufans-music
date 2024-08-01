import { ListPlus } from "@/lib/icons/ListPlus";
import { Play } from "@/lib/icons/Play";
import TrackPlayer from "react-native-track-player";
import { bv2Cid } from "@/utils/bili/avBvCid";
import { bvCid2Track } from "@/utils/bili/biliVideo";
import { Tv } from "@/lib/icons/Tv";
import { Linking, View, Image, DimensionValue } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { useRef } from "react";
import { Text } from "@/components/ui/text";
import { cidBvToSong } from "@/utils/db/song";
import {
  addSongToQueue,
  replaceCurrentPlaying,
} from "@/utils/trackPlayer/addToQueue";
import { ListStart } from "@/lib/icons/ListStart";
import { router } from "expo-router";

export type SearchResult = {
  aid: number;
  artistName: string;
  artistMid: string;
  artistAvatar?: string;
  typeId?: string;
  bvid: string;
  title: string;
  description?: string;
  artwork: string;
  play?: number;
  danmu?: number;
  favorite?: number;
  like?: number;
  tag?: string;
  publishedAt: string;
  duration: string;
};

export const SearchResultCardSq = ({
  result,
  width,
}: {
  result: SearchResult;
  width: DimensionValue;
}) => {
  return (
    <View style={{ width }}>
      <TouchableOpacity
        onPress={async () => {
          const [cid] = await bv2Cid(result.bvid);
          const song = await cidBvToSong(cid.cid, result.bvid);
          await replaceCurrentPlaying(song);
        }}
      >
        <View className="bg-secondary rounded-md overflow-hidden">
          {result?.artwork ? (
            <Image
              src={result?.artwork + "@200w"}
              alt="cover"
              style={{
                width,
                aspectRatio: 1.77777778,
              }}
            />
          ) : (
            <View
              className="bg-gray-400 flex items-center justify-center"
              style={{
                width: width,
                aspectRatio: 1.77777778,
              }}
            ></View>
          )}
          <Text className="text-secondary-foreground p-2 h-16" numberOfLines={2}>
            {result?.title}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (!result.artistMid) return;
              router.push(`/home/user/${result.artistMid}`);
            }}
          >
            <View className="mx-2 mb-2 flex flex-row items-center gap-2">
              {result?.artistAvatar && (
                <Image
                  src={result?.artistAvatar + "@128w"}
                  alt="artistAvatar"
                  style={{
                    width: 20,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                />
              )}
              <Text
                className="text-secondary-foreground/80 text-xs"
                numberOfLines={1}
              >
                {result?.artistName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
