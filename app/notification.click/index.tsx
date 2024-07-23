import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function NotificationClick() {
  useEffect(() => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace("/home");
    }
  }, []);
  return <View></View>;
}
