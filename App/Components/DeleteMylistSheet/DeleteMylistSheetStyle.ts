import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonStyle: {
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    paddingVertical: 20,
  },
  button1Text: {
    ...Fonts.style.openSans16Bold,
    textAlign: "center",
    color: Colors.darkBlueHeader,
  },
  renameText: { ...Fonts.style.openSans16, textAlign: "center", color: Colors.lightBlue },
  buttonText: { ...Fonts.style.openSans16, textAlign: "center", color: Colors.darkRed },
  buttonTextEditQuote: { ...Fonts.style.openSans16, textAlign: "center", color: Colors.darkBlueHeader },
  loadingView: { backgroundColor: colors.white },
  titleStyle: {
    ...Fonts.style.openSans18Bold,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
});
