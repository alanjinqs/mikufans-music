import { schema, SongDB } from "../db/db";
import { biliFetch } from "./biliFetch";
import { SearchResult } from "@/components/song/SearchResultCard";

// export const fetchFavList = async (mediaId: number) => {
//   const res = await biliFetch(
//     `https://api.bilibili.com/x/v3/fav/resource/ids?media_id=${mediaId}`
//   );

//   const resJson = await res.json();

//   console.log(resJson.data);

//   // resJson.data.foreach((media: any) => {
//   //   if (media.type !== 2) {
//   //     console.error("NOT IMPLMENTED: media type is not video.");
//   //   }
//   // });

//   return resJson.data.map((media: any) => {
//     return media.bvid;
//   });
// };

export const fetchFavMeta = async (mid: number) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/v3/fav/folder/info?media_id=${mid}`
  );
  return res.json();
};

export const fetchFavListAsSong = async (mid: number) => {
  const songList: SongDB[] = [];

  let favInfo: any;
  let hasNext = true;
  let page = 1;
  while (hasNext) {
    const res = await biliFetch(
      `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${mid}&pn=${page}&ps=20`
    );
    const json = await res.json();
    hasNext = json.data.has_more;
    if (!favInfo) {
      favInfo = json.data.info;
    }

    for (const media of json.data.medias) {
      if (media.type !== 2) {
        console.error("NOT IMPLMENTED: media type is not video.");
      }
      songList.push({
        bvid: media.bvid,
        title: media.title,
        artwork: media.cover.replace("http://", "https://"),
        id: media.id,
        cid: null,
        artistMid: media.upper.mid,
        artistName: media.upper.name,
        artistAvatar: media.upper.face,
        addedAt: new Date(),
        color: "#333",
        downloadedCoverPath: null,
        downloadedMp3Duration: null,
        downloadedMp3Path: null,
        qqMusicMid: null,
        lyrics: null,
        translatedLyrics: null,
        lyricsOffset: 0,
      });
    }
    page += 1;
  }

  return { songList, favInfo };
};

export const getFavListByPage = async (mid: string, page: number) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${mid}&pn=${page}&ps=20`
  );

  const json = await res.json();
  const songList: SearchResult[] = json.data.medias.map((media: any) => {
    return {
      aid: parseInt(media.id),
      artistName: media.upper.name,
      artistMid: media.upper.mid,
      artistAvatar: media.upper.face.replace("http://", "https://"),
      bvid: media.bvid,
      title: media.title,
      artwork: media.cover.replace("http://", "https://"),
      play: media.cnt_info.play,
      danmu: media.cnt_info.danmaku,
      favorite: media.cnt_info.favorite,
      publishedAt: media.pubdate,
      duration: media.duration,
    };
  });

  return {
    songList,
    hasNextPage: json.data.has_more,
    meta: json.data.info
  };
};
