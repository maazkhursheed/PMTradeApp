import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
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
  iconStyle: {
    paddingLeft: 6,
    paddingRight: 3,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  inputContainerStyle: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: Colors.wildSandColor,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.wildSandColor,
    height: 40,
  },
  rightIcon: {
    fontSize: 22,
    alignSelf: "center",
    marginRight: 10,
    color: Colors.darkGrey,
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerContainer: {
    elevation: 1,
    zIndex: 10,
  },
});
