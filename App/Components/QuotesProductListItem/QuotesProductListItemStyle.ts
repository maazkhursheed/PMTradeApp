import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightGrey,
  },
  containerLineItem: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 24,
  },
  containerGridView: {
    borderWidth: 0.5,
    flex: 1,
    maxWidth: Metrics.screenWidth / 2,
    borderColor: Colors.shadowWithAlpha,
    marginLeft: 0.5,
    paddingRight: 0.5,
  },
  descriptionContainer: {
    flex: 1,
    margin: 16,
    marginBottom: 24,
  },
  loadingContainer: {
    margin: 24,
    marginBottom: 300,
  },
  image: {
    width: 112,
    height: 112,
  },
  imageGrid: {
    width: "100%",
    aspectRatio: 1,
  },

  brand: {
    flex: 1,
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
  },
  iconView: {
    backgroundColor: Colors.offWhiteWithAlpha,
    padding: 8,
    borderRadius: 8,
  },
  iconStyle: {
    fontSize: 20,
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
  retailPrice: {
    flexDirection: "row",
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
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
    marginTop: 16,
  },
  productSKU: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginTop: 6,
  },
  priceUom: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    textTransform: "uppercase",
  },
  addToCartView: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  addToCartViewMyList: {
    backgroundColor: Colors.offWhiteWithAlpha,
    padding: 14,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 3,
    marginLeft: 20,
  },
  buttonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 24,
  },
  value: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
    fontSize: 16,
  },
  rowView: {
    marginBottom: 14,
    marginHorizontal: 24,
  },
  itemView: { flex: 1 },
  quantitySelectorStyle: { minWidth: 100 },
  deleteIconStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  quantitySelectorContainer: {
    flexDirection: "row",
  },
});
