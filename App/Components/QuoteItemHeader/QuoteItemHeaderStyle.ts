import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  editButton: {
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
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: colors.lightGrey,
    marginVertical: 16,
  },
});
