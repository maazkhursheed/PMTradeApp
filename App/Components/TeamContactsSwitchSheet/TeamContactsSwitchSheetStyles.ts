import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  doneStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
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
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginTop: 6,
  },
  sectionSeparator: {
    borderBottomColor: Colors.offWhite,
    borderBottomWidth: 8,
    marginVertical: 10,
  },
  parentBranch: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.medium,
    color: Colors.darkGrey,
    paddingBottom: 10,
    marginTop: 10,
  },
  headerTitleStyle: { ...Fonts.style.openSans18Bold },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 18,
  },
  newTextStyle: {
    ...Fonts.style.openSans16,
    marginRight: 18,
    color: Colors.lightBlue,
  },
  loadingView: { flex: 1 },
  contactItemView: { marginHorizontal: 20 },
  parentBranchView: { marginLeft: 20 },
});
