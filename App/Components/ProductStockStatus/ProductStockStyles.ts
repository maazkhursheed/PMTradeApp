import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  specialOrderTag: {
    flexDirection: "row",
    alignItems: "center",
  },
  specialOrderIcon: {
    color: colors.ochre,
    fontSize: 14,
    marginRight: 10,
  },
  specialOrderLabel: {
    ...Fonts.style.openSans14Bold,
    color: colors.ochre,
  },
  productAvailability: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
  },
  stockAvailabilityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  stockAvailabilityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  constrainedProductIcon: {
    color: colors.lightGreen,
    fontSize: 16,
    marginRight: 4,
  },
  constrainedProductLabel: {
    ...Fonts.style.openSans12,
    color: colors.lightGreen,
  },
  constrainedProductIconPDP: {
    color: colors.lightGreen,
    fontSize: 22,
    marginRight: 6,
  },
  constrainedProductLabelPDP: {
    ...Fonts.style.openSans14Bold,
    color: colors.lightGreen,
  },
});
