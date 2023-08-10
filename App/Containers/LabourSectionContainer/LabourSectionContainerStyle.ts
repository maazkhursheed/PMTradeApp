import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.offWhite,
  },
  loadingView: {
    flex: 1,
    marginTop: 16,
  },
  rightItemBtn: {
    color: Colors.black,
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
  itemsContainer: {
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
});
