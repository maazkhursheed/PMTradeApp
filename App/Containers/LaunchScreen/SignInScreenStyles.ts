import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.loginBackground,
    flex: 1,
  },
  view: {
    marginTop: 50,
    padding: 30,
    alignSelf: "center",
  },

  logo: {
    alignSelf: "center",
  },

  signInText: {
    ...Fonts.style.btnLarge,
  },

  signInHeading: {
    ...Fonts.style.header1,
    marginTop: 60,
    textAlign: "left",
    color: Colors.fontColor,
    fontSize: 20,
  },
  forgotPwdText: {
    color: colors.lightBlue,
    marginTop: 50,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
  },
  safeAreaStyle: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    paddingTop: 50,
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  logoStyle: {
    alignItems: "center",
  },
  registerContainer: {
    marginTop: 50,
  },
  labelTopStyle: {
    ...Fonts.style.openSans14,
    color: Colors.white,
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "400",
  },
  labelMidStyle: {
    ...Fonts.style.openSans14,
    color: Colors.white,
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "700",
  },
  viewStyleGrey: {
    backgroundColor: Colors.lineGrey,
    height: 1,
    marginVertical: 25,
    opacity: 0.5,
  },
  disclosureStyle: {
    ...Fonts.style.supplierMessage,
    color: colors.white,
    textAlign: "center",
    fontWeight: "400",
  },
  disclosureAccountStyle: {
    ...Fonts.style.supplierMessage,
    color: colors.white,
    textAlign: "center",
    fontWeight: "700",
    fontStyle: "italic",
    marginTop: 14,
  },
  clickHere: {
    ...Fonts.style.supplierMessage,
    color: colors.white,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "700",
    marginTop: 14,
    textDecorationLine: "underline",
  },
  registerButtonStyle: {
    backgroundColor: colors.registerBtnYellow,
    height: 50,
    borderRadius: 3,
  },
  registerButtonText: {
    color: Colors.black,
    fontWeight: "normal",
    fontSize: 14,
  },
  ORContainer: {
    flexDirection: "row",
    marginVertical: 30,
  },
  viewStyle: {
    backgroundColor: "white",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  ORLabelStyle: {
    ...Fonts.style.ctaSmall,
    alignSelf: "center",
    color: Colors.snow,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  versionContainerStyle: {
    flex: 1,
    marginTop: 90,
    justifyContent: "flex-end",
  },
  versionStyle: {
    ...Fonts.style.labelsData,
    textAlign: "center",
  },
  signInBtn: {
    height: 50,
    borderRadius: 3,
  },
  signInButtonText: {
    fontWeight: "normal",
    fontSize: 14,
  },
  mainLogoStyle: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    ...Fonts.style.supplierMessage,
    color: colors.white,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 14,
  },
});
