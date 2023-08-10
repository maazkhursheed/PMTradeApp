import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: "#DDDDDD",
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 18,
  },
  text: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.darkGrey,
    marginTop: 5,
  },
  moreLessText: {
    color: "#E3E3E3",
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansRegular,
  },
});
