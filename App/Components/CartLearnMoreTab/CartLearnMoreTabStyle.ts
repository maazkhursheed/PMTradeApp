import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  headerRowInstructionsConstrained: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 24,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    backgroundColor: colors.lighterGreen,
  },
  infoIconConstrained: {
    fontSize: 16,
    marginTop: 3,
  },
  disclosureTitleText: {
    ...Fonts.style.disclosureFont,
    marginBottom: 5,
    color: Colors.darkGrey,
    fontSize: 14,
  },
  disclosureSubTitleText: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  linkUrlText: {
    ...Fonts.style.disclosureFont,
    color: Colors.lightGreen,
    fontSize: 14,
  },
  subTextWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contentWrapper: {
    marginHorizontal: 10,
  },
});
