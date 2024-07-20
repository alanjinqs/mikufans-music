import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
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

    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      notificationCapabilities: capabilities,
      compactCapabilities: capabilities,
      capabilities,
      progressUpdateEventInterval: 1,
    });

    await AsyncStorage.removeItem("followRecommendationMode");
  }
};
