import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  containerGridView: {
    borderWidth: 0.5,
    flex: 1,
    borderColor: Colors.lightGrey,
    marginRight: -0.5,
    paddingRight: 0.5,
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
    margin: 12,
    marginBottom: 13,
  },
  loadingContainer: {
    margin: 24,
    marginBottom: 300,
  },
  image: {
    width: 112,
    height: 112,
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
    minHeight: 20,
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
    alignItems: "center",
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
  priceUom: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    textTransform: "uppercase",
  },
  imageStyle: {
    flex: 1,
    aspectRatio: 1,
    width: Metrics.screenWidth / 3.2,
    alignSelf: "center",
  },
  itemView: { flex: 1 },
  addToCartStyle: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansBold,
    textAlign: "center",
    marginTop: 2,
  },
  iconViewAddToCart: {
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    minWidth: 110,
    marginVertical: 10,

    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  quantityIcon: {
    width: 24,
    alignItems: "center",
  },
  quantitySelectorStyle: { minWidth: 100, marginTop: 20 },
  quantitySelectorStyleNew: { ...Fonts.style.openSans12Bold, minWidth: 50, maxWidth: 50 },
  quantitySelectorContainerStyle: { justifyContent: "space-between", marginTop: 10, minWidth: 110 },
  stockStyle: { alignSelf: "center" },
});
