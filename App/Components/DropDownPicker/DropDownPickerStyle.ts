import { Platform, StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  back: {
    fontSize: 20,
  },
  pickerContainer: {
    height: 70,
  },
  textFieldIcon: {
    color: Colors.wedgeBlue,
    fontSize: 15,
  },
  smallRoundBtn: {
    position: "absolute",
    alignSelf: "center",
    right: 30,
    justifyContent: "center",
    backgroundColor: colors.wedgeBlue,
    borderRadius: 100,
    height: 18,
    width: 18,
    zIndex: 3,
    top: 40,
  },
  picker: {
    width: "100%",
    opacity: Platform.select({ ios: 1, android: 0 }),
    height: 70,
    position: "absolute",
    marginTop: 20,
  },
  closeIcon: {
    fontSize: 7,
    color: colors.snow,
  },
  textView: {
    width: "100%",
    position: "absolute",
  },
  activityIndicatorStyle: {
    alignSelf: "center",
  },
  textStyle: { paddingHorizontal: 20 },
});
