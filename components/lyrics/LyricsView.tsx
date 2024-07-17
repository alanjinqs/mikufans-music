import { SongDB } from "@/utils/db/db";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import SongSearchDialog from "./SongSearch";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Line, LineType, LyricLine, MetadataLine, parse } from "clrc";
import clsx from "clsx";
import { debounce } from "lodash";
import { updateSongOffset } from "@/utils/db/song";

export default function LyricsView({
  song,
  currentProgress,
  onSongUpdated,
}: {
  song: SongDB;
  currentProgress: number;
  onSongUpdated: () => void;
}) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [translatedLyrics, setTranslatedLyrics] = useState<LyricLine[]>([]);

  const [songHasTranslatedLyrics, setSongHasTranslatedLyrics] = useState(false);

  useEffect(() => {
    if (!song || !song.lyrics) return;
    let lrcs = song.lyrics;
    const parsed = parse(lrcs);
    setLyrics(
      parsed.filter((line) => line.type === LineType.LYRIC) as LyricLine[]
    );

    if (song.translatedLyrics) {
      const transParsed = parse(song.translatedLyrics);
      setTranslatedLyrics(
        transParsed.filter(
          (line) => line.type === LineType.LYRIC
        ) as LyricLine[]
      );
      setSongHasTranslatedLyrics(true);
    }

    if (song.lyricsOffset) {
      setCurrentOffset(song.lyricsOffset);
    } else {
      setCurrentOffset(0);
    }
  }, [song]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  const updateCurrentLine = () => {
    const currentMillisecond = currentProgress * 1000 + currentOffset;

    if (!lyrics) return;
    for (let i = 0; i < lyrics.length; i++) {
      const line = lyrics[i];
      if (line.type === LineType.LYRIC) {
        const l = line as LyricLine;
        if (l.startMillisecond > currentMillisecond) {
          setCurrentLine(i - 1);
          scrollViewRef.current?.scrollTo({
            y: (i - 1) * (35 + (songHasTranslatedLyrics ? 20 : 0)) - 150,
            animated: true,
          });
          break;
        }
      }
    }
  };

  useEffect(() => {
    updateCurrentLine();
  }, [currentProgress]);

  useEffect(() => {
    updateCurrentLine();
  }, []);

  useEffect(() => {
    debounce(() => {
      updateSongOffset(song.id, currentOffset);
    }, 1000)();
  }, [currentOffset]);

  return (
    <View className="w-full">
      <View
        className="w-full"
        style={{
          height: 300,
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{
            width: "100%",
          }}
        >
          {lyrics.map((line, i) => {
            if (line.type === LineType.LYRIC) {
              const l = line as LyricLine;
              return (
                <View key={i}>
                  <View
                    style={{
                      height: 35,
                    }}
                    className="felx flex-col items-start justify-end"
                  >
                    <Text
                      className={clsx(
                        "",
                        currentLine == i
                          ? "text-white text-lg font-bold"
                          : "text-white/20"
                      )}
                    >
                      {l.content}
                    </Text>
                  </View>
                  {translatedLyrics.length > 0 && translatedLyrics[i] && (
                    <Text
                      className={clsx(
                        "",
                        currentLine == i
                          ? "text-white/80 text-lg font-bold"
                          : "text-white/20"
                      )}
                      style={{
                        height: 20,
                      }}
                    >
                      {translatedLyrics[i].content}
                    </Text>
                  )}
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
      <View className="flex flex-row items-center justify-center text-xs my-4 text-white gap-5">
        <TouchableOpacity onPress={() => setCurrentOffset(currentOffset - 100)}>
          <Text className="text-white/30 p-2">-0.1s</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentOffset(currentOffset + 100)}>
          <Text className="text-white/30 p-2">+0.1s</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-center opacity-30">
        <View className="border-b border-white">
          <SongSearchDialog onSongUpdated={onSongUpdated} song={song} />
        </View>
      </View>
    </View>
  );
}
