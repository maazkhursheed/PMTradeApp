import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  badgeContainer: {
    borderWidth: 2,
    borderColor: Colors.darkBlueHeader,
    borderRadius: 25,
    minWidth: 25,
    minHeight: 25,
    backgroundColor: Colors.brandDanger,
    position: "absolute",
    right: -12,
    top: 2,
    padding: 3,
    justifyContent: "center",
  },
  cartCounter: {
    color: Colors.textInverse,
    fontSize: 12,
    textAlign: "center",
  },
});
