// https://api.bilibili.com/x/click-interface/web/heartbeat

import AsyncStorage from "@react-native-async-storage/async-storage";
import { biliFetch, UA } from "./biliFetch";
import dayjs from "dayjs";
import setCookie from "set-cookie-parser";

const extractBiliJct = (cookieString: string) => {
  const regex = /bili_jct=([^;]+);/;
  const match = cookieString.match(regex);

  if (match && match[1]) {
    return match[1]; // Found the value
  } else {
    return null; // Value not found
  }
};

export const sendHeartbeat = async (
  bvid: string,
  cid: number,
  playedTime: number,
  realTime: number,
  isPlaying: boolean
) => {
  const cookies = await AsyncStorage.getItem("auth-cookies");
  if (!cookies) return;

  const csrf = extractBiliJct(cookies);

  if (!csrf) return;
  // console.log("heartbeat not enabled");
  const res = await biliFetch(
    "https://api.bilibili.com/x/click-interface/web/heartbeat",
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
        bvid,
        played_time: playedTime.toString(),
        cid: cid.toString(),
        real_time: realTime.toString(),
        start_ts: dayjs()
          .subtract(playedTime + 1, "s")
          .unix()
          .toString(),
        type: "3",
        dt: "2",
        play_type: isPlaying ? "0" : "2",
        csrf,
      }).toString(),
    },
    false
  );
  res.json().then((data) => {
    console.log("heartbeat", data);
  });
};
