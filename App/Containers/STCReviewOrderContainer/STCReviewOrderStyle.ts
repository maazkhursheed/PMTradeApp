import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    color: Colors.black,
  },
  closeBtn: {
    fontSize: 16,
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontWeight: "normal",
  },
  subHeading: {
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
    fontSize: 14,
    marginBottom: 6,
  },
  heading: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 32,
    color: Colors.black,
    marginBottom: 8,
  },
  bottomText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    marginBottom: 16,
  },
  redtext: {
    color: Colors.darkRed,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 14,
    marginBottom: 30,
  },
  itemText: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
  itemDescription: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
    color: Colors.black,
  },
  itemUnit: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
    color: Colors.black,
    marginRight: 24,
  },
  somethingWrongText: {
    alignSelf: "center",
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 30,
    marginTop: 30,
  },
  footerButton: {
    flex: 1,
    borderRadius: 8,
    marginLeft: 5,
    ...ApplicationStyles.shadow,
  },
  safeAreaView: {
    flexDirection: "row",
    marginHorizontal: 12,
    alignSelf: "stretch",
  },
  addProductsButton: {
    marginRight: 3,
    backgroundColor: Colors.backgroundSTCGrey,
  },
  errorModal: {
    alignSelf: "flex-start",
    marginBottom: 20,
    ...Fonts.style.subtitleLowlight,
  },
  SKU: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: { marginTop: 10 },
  addProductsView: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignSelf: "stretch",
  },
  addButtonStyle: {
    marginRight: 5,
    backgroundColor: Colors.backgroundSTCGrey,
    flex: 1,
    borderRadius: 8,
    ...ApplicationStyles.shadow,
  },
});
