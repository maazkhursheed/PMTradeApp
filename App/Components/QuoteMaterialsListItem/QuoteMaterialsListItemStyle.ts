import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 24,
    borderBottomColor: Colors.lightGrey,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 15,
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
  buttonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  value: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
    fontSize: 16,
    marginTop: 12,
  },
});
