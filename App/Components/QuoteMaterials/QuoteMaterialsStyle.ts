import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  summaryContainer: {
    borderTopWidth: 8,
    borderBottomWidth: 16,
    borderColor: Colors.offWhite,
    padding: 24,
  },
  viewButton: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quoteItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
});
