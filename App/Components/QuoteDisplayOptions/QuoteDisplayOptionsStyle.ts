import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  quotesContainer: {
    backgroundColor: colors.white,
    width: "100%",
  },
  quoteItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonHeader: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
    marginLeft: 10,
  },
  summaryContainer: {
    padding: 24,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  itemLabel: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  summary1Container: {
    padding: 24,
    flex: 1,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  separator: {
    height: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  bgColor: {
    backgroundColor: colors.white,
  },
  textLabel: {
    marginTop: 4,
    paddingRight: 5,
  },
  backgroundColor: {
    backgroundColor: colors.white,
  },
});
