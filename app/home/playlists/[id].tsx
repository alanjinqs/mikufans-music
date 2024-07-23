import { Button } from "@/components/ui/button";
import { db, schema } from "@/utils/db/db";
import {
  replacePlaylistByQueue,
  replaceCurrentPlaying,
  addSongToQueue,
} from "@/utils/trackPlayer/addToQueue";
import { desc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Share,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Play } from "@/lib/icons/Play";
import { Shuffle } from "@/lib/icons/Shuffle";
import TrackPlayer from "react-native-track-player";
import {
  FlatList,
  Swipeable,
  TouchableOpacity,
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
import {
  getBiliBsetAudioDash,
  getBiliVideoDashPlaybackInfo,
} from "@/utils/bili/biliVideo";
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

export default function PlaylistView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [playlist, setPlaylist] = useState<
    typeof schema.playlist.$inferSelect | undefined
  >();

  const { data: id0Songs } = useLiveQuery(
    db
      .select()
      .from(schema.songToPlaylist)
      .where(eq(schema.songToPlaylist.playlistId, 0))
  );

  const { data: songs } = useLiveQuery(
    db.query.songToPlaylist.findMany({
      with: {
        song: true,
      },
      where: eq(schema.songToPlaylist.playlistId, parseInt(id as string)),
      orderBy: desc(schema.songToPlaylist.id),
    })
  );

  const fetchPlaylist = async () => {
    const pl = await db.query.playlist.findFirst({
      where: eq(schema.playlist.id, parseInt(id as string)),
    });
    setPlaylist(pl);
  };
  const [playlistId, setPlaylistId] = useState<number>(-1);

  useEffect(() => {
    setPlaylistId(parseInt(id as string));
    fetchPlaylist();
  }, [id]);

  return (
    <View className="w-full flex flex-col h-full">
      <View className="w-full">
        <Text className="text-foreground text-3xl font-bold">
          {playlist?.name || ""}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-end gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mb-5 mt-2" variant={"outline"} size={"sm"}>
              <Menu className="text-primary" size={13} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 native:w-72">
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
          </DropdownMenuContent>
        </DropdownMenu>
        <AddNewSong playlistId={playlistId} />
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            if (!playlist?.id) return;
            replacePlaylistByQueue(playlist?.id, true);
            TrackPlayer.setPlayWhenReady(true);
          }}
        >
          <Shuffle className="text-primary" size={13} />
        </Button>
        <Button
          className="mb-5 mt-2"
          variant={"outline"}
          size={"sm"}
          onPress={() => {
            if (!playlist?.id) return;
            replacePlaylistByQueue(playlist?.id);
            TrackPlayer.setPlayWhenReady(true);
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
                playlistId={playlistId}
                fetchPlaylist={fetchPlaylist}
                id0Songs={id0Songs}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString() || ""}
        ></FlatList>
      </View>
    </View>
  );
}

