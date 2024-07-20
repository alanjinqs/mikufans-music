import { biliFetch } from "./biliFetch";

export const biliVideoSearch = async (
  keyword: string,
  page: number = 1,
  musicOnly = false
) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/web-interface/wbi/search/type?search_type=video&keyword=${keyword}&page=${page}${
      musicOnly ? "&tids=3" : ""
    }`
  );
  const json = await res.json();
  return json.data;
};
