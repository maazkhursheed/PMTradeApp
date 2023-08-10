import { Platform, StyleSheet } from "react-native";
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
  shadowStyle: {
    shadowColor: Colors.shadow,
    elevation: 6,
    zIndex: 1,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 0.9, android: 0.9 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: "#c9c9c9",
    backgroundColor: "#fff",
  },
  bottomOnlyShadowStyle: {
    overflow: "hidden",
    paddingBottom: 5,
  },
  inputContainerStyle: {
    flexDirection: "row",
  },
  inputStyle: {
    ...Fonts.style.subtitle,
    color: Colors.black,
    marginHorizontal: 16,
    marginVertical: 15,
    paddingHorizontal: 16,
    flex: 2,
    textAlignVertical: "top",
    paddingBottom: 50,
  },
  messageView: {
    flex: 0.85,
    marginHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
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
  characterLimit: {
    ...Fonts.style.openSans16,
    backgroundColor: colors.white,
    padding: 20,
    width: "100%",
    textAlign: "right",
  },
  characterLimitContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 20,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: -2 },
    shadowColor: Platform.OS === "android" ? colors.darkGrey : colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
});
