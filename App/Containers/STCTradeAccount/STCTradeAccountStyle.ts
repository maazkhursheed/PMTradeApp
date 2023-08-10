import { StyleSheet } from "react-native";
import { Colors, Metrics } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 17,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 60,
    marginTop: 10,
  },
  newView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  newTextView: {
    backgroundColor: Colors.yellow,
    marginRight: 8,
    borderRadius: 8,
  },
  newText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 12,
    color: Colors.black,
    paddingHorizontal: 6,
    paddingVertical: 2,
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
  sectionList: {
    backgroundColor: Colors.snow,
    flex: 1,
  },
  sectionHeaderTitle: {
    height: 48,
    justifyContent: "center",
    backgroundColor: Colors.backgroundSTCGrey,
    paddingHorizontal: 24,
  },
  sectionContainerStyle: {
    paddingBottom: Metrics.screenHeight * 0.11,
  },
  itemStyle: {
    marginHorizontal: 24,
  },
  iconStyle: {
    fontSize: 18,
    textAlign: "right",
    color: Colors.black,
  },
});
