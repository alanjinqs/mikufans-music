import { RatingType, Track } from "react-native-track-player";
import { biliFetch, UA } from "./biliFetch";
import { Platform } from "react-native";
import { SongDB } from "../db/db";

export const audioQuality = {
  30216: "64K",
  30232: "132K",
  30280: "192K",
  30250: "杜比全景声",
  30251: "Hi-Res无损",
};

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

export const getBiliBsetAudioDash = async (
  cid: number,
  bvid: string,
  backupStream = false
) => {
  const videoPlaybackInfo = await getBiliVideoDashPlaybackInfo(cid, bvid);
  const bestPlaybackAudio = biliDashVideoInfoToBestAudio(
    videoPlaybackInfo.data,
    backupStream
  );
  return {
    ...bestPlaybackAudio,
    duration: videoPlaybackInfo.data.dash.duration,
  };
};

export const bvCid2Track = async (
  {
    cid,
    bvid,
    song,
  }: {
    cid: number;
    bvid: string;
    song?: SongDB;
  },
  backupStream = false
) => {
  if (
    song &&
    song.title &&
    song.artistName &&
    song.downloadedMp3Path &&
    song.downloadedMp3Duration &&
    song.downloadedCoverPath
  ) {
    const track: Track = {
      id: cid.toString() + "$" + bvid + "$" + "Local",
      url: song.downloadedMp3Path,
      title: song.title,
      artist: song.artistName,
      artwork: song.downloadedCoverPath,
      duration: song.downloadedMp3Duration,
      rating: RatingType.Heart,
    };
    return track;
  }

  const meta = await getBiliVideoMeta(bvid);
  console.log("meta", meta);

  let artwork = meta.data.pic.replace("http://", "https://");
  if (song && song.downloadedCoverPath) {
    artwork = song.downloadedCoverPath;
  }
  if (Platform.OS !== "ios") {
    const videoPlaybackInfo = await getBiliVideoDashPlaybackInfo(cid, bvid);
    const bestPlaybackAudio = biliDashVideoInfoToBestAudio(
      videoPlaybackInfo.data,
      backupStream
    );
    const track: Track = {
      id:
        cid.toString() +
          "$" +
          bvid +
          "$" +
          audioQuality[bestPlaybackAudio.id as keyof typeof audioQuality] ||
        "Unknown Quality",
      url: bestPlaybackAudio.base_url,
      title: meta.data.title,
      artist: meta.data.owner.name,
      artwork,
      duration: videoPlaybackInfo.data.dash.duration,
      userAgent: UA,
      headers: {
        Referer: `https://www.bilibili.com/video/${bvid}`,
      },
      rating: RatingType.Heart,
    };
    return track;
  } else {
    // console.error("NOT TESTED");
    const videoPlaybackInfo = await getBiliVideoMp4PlaybackInfo(cid, bvid);
    const track: Track = {
      id: cid.toString() + "$" + bvid,
      url: videoPlaybackInfo.data.durl[0].url,
      title: meta.data.title,
      artist: meta.data.owner.name,
      artwork,
      duration: videoPlaybackInfo.data.durl[0].length / 1000,
      userAgent: UA,
      headers: {
        Referer: `https://www.bilibili.com/video/${bvid}`,
      },
    };
    return track;
  }
};
