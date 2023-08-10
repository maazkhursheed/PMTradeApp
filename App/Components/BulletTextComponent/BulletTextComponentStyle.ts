import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  bulletContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "flex-start",
  },
  bullet: {
    ...Fonts.style.labelsData,
    color: Colors.wedgeBlue,
  },
  bulletText: {
    ...Fonts.style.labelsData,
    marginLeft: 10,
    flex: 1,
    textAlign: "left",
    color: Colors.wedgeBlue,
  },
});
