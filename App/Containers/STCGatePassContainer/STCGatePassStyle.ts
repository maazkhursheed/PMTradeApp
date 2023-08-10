import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 24,
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
  orderCompleteText: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 16,
    color: Colors.snow,
    marginBottom: 5,
  },
  headerText: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 14,
    color: Colors.snow,
  },
  packNoText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    color: Colors.black,
  },
  timeText: {
    ...Fonts.style.subtitleSmall,
    marginBottom: 30,
  },
  orderCompleteInfo: {
    backgroundColor: Colors.darkBlue,
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 18,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  SKU: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: { color: Colors.snow },
  orderCompleteContainer: { marginLeft: 10, marginRight: 60 },
  orderList: { marginTop: 10 },
});
