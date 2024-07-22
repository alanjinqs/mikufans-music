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

export const biliUserSearch = async (keyword: string, page: number = 1) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/web-interface/search/type?search_type=bili_user&keyword=${keyword}&page=${page}`
  );
  const json = await res.json();
  return json.data;
};
