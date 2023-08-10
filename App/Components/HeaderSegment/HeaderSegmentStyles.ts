import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "stretch",
    flexDirection: "row",
    paddingHorizontal: 2,
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: Colors.segmentBackgroundColor,
  },
  pillStyleContainer: {
    borderRadius: 6,
    position: "absolute",
    backgroundColor: Colors.lightBlue,
  },
  textStyle: {
    paddingVertical: 10,
    textAlign: "center",
    flex: 1,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
  },
});
