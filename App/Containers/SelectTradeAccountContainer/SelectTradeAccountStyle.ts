import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.snow,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 0,
    marginVertical: 2,
  },
  tickIcon: {
    color: Colors.black,
    fontSize: 16,
  },
  header: {
    ...Fonts.style.header2,
    backgroundColor: Colors.snow,
  },
  title: {
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.lightBlue,
    marginLeft: 22,
  },
  disabledTitle: {
    ...Fonts.style.subtitleSmall,
    color: Colors.lightBlue,
    marginLeft: 22,
  },
  selectedTitle: {
    color: colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
    marginLeft: 6,
  },
  sectionList: {
    marginTop: 30,
    marginBottom: 10,
  },
  sectionFooter: {
    height: 10,
  },
  expandIcon: {
    fontSize: 20,
    marginRight: 0,
    color: Colors.steel,
    alignSelf: "flex-end",
    alignContent: "flex-end",
  },
  expandBtn: {
    marginRight: 20,
    alignSelf: "flex-end",
  },
  tradeAccountContainer: {
    flexDirection: "row",
  },
});
