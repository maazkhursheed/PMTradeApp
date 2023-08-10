import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
  back: {
    fontSize: 20,
  },
  heading: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 32,
    color: Colors.black,
    marginBottom: 8,
  },
  subHeading: {
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
    fontSize: 14,
    marginBottom: 6,
  },
  bottomText: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 20,
  },
  notificationText: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  modalText: {
    ...Fonts.style.subtitleLowlight,
    marginBottom: 20,
  },
  accountNameStyle: {
    flex: 1,
  },
});
