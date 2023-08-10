import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  applicationView: {
    backgroundColor: Colors.darkBlueHeader,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin,
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },

  base: {
    flexDirection: "row",
    height: 60,
    width: "90%",
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cartExtendedInner: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
  },
  extendedContainer: {
    flexDirection: "column",
    width: "90%",
    borderRadius: 6,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  extendedView: {
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  viewCartTextExtended: {
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansRegular,
    textAlign: "center",
    marginRight: 15,
    color: colors.lightBlue,
  },
  viewCartText: {
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansRegular,
    textAlign: "center",
    marginRight: 15,
    marginTop: 20,
    color: colors.lightBlue,
  },
  iconContainer: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  failureContainer: {
    marginLeft: 14,
    marginRight: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeButtonContainer: {
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 9,
    height: 9,
  },
  text1: {
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansRegular,
    marginBottom: 3,
    color: colors.darkGrey,
  },
  successToast: {
    fontSize: 20,
    color: Colors.greenCheck,
  },
  infoToast: {
    fontSize: 20,
    color: Colors.darkBlueHeader,
  },
  warningToast: {
    fontSize: 20,
    backgroundColor: Colors.ochre,
    borderRadius: 25,
    padding: 4,
    color: Colors.darkGrey,
  },
  profileBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#fff",
    width: 35,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnTxt: {
    ...Fonts.style.openSans18Bold,
    color: "#CB8836",
    fontSize: 18,
  },
  baseError: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  errorTxt: {
    ...Fonts.style.openSans16Regular,
    color: colors.darkGrey,
  },
  errorBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#fff",
    width: 24,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  quoteFailureIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  inputErrorStyle: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: colors.red,
    alignItems: "center",
    marginTop: 120,
  },
  inputErrorTxt: {
    ...Fonts.style.openSans14,
    color: colors.white,
    marginLeft: 10,
  },
  inputErrorIcon: {
    color: colors.white,
    fontSize: 24,
    margin: -14,
  },
  iconClose: {
    color: colors.white,
    fontSize: 16,
  },
});
