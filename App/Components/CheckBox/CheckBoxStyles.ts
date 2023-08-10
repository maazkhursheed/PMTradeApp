import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    ...Fonts.style.subtitle,
  },
  buttonStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewStyle: {
    borderRadius: 2,
    justifyContent: "center",
    backgroundColor: colors.faintWedgeBlue,
    width: 20,
    height: 20,
  },
  iconStyle: {
    color: colors.lightBlue,
    fontSize: 15,
    alignSelf: "center",
  },
});
