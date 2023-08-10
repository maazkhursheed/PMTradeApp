import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  textStyle: {
    ...Fonts.style.openSans24Bold,
    marginHorizontal: 30,
    textAlign: "center",
  },
  descText: {
    ...Fonts.style.openSans16,
    marginHorizontal: 40,
    textAlign: "center",
    marginTop: 10,
    color: colors.darkGrey,
  },
  learnMore: {
    ...Fonts.style.openSans16Regular,
    color: colors.lightBlue,
    textAlign: "center",
    marginTop: 24,
  },
  packageImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
