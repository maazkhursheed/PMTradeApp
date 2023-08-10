import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  offlineContainer: {
    backgroundColor: Colors.error,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  offlineText: {
    ...Fonts.style.ctaSmall,
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: "center",
  },
});
