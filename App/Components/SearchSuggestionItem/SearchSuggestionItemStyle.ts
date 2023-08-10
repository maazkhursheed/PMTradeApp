import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    marginRight: 16,
    color: Colors.darkGrey,
  },
  textHighlighted: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    color: Colors.black,
  },
  text: {
    flex: 1,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    color: Colors.black,
  },
});
