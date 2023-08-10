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
    ...Fonts.style.textBodySTC,
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
  textInput: {
    color: Colors.darkerGrey,
    borderColor: Colors.lightGrey,
    borderRadius: 5,
  },

  label: {
    textTransform: "none",
    ...Fonts.style.labelsSTC,
  },
  textFieldIcon: {
    color: Colors.wedgeBlue,
    fontSize: 15,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textStyle: { color: Colors.red, fontWeight: "bold", fontSize: 16 },
});
