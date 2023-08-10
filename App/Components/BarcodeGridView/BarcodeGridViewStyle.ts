import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    width: "60%",
    aspectRatio: 3 / 2,
    justifyContent: "space-between",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridView: {
    width: 30,
    height: 30,
    borderColor: Colors.yellow,
  },
  gridTopLeftView: {
    borderTopLeftRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  gridTopRightView: {
    borderTopRightRadius: 10,
    borderRightWidth: 2,
    borderTopWidth: 2,
  },
  gridBottomLeftView: {
    borderBottomLeftRadius: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  gridBottomRightView: {
    borderBottomRightRadius: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
});
