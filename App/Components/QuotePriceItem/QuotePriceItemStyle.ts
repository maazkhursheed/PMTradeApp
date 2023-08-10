import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  itemLabel: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
  },
  itemValue: {
    ...Fonts.style.openSans16Bold,
    textAlign: "right",
  },
  summaryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  updatePriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  updatedPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  updatePriceLabel: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  loader: {
    marginRight: 8,
  },
  loaderRight: {
    marginLeft: 8,
  },
});
