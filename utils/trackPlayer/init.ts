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

export const InitTrackPlayer = () => {
  TrackPlayer.registerPlaybackService(() =>
    require("./trackPlayerService")
  );
  TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    notificationCapabilities: capabilities,
    compactCapabilities: capabilities,
    capabilities,
  });
};
