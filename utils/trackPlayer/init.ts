import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RatingType,
  State,
} from "react-native-track-player";

const capabilities = [
  Capability.Play,
  Capability.Pause,
  Capability.Stop,
  Capability.SeekTo,
  Capability.JumpBackward,
  Capability.JumpForward,
  Capability.SkipToNext,
  Capability.SkipToPrevious,
];

export const initTrackPlayer = async () => {
  try {
    const state = await TrackPlayer.getPlaybackState();
    console.log("state", state.state);
  } catch {
    console.log("TrackPlayer not initialized, initializing now.");

    TrackPlayer.registerPlaybackService(() => require("./trackPlayerService"));

    await TrackPlayer.setupPlayer({
      autoHandleInterruptions: true,
    });

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      notificationCapabilities: capabilities,
      compactCapabilities: capabilities,
      capabilities,
      progressUpdateEventInterval: 1,
      ratingType: RatingType.Heart,
    });

    await AsyncStorage.removeItem("followRecommendationMode");
  }
};
