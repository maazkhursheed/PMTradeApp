import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  containerMain: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGrey,
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  containerItem: {
    flexDirection: "row",
  },
  quantitySelectorStyle: { minWidth: 100 },
  buttonsContainer: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 20,
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
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 16,
  },
  productSKU: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginTop: 6,
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

  descriptionContainer: {
    flex: 1,
    margin: 8,
    marginBottom: 12,
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    width: 112,
    height: 112,
  },
  itemTotalView: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  retailPrice: {
    flexDirection: "row",
    flex: 1,
  },
});
