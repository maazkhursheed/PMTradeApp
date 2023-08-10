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
  touchableOpacityStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewStyle: {
    justifyContent: "center",
    backgroundColor: colors.faintWedgeBlue,
    borderRadius: 100,
    width: 20,
    height: 20,
  },
  selectedView: {
    alignSelf: "center",
    backgroundColor: colors.lightBlue,
    borderRadius: 100,
    width: 12,
    height: 12,
  },
});