const CardActionLeft = memo(
  ({
    onPressTrash,
    onPressShare,
    heart,
    onPressHeart,
    showTrash,
  }: {
    onPressTrash: () => void;
    onPressShare: () => void;
    heart: boolean;
    onPressHeart: () => void;
    showTrash?: boolean;
  }) => {
    return (
      <View className="flex flex-row items-center">
        {showTrash && (
          <TouchableOpacity onPress={onPressTrash}>
            <View className="bg-red-700 h-full flex items-center justify-center px-4 rounded-l-md !m-0">
              <Trash2 size={20} className="text-white" />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onPressShare}>
          <View
            className={clsx(
              "bg-purple-300 h-full flex items-center justify-center px-4 !m-0",
              !showTrash && "rounded-l-md"
            )}
          >
            <SquareArrowOutUpRight size={20} className="text-white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHeart}>
          <View
            className={clsx(
              "bg-red-300 h-full flex items-center justify-center px-4 !m-0"
            )}
          >
            <Heart
              size={20}
              className={clsx(heart ? "fill-white" : "fill-none", "text-white")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

const CardActionRight = memo(
  ({
    onPressAddToQueue,
    onPressReplaceCurrentPlaying,
    onPressDownload,
  }: {
    onPressAddToQueue: () => void;
    onPressReplaceCurrentPlaying: () => void;
    onPressDownload: () => void;
  }) => {
    return (
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={onPressDownload}>
          <View className="bg-blue-300 h-full flex items-center justify-center px-4 !m-0">
            <Download size={20} className="text-white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressAddToQueue}>
          <View className="bg-sky-300 h-full flex items-center justify-center px-4 !m-0">
            <ListStart size={20} className="text-white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressReplaceCurrentPlaying}>
          <View className="bg-green-300 h-full flex items-center justify-center px-4 rounded-r-md !m-0">
            <Play size={20} className="text-white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

const SongCard = memo(
  ({
    song,
    playlistId,
    fetchPlaylist,
    id0Songs,
  }: {
    song: typeof schema.song.$inferSelect;
    playlistId: number;
    fetchPlaylist: () => void;
    id0Songs: (typeof schema.songToPlaylist.$inferSelect)[];
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
          // onFailed={() => playSong(song.song)}
          key={song.id}
          renderLeftActions={() => (
            <CardActionLeft
              onPressTrash={() => {
                swipeableRef.current?.close();
                removeSongFromPlaylist(song.id, playlistId).then(() => {
                  fetchPlaylist();
                });
              }}
              onPressShare={() => {
                swipeableRef.current?.close();
                Share.share({
                  message: `【${song.title}】 https://b23.tv/${song.bvid}`,
                  url: `https://b23.tv/${song.bvid}`,
                });
              }}
              onPressHeart={() => {
                swipeableRef.current?.close();
                addOrRemoveToId0Playlist(song);
              }}
              heart={id0Songs.find((s) => s.songId === song.id) ? true : false}
              showTrash={playlistId !== 0}
            />
          )}
          renderRightActions={() => (
            <CardActionRight
              onPressReplaceCurrentPlaying={() => {
                swipeableRef.current?.close();
                TrackPlayer.setPlayWhenReady(true);
                replaceCurrentPlaying(song);
              }}
              onPressAddToQueue={() => {
                swipeableRef.current?.close();
                addSongToQueue(song);
              }}
              onPressDownload={() => {
                swipeableRef.current?.close();
                if (!song.cid || !song.bvid) return;
                biliCoverImgDownload({
                  url: song.artwork + "@500w",
                  fileName: `${song.bvid}_cover`,
                }).then((path) => {
                  addSongDownloadedCoverPath(path, song.id);
                });
                getBiliBsetAudioDash(song.cid, song.bvid).then((dash) => {
                  biliVideoDownload({
                    url: dash.base_url,
                    fileName: `${song.bvid}_${song.cid}`,
                    callback: (res) => {
                      console.log(res);
                    },
                  }).then((path) => {
                    addSongDownloadedPath(path, song.id, dash.duration);
                  });
                });
              }}
            />
          )}
        >
          <View className="flex flex-row p-2 bg-secondary rounded-md items-center text-secondary-foreground">
            {song.artwork && (
              <Image
                src={song.downloadedCoverPath || song.artwork + "@200w"}
                alt="cover"
                className="w-16 h-10 rounded-md "
              />
            )}
            <View className="pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
              <Text className="text-md" numberOfLines={1}>
                {song.title}
              </Text>

              <View className="flex flex-row w-full items-center justify-between">
                <TouchableOpacity
                  onPress={() => {
                    if (!song.artistMid) return;
                    router.push(`/home/user/${song.artistMid}`);
                  }}
                >
                  <View className="flex flex-row items-center gap-1">
                    {song.artistAvatar && (
                      <Image
                        src={song.artistAvatar + "@128w"}
                        alt="cover"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <Text className="text-secondary-foreground/50 text-xs">
                      {song.artistName}
                    </Text>
                  </View>
                </TouchableOpacity>

                {song.downloadedMp3Path && (
                  <Download size={10} className="text-green-800/40" />
                )}
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    );
  }
);
