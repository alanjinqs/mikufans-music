import { Button } from "@/components/ui/button";
import { db, schema } from "@/utils/db/db";
import {
  replacePlaylistByQueue,
  replaceCurrentPlaying,
  addSongToQueue,
} from "@/utils/trackPlayer/addToQueue";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Share } from "react-native";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Play } from "@/lib/icons/Play";
import { Shuffle } from "@/lib/icons/Shuffle";
import TrackPlayer from "react-native-track-player";
import { MotiView } from "moti";
import {
  FlatList,
  Swipeable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AddNewSong from "@/components/playlist/addNewSong";
import { removeSongFromPlaylist } from "@/utils/db/playlists";
import { Plus } from "@/lib/icons/Plus";
import { Trash2 } from "@/lib/icons/Trash2";
import { SquareArrowOutUpRight } from "@/lib/icons/SquareArrowOutUpRight";

export default function PlaylistView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [playlist, setPlaylist] = useState<
    typeof schema.playlist.$inferSelect | undefined
  >();

  const { data: songs } = useLiveQuery(
    db.query.songToPlaylist.findMany({
      with: {
        song: true,
      },
      where: eq(schema.songToPlaylist.playlistId, parseInt(id as string)),
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
              />
            );
          }}
          keyExtractor={(item) => item.id.toString() || ""}
        ></FlatList>
      </View>
    </View>
  );
}

const CardActionLeft = ({
  onPressTrash,
  onPressShare,
}: {
  onPressTrash: () => void;
  onPressShare: () => void;
}) => {
  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity onPress={onPressTrash}>
        <View className="bg-red-500 h-full flex items-center justify-center px-4 rounded-l-md !m-0">
          <Trash2 size={20} className="text-white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressShare}>
        <View className="bg-purple-300 h-full flex items-center justify-center px-4 !m-0">
          <SquareArrowOutUpRight size={20} className="text-white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CardActionRight = ({
  onPressAddToQueue,
  onPressReplaceCurrentPlaying,
}: {
  onPressAddToQueue: () => void;
  onPressReplaceCurrentPlaying: () => void;
}) => {
  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity onPress={onPressAddToQueue}>
        <View className="bg-blue-300 h-full flex items-center justify-center px-4 !m-0">
          <Plus size={20} className="text-white" />
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

const SongCard = ({
  song,
  playlistId,
  fetchPlaylist,
}: {
  song: typeof schema.song.$inferSelect;
  playlistId: number;
  fetchPlaylist: () => void;
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
              addSongToQueue(song.id);
            }}
          />
        )}
      >
        <View className="flex flex-row p-2 bg-secondary rounded-md items-center text-secondary-foreground">
          {song.artwork && (
            <Image
              src={song.artwork + "@200w"}
              alt="cover"
              className="w-16 h-10 rounded-md "
            />
          )}
          <View className="pl-3 pr-2 flex-1 flex flex-col justify-center gap-1">
            <Text className="text-md" numberOfLines={1}>
              {song.title}
            </Text>

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
          </View>
        </View>
      </Swipeable>
    </View>
  );
};
