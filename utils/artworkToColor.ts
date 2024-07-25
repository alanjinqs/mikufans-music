import { getColors } from "react-native-image-colors";

export const artworkToDarkColor = async (_artwork?: string) => {
  const artwork = _artwork + "@64w";
  console.log("artwork", artwork);
  if (!artwork) return "#9897E1";
  const colors = await getColors(artwork || "", {
    fallback: "#9897E1",
    key: artwork || "",
  });

  let primary = "#9897E1";
  if (colors.platform === "android") {
    primary = colors.dominant === "#9897E1" ? colors.vibrant : colors.dominant;
  }
  if (colors.platform === "web") {
    primary = colors.dominant === "#9897E1" ? colors.vibrant : colors.dominant;
  }
  if (colors.platform === "ios") {
    primary = colors.background === "#9897E1" ? colors.primary : colors.background;
  }
  const { r, g, b } = hexToRgb(primary);
  let [h, s, v] = rgbToHsv(r, g, b);
  if (v > 0.4) {
    v = 0.4;
  }
  const [r1, g1, b1] = hsvToRgb(h, s, v);
  const color = rgbToHex(Math.floor(r1), Math.floor(g1), Math.floor(b1));
  return color;
};

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    v = max;

  const d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h: number, s: number, v: number) {
  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return [r * 255, g * 255, b * 255];
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function componentToHex(c: { toString: (arg0: number) => any }) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(
  r: { toString: (arg0: number) => any },
  g: { toString: (arg0: number) => any },
  b: { toString: (arg0: number) => any }
) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
