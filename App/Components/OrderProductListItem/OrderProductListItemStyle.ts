import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  containerLineItemMyList: {
    borderBottomWidth: 0.5,
    flex: 1,
    borderBottomColor: Colors.lightGrey,
  },
  addToCartStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansBold,
    marginLeft: 8,
  },
  iconViewAddToCart: {
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    minWidth: "35%",
  },
  containerLineItem: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    flex: 1,
    borderBottomColor: Colors.lightGrey,
  },
  containerGridView: {
    borderWidth: 0.5,
    flex: 1,
    maxWidth: Metrics.screenWidth / 2,
    borderColor: Colors.lightGrey,
    marginRight: -0.5,
    paddingRight: 0.5,
  },

  iconDownArrow: {
    color: Colors.darkGrey,
    height: 12,
    alignSelf: "center",
  },
  frequentlyOrderedItem: {
    width: Metrics.screenWidth / 2.4,
    marginHorizontal: 14,
    borderRadius: 12,
    shadowColor: "#00000029",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 24,
    marginBottom: 20,
    backgroundColor: "white",
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
  brandNButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
  },
  iconView: {
    backgroundColor: Colors.offWhite + "bf",
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
  },
  productDescriptionContainer: {
    flexDirection: "column",
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 16,
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
  imageStyle: {
    flex: 1,
    width: Metrics.screenWidth / 2,
    aspectRatio: 1,
  },
  frequentOrderImageStyle: {
    width: Metrics.screenWidth / 2.6,
    alignSelf: "center",
  },
  addToCartView: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  addToCartViewMyList: {
    backgroundColor: Colors.offWhite + "bf",
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
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  itemView: { flex: 1 },
  quantitySelectorStyle: { alignItems: "center", justifyContent: "center", height: 38 },
  container: { height: 38, alignItems: "center", justifyContent: "center" },
  quantitySelectorContainer: { flexDirection: "row" },
  deleteIconStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});
