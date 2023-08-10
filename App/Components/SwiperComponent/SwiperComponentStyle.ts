import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  animatedViewStyle: {
    height: "100%",
    position: "absolute",
  },
  swipeRightToPopOneScreenEnabler: {
    position: "absolute",
    width: "6%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  archiveViewStyle: {
    backgroundColor: Colors.darkBlue,
    justifyContent: "center",
    height: "100%",
  },
  btnViewStyle: {
    backgroundColor: Colors.darkRed,
    justifyContent: "center",
    height: "100%",
  },
  deleteView: {
    backgroundColor: Colors.darkRed,
    justifyContent: "center",
    width: 100,
    alignItems: "center",
  },
  iconStyle: {
    color: Colors.white,
    fontSize: 24,
  },
  textStyle: {
    ...Fonts.style.openSans18Bold,
    fontSize: 12,
    color: Colors.white,
  },
  editView: {
    justifyContent: "center",
    width: 100,
    height: "100%",
    alignItems: "center",
  },
  iconStyleEdit: {
    color: Colors.lightBlue,
    fontSize: 24,
  },
  textStyleEdit: {
    ...Fonts.style.openSans18Bold,
    fontSize: 12,
    color: Colors.lightBlue,
  },
});
