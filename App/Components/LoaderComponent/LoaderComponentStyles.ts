import { StyleSheet } from "react-native";
import { Colors, Metrics } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    position: "absolute",
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.windowTint,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: { ...Fonts.style.ctaSmall },
});
