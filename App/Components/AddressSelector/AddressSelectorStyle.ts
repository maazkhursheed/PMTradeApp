import { Platform, StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
    justifyContent: "center",
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...ApplicationStyles.shadow,
  },
  mapAndInfoContainer: {
    minHeight: 207,
  },
  addIconStyle: {
    fontSize: 32,
    color: colors.lightGrey,
    alignSelf: "center",
  },
  addIconContainer: {
    flex: 1,
    justifyContent: "center",
  },
  changeAddressStyle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    textAlign: "center",
    marginBottom: 24,
    paddingRight: 18,
  },
});
