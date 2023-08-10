import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    marginBottom: Platform.select({ android: -10, ios: 0 }),
    backgroundColor: colors.white,
    flexDirection: "row",
    ...ApplicationStyles.shadow,
    shadowOffset: {
      width: 0,
      height: -5,
    },
  },
  buttonStyle: {
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
  buttonStyleDisabled: {
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
  },
  buttonText: {
    ...Fonts.style.openSans14Bold,
    color: colors.white,
  },
});
