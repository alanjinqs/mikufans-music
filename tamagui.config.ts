import { config } from "@tamagui/config/v3";
import * as themes from "./theme-output";

import { createTamagui } from "tamagui";
export const tamaguiConfig = createTamagui({
  ...config,
  themes,
});
export default tamaguiConfig;
export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
