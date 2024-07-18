import {
  View,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/lib/icons/Search";
import { biliVideoSearch } from "@/utils/bili/biliSearch";
import {
  FlatList,
  Swipeable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { CircleCheckBig } from "@/lib/icons/CircleCheckBig";
import { Plus } from "@/lib/icons/Plus";
import { Play } from "@/lib/icons/Play";
import TrackPlayer from "react-native-track-player";
import {
  addSongToQueue,
  replaceCurrentPlaying,
} from "@/utils/trackPlayer/addToQueue";
import { cidToSong } from "@/utils/db/song";
import { bv2Cid } from "@/utils/bili/avBvCid";
import { bvCid2Track } from "@/utils/bili/biliVideo";
import { Tv } from "@/lib/icons/Tv";
import { debounce } from "lodash";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db, schema } from "@/utils/db/db";
import clsx from "clsx";
import { addSongToPlaylist } from "@/utils/db/playlists";

type SearchResult = {
  aid: number;
  artistName: string;
  artistMid: string;
  typeId: number;
  bvid: string;
  title: string;
  description: string;
  artwork: string;
  play: number;
  danmu: number;
  favorite: number;
  tag: string;
  publishedAt: string;
  duration: string;
};

export default function SearchPage() {
  const [keywodInput, setKeywordInput] = useState("");
  const [currentSearchingKeyword, setCurrentSearchingKeyword] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
  const [currentSelectedPlaylists, setCurrentSelectedPlaylists] = useState<
    number[]
  >([]);
  const [currentSelectedSongBvid, setCurrentSelectedSongBvid] =
    useState<string>("");

  const updateSearchResult = (res: any[]) => {
    const parsedRes: SearchResult[] = res.map((item: any) => ({
      aid: parseInt(item.aid),
      artistName: item.author,
      artistMid: item.mid,
      typeId: item.typeid,
      bvid: item.bvid,
      title: item.title.replace(/<[^>]+>/g, ""),
      description: item.description.replace(/<[^>]+>/g, ""),
      artwork: "https:" + item.pic,
      play: item.play,
      danmu: item.video_review,
      favorite: item.favorites,
      tag: item.tag,
      publishedAt: item.pubdate,
      duration: item.duration,
    }));

    setSearchResult((current) => {
      const res = [...current, ...parsedRes];
      return res.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.bvid === item.bvid)
      );
    });
  };

  const loadNextPage = async () => {
    const res = await biliVideoSearch(
      currentSearchingKeyword,
      currentSearchPage + 1
    );
    setCurrentSearchPage(res.page);
    updateSearchResult(res.result);
  };
  const onSearchPress = () => {
    setSearchResult([]);
    setCurrentSearchingKeyword(keywodInput);
    console.log("onSearchPress", keywodInput);
    biliVideoSearch(keywodInput).then((res) => {
      setCurrentSearchPage(res.page);
      updateSearchResult(res.result);
    });
  };
  const { data: playlists } = useLiveQuery(db.select().from(schema.playlist));

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          {currentSearchingKeyword || "搜索"}
        </Text>
      </View>
      <View className="flex flex-row items-center gap-3 mt-2 mb-4">
        <Input onChangeText={setKeywordInput} className="flex-1" />
        <Button
          onPress={onSearchPress}
          className="flex flex-row items-center gap-2"
        >
          <Search className="text-background" size={16} />
        </Button>
      </View>
      <View className="flex-1">
        <FlatList
          data={searchResult}
          onEndReached={() => {
            loadNextPage();
          }}
          renderItem={({ item }) => {
            return (
              <SearchResultCard
                result={item}
                currentSelectedPlaylists={currentSelectedPlaylists}
                setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
                setCurrentSelectedSongBvid={setCurrentSelectedSongBvid}
              />
            );
          }}
          keyExtractor={(item) => item.bvid.toString() || ""}
        ></FlatList>
      </View>
      <Dialog
        open={isPLSelectionDialogOpen}
        onOpenChange={(open) => {
          setIsPLSelectionDialogOpen(open);
        }}
      >
        <DialogContent className="w-[300px] h-[400px]">
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
                      "flex flex-row p-2 bg-secondary dark rounded-md"
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
                    await addSongToPlaylist(
                      currentSelectedSongBvid,
                      playlistId
                    );
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
    </View>
  );
}

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

const SearchResultCard = ({
  result,
  setIsPLSelectionDialogOpen,
  currentSelectedPlaylists,
  setCurrentSelectedSongBvid,
}: {
  result: SearchResult;
  setIsPLSelectionDialogOpen: (open: boolean) => void;
  currentSelectedPlaylists: number[];
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
