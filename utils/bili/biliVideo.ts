import { Track } from "react-native-track-player";
import { biliFetch } from "./biliFetch";
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
    `https://api.bilibili.com/x/player/wbi/playurl?fnval=1&qn=6&fnval=16&bvid=${bvid}&cid=${cid}`
  );
  return res.json();
};

export const biliDashVideoInfoToBestAudio = (data: any) => {
  const audio = data.dash.audio;
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

export const bvCid2Track = async (cid: number, bvid: string) => {
  const meta = await getBiliVideoMeta(bvid);
  if (Platform.OS !== "ios") {
    const videoPlaybackInfo = await getBiliVideoDashPlaybackInfo(cid, bvid);
    const bestPlaybackAudio = biliDashVideoInfoToBestAudio(
      videoPlaybackInfo.data
    );
    const track: Track = {
      id: cid.toString(),
      url: bestPlaybackAudio.baseUrl,
      title: meta.data.title,
      artist: meta.data.owner.name,
      artwork: meta.data.pic.replace("http://", "https://"),
      duration: videoPlaybackInfo.data.dash.duration,
    };
    return track;
  } else {
    console.error("NOT TESTED");
    const videoPlaybackInfo = await getBiliVideoMp4PlaybackInfo(cid, bvid);
    const track: Track = {
      id: cid.toString(),
      url: videoPlaybackInfo.data.durl[0].url,
      title: meta.data.title,
      artist: meta.data.owner.name,
      artwork: meta.data.pic.replace("http://", "https://"),
      duration: videoPlaybackInfo.data.durl[0].length / 1000,
    };
    return track;
  }
};
