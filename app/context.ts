import React from "react";

export const MikufansMusicContext = React.createContext({
  isDevMode: false,
  setIsDevMode: (isDevMode: boolean) => {},
});
