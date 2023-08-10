import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  commonText: {
    paddingLeft: Metrics.textFieldIndentPadding,
    height: 50,
    flex: 1,
    ...Fonts.style.body,
  },
  textParentStyle: {
    marginTop: 5,
    paddingRight: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  error: { color: Colors.red, borderColor: Colors.red },
  textInput: { color: Colors.darkerGrey, borderColor: Colors.lightWedgeBlue },

  label: {
    textTransform: "none",
    ...Fonts.style.labels,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textStyle: { color: Colors.red, fontWeight: "bold", fontSize: 16 },
});
