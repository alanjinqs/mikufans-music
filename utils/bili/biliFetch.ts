import CookieManager from "@react-native-cookies/cookies";
import { encWbi } from "./wbiSignature";
import { mmkvStorage } from "../storage/storage";

export const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

function paramsToObject(params: URLSearchParams) {
  const entries = params.entries();
  const result: any = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

export const biliFetch = async (
  url: RequestInfo,
  options: RequestInit = {},
  ignoreWbi = false
) => {
  const headers = new Headers(options.headers);
  headers.set("User-Agent", UA);
  headers.set("Referer", "https://www.bilibili.com/");
  headers.set("Origin", "https://www.bilibili.com/");

  const img_key = mmkvStorage.getString("img-key");
  const sub_key = mmkvStorage.getString("sub-key");

  let params = {};
  if (typeof url === "string") {
    const urlObj = new URL(url);
    params = paramsToObject(urlObj.searchParams);
  } else {
    const urlObj = new URL(url.url);
    params = paramsToObject(urlObj.searchParams);
  }
  let newUrl: RequestInfo;

  if (!img_key || !sub_key || ignoreWbi) {
    newUrl = url;
  } else {
    const resParams = encWbi(params, img_key, sub_key);

    if (typeof url === "string") {
      newUrl = url.split("?")[0] + "?" + resParams;
    } else {
      newUrl = {
        ...url,
        url: url.url.split("?")[0] + "?" + resParams,
      };
    }
  }
  const res = await fetch(newUrl, {
    ...options,
    headers: headers,
    credentials: "include",
  });
  return res;
};

export const loadAndSetCookies = async () => {
  const cookiesStr = mmkvStorage.getString("auth-cookies");
  if (!cookiesStr) return false;
  try {
    const res = await CookieManager.setFromResponse(
      "https://passport.bilibili.com",
      cookiesStr
    );

    return true;
  } catch {
    return false;
  }
};
