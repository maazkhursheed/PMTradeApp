import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  bottomViewContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topViewContainer: {
    width: "100%",
    height: 280,
    backgroundColor: colors.offWhite,
    justifyContent: "center",
  },
  initials: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 49,
    color: colors.lightGrey,
    textAlign: "center",
  },
  infoItemView: {
    paddingVertical: 15,
    backgroundColor: Colors.textInverse,
    paddingLeft: 24,
  },
  separator: {
    backgroundColor: Colors.offWhite,
    height: 8,
  },
  signout: {
    ...Fonts.style.openSans18Regular,
    color: colors.darkRed,
  },
  itemValue: {
    ...Fonts.style.openSans18Regular,
  },
  itemLabel: { ...Fonts.style.openSans14, color: Colors.darkGrey },
  subSeparator: {
    backgroundColor: colors.lightGrey,
    marginLeft: 24,
    height: 0.5,
  },
  close: {
    fontSize: 18,
    alignSelf: "center",
    color: colors.black,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  scrollView: {
    flex: 1,
  },
});
