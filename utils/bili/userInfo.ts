import { biliFetch } from "./biliFetch";
import { mmkvStorage } from "../storage/storage";

export const getUserInfo = async () => {
  const res = await biliFetch("https://api.bilibili.com/x/web-interface/nav");
  const json = await res.json();

  const {
    data: {
      wbi_img: { img_url, sub_url },
    },
  } = json;

  const img_key = img_url.slice(
    img_url.lastIndexOf("/") + 1,
    img_url.lastIndexOf(".")
  );
  const sub_key = sub_url.slice(
    sub_url.lastIndexOf("/") + 1,
    sub_url.lastIndexOf(".")
  );

  mmkvStorage.set("img-key", img_key);
  mmkvStorage.set("sub-key", sub_key);

  return json;
};

export const getArtistInfo = async (mid: string | number) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/space/wbi/acc/info?mid=${mid}`
  );
  const json = await res.json();
  return json;
};

export type UserCreatedFavorite = {
  id: number;
  ownerMid: string;
  title: string;
  mediaCount: number;
};

export const getUserFavorites = async (mid: number) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${mid}`
  );
  const json = await res.json();
  if (!json.data || !json.data.list) {
    return [];
  }

  const userCreatedFavorites = json.data.list.map((item: any) => ({
    id: item.id,
    ownerMid: item.mid,
    title: item.title,
    mediaCount: item.media_count,
  }));

  return userCreatedFavorites as UserCreatedFavorite[];
};
