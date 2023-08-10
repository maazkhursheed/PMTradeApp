import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  changeContactStyle: {
    ...Fonts.style.openSans16Regular,
    color: colors.lightBlue,
    textAlign: "center",
    marginBottom: 24,
    paddingRight: 18,
  },
});
