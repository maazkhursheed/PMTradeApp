import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

const styles = StyleSheet.create({
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: Colors.segmentBackgroundColor,
    marginBottom: 10,
    borderRadius: 8,
    padding: 2,
  },
  buttonSelected: {
    backgroundColor: Colors.lightBlue,
    justifyContent: "center",
    flex: 1,
    height: 40,
    borderRadius: 8,
  },
  buttonSelectedText: {
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.textLight,
    fontSize: 14,
  },
  buttonContainerInverse: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: "center",
    height: 40,
  },
  buttonTextInverse: {
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.black,
    fontSize: 14,
  },
  buttonEnd: {
    flex: 0.5,
    width: 50,
  },
});

export default styles;
