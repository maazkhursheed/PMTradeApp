import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  searchField: {
    marginHorizontal: 16,
  },
  titleText: {
    textTransform: "none",
    color: Colors.white,
    flex: 1,
  },
  back: {
    fontSize: 20,
    color: Colors.white,
  },
  icon: {
    color: Colors.textInverse,
    fontSize: 25,
    transform: [{ rotate: "90deg" }],
  },
  headerStyle: { backgroundColor: Colors.brandPrimary },
  btn: {
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  rightItemBtn: {
    color: Colors.black,
    paddingHorizontal: 12,
  },
  mainShadowContainer: {
    shadowColor: Colors.lightWedgeBlue,
    elevation: 6,
    zIndex: 1,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 0.9, android: 0.9 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: "#c9c9c9",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerContainer: {
    elevation: 1,
    zIndex: 10,
  },
  renameText: { ...Fonts.style.openSans16, color: Colors.lightBlue },
  headerText: { ...Fonts.style.openSans18Bold },
  deleteText: { ...Fonts.style.openSans16, color: Colors.darkRed },
  container: {
    alignItems: "center",
  },
  buttonStyle: {
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.borderGrey,
    paddingVertical: 20,
  },
  button1Text: {
    ...Fonts.style.openSans16Bold,
    textAlign: "center",
    color: Colors.darkBlueHeader,
  },
  renameTextSheet: { ...Fonts.style.openSans16, textAlign: "center", color: Colors.lightBlue },
  buttonText: { ...Fonts.style.openSans16, textAlign: "center", color: Colors.darkRed },
  buttonTextEditQuote: { ...Fonts.style.openSans16, textAlign: "center", color: Colors.darkBlueHeader },
  loadingView: { backgroundColor: Colors.white },
  titleStyle: {
    ...Fonts.style.openSans18Bold,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
});
