import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  listView: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingBottom: 24,
  },
  rowView: {
    flex: 1,
    marginLeft: 16,
    marginRight: 24,
  },
  qtyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  image: {
    width: 112,
    height: 112,
  },
  productDescription: {
    ...Fonts.style.openSans16Bold,
    marginTop: 4,
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
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
  },
  viewQtyValue: {
    ...Fonts.style.openSans16Bold,
    paddingLeft: 8,
  },
  price: {
    ...Fonts.style.openSans16Bold,
  },
  totalLength: {
    marginLeft: 128,
    marginTop: 10,
    marginBottom: 14,
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
    marginTop: 24,
  },
  trimLengthView: {
    marginTop: 16,
    marginHorizontal: 0,
  },
  trimLengthBottomView: {
    marginTop: 4,
  },
});
