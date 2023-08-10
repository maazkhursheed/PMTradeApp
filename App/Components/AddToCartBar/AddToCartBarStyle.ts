import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    height: 95,
    paddingHorizontal: 40,
    paddingVertical: 15,
    shadowColor: Colors.lightWedgeBlue,
    elevation: 6,
    zIndex: 1,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 0.9, android: 0.9 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
    borderTopWidth: Platform.select({ android: 0.1, ios: 0.3 }),
    borderTopColor: Colors.backgroundSTCGrey,
    backgroundColor: "#fff",
  },
  iconViewAddToList: {
    backgroundColor: Colors.offWhite + "bf",
    width: 80,
    height: 40,
    paddingTop: 5,
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  },
  iconViewAddToCart: {
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    width: 239,
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  iconStyle: {
    fontSize: 24,
    color: Colors.black,
  },
  containerStyles: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  addToCartStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansBold,
    marginLeft: 8,
  },
  subTotalViewStyle: {
    alignItems: "center",
    paddingBottom: 25,
    marginTop: 10,
    flexDirection: "row",
  },
  subTotalTextStyle: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  styleFlexDirection: {
    flexDirection: "row",
  },
});
