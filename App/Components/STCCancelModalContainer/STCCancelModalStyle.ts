import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  modalView: {
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
    backgroundColor: Colors.windowTint,
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.snow,
    width: "90%",
    alignSelf: "center",
  },
  viewDetails: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  modalTitle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 20,
    textTransform: "none",
  },
  bodyText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
    color: Colors.black,
  },
  btn: {
    height: 48,
    marginHorizontal: 20,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  btnCancelTxt: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 18,
    color: Colors.lightBlue,
    paddingVertical: 5,
    textAlign: "center",
  },
  btnOKTxt: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 18,
    color: Colors.snow,
    paddingVertical: 5,
    textAlign: "center",
  },
  dividerStyle: {
    marginVertical: 10,
  },
  btnView: {
    marginBottom: 20,
  },
  btnYesBackgroundColor: {
    backgroundColor: Colors.lightBlue,
  },
  btnNoBackgroundColor: {
    backgroundColor: Colors.backgroundSTCGrey,
  },
});
