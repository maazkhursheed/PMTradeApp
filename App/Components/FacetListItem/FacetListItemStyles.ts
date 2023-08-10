import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  facet: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  facetTxt: {
    ...Fonts.style.openSans14,
    color: colors.black,
  },
  selectedFacetTxt: {
    ...Fonts.style.openSans14Bold,
    color: colors.white,
  },
  icon: {
    fontSize: 16,
    color: colors.black,
  },
  facetIcon: {
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    marginHorizontal: 4,
    paddingHorizontal: 8,
    marginLeft: 16,
  },
  resetText: {
    ...Fonts.style.openSans14,
    color: colors.lightBlue,
  },
  resetFacet: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightGrey,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 0,
  },
});
