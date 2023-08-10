import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  header: {
    backgroundColor: colors.snow,
  },
  headerTitle: {
    textAlign: "center",
    alignSelf: "stretch",
    ...Fonts.style.header1,
  },

  iconStyle: {
    fontSize: Fonts.size.h5,
    color: colors.darkerGrey,
    fontWeight: "bold",
  },
  subHeader: {
    ...Fonts.style.header2,
    paddingTop: 30,
  },
  subtitle: {
    ...Fonts.style.subtitle,
    paddingTop: 9,
  },

  msgText: {
    alignSelf: "stretch",
    paddingVertical: 32,
  },
  sendBtn: {
    // bottom: 0,
    // position: "absolute"
    marginBottom: 0,
  },
  msgTextInput: {
    flex: 1,
    alignSelf: "stretch",
    textAlignVertical: "top",
    minHeight: 180,
    marginBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 30,
  },
  changeBtn: {
    right: 0,
    position: "absolute",
  },
  dateView: {
    flexDirection: "row",
    paddingRight: 30,
  },
  pickerContainer: {
    backgroundColor: "#fff",
  },
  doneButtonStyle: {
    alignSelf: "flex-end",
    margin: 5,
  },
});
