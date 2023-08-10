import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
  },

  deleteText: {
    ...Fonts.style.openSans16,
    color: Colors.darkRed,
    marginTop: 20,
    marginBottom: 20,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.lighterGrey,
  },

  buttonStyle: {
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    paddingVertical: 20,
  },
  buttonText: { ...Fonts.style.openSans16, textAlign: "center", color: colors.lightBlue },
  headerStyle: {
    marginTop: -2,
    backgroundColor: Colors.white,
  },
  titleStyle: {
    ...Fonts.style.openSans18Bold,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
});
