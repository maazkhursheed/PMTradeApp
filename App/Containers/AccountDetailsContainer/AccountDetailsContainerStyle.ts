import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textContainer: {
    paddingVertical: 18,
    marginLeft: 24,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  label: {
    ...Fonts.style.openSans18Regular,
    marginRight: 8,
  },
  cancelText: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    paddingLeft: 16,
  },
  text: {
    ...Fonts.style.openSans18Regular,
    color: Colors.darkGrey,
    flex: 1,
    marginTop: 10,
    textAlign: "left",
    marginRight: 20,
  },
  infoText: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 45,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  checkoutButtonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sheetTextContainer: {
    marginLeft: 24,
    paddingRight: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tick: {
    color: Colors.lightBlue,
    fontSize: 18,
  },
  sheetSelectedText: {
    ...Fonts.style.openSans18Bold,
  },
  sheetText: {
    ...Fonts.style.openSans18Regular,
  },
  modelError: {
    alignItems: "center",
    paddingBottom: 10,
  },
  invalidCodeTxt: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    textAlign: "center",
  },
  modalBtn: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    marginVertical: 12,
    paddingLeft: 30,
    paddingRight: 30,
  },
  closeBtnText: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  separatorPopUp: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGrey,
    marginVertical: 8,
  },
});
