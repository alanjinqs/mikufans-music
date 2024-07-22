import { SearchResult } from "@/components/song/SearchResultCard";
import { biliFetch } from "./biliFetch";
import dayjs from "dayjs";

export type SeasonSeriesList = {
  id: string;
  total: number;
  cover: string;
  name: string;
  type: "season" | "series";
};

export const getUserSeasonsSeriesList = async (
  mid: string,
  pageNum: number
) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/polymer/web-space/seasons_series_list?mid=${mid}&page_num=${pageNum}&page_size=18`
  );
  const data = await res.json();
  const lists = data.data.items_lists;

  let result: SeasonSeriesList[] = [];
  for (const season of lists.seasons_list) {
    result.push({
      id: season.meta.season_id,
      total: season.meta.total,
      cover: season.meta.cover.replace("http://", "https://"),
      name: season.meta.name,
      type: "season",
    });
  }

  for (const series of lists.series_list) {
    result.push({
      id: series.meta.series_id,
      total: series.meta.total,
      cover: series.meta.cover.replace("http://", "https://"),
      name: series.meta.name,
      type: "series",
    });
  }

  return result;
};

export const getSeasons = async (seriesId: string, pageNum: number) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=1&season_id=${seriesId}&page_num=${pageNum}&page_size=18`
  );

  const data = await res.json();

  return {
    list: data.data.archives.map((item: any) => {
      return {
        id: item.aid,
        aid: item.aid,
        artistName: "发布于：" + dayjs(item.pubdate).format("YYYY-MM-DD"),
        bvid: item.bvid,
        title: item.title,
        artwork: item.pic.replace("http://", "https://"),
        publishedAt: item.pubdate,
        duration: item.duration,
      };
    }) as SearchResult[],
    meta: data.data.meta,
  };
};

export const getSeriesMeta = async (seriesId: string) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/series/series?series_id=${seriesId}`
  );
  const data = await res.json();
  return {
    name: data.data.meta.name,
    total: data.data.meta.archives_count,
    mid: data.data.meta.mid,
  };
};

export const getSeries = async (
  mid: string,
  seriesId: string,
  pageNum: number
) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/series/archives?mid=${mid}&series_id=${seriesId}&sort=desc&pn=${pageNum}&ps=30`
  );
  const data = await res.json();

  console.log(data);
  return {
    list: data.data.archives.map((item: any) => {
      return {
        id: item.aid,
        aid: item.aid,
        artistName: "发布于：" + dayjs(item.pubdate).format("YYYY-MM-DD"),
        bvid: item.bvid,
        title: item.title,
        artwork: item.pic.replace("http://", "https://"),
        publishedAt: item.pubdate,
        duration: item.duration,
      };
    }) as SearchResult[],
  };
};
