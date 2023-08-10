import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    height: 812,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: Colors.textInverse,
    paddingLeft: 24,
  },
  linkItem: {
    ...Fonts.style.openSans18Regular,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.textInverse,
    color: Colors.lightBlue,
  },
  profileBtn: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.white,
    width: 60,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnTxt: {
    ...Fonts.style.openSans18Bold,
    color: Colors.ochre,
    fontSize: 24,
  },
  header: {
    fontSize: 32,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
  },
  accountsView: {
    flex: 1,
    paddingLeft: 0,
  },
  user: {
    ...Fonts.style.openSans18Bold,
    flex: 1,
    paddingLeft: 16,
  },
  separator: {
    backgroundColor: Colors.offWhite,
    height: 8,
  },
  smallSeparator: {
    backgroundColor: Colors.lightGrey,
    marginLeft: 24.5,
    height: 1,
    opacity: 100,
  },
  copyrightView: {
    paddingTop: 18,
    paddingHorizontal: 24,
    minHeight: 56,
    paddingBottom: 141,
  },
  copyrightText: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  selectionItem: {
    ...Fonts.style.openSans18Regular,
  },
  valueItem: { ...Fonts.style.openSans16Regular, color: Colors.darkGrey },
  subSeparator: {
    backgroundColor: Colors.darkGrey,
    marginLeft: 24,
    height: 0.4,
  },
  close: {
    fontSize: 18,
    alignSelf: "center",
    color: colors.black,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  chevron: {
    fontSize: 14,
    color: colors.darkGrey,
    flex: 0.1,
  },
  slider: {
    fontSize: 24,
    color: colors.darkGrey,
    marginRight: 20,
  },
});
