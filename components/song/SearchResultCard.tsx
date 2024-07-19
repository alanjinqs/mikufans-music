import { Plus } from "@/lib/icons/Plus";
import { Play } from "@/lib/icons/Play";
import TrackPlayer from "react-native-track-player";
import { bv2Cid } from "@/utils/bili/avBvCid";
import { bvCid2Track } from "@/utils/bili/biliVideo";
import { Tv } from "@/lib/icons/Tv";
import { Linking, View, Image, DimensionValue } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { useRef } from "react";
import { Text } from "@/components/ui/text";

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
  favorite: number;
  tag?: string;
  publishedAt: string;
  duration: string;
};

const CardActionLeft = ({
  onPressAddToPlaylist,
}: {
  onPressAddToPlaylist: () => void;
}) => {
  return (
    <View className="flex flex-row items-center">
      {/* <TouchableOpacity onPress={onPressTrash}>
        <View className="bg-red-500 h-full flex items-center justify-center px-4 rounded-l-md !m-0">
          <Plus size={20} className="text-white" />
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onPressAddToPlaylist}>
        <View className="bg-purple-300 h-full flex items-center justify-center px-4 !m-0 rounded-l-md">
          <Plus size={20} className="text-white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CardActionRight = ({
  onPressOpenInBili,
  onPressReplaceCurrentPlaying,
}: {
  onPressOpenInBili: () => void;
  onPressReplaceCurrentPlaying: () => void;
}) => {
  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity onPress={onPressOpenInBili}>
        <View className="bg-blue-300 h-full flex items-center justify-center px-4 !m-0">
          <Tv size={20} className="text-white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressReplaceCurrentPlaying}>
        <View className="bg-green-300 h-full flex items-center justify-center px-4 rounded-r-md !m-0">
          <Play size={20} className="text-white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const SearchResultCard = ({
  result,
  setIsPLSelectionDialogOpen,
  setCurrentSelectedSongBvid,
}: {
  result: SearchResult;
  setIsPLSelectionDialogOpen: (open: boolean) => void;
  setCurrentSelectedSongBvid: (bvid: string) => void;
}) => {
  const swipeableRef = useRef<Swipeable>(null);

  return (
    <View
      style={{
        paddingBottom: 8,
      }}
    >
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={() => (
          <CardActionLeft
            onPressAddToPlaylist={() => {
              swipeableRef.current?.close();
              setCurrentSelectedSongBvid(result.bvid);
              setIsPLSelectionDialogOpen(true);
            }}
          />
        )}
        renderRightActions={() => (
          <CardActionRight
            onPressReplaceCurrentPlaying={async () => {
              const [cid] = await bv2Cid(result.bvid);
              const track = await bvCid2Track(cid.cid, result.bvid);

              await TrackPlayer.load(track);
              await TrackPlayer.play();
            }}
            onPressOpenInBili={() => {
              Linking.openURL(`bilibili://video/${result.bvid}`);
            }}
          />
        )}
      >
        <View className="flex flex-row p-2 bg-secondary rounded-md items-center text-secondary-foreground">
          {result.artwork && (
            <Image
              src={result.artwork + "@200w"}
              alt="cover"
              className="w-16 h-10 rounded-md "
            />
          )}
          <View className="pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
            <Text className="text-md" numberOfLines={1}>
              {result.title}
            </Text>

            <View className="flex flex-row items-center gap-1">
              <Text className="text-secondary-foreground/50 text-xs">
                {result.artistName}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
    </View>
  );
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
          const track = await bvCid2Track(cid.cid, result.bvid);

          await TrackPlayer.load(track);
          await TrackPlayer.play();
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
          <Text className="text-secondary-foreground p-2" numberOfLines={2}>
            {result?.title}
          </Text>
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
            <Text className="text-secondary-foreground/80 text-xs" numberOfLines={1}>
              {result?.artistName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};