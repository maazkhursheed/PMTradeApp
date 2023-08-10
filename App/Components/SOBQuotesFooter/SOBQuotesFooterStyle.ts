import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 0.09,
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
    justifyContent: "space-between",
  },
  buttonStyle: {
    borderRadius: 6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
    ...Fonts.style.openSans14Bold,
    color: colors.white,
  },
  totalContainer: {
    flexShrink: 1,
    marginLeft: 15,
    marginTop: 5,
  },
});
