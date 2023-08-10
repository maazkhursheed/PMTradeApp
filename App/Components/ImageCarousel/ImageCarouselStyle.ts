import { StyleSheet } from "react-native";
import { Metrics } from "~root/Themes";

export default StyleSheet.create({
  imageContainer: {
    width: Metrics.screenWidth - 48,
    aspectRatio: 1.6,
  },
  flatList: {
    backgroundColor: "white",
    paddingBottom: 28,
  },
});
