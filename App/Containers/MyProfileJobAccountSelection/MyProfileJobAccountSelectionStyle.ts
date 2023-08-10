import { StyleSheet } from "react-native";
import { Colors, Metrics } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtnStyle: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 17,
  },
  backBtnStyle: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 17,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginHorizontal: 24,
  },
  itemText: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 18,
    flex: 1,
    color: Colors.black,
  },
  header: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 16,
    color: Colors.subHeadingColor,
  },
  sectionList: {},
  jobAccount: {
    marginHorizontal: 24,
    fontFamily: Fonts.type.SFProBold,
    fontSize: 16,
    color: Colors.subHeadingColor,
  },
  jobAccountContainer: {
    height: 48,
    justifyContent: "center",
    backgroundColor: Colors.backgroundSTCGrey,
  },
  tickStyle: {
    fontSize: 18,
    textAlign: "right",
    color: Colors.darkBlue,
  },
  listStyle: { paddingBottom: Metrics.screenHeight * 0.11 },
  close: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
});
