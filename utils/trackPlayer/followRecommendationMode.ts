import TrackPlayer from "react-native-track-player";
import { db, schema } from "../db/db";
import { videoRecommend } from "../bili/biliRecommend";
import { isMusicType } from "../bili/biliTypeIdFilters";
import { bv2Cid } from "../bili/avBvCid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bvCid2Track } from "../bili/biliVideo";

export const enterFollowRecommendationMode = async () => {
  // destroy the current queue
  await TrackPlayer.removeUpcomingTracks();
  await db.delete(schema.currentQueue);
  await db.delete(schema.currentQueueMeta);
  await AsyncStorage.setItem("followRecommendationMode", "true");
  await continueFollowRecommendationQueue();
  await continueFollowRecommendationQueue();
  await continueFollowRecommendationQueue();
};

export const continueFollowRecommendationQueue = async () => {
  const q = await TrackPlayer.getQueue();
  console.log("q", q);
  if (q.length === 0) return;
  const lastTrack = q[q.length - 1];
  const [cid, bv] = lastTrack.id.split("$");

  const bids = q.map((item) => item.id.split("$")[1]);

  const recommend = await videoRecommend(bv);
  recommend.sort((a: any, b: any) => Math.random() - 0.5);
  const firstMusic = recommend.find(
    (item: any) => isMusicType(item.tid) && !bids.includes(item.bvid)
  );
  if (!firstMusic) return;
  console.log("firstMusic", firstMusic);
  const nextTrackBv = firstMusic.bvid;
  const [nextCid] = await bv2Cid(nextTrackBv);
  if (!nextCid) return;
  const track = await bvCid2Track({ cid: nextCid.cid, bvid: nextTrackBv });
  await TrackPlayer.add(track);
};
