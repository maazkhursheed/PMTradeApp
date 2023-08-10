import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  chevron: {
    fontSize: 16,
    color: colors.lightBlue,
    marginTop: 16,
    marginLeft: 5,
  },
  chargeStyle: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
    marginTop: 16,
  },
  sectionItemContainer: {
    backgroundColor: colors.white,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  sectionTitle: {
    ...Fonts.style.openSans16,
    marginTop: 15,
  },
});
