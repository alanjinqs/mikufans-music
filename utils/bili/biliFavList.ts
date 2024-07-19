import { song } from "@/db/schema";
import { schema, SongDB } from "../db/db";
import { biliFetch } from "./biliFetch";
import { bv2Cid } from "./avBvCid";

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

export const fetchFavList = async (mid: number) => {
  const songList: SongDB[] = [];

  let favInfo: any;
  let hasNext = true;
  let page = 1;
  while (hasNext) {
    const res = await biliFetch(
      `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${mid}&pn=${page}&ps=20`
    );
    const json = await res.json();
    console.log(json);
    hasNext = json.data.has_more;
    if (!favInfo) {
      favInfo = json.data.info;
    }

    for (const media of json.data.medias) {
      if (media.type !== 2) {
        console.error("NOT IMPLMENTED: media type is not video.");
      }
      // const cid = await bv2Cid(media.bvid);
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
        color: "#9897E1",
      });
    }
    page += 1;
  }

  return { songList, favInfo };
};