import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listStyle: {
    marginTop: 10,
  },
  inputContainerStyle: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: Colors.offWhite,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.offWhite,
    height: 40,
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 16,
  },
  iconStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: Colors.darkGrey,
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
    paddingTop: 10,
  },
  bottomOnlyShadowStyle: {
    overflow: "hidden",
    paddingBottom: 5,
  },
  activityIndicatorStyle: {
    alignSelf: "center",
  },
  listContainerStyle: {
    flex: 1,
    paddingLeft: 18,
    borderTopWidth: 0,
  },
  listHeaderStyle: {
    marginTop: 15,
  },
});
