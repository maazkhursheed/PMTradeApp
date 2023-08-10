import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { ApplicationStyles, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  checkoutButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  normalCheckoutButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subTotalView: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 45,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  swipeLeftText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 40,
    alignSelf: "flex-end",
  },
  iconStyle: {
    fontSize: 24,
    color: Colors.lightGrey,
  },
  viDiscount: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    height: 60,
  },
  addDiscountText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    marginLeft: 16,
  },
  separator: {
    height: 8,
    backgroundColor: Colors.wildSandColor,
  },
  priceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
    height: 60,
  },
  priceViewCash: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 16,
    height: 60,
  },
  subTotalText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  subTotalTextCash: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
  },
  subDescTextCash: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
  },
  payLaterinfoView: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  subTotalIlaticCash: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansItalic,
    fontSize: 12,
    marginLeft: 4,
  },
  totalText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  lineSeparator: {
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  lineSeparatorCash: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginLeft: 16,
  },
  gstPrice: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  loadingViewStyle: {
    height: 30,
    marginHorizontal: 10,
  },
  loadingViewStyleCash: {
    flex: 1,
  },
  tagIconStyle: {
    fontSize: 18,
    marginRight: 8,
    paddingVertical: 5,
    color: Colors.lightGrey,
  },
  totalPriceStyle: {
    flexDirection: "row",
  },
  promoIcon: {
    width: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  disclosureContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
  },
  permissionViewStyle: {
    marginLeft: 16,
    marginTop: 4,
  },
  footerContainer: {
    paddingBottom: 32,
  },
  footerContainerCash: {
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  discountPriceView: {
    flexDirection: "row",
  },
  deliveryValue: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  deliveryValueCash: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansItalic,
    fontSize: 18,
    marginRight: 16,
  },
  subTotalPrice: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  totalPrice: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  gstText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 12,
    textAlign: "right",
    marginRight: 3,
  },
  gstExclusiveText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansItalic,
    fontSize: 12,
    textAlign: "right",
  },
  gstExclusiveText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansItalic,
    fontSize: 14,
    textAlign: "right",
  },
  disclosureText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginLeft: 10,
    marginRight: 16,
  },
  headerRowInstructions: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 10,
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.goldColor,
    backgroundColor: colors.whiteLinen,
    marginHorizontal: 20,
  },
  infoIcon: {
    color: colors.goldColor,
    fontSize: 16,
    marginTop: 3,
  },
  infoIconConstrained: {
    color: colors.lightGreen,
    fontSize: 16,
    marginTop: 3,
  },
  headerRowInstructionsConstrained: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    backgroundColor: colors.lighterGreen,
  },
  card: {
    ...ApplicationStyles.shadow,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 6,
    marginHorizontal: 16,
    alignSelf: "stretch",
    marginVertical: 18,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  priceViewWrapper: { flexDirection: "row", alignItems: "center" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
  },
  leftView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rightView: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
  },
});
