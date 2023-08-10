import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 10,
  },
  branchName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.OpenSansRegular,
  },
  branchAddress: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.darkGrey,
    marginTop: 5,
  },
  itemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  listStyle: {
    borderBottomColor: Colors.offWhite,
    borderBottomWidth: 8,
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
  },
  iconStyle: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.darkGrey,
    alignSelf: "center",
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  branchItem: {
    width: "90%",
  },
});
