import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  smallBtn: {
    height: 30,
    backgroundColor: colors.lightBlue,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  btnText: {
    color: "#ffffff",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 11,
    padding: 10,
  },
});
