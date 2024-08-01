// https://api.bilibili.com/x/click-interface/web/heartbeat

import { biliFetch, UA } from "./biliFetch";
import setCookie from "set-cookie-parser";
import { mmkvStorage } from "../storage/storage";
import Toast from "react-native-toast-message";
import { AppState } from "react-native";

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
  // realTime: number,
  isPlaying: boolean
) => {
  const isHeartbeatDisabled = mmkvStorage.getBoolean("disableHeartbeat");
  if (isHeartbeatDisabled) return;

  const cookies = mmkvStorage.getString("auth-cookies");
  if (!cookies) return;

  const csrf = extractBiliJct(cookies);

  if (!csrf) return;

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
        // real_time: realTime.toString(),
        // start_ts: dayjs().subtract(realTime, "s").unix().toString(),
        type: "3",
        dt: "2",
        play_type: playedTime === -1 ? "4" : isPlaying ? "0" : "2",
        csrf,
      }).toString(),
    },
    false
  );
  res.json().then((data) => {
    // if (
    //   AppState.currentState === "active" &&
    //   mmkvStorage.getBoolean("isDevMode")
    // ) {
    //   Toast.show({
    //     type: "dev",
    //     text1: "心跳上报结果",
    //     text2: JSON.stringify({
    //       req: {
    //         bvid,
    //         played_time: playedTime.toString(),
    //         cid: cid.toString(),
    //         play_type: playedTime === -1 ? "4" : isPlaying ? "0" : "2",
    //       },
    //       res: data,
    //     }),
    //   });
    // }
  });
};
