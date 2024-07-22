import { Button } from "@/components/ui/button";
import { Link, router, useLocalSearchParams } from "expo-router";

import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  SearchResult,
  SearchResultCard,
} from "@/components/song/SearchResultCard";
import { useEffect, useState } from "react";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import { getUserVideos } from "@/utils/bili/biliUserVides";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Music } from "@/lib/icons/Music";
import {
  getArtistInfo,
  getUserFavorites,
  UserCreatedFavorite,
} from "@/utils/bili/userInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getUserSeasonsSeriesList,
  SeasonSeriesList,
} from "@/utils/bili/biliSeasonsSeriesList";

export default function UserPage() {
  const { mid } = useLocalSearchParams();
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isPLSelectionDialogOpen, setIsPLSelectionDialogOpen] = useState(false);
  const [currentSelectedSongBvid, setCurrentSelectedSongBvid] =
    useState<string>("");
  const [isMusicFilterOn, setIsMusicFilterOn] = useState(false);

  const [artistName, setArtistName] = useState("");
  const [artistAvatar, setArtistAvatar] = useState("");
  const [artistSign, setArtistSign] = useState("");

  const [tab, setTab] = useState("videos");

  const updateSearchResult = (res: any[]) => {
    const parsedRes: SearchResult[] = res.map((item: any) => {
      return {
        aid: parseInt(item.aid),
        artistName: item.author,
        artistMid: item.mid,
        typeId: item.typeid,
        bvid: item.bvid,
        title: item.title.replace(/<[^>]+>/g, ""),
        description: item.description.replace(/<[^>]+>/g, ""),
        artwork: item.pic.replace("http://", "https://"),
        play: item.play,
        danmu: item.video_review,
        favorite: item.favorites,
        tag: item.tag,
        publishedAt: item.pubdate,
        duration: item.duration,
      };
    });

    setSearchResult((current) => {
      const res = [...current, ...parsedRes];
      return res.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.bvid === item.bvid)
      );
    });
  };

  const loadNextPage = async () => {
    const res = await getUserVideos({
      page: currentSearchPage + 1,
      mid: parseInt(mid as string),
      musicFilter: isMusicFilterOn,
    });
    setCurrentSearchPage(currentSearchPage + 1);
    updateSearchResult(res);
  };

  const loadFirstPage = async (musicFilter?: boolean) => {
    setSearchResult([]);
    setCurrentSearchPage(1);
    getUserVideos({
      page: 1,
      mid: parseInt(mid as string),
      musicFilter: musicFilter === null ? isMusicFilterOn : musicFilter,
    }).then((res) => {
      setCurrentSearchPage(res.page);
      updateSearchResult(res);
    });
  };

  const loadMusicFilter = async () => {
    const res = await AsyncStorage.getItem("isMusicFilterOn");
    if (res === "true") {
      setIsMusicFilterOn(true);
      return true;
    } else {
      setIsMusicFilterOn(false);
      return false;
    }
  };

  useEffect(() => {
    loadMusicFilter().then((res) => {
      loadFirstPage(res);
    });
    getArtistInfo(parseInt(mid as string)).then((res) => {
      setArtistName(res.data.name);
      setArtistAvatar(res.data.face);
      setArtistSign(res.data.sign);
    });
  }, [mid]);

  const onSetMusicFilter = () => {
    AsyncStorage.setItem("isMusicFilterOn", isMusicFilterOn ? "false" : "true");
    setIsMusicFilterOn(!isMusicFilterOn);
    loadFirstPage(!isMusicFilterOn);
  };

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full flex flex-row items-center gap-2">
        {artistAvatar && (
          <Image
            src={artistAvatar + "@128w"}
            alt="cover"
            className="w-14 h-14 rounded-full"
          />
        )}
        <View className="flex-1">
          <Text className="text-foreground text-3xl font-bold">
            {artistName}
          </Text>
          <Text className="text-sm opacity-50" numberOfLines={1}>
            {artistSign}
          </Text>
        </View>
      </View>

      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full mx-auto flex flex-col gap-1.5 flex-1 "
      >
        <TabsList className="flex-row w-full mt-4">
          <TabsTrigger value="videos" className="flex-1">
            <Text>视频</Text>
          </TabsTrigger>
          <TabsTrigger value="favorite" className="flex-1">
            <Text>收藏</Text>
          </TabsTrigger>
          <TabsTrigger value="seasonsSeriesList" className="flex-1">
            <Text>合集与列表</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="flex-1">
          <View className="flex flex-col flex-1">
            <View className="flex flex-row items-center justify-end gap-3">
              <Button
                className="mb-5 mt-2"
                variant={isMusicFilterOn ? "default" : "outline"}
                size={"sm"}
                onPress={onSetMusicFilter}
              >
                <Music
                  className={
                    isMusicFilterOn ? "text-primary-foreground" : "text-primary"
                  }
                  size={13}
                />
              </Button>
            </View>

            <View className="flex-1">
              <FlatList
                data={searchResult}
                onEndReached={loadNextPage}
                renderItem={({ item }) => {
                  return (
                    <SearchResultCard
                      result={item}
                      setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
                      setCurrentSelectedSongBvid={setCurrentSelectedSongBvid}
                    />
                  );
                }}
                keyExtractor={(item) => item.bvid.toString() || ""}
              ></FlatList>
            </View>
          </View>
        </TabsContent>
        <TabsContent value="favorite" className="flex-1">
          <UserFavoriteList mid={mid as string} />
        </TabsContent>
        <TabsContent value="seasonsSeriesList" className="flex-1">
          <UserSeasonsSeriesList mid={mid as string} />
        </TabsContent>
      </Tabs>
      <AddToPlaylistsDialog
        setIsPLSelectionDialogOpen={setIsPLSelectionDialogOpen}
        isPLSelectionDialogOpen={isPLSelectionDialogOpen}
        currentSelectedSongBvid={currentSelectedSongBvid}
      />
    </View>
  );
}

