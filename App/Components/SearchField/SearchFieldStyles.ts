import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: { flexDirection: "row" },
  label: Fonts.style.labels,
  textInput: {
    backgroundColor: Colors.fontColor,
    height: 40,
    paddingLeft: 16,
    paddingRight: 32,
    borderWidth: 1,
    color: colors.wedgeBlue,
    borderColor: colors.wedgeBlue,
  },
  textInputCustom: {
    backgroundColor: Colors.fontColor,
    height: 40,
    borderWidth: 1,
    color: colors.wedgeBlue,
    borderColor: colors.wedgeBlue,
  },
  closeBtn: {
    position: "absolute",
    alignSelf: "center",
    right: 20,
    justifyContent: "center",
  },
  closeIcon: {
    paddingLeft: 6,
    paddingRight: 3,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 10,
  },
  textInputView: {
    justifyContent: "center",
    marginTop: 10,
  },
  leftIconContainer: {
    fontSize: 12,
  },
  containerStyle: {
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.snow,
    borderTopColor: Colors.snow,
    padding: 0,
  },
  inputContainerStyle: {
    marginHorizontal: 10,
    backgroundColor: Colors.snow,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.darkWedgeBlue,
    borderBottomWidth: 1,
    borderRadius: 0,
    height: 40,
  },
  inputStyle: {
    ...Fonts.style.body,
    color: Colors.darkerGrey,
    fontSize: 14,
  },
});
