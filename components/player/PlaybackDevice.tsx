import {
  useIsBluetoothHeadphonesConnected,
  useIsWiredHeadphonesConnected,
} from "react-native-device-info";
import { Headphones } from "@/lib/icons/Headphones";
import { Bluetooth } from "@/lib/icons/Bluetooth";
import { Cable } from "@/lib/icons/Cable";
import { Volume2 } from "@/lib/icons/Volume2";
import { View } from "react-native";
import clsx from "clsx";

export default function PlaybackDevice({ forceDark }: { forceDark?: boolean }) {
  const { loading: bluetoothHeadphonLoading, result: bluetoothHeadphonResult } =
    useIsBluetoothHeadphonesConnected();
  const { loading: wiredHeadphoneLoading, result: wiredHeadphoneResult } =
    useIsWiredHeadphonesConnected();
  return (
    <View
      className={clsx(
        "flex flex-row gap-1 items-center opacity-40 rounded-full px-3 py-1",
        forceDark ? "bg-white/20" : "bg-foreground/5"
      )}
    >
      {bluetoothHeadphonResult && (
        <Bluetooth
          size={15}
          className={forceDark ? "!color-white" : "color-foreground"}
        />
      )}
      {wiredHeadphoneResult && (
        <Cable
          size={15}
          className={forceDark ? "!color-white" : "color-foreground"}
        />
      )}
      {bluetoothHeadphonResult || wiredHeadphoneResult ? (
        <Headphones
          size={20}
          className={forceDark ? "!color-white" : "color-foreground"}
        />
      ) : (
        <Volume2
          size={20}
          className={forceDark ? "!color-white" : "color-foreground"}
        />
      )}
    </View>
  );
}
