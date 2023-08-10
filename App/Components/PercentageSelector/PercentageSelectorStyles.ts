import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  view: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.faintWedgeBlue,
    padding: 5,
    borderRadius: 8,
  },
  prcntText: {
    ...Fonts.style.openSans18Bold,
    minWidth: 120,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  container: {
    flexDirection: "column",
  },
});
