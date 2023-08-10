import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: Colors.white },
  headerStyle: {
    elevation: 2,
  },
  titleStyle: { ...Fonts.style.openSans18Bold, marginLeft: 0 },
  mainView: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
  loadingView: { flex: 1 },
  saveButtonActiveStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  saveButtonInActiveStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightGrey,
    marginRight: 10,
  },
  imageName: {
    ...Fonts.style.openSans16Bold,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  imageStyle: {
    width: "100%",
    height: 220,
  },
  placeHolder: {
    width: "100%",
    height: 220,
    backgroundColor: colors.shadowWithAlpha,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    fontSize: 50,
    color: colors.darkGrey,
    textAlign: "center",
  },
  textInput: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
    height: 30,
    fontWeight: "400",
  },
  errorMsg: {
    color: "#CE1141",
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    marginHorizontal: 22,
    marginTop: 10,
  },
  errorView: {
    backgroundColor: Colors.errorLight,
    borderBottomColor: Colors.darkRed,
  },
  bottomSheetBackGround: { backgroundColor: Colors.white },
});
