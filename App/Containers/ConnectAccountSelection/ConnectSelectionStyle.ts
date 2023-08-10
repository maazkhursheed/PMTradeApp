import { Dimensions, StyleSheet } from "react-native";
import { isLargeDevice } from "~root/Lib/CommonHelper";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.darkBlue,
  },
  container: {
    paddingHorizontal: 12,
    marginTop: 20,
  },
  header: {
    backgroundColor: Colors.darkBlue,
  },
  close: {
    fontSize: 20,
    color: Colors.snow,
  },
  segmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 12,
  },
  buttonSelected: {
    backgroundColor: Colors.darkBlue,
    justifyContent: "center",
    flex: 1,
    height: 30,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  buttonSelectedText: {
    fontFamily: Fonts.type.ProximaBold,
    color: Colors.textLight,
    fontSize: isLargeDevice() ? 12 : 9,
  },
  buttonContainerInverse: {
    flex: 1,
    color: Colors.lightBackground,
    backgroundColor: Colors.faintWedgeBlue,
    justifyContent: "center",
    marginRight: 5,
    height: 30,
  },
  buttonTextInverse: {
    fontFamily: Fonts.type.ProximaBold,
    color: Colors.lightWedgeBlue,
    fontSize: Dimensions.get("window").width >= 350 ? 12 : 9,
  },
  messageContainer: {
    marginVertical: 30,
    justifyContent: "flex-end",
  },
  message: {
    ...Fonts.style.body,
    alignSelf: "center",
    color: Colors.snow,
    fontSize: 12,
  },
  fullContainer: {
    flex: 1,
  },
  picker: {
    width: "100%",
    marginTop: 20,
    height: 70,
    opacity: 0,
  },
  modalMsg: {
    alignSelf: "flex-start",
    marginBottom: 30,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    color: Colors.wedgeBlue,
  },
  titleStyle: {
    color: Colors.snow,
    textTransform: "capitalize",
  },
  stepsTextContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  stepTextStyle: {
    color: "#bebebe",
    fontWeight: "bold",
    textAlign: "right",
  },
  ownerTxtStyle: {
    alignSelf: "flex-start",
    marginTop: 15,
    color: Colors.snow,
    fontWeight: "bold",
  },
  IDTextField: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Colors.snow,
  },
  IDTextViewStyle: {
    borderWidth: 0,
  },
  branchDropdownViewStyle: {
    borderWidth: 0,
  },
  branchDropdownContainerStyle: {
    backgroundColor: Colors.snow,
    height: 60,
  },
  dropdownIconStyle: {
    color: Colors.lightBlue,
    fontSize: 20,
  },
  inviteTxtStyle: {
    marginTop: 30,
    alignSelf: "flex-start",
    color: Colors.snow,
    fontWeight: "bold",
  },
  helpTextStyle: {
    color: Colors.snow,
    fontWeight: "bold",
  },
  contactUsButton: {
    alignSelf: "center",
    marginTop: 10,
  },
  enterAppContainer: {
    flex: 1,
    justifyContent: "center",
  },
  completeRegistrationStyle: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  completeRegistrationButton: {
    backgroundColor: "#efbf2e",
  },
  textStyle: {
    fontWeight: "bold",
  },
  enterTradeAccountText: {
    alignSelf: "flex-start",
    marginBottom: 20,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    color: Colors.wedgeBlue,
  },
  invitationTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  invitationButton: {
    backgroundColor: "#efbf2e",
    alignItems: "center",
    minHeight: 24,
  },
  invitationButtonContainer: {
    paddingTop: 24,
    paddingRight: 54,
    paddingLeft: 54,
  },
});
