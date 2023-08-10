import { NativeModules, Platform } from "react-native";

export enum SoftInputMode {
  RESIZE = "resize",
  PAN = "pan",
}

/**
 * This function only works for android
 * @param type Check SoftInputMode enum
 */
export function toggleSoftInputMode(type: SoftInputMode) {
  if (Platform.OS === "android") {
    NativeModules.HelperModule.changeSoftInputMethod(type);
  }
}
