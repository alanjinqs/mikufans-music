import { SongDB } from "@/utils/db/db";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import SongSearchDialog from "./SongSearch";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Line, LineType, LyricLine, MetadataLine, parse } from "clrc";
import clsx from "clsx";
import { debounce } from "lodash";
import { updateSongOffset } from "@/utils/db/song";
import { useWindowDimensions } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";

type TranslatedLyricLine = {
  translatedContent?: string;
} & LyricLine;

export default function LyricsView({
  song,
  onSongUpdated,
}: {
  song: SongDB;
  onSongUpdated: () => void;
}) {
  const [lyrics, setLyrics] = useState<TranslatedLyricLine[]>([]);

  const [songHasTranslatedLyrics, setSongHasTranslatedLyrics] = useState(false);
  const { height, width } = useWindowDimensions();

  const currentProgress = useProgress(100);

  const updateLyrics = () => {
    if (!song || !song.lyrics) return;
    let lrcs = song.lyrics.replaceAll("\r\n", "\n");
    const parsed = parse(lrcs);

    const filtered: TranslatedLyricLine[] = parsed.filter(
      (line) => line.type === LineType.LYRIC && line.content.trim().length > 0
    ) as LyricLine[];

    if (song.translatedLyrics) {
      const transParsed = parse(song.translatedLyrics.replaceAll("\r\n", "\n"));
      filtered.forEach((line, i) => {
        const transLine = transParsed.find(
          (l) =>
            l.type === LineType.LYRIC &&
            l.startMillisecond === line.startMillisecond
        );
        if (transLine && transLine.type === LineType.LYRIC) {
          (line as TranslatedLyricLine).translatedContent = transLine.content;
        }
      });
      setSongHasTranslatedLyrics(true);
    }

    setLyrics(filtered);

    if (song.lyricsOffset) {
      setCurrentOffset(song.lyricsOffset);
    } else {
      setCurrentOffset(0);
    }
  };

  useEffect(() => {
    updateLyrics();
  }, [song]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  const scrollTo = (row: number) => {
    if (isScrolling) return;
    scrollViewRef.current?.scrollTo({
      y:
        row * (35 + (songHasTranslatedLyrics ? 25 : 0)) -
        (songHasTranslatedLyrics ? 55 : 60),
      animated: true,
    });
  };
  const updateCurrentLine = () => {
    const currentMillisecond = currentProgress.position * 1000 + currentOffset;

    if (!lyrics) return;
    for (let i = 0; i < lyrics.length; i++) {
      const line = lyrics[i];
      if (line.type === LineType.LYRIC) {
        const l = line as LyricLine;
        if (l.startMillisecond > currentMillisecond) {
          setCurrentLine(i - 1);
          scrollTo(i - 1);
          break;
        }
      }
    }
    if (
      lyrics.length !== 0 &&
      currentMillisecond > lyrics[lyrics.length - 1].startMillisecond
    ) {
      setCurrentLine(lyrics.length - 1);
      scrollTo(lyrics.length - 1);
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

  const [isScrolling, setIsScrolling] = useState(false);
  const [isSrollingStoped, setIsScrollingStoped] = useState(false);

  return (
    <View className="w-full">
      <View
        style={{
          height: height - 400,
          width: "100%",
        }}
      >
        <ScrollView
          onScrollBeginDrag={() => {
            setIsScrolling(true);
            setIsScrollingStoped(false);
          }}
          onScrollEndDrag={() => {
            setIsScrollingStoped(true);
            setTimeout(() => {
              if (isSrollingStoped) {
                setIsScrolling(false);
              }
            }, 1500);
          }}
          ref={scrollViewRef}
          style={{
            width: "100%",
          }}
        >
          {lyrics.map((line, i) => {
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  TrackPlayer.seekTo(
                    (line.startMillisecond - currentOffset) / 1000
                  );
                }}
              >
                <View className="w-full">
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
                          ? "text-white text-xl font-bold"
                          : "text-white/20"
                      )}
                    >
                      {line.content}
                    </Text>
                  </View>
                  {songHasTranslatedLyrics && (
                    <Text
                      className={clsx(
                        "",
                        currentLine == i
                          ? "text-white/80 text-lg font-bold"
                          : "text-white/20"
                      )}
                      style={{
                        height: 25,
                      }}
                    >
                      {line.translatedContent || ""}
                    </Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
          <View
            style={{
              width: width - 100,
            }}
          ></View>
        </ScrollView>
      </View>
      <View className="flex flex-row items-center justify-center text-xs my-4 text-white gap-5">
        <TouchableOpacity
          onPress={() => setCurrentOffset(currentOffset - 1000)}
        >
          <Text className="text-white/30 p-2">- 0.5s</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentOffset(currentOffset - 100)}>
          <Text className="text-white/30 p-2">- 0.1s</Text>
        </TouchableOpacity>
        <Text className="text-white/50 p-2">{(currentOffset/1000).toFixed(1)}s</Text>
        <TouchableOpacity onPress={() => setCurrentOffset(currentOffset + 100)}>
          <Text className="text-white/30 p-2">+0.1s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentOffset(currentOffset + 1000)}
        >
          <Text className="text-white/30 p-2">+0.5s</Text>
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
