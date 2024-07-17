import { Redirect, router } from "expo-router";
import { View } from "react-native";

export default function HomeIndex() {
  router.replace("/home");
  return <View></View>;
}
