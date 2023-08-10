import { StyleSheet } from "react-native";
import style from "~root/Containers/STCTradeAccount/STCTradeAccountStyle";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  ...style,
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
