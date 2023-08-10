import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  showOpacityStyle: {
    backgroundColor: Colors.textInverse,
    opacity: 0.7,
  },
});
