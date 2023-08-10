import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  imageContainer: {
    width: Metrics.screenWidth - 48,
    aspectRatio: 1.6,
  },
  flatList: {
    backgroundColor: "white",
  },
  mainContainer: {
    width: Metrics.screenWidth,
    minHeight: Metrics.screenWidth / 2,
  },
  mainTile: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  promotionText: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.ochre,
    fontSize: 14,
    marginBottom: 4,
  },
  promotionTextDarkBackground: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  mainTextLightBackground: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    color: Colors.black,
    fontSize: 28,
  },
  bodyTextLightBackground: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.black,
    fontSize: 16,
    marginVertical: 8,
  },
  footerTextLightBackground: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.darkGrey,
    fontSize: 12,
    marginBottom: 30,
  },
  mainTextDarkBackground: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    color: Colors.white,
    fontSize: 28,
  },
  bodyTextDarkBackground: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.white,
    fontSize: 16,
    marginVertical: 8,
  },
  footerTextDarkBackground: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.white,
    fontSize: 12,
    marginBottom: 30,
  },
  buttonDarkBackground: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 32,
    borderRadius: 8,
  },
  buttonTextDarkBackground: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansBold,
  },
  buttonLightBackground: {
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    width: 96,
    height: 32,
    borderRadius: 8,
  },
  buttonTextLightBackground: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansBold,
  },
  imageBackgroundStyle: { aspectRatio: 1.33 },
  imageView: { width: 80, height: 24 },
  containerStyle: {
    position: "absolute",
    bottom: -16,
    width: "100%",
    alignSelf: "stretch",
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "black",
  },
  inactiveDotStyle: {
    backgroundColor: "white",
  },
});
