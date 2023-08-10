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
  summaryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
  quoteItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  iconStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
});
