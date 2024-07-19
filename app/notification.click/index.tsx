import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function NotificationClick() {
  return <Redirect href="/home" />;
}
