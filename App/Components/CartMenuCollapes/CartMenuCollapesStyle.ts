import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  editCartText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
    color: Colors.lightBlue,
  },
  mainContainer: {
    backgroundColor: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.offWhite,
  },
  cartContentWrapper: {
    paddingTop: 10,
  },
  editCartWrapper: {
    paddingVertical: 15,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
  },
  cartContainer: {
    marginTop: 10,
  },
});
