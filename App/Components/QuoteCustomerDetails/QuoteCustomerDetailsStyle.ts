import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  summaryContainer: {
    borderTopWidth: 8,
    borderBottomWidth: 16,
    borderColor: Colors.offWhite,
    padding: 24,
  },
  itemLabel: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
  },
  itemValue: {
    ...Fonts.style.openSans16Bold,
    textAlign: "right",
  },
  editButton: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  quoteItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: colors.lightGrey,
    marginVertical: 16,
  },
  separator2: {
    height: 1,
    width: "100%",
    backgroundColor: colors.lightGrey,
    marginBottom: 16,
  },
});
