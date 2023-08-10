import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 20,
  },
  validitytext: {
    color: Colors.darkRed,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 14,
  },
  modalText: {
    ...Fonts.style.subtitleLowlight,
    marginBottom: 20,
  },
  footerButton: {
    flex: 1,
    borderRadius: 8,
  },
  footerBackToReview: {
    flex: 1,
    borderRadius: 8,
  },
  buttonStyle: {
    margin: 20,
    backgroundColor: Colors.wildSandColor,
  },
  accountTextStyle: {
    flex: 1,
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
    fontSize: 14,
    marginBottom: 6,
  },
});
