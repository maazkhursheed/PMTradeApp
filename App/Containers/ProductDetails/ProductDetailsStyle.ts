import { StyleSheet } from "react-native";
import ApplicationStyles from "~root/Themes/ApplicationStyles";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wildSandColor,
  },
  unitStyleNew: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "center",
  },
  deliversStyle: {
    ...Fonts.style.openSansExtraBold12,
    marginBottom: 5,
    alignSelf: "center",
  },
  unitStyle: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginBottom: 5,
    alignSelf: "center",
  },
  dividerView: {
    width: "15%",
    height: 1,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    marginVertical: 24,
  },
  unitStyleQuantity: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginTop: 25,
    alignSelf: "center",
    marginBottom: 5,
  },
  containerMeta: {
    backgroundColor: Colors.white,
    padding: 24,
  },
  containerFeatures: {
    ...ApplicationStyles.shadow,
    marginTop: 8,
    backgroundColor: Colors.white,
  },
  productDescription: {
    ...Fonts.style.openSans28Bold,
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 16,
  },
  price: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  productCodesContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
  },
  rowView: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
  productSKU: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  productStock: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    paddingLeft: 8,
    alignSelf: "center",
  },
  productPrice: {
    ...Fonts.style.openSans18Regular,
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
  brand: {
    flex: 1,
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
  },
  cart: {
    fontSize: 30,
    alignSelf: "center",
    color: colors.white,
  },
  cartQty: {
    ...Fonts.style.header1,
    color: Colors.white,
    alignSelf: "center",
    fontWeight: "bold",
    paddingLeft: 0,
    paddingRight: 0,
  },
  quantitySelector: {
    backgroundColor: Colors.white,
  },
  branchNameContainer: {
    borderWidth: 1,
    borderColor: colors.frost,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  stockAvailabilityMsg: {
    ...Fonts.style.openSans14,
    marginRight: 16,
  },
  stockStatusContainer: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  stockAvailabilityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  selectedBranchName: {
    ...Fonts.style.openSans14,
  },
  text: {
    ...Fonts.style.openSans18Regular,
    flex: 1,
    color: Colors.black,
  },
  icon: {
    color: Colors.darkGrey,
    fontSize: 14,
  },
  checkStockContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 18,
    paddingRight: 24,
    marginLeft: 36,
    backgroundColor: Colors.white,
    alignItems: "center",
    marginBottom: 50,
  },
  branchName: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginTop: 2,
  },
  storeIcon: {
    fontSize: 20,
    marginRight: 28,
  },
  quantityContainerStyle: {
    alignSelf: "center",
  },
  branchStockView: {
    flex: 1,
  },
  headerTabButton: { backgroundColor: Colors.darkBlueHeader, height: 50, flexDirection: "column", alignItems: "flex-start", justifyContent: "center" },
  containerSpecialOrder: {
    marginTop: 3,
    backgroundColor: Colors.white,
  },
  specialOrderMessage: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
  },
  specialOrderTextMargin: { marginBottom: 0 },
});
