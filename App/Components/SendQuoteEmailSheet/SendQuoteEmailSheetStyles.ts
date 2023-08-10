import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  loadingView: { flex: 1 },
  contentContainer: {
    backgroundColor: Colors.white,
  },
  modalContainer: {
    flex: 1,
  },
  modalFooter: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    elevation: 5,
    shadowColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  heading: {
    ...Fonts.style.openSans24Bold,
    margin: 20,
    marginTop: 30,
  },
  sendStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 0,
  },
  titleStyle: {
    ...Fonts.style.openSans18Bold,
  },
  buttonDisabled: {
    borderColor: Colors.wildSandColor,
    color: Colors.darkGrey,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
  body: {
    minHeight: Platform.select({ ios: 150, android: 300 }),
    paddingHorizontal: 20,
    marginVertical: 17,
    textAlignVertical: "top",
  },
});
