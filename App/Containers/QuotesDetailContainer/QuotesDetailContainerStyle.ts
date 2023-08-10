import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  quotesContainer: {
    flex: 1,
  },
  icon: {
    color: Colors.textInverse,
    fontSize: 25,
    transform: [{ rotate: "90deg" }],
  },
  rightItemBtn: {
    color: Colors.black,
  },
  moreIconStyle: { paddingHorizontal: 15 },
});
