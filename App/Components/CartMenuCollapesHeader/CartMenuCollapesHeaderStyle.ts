import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  subTotalText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
  },
  collapesHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  collapesHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cartText: {
    color: Colors.darkGrey,
    marginLeft: 10,
    marginRight: 5,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
  },
  totalPrizeWraper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
