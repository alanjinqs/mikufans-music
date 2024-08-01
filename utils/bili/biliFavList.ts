import { schema, SongDB } from "../db/db";
import { mmkvStorage } from "../storage/storage";
import { bv2av } from "./avBvCid";
import { biliFetch, UA } from "./biliFetch";
import { SearchResult } from "@/components/song/SearchResultCard";
import { extractBiliJct } from "./heartbeat";

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
    meta: json.data.info,
  };
};

export const videoFavInfo = async ({
  bvid,
  userId,
}: {
  bvid: string;
  userId: string | number;
}) => {
  const rid = bv2av(bvid as any).toString();

  const res = await biliFetch(
    `https://api.bilibili.com/x/v3/fav/folder/created/list-all?type=2&rid=${rid}&up_mid=${userId}`
  );

  const json = await res.json();
  return (
    json.data.list.map((fav: any) => {
      return {
        mid: fav.id,
        title: fav.title,
        mediaCount: fav.media_count,
        isInFav: fav.fav_state === 1,
      };
    }) || []
  );
};

const favReturnCodeToMsg = (id: string) => {
  if (id === "0") return "成功";
  if (id === "-101") return "账号未登录";
  if (id === "-111") return "csrf 校验失败";
  if (id === "-400") return "请求错误";
  if (id === "-403") return "访问权限不足";
  if (id === "10003") return "不存在该稿件";
  if (id === "11010") return "您访问的内容不存在";
  if (id === "11201") return "已经收藏过了";
  if (id === "11202") return "已经取消收藏了";
  if (id === "11203") return "达到收藏上限";
  if (id === "72010017") return "参数错误";
  return "未知错误 " + id;
};

export const addOrRemoveToMyFav = async ({
  addMids,
  removeMids,
  bvid,
}: {
  addMids: (string | number)[];
  removeMids: (string | number)[];
  bvid: string;
}) => {
  const rid = bv2av(bvid as any).toString();

  const cookies = mmkvStorage.getString("auth-cookies");
  if (!cookies) return;
  const csrf = extractBiliJct(cookies);
  if (!csrf) return;

  const res = await biliFetch(
    "https://api.bilibili.com/medialist/gateway/coll/resource/deal",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Origin: "https://www.bilibili.com",
        Referer: `https://www.bilibili.com/video/${bvid}`,
        "User-Agent": UA,
      },
      credentials: "include",
      body: new URLSearchParams({
        rid,
        csrf,
        type: "2",
        add_media_ids: addMids.join(","),
        del_media_ids: removeMids.join(","),
      }).toString(),
    },
    false
  );
  const json = await res.json();

  return {
    message: favReturnCodeToMsg(json.code.toString().trim()),
  };
};
