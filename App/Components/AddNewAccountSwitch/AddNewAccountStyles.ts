import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  addAccountView: {
    minHeight: 60,
    flexDirection: "row",
    backgroundColor: Colors.textInverse,
    paddingLeft: 24,
  },
  accountsView: {
    flex: 1,
    paddingLeft: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  linkItem: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    color: Colors.lightBlue,
  },
});
