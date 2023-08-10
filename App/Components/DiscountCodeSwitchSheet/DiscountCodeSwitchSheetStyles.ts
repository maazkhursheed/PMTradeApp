import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  doneStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  selectionItem: {
    ...Fonts.style.openSans18Regular,
  },
  valueItem: {
    ...Fonts.style.openSans18Regular,
    color: Colors.darkGrey,
    marginRight: 12,
  },
  message: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginRight: 12,
    alignSelf: "center",
    textAlign: "center",
  },
  iconStyle: {
    alignSelf: "center",
    height: 14,
    color: Colors.darkGrey,
    marginTop: 4,
  },
  smallSeparator: {
    backgroundColor: Colors.lightGrey,
    height: 1,
    opacity: 100,
    marginVertical: 16,
  },
  inputContainerStyle: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: Colors.offWhite,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.offWhite,
    height: 40,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black, width: "85%" },
  messageView: {
    flex: 0.85,
    marginHorizontal: 40,
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    justifyContent: "center",
  },
  closeIcon: {
    paddingLeft: 6,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
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
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGrey,
    marginVertical: 8,
  },
  modalBtn: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tryAgainBtnText: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  closeBtnText: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  modelError: {
    alignItems: "center",
    paddingBottom: 10,
  },
  errorView: { marginVertical: 12 },
  titleStyle: { ...Fonts.style.openSans18Bold },
  applyText: {
    ...Fonts.style.openSans16,
    marginRight: 18,
  },
  loadingView: {
    flex: 0.85,
    marginTop: 15,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 18,
  },
});
