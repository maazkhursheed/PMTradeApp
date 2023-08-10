import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  listView: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 0,
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
  },
  image: {
    width: 112,
    height: 112,
  },
  descriptionContainerNew: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 14,
    marginBottom: 7,
  },
  productDescription: {
    height: undefined,
    ...Fonts.style.openSans18Bold,
    fontSize: 16,
    marginLeft: 7,
  },
  tagText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginLeft: 4,
    marginTop: 5,
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 24,
    marginBottom: 6,
    marginLeft: 6,
  },
  productPrice: {
    ...Fonts.style.openSans16,
  },
  qtyText: {
    ...Fonts.style.openSans18Bold,
    minWidth: 120,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  priceSlash: {
    ...Fonts.style.openSans16,
    color: Colors.lightGrey,
  },
  priceUom: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    textTransform: "uppercase",
  },
  textHeadingView: {
    ...Fonts.style.bodyHighlightNew,
    minHeight: 24,
    textAlign: "right",
    paddingLeft: 8,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  productAvailability: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginLeft: 6,
    marginVertical: 16,
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
    marginLeft: 7,
  },
  quantitySelectorStyle: {
    marginLeft: 14,
    marginBottom: 14,
  },
  totalPriceView: {
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 4,
  },
  permissionComponentStyle: { justifyContent: "center" },
  loadingView: { flex: 1 },
  trimLengthView: { marginLeft: 14, marginRight: 0, marginBottom: 14 },
  specialOrderTag: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  specialOrderIcon: {
    color: colors.ochre,
    fontSize: 14,
    marginRight: 10,
    marginLeft: 5,
  },
  specialOrderLabel: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
  },
  stockStatus: {
    marginLeft: 6,
  },
  specialOrderStatus: {
    marginTop: 2,
    marginBottom: 10,
    marginLeft: 4,
  },
  deleteIconStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});
