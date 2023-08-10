import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.lightBlue,
  },
  icon: {
    fontSize: 30,
    marginHorizontal: 10,
    textAlign: "left",
    color: Colors.snow,
  },
  text: {
    ...Fonts.style.btnLarge,
    flex: 1,
    textAlign: "left",
    alignItems: "center",
    padding: 0,
  },
  icon_chevron: {
    fontSize: 20,
    padding: 5,
    textAlign: "left",
    color: Colors.snow,
  },
});
