import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: "70%",
    aspectRatio: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    ...Fonts.style.openSans16Bold,
    marginTop: 22,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    ...Fonts.style.openSans16,
    color: colors.darkGrey,
    marginTop: 16,
    textAlign: "center",
    marginHorizontal: 24,
  },
  button: {
    ...Fonts.style.openSans14,
    color: colors.lightBlue,
    marginTop: 16,
  },
});
