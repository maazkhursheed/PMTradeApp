import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  title: {
    ...Fonts.style.bodyHighlight,
  },
  description: {
    ...Fonts.style.subtitleLowlight,
    fontSize: 12,
  },
  descriptionOrange: {
    ...Fonts.style.subtitleLowlight,
    fontSize: 12,
    color: Colors.orange,
  },
  viewStyle: {
    flex: 1,
    marginRight: 20,
  },
});
