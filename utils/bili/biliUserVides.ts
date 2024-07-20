import { biliFetch } from "./biliFetch";

export const getUserVideos = async ({
  mid,
  page,
  musicFilter,
}: {
  mid: number;
  page: number;
  musicFilter?: boolean;
}) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/space/wbi/arc/search?mid=${mid}&pn=${page}&ps=30&order=pubdate${
      musicFilter ? "&tid=3" : ""
    }`
  );
  const json = await res.json();
  if (json && json.data && json.data.list && json.data.list.vlist) {
    return json.data.list.vlist;
  }
  return [];
};
