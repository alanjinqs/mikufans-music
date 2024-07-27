import Toast from "react-native-toast-message";
import { mmkvStorage } from "./storage/storage";

export const showDebugMessage = async ({
  title,
  message,
}: {
  title?: string;
  message: string;
}) => {
  if (mmkvStorage.getBoolean("isDevMode")) {
    Toast.show({
      type: "dev",
      text1: title || "Debug Message",
      text2: message,
    });
  }
};
