import { SearchResult } from "@/components/song/SearchResultCard";
import { biliFetch } from "./biliFetch";

export const getFeed = async (offset = 0) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?type=video${
      offset ? "&offset=" + offset : ""
    }`
  );

  const data = await res.json();
  if (!data || !data.data)
    return {
      results: [],
      nextOffset: 0,
    };
  const nextOffset = data.data.offset;

  const results: SearchResult[] = data.data.items.map((item: any) => {
    const videoItem = item.modules.module_dynamic.major.archive;
    const artist = item.modules.module_author;
    return {
      aid: videoItem.aid,
      artistName: artist.name,
      artistMid: artist.mid,
      artistAvatar: artist.face.replace("http://", "https://"),
      bvid: videoItem.bvid,
      title: videoItem.title,
      description: videoItem.desc,
      artwork: videoItem.cover.replace("http://", "https://"),
      play: videoItem.stat.play,
      danmu: videoItem.stat.danmaku,
      publishedAt: artist.pub_ts,
      duration: 0,
    };
  });

  return {
    results,
    nextOffset,
  };
};
