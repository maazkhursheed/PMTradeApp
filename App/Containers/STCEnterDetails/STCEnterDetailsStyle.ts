import { Dimensions, Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  headerTitle: {
    fontSize: 32,
    marginTop: 32,
    fontFamily: Fonts.type.SFProBold,
    color: Colors.black,
  },
  scroller: {
    marginHorizontal: 24,
  },
  closeBtn: {
    color: Colors.lightBlue,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.type.SFProBold,
    marginTop: 24,
    color: Colors.black,
  },
  body: {
    fontSize: 18,
    fontFamily: Fonts.type.SFProRegular,
    marginTop: 8,
    lineHeight: 24,
    color: Colors.black,
  },
  bodyBold: {
    fontSize: 18,
    fontFamily: Fonts.type.SFProBold,
    lineHeight: 24,
    color: Colors.black,
  },
  pickerView: {
    height: 60,
    marginTop: 24,
  },
  recentTextShadow: {
    backgroundColor: Colors.snow,
    elevation: Platform.select({ ios: 0, android: 1 }),
    zIndex: Platform.select({ ios: -1, android: 1 }),
    shadowColor: Colors.lightWedgeBlue,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 0.6, android: 0.6 }),
    shadowRadius: Platform.select({ ios: 10, android: 2 }),
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderTopWidth: Platform.select({ android: 0, ios: 0 }),
    borderBottomColor: "#c9c9c9",
  },
  recentPurchasesContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
  },
  recentPurchasesText: {
    marginLeft: 24,
    flex: 1,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 18,
    color: "black",
  },
  moreIcon: {
    fontSize: 18,
    marginRight: 24,
    alignSelf: "center",
    textAlign: "right",
    transform: [{ rotate: "90deg" }],
  },
  imageStyle: {
    height: Dimensions.get("window").height * 0.4,
    width: "100%",
  },
  accountPO: {
    marginVertical: 32,
    marginHorizontal: 24,
  },
  rowStyle: {
    flexDirection: "row",
  },
  cancelOrderButton: {
    color: Colors.subHeadingColor,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 16,
  },
  titleStyle: { textTransform: "none" },
  textFieldStyle: { color: Colors.black },
  fieldViewStyle: { backgroundColor: Colors.snow },
  viewStyle: { marginTop: 16 },
  infoText: {
    fontSize: 14,
    fontFamily: Fonts.type.SFProRegular,
    marginTop: 8,
    lineHeight: 24,
    color: Colors.black,
  },
});
