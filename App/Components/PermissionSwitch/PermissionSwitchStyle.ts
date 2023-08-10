import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  view: {
    flexDirection: "row",

    paddingHorizontal: 5,
    alignItems: "center",
  },
  lockIcon: {
    marginRight: 5,
    fontSize: 15,
    color: colors.wedgeBlue,
    paddingTop: 5,
  },
});