const UserFavoriteList = ({ mid }: { mid: string }) => {
  const [userFavoriteList, setUserFavoriteList] = useState<
    UserCreatedFavorite[]
  >([]);

  useEffect(() => {
    getUserFavorites(parseInt(mid)).then((res) => {
      setUserFavoriteList(res);
    });
  }, [mid]);

  return (
    <View className="flex flex-col flex-1">
      <View className="flex-1">
        {userFavoriteList.length === 0 ? (
          <View className="w-full h-full flex items-center justify-center">
            <Text className="font-bold opacity-50 text-xl">
              没有公开的收藏夹 :(
            </Text>
          </View>
        ) : (
          <ScrollView>
            <View className="w-full flex flex-col gap-2">
              {userFavoriteList.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    className="w-full"
                    onPress={() => {
                      router.push(`/home/videos/favorite/${item.id}`);
                    }}
                  >
                    <View className="w-full flex flex-col p-2 bg-secondary rounded-md text-secondary-foreground">
                      <Text className="text-md" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text className="text-secondary-foreground/50 text-xs">
                        共 {item.mediaCount} 个视频
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const UserSeasonsSeriesList = ({ mid }: { mid: string }) => {
  const [page, setPage] = useState(0);
  const [seasonsSeriesList, setSeasonsSeriesList] = useState<
    SeasonSeriesList[]
  >([]);

  const getNextPage = (pg?: number) => {
    getUserSeasonsSeriesList(mid, pg || page + 1).then((res) => {
      setPage(pg || page + 1);
      setSeasonsSeriesList((current) => [...current, ...res]);
    });
  };

  useEffect(() => {
    getNextPage(1);
    setSeasonsSeriesList([]);
  }, [mid]);

  return (
    <View className="flex flex-col flex-1">
      <View className="flex-1">
        {seasonsSeriesList.length === 0 ? (
          <View className="w-full h-full flex items-center justify-center">
            <Text className="font-bold opacity-50 text-xl">
              用户没有公开的合集或列表 :(
            </Text>
          </View>
        ) : (
          <FlatList
            data={seasonsSeriesList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/home/videos/seasonsSeries/${item.type}_${item.id}`);
                  }}
                >
                  <View className="w-full flex flex-row items-center p-2 bg-secondary rounded-md text-secondary-foreground mb-2 gap-2">
                    {item.cover && (
                      <Image
                        src={item.cover + "@200w"}
                        alt="cover"
                        className="w-16 h-10 rounded-md "
                      />
                    )}
                    <View className="flex flex-col">
                      <Text className="text-md" numberOfLines={1}>
                        {item.name}
                      </Text>

                      <Text className="text-secondary-foreground/50 text-xs">
                        共 {item.total} 个视频
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
              getNextPage();
            }}
          />
        )}
      </View>
    </View>
  );
};