import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    height: Platform.select({ ios: 100, android: 80 }),
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pdfIcon: {
    fontSize: 22,
    color: Colors.darkGrey,
    paddingHorizontal: 10,
  },
  quoteAttached: {
    ...Fonts.style.openSans16Bold,
    color: Colors.darkGrey,
  },
});
