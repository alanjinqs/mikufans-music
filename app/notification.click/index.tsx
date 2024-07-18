import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function HomeIndex() {
  useEffect(() => {
    router.replace("/home");
  }, []);
  return <View></View>;
}
