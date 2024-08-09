import { Button } from "@/components/ui/button";
import { db, schema, SongDB } from "@/utils/db/db";
import {
  replacePlaylistByQueue,
  replaceCurrentPlaying,
  addSongToQueue,
} from "@/utils/trackPlayer/addToQueue";
import { desc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity as RNTouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import Animated, { withTiming } from "react-native-reanimated";
import { User } from "@/lib/icons/User";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Edit3 } from "@/lib/icons/Edit3";
import { Play } from "@/lib/icons/Play";
import { Shuffle } from "@/lib/icons/Shuffle";
import {
  FlatList,
  ScrollView,
  Swipeable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AddNewSong from "@/components/playlist/addNewSong";
import {
  addOrRemoveToId0Playlist,
  removePlaylist,
  removeSongFromPlaylist,
} from "@/utils/db/playlists";
import { ListStart } from "@/lib/icons/ListStart";
import { Trash2 } from "@/lib/icons/Trash2";
import { SquareArrowOutUpRight } from "@/lib/icons/SquareArrowOutUpRight";
import { Download } from "@/lib/icons/Download";
import { biliCoverImgDownload, biliVideoDownload } from "@/utils/file/download";
import { getBiliBsetAudioDash } from "@/utils/bili/biliVideo";
import {
  addSongDownloadedCoverPath,
  addSongDownloadedPath,
} from "@/utils/db/song";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "@/lib/icons/Menu";
import clsx from "clsx";
import { Heart } from "@/lib/icons/Heart";
import EditPlaylistName from "@/components/playlist/editPlaylistName";
import { Ellipsis } from "@/lib/icons/Ellipsis";
import { Portal } from "@rn-primitives/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useColorScheme } from "@/lib/useColorScheme";
import { ListVideo } from "@/lib/icons/ListVideo";
import { ListPlus } from "@/lib/icons/ListPlus";
import { ExternalLink } from "@/lib/icons/ExternalLink";
import AddToPlaylistsDialog from "@/components/playlist/addToPlaylistsDialog";
import { mmkvStorage } from "@/utils/storage/storage";
import Toast from "react-native-toast-message";
import {
  SongCard,
  SongCardBottomDrawer,
  SongCardItem,
} from "@/components/song/SongCard";
import SyncWithBiliFav from "@/components/playlist/syncWithBiliFav";

export default function PlaylistView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [playlist, setPlaylist] = useState<
    typeof schema.playlist.$inferSelect | undefined
  >();
  const [showEditPlaylist, setShowEditPlaylist] = useState(false);

  const { data: songs } = useLiveQuery(
    db.query.songToPlaylist.findMany({
      with: {
        song: true,
      },
      where: eq(schema.songToPlaylist.playlistId, parseInt(id as string)),
      orderBy: (song, { desc }) => [desc(song.order), desc(song.id)],
    })
  );

  const fetchPlaylist = async () => {
    const startTime = Date.now();
    const pl = await db.query.playlist.findFirst({
      where: eq(schema.playlist.id, parseInt(id as string)),
    });
    setPlaylist(pl);
    console.log(`playlistLoaded in ${Date.now() - startTime}ms`);
  };
  const [playlistId, setPlaylistId] = useState<number>(-1);

  useEffect(() => {
    setPlaylistId(parseInt(id as string));
    fetchPlaylist();
  }, [id]);

  const [currentMenuSong, setCurrentMenuSong] = useState<SongCardItem | null>(
    null
  );

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          {playlist?.name || ""}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-end gap-3">
        {playlistId !== -1 && playlistId !== 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mb-5 mt-2" variant={"outline"} size={"sm"}>
                <Menu className="text-primary" size={13} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 native:w-72">
              <>
                <DropdownMenuItem
                  onPress={() => {
                    removePlaylist(playlistId).then(() => {
                      router.back();
                    });
                  }}
                >
                  <View className="flex flex-row items-center gap-2">
                    <Trash2 className="text-primary" size={20} />
                    <Text>删除歌单</Text>
                  </View>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onPress={() => {
                    setShowEditPlaylist(true);
                  }}
                >
                  <View className="flex flex-row items-center gap-2">
                    <Edit3 className="text-primary" size={20} />
                    <Text>修改歌单名称</Text>
                  </View>
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <SyncWithBiliFav playlistId={playlistId} />
        <AddNewSong playlistId={playlistId} />
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            replacePlaylistByQueue(playlistId, true);
          }}
        >
          <Shuffle className="text-primary" size={13} />
        </Button>
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            replacePlaylistByQueue(playlistId);
          }}
        >
          <Play className="text-primary" size={13} />
        </Button>
      </View>
      <View className="flex-1">
        <FlatList
          data={songs}
          renderItem={({ item }) => {
            return (
              <SongCard
                key={item.id}
                song={item.song}
                setMenuSong={setCurrentMenuSong}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString() || ""}
        ></FlatList>
      </View>
      <EditPlaylistName
        playlistId={playlistId}
        showDialog={showEditPlaylist}
        setShowDialog={setShowEditPlaylist}
      />
      <SongCardBottomDrawer
        song={currentMenuSong}
        onClose={() => setCurrentMenuSong(null)}
        playlistId={playlistId}
      />
    </View>
  );
}
