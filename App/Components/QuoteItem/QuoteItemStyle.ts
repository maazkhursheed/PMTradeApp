import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  itemLabel: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    flex: 2,
  },
  itemValue: {
    ...Fonts.style.openSans16Bold,
    textAlign: "right",
    flex: 3,
  },
  summaryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
