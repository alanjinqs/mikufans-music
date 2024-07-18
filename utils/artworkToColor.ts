import { getColors } from "react-native-image-colors";

export const artworkToDarkColor = async (_artwork?: string) => {
  const artwork = _artwork + "@200w"
  console.log("artwork", artwork);
  if (!artwork) return "#9897E1";
  const colors = await getColors(artwork || "", {
    fallback: "#9897E1",
    key: artwork || "",
  });

  let color = "#9897E1";
  if (colors.platform === "android") {
    color =
      colors.darkMuted === "#9897E1" ? colors.darkVibrant : colors.darkMuted;
  }
  if (colors.platform === "web") {
    color =
      colors.darkMuted === "#9897E1" ? colors.darkVibrant : colors.darkMuted;
  }
  if (colors.platform === "ios") {
    color = colors.primary;
  }
  return color;
};
