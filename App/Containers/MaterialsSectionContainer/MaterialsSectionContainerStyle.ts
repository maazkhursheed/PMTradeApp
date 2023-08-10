import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  rightItemBtn: {
    color: Colors.white,
    paddingHorizontal: 15,
  },
  icon: {
    color: Colors.textInverse,
    fontSize: 25,
    transform: [{ rotate: "90deg" }],
  },
  textStyle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 12,
    color: Colors.black,
  },
});
