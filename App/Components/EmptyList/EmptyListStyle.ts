import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 48,
  },
  header: {
    textAlign: "center",
    ...Fonts.style.openSansExtraBold28,
  },
  link: {
    marginTop: 24,
    textAlign: "center",
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
  },
});
