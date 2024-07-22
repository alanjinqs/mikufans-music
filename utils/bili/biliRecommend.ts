import { biliFetch } from "./biliFetch";

export const indexRecommend = async () => {
  const res = await biliFetch(
    "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd"
  );
  const json = await res.json();
  return json.data;
};

export const videoRecommend = async (bvid: string) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/web-interface/archive/related?bvid=${bvid}`
  );
  const json = await res.json();
  return json.data;
};

export const rankingRecommend = async () => {
  const res = await biliFetch(
    "https://api.bilibili.com/x/web-interface/ranking/v2?tid=3"
  );
  const json = await res.json();
  return json.data;
};
