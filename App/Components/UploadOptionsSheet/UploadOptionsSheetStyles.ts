import { Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  buttonStyle: {
    width: Dimensions.get("window").width,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    paddingVertical: 20,
  },
  buttonText: { ...Fonts.style.openSans16, textAlign: "center", color: colors.lightBlue },
  loadingView: { flex: 1 },
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
