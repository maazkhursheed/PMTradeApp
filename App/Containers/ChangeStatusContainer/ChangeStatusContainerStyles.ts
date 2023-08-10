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
  close: {},
  iconStyle: {
    fontSize: Fonts.size.h5,
    color: colors.darkerGrey,
    fontWeight: "bold",
  },
  subHeader: {
    ...Fonts.style.header2,
    paddingTop: 10,
  },
  subtitle: {
    ...Fonts.style.subtitle,
    paddingTop: 9,
  },

  msgText: {
    alignSelf: "stretch",
    paddingTop: 32,
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
    marginBottom: 10,
  },
  scrollView: {
    padding: 20,
  },
});
