import { biliFetch } from "./biliFetch";

export const getUserInfo = async () => {
  const res = await biliFetch("https://api.bilibili.com/x/web-interface/nav");
  return res.json();
};
