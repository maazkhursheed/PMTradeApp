import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  rightItemBtn: {
    color: Colors.black,
  },
  icon: {
    color: Colors.textInverse,
    fontSize: 25,
    transform: [{ rotate: "90deg" }],
  },
  textStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.white,
    marginRight: 5,
  },
  close: {
    fontSize: 18,
    alignSelf: "center",
    color: Colors.white,
  },
  rightButton: { flexDirection: "row", paddingHorizontal: 15 },
  bottomViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topViewContainer: {
    width: "100%",
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
  },
  initials: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 49,
    color: Colors.lightGrey,
    textAlign: "center",
  },
  infoItemView: {
    paddingVertical: 10,
    backgroundColor: Colors.textInverse,
    paddingHorizontal: 24,
  },
  separator: {
    backgroundColor: Colors.offWhite,
    height: 8,
  },
  signout: {
    ...Fonts.style.openSans18Regular,
    color: Colors.darkRed,
  },
  itemValue: {
    ...Fonts.style.openSans16Regular,
  },
  itemLabel: { ...Fonts.style.openSans14, color: Colors.darkGrey },
  subSeparator: {
    backgroundColor: Colors.lightGrey,
    marginLeft: 24,
    height: 0.5,
  },
  scrollView: {
    flex: 1,
  },
});
