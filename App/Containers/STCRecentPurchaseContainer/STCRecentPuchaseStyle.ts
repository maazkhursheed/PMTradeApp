import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  timeAndStatusStyle: {
    fontSize: 14,
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
  },
  orderNumberStyle: {
    fontSize: 18,
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.black,
  },
  poNumberStyle: {
    fontSize: 14,
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.black,
  },
  itemContainer: {
    marginHorizontal: 24,
    backgroundColor: Colors.snow,
    marginTop: 15,
  },
  purchaseInfo: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 6,
  },
  iconStyle: {
    fontSize: 20,
    textAlign: "right",
  },
  contentContainerStyle: {
    paddingBottom: Metrics.screenHeight * 0.11,
    backgroundColor: Colors.textInverse,
  },
  sectionHeader: {
    height: 48,
    justifyContent: "center",
    backgroundColor: Colors.backgroundSTCGrey,
  },
  sectionTitle: {
    marginHorizontal: 24,
    fontFamily: Fonts.type.SFProBold,
    fontSize: 16,
    color: Colors.subHeadingColor,
  },
  divider: { marginTop: 15 },
  sectionListStyle: { backgroundColor: Colors.textInverse },
  statusStyle: {
    fontSize: 14,
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
    textAlign: "right",
  },
});
