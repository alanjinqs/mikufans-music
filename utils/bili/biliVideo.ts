import { Track } from "react-native-track-player";
import { biliFetch, UA } from "./biliFetch";
import { Platform } from "react-native";

export const getBiliVideoDashPlaybackInfo = async (
  cid: number,
  bvid: string
) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/player/wbi/playurl?fnval=16&bvid=${bvid}&cid=${cid}`
  );
  return res.json();
};

export const getBiliVideoMp4PlaybackInfo = async (
  cid: number,
  bvid: string
) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/player/wbi/playurl?fnval=1&qn=16&fnver=0&bvid=${bvid}&cid=${cid}`
  );
  return res.json();
};

export const biliDashVideoInfoToBestAudio = (
  data: any,
  backupStream = false
) => {
  const audio = data.dash.audio;
  if (backupStream) return audio[0];
  const bestAudio = audio.sort(
    (a: any, b: any) => b.bandwidth - a.bandwidth
  )[0];
  return bestAudio;
};

export const getBiliVideoMeta = async (bvid: string) => {
  const res = await biliFetch(
    `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
  );
  return res.json();
};

export const bvCid2Track = async (
  cid: number,
  bvid: string,
  backupStream = false
) => {
  const meta = await getBiliVideoMeta(bvid);
  if (Platform.OS !== "ios") {
    const videoPlaybackInfo = await getBiliVideoDashPlaybackInfo(cid, bvid);
    const bestPlaybackAudio = biliDashVideoInfoToBestAudio(
      videoPlaybackInfo.data,
      backupStream
    );
    const track: Track = {
      id: cid.toString() + "$" + bvid,
      url: bestPlaybackAudio.base_url,
      title: meta.data.title,
      artist: meta.data.owner.name,
      artwork: meta.data.pic.replace("http://", "https://"),
      duration: videoPlaybackInfo.data.dash.duration,
      userAgent: UA,
      headers: {
        Referer: `https://www.bilibili.com/video/${bvid}`,
      },
    };
    return track;
  } else {
    // console.error("NOT TESTED");
    const videoPlaybackInfo = await getBiliVideoMp4PlaybackInfo(cid, bvid);
    console.log("main", videoPlaybackInfo.data.durl[0].url);
    const track: Track = {
      id: cid.toString() + "$" + bvid,
      url: videoPlaybackInfo.data.durl[0].url,
      title: meta.data.title,
      artist: meta.data.owner.name,
      artwork: meta.data.pic.replace("http://", "https://"),
      duration: videoPlaybackInfo.data.durl[0].length / 1000,
      userAgent: UA,
      headers: {
        Referer: `https://www.bilibili.com/video/${bvid}`,
      },
    };
    return track;
  }
};
