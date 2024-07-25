import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function NotificationClick() {
  useEffect(() => {
    if (router.canDismiss()) {
      router.dismiss();
    } else if(router.canGoBack()) {
      router.back();
    } else {
      setTimeout(() => {
        router.replace("/home");
      }, 500);
    }
  }, []);
  return <View></View>;
}
