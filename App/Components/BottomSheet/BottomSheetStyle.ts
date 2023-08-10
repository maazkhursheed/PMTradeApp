import { StyleSheet } from "react-native";
import { Colors, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    elevation: 5,
    zIndex: 10,
    elevation: 2,
    backgroundColor: Colors.windowTint,
  },
  contentContainer: {
    height: Metrics.screenHeight,
  },
  mainView: {
    flex: 1,
    paddingTop: 10,
  },
  buttonStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  footerView: {
    position: "absolute",
    elevation: 10,
    zIndex: 10,
    width: "100%",
    bottom: 0,
  },
});
