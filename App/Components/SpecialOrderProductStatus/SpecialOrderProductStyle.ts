import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 8,
  },
  specialText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.tickGreen,
  },
  iconStyle: {
    fontSize: 16,
    marginRight: 4,
  },
});
