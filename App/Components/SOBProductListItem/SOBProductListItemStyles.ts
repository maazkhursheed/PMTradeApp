import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  containerLineItemEstimatedList: {
    borderBottomWidth: 0.5,
    flex: 1,
    borderBottomColor: Colors.lightGrey,
  },
  containerLineItem: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    flex: 1,
    borderBottomColor: Colors.lightGrey,
  },
  descriptionContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
  image: {
    width: 112,
    height: 112,
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
    flex: 1,
    marginBottom: 4,
  },
  iconStyle: {
    fontSize: 24,
    color: Colors.black,
  },
  productDescription: {
    ...Fonts.style.openSans18Bold,
    fontSize: 16,
    marginTop: 4,
    height: undefined,
  },
  productDescriptionContainer: {
    flexDirection: "column",
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 4,
  },
  productPrice: {
    ...Fonts.style.openSans16,
    color: Colors.black,
  },
  priceSlash: {
    ...Fonts.style.openSans16,
    color: Colors.lightGrey,
  },
  productAvailability: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
  },
  priceUom: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    textTransform: "uppercase",
  },
  addToCartEstimatedProduct: {
    backgroundColor: Colors.offWhite + "bf",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 3,
    marginLeft: 8,
  },
  buttonsContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  rowView: {
    marginBottom: 14,
  },
  trimBottomRowView: {
    marginTop: 4,
  },
  itemView: { flex: 1 },
  quantitySelectorStyle: { minWidth: 100 },
  stockStatusIcon: { alignSelf: "center", marginRight: 4, fontSize: 14 },
  stockStatusText: { ...Fonts.style.openSans12, color: Colors.darkGrey },
});
