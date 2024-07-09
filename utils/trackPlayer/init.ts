import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
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
    await TrackPlayer.getQueue();
  } catch {
    TrackPlayer.registerPlaybackService(() => require("./trackPlayerService"));

    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      notificationCapabilities: capabilities,
      compactCapabilities: capabilities,
      capabilities,
    });
  }
};
