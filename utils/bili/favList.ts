import { biliFetch } from "./biliFetch";

export const fatchFavList = async (mediaId: number) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/v3/fav/resource/ids?media_id=${mediaId}`
  );

  const resJson = await res.json();

  console.log(resJson.data);

  // resJson.data.foreach((media: any) => {
  //   if (media.type !== 2) {
  //     console.error("NOT IMPLMENTED: media type is not video.");
  //   }
  // });

  return resJson.data.map((media: any) => {
    return media.bvid;
  });
};
