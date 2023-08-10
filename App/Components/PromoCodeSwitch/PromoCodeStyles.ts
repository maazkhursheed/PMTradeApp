import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  loadingViewStyle: {
    height: 30,
    marginHorizontal: 10,
  },
  iconStyle: { color: Colors.lightGrey },
  viDiscount: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    height: 60,
  },
  promoIcon: {
    width: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  addDiscountText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    marginLeft: 5,
  },
});
