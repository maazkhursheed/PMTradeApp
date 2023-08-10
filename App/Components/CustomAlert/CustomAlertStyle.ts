import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.transparent,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  semiTransparentView: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  contentView: {
    width: "92%",
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "#00000029",
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
  },
  icon: {
    fontSize: 24,
    color: Colors.red,
    alignSelf: "center",
  },
  heading: {
    ...Fonts.style.openSans16Bold,
    textAlign: "center",
  },
  subHeading: {
    ...Fonts.style.openSans16,
    textAlign: "center",
  },
  warningMessage: {
    ...Fonts.style.openSans14,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
    paddingBottom: 20,
  },
  warningMessageBlack: {
    ...Fonts.style.openSans14Bold,
    color: Colors.black,
  },
  button1: {
    ...Fonts.style.openSans16Bold,
    textAlign: "center",
    color: Colors.red,
  },
  button2: {
    ...Fonts.style.openSans16,
    textAlign: "center",
  },
  button1Container: {
    borderTopWidth: 1,
    borderColor: Colors.borderGrey,
    marginHorizontal: -20,
    paddingVertical: 15,
  },
  button2Container: {
    borderTopWidth: 1,
    borderColor: Colors.borderGrey,
    marginHorizontal: -20,
    paddingTop: 15,
  },
});
