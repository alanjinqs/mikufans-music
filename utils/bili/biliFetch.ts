import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export const biliFetch = async (url: RequestInfo, options: RequestInit = {}) => {
  const headers = new Headers(options.headers);
  headers.set("User-Agent", UA);
  headers.set("Referer", "https://www.bilibili.com/");
  headers.set("Origin", "https://www.bilibili.com/");
  return fetch(url, { ...options, headers, credentials: "include" });
};

export const loadAndSetCookies = async () => {
  const cookiesStr = await AsyncStorage.getItem("auth-cookies");
  if (!cookiesStr) return false;
  try {
    const res = await CookieManager.setFromResponse(
      "https://passport.bilibili.com",
      cookiesStr
    );
    console.log(res);
    return true;
  } catch {
    return false;
  }
};
