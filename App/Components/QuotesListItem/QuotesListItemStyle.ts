import { Platform, StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    padding: 24,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    shadowColor: Platform.OS === "android" ? colors.darkGrey : colors.lightGrey,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },
  valueItem: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
  },

  accountsView: {
    paddingLeft: 0,
    paddingRight: 10,
    flex: 1,
  },
  selectionItem: {
    ...Fonts.style.openSans16Bold,
    marginBottom: 8,
  },
  chevron: {
    fontSize: 16,
    color: colors.lightBlue,
  },
  viewOnlyText: {
    ...Fonts.style.openSans10Bold,
    color: colors.darkGrey,
    paddingHorizontal: 12,
  },
});
