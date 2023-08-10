import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  header: {
    ...Fonts.style.openSansExtraBold28,
    color: Colors.black,
    marginHorizontal: 24,
    marginTop: 25,
    marginBottom: 27.5,
  },
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 130,
  },
  topHeading: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  messageStyle: {
    textAlign: "center",
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 12,
    color: Colors.darkGrey,
  },
  bottomMessageStyle: {
    textAlign: "center",
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 12,
    color: Colors.darkGrey,
    marginTop: 12,
  },
  linkStyle: {
    color: Colors.lightBlue,
  },
  retryButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  retryButtonStyle: {
    borderRadius: 10,
    height: 45,
    marginTop: 20,
  },
  cancelButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.lightBlue,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.snow,
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 10,
    height: 45,
    marginTop: 20,
  },
  deliveryViewContainer: {
    backgroundColor: Colors.white,
  },
  loadingViewStyle: {
    marginTop: 30,
  },
});
