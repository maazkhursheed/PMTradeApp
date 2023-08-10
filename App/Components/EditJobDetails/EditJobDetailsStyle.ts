import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  editJobStyle: {
    ...Fonts.style.openSans16Regular,
    fontWeight: "bold",
    color: colors.lightBlue,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    paddingRight: 18,
  },
});
