import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    flex: 1,
    borderBottomColor: Colors.lightGrey,
    marginHorizontal: 24,
    marginTop: 24,
  },
  containerLineItem: {
    flexDirection: "row",
    flex: 1,
  },
  descriptionContainer: {
    flex: 1,
    margin: 16,
    marginBottom: 24,
  },
  image: {
    width: 112,
    height: 112,
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
  retailPrice: {
    flexDirection: "row",
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
  },
  rowView: {
    marginHorizontal: 0,
    marginBottom: 14,
  },
  itemView: { flex: 1 },
  quantitySelectorStyle: { minWidth: 100 },
  buttonStyle: {
    flex: 1,
    minHeight: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    marginLeft: 12,
  },
  buttonText: {
    ...Fonts.style.openSans16Bold,
    color: colors.white,
  },
});
