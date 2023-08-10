import { StyleSheet } from "react-native";
import { isLargeDevice } from "~root/Lib/CommonHelper";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  firstImage: {
    flex: 0.8,
    marginTop: 10,
  },
  text: {
    ...Fonts.style.ctaLarge,
    textAlign: "center",
    fontSize: 15,
    marginHorizontal: isLargeDevice() ? 50 : 0,
    marginTop: 20,
    lineHeight: 25,
    position: "absolute",
  },
  skipBtn: {
    alignSelf: "center",
  },
  skipText: {
    ...Fonts.style.ctaSmall,
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableStyle: {
    flex: 1,
  },
});
