import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  msgStyle: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    marginBottom: 20,
    marginHorizontal: 30,
    fontSize: 28,
    color: colors.black,
    textAlign: "center",
  },
  tryAgainStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: colors.lightBlue,
  },
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 250,
    alignSelf: "stretch",
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-evenly",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  stockStyle: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.OpenSansRegular,
    color: colors.darkGrey,
    marginBottom: 10,
  },
  tagStyle: {
    marginTop: 15,
    fontFamily: Fonts.type.OpenSansRegular,
    color: colors.ochre,
    fontSize: Fonts.size.medium,
  },
  priceContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginLeft: 0,
    minHeight: 250,
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
  },
  descriptionContainerNew: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 14,
    marginBottom: 7,
  },
  productDescription: {
    height: 110,
    ...Fonts.style.openSans18Bold,
    fontSize: 16,
    marginTop: 10,
  },
  timberLengthText: {
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
  },
  timberLengthValue: {
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 4,
  },
  priceSlash: {
    ...Fonts.style.openSans16,
    color: Colors.lightGrey,
  },
  productPrice: {
    ...Fonts.style.openSans16,
  },
  priceUom: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    textTransform: "uppercase",
  },
  image: {
    marginTop: 10,
    width: 112,
    height: 112,
  },
  iconView: {
    backgroundColor: Colors.offWhite + "bf",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    marginVertical: 3,
  },
  iconStyle: {
    fontSize: 22,
    color: Colors.black,
  },
  cone: {
    width: 130,
    height: 70,
    marginTop: -20,
  },
  timberView: {
    marginBottom: 14,
    marginHorizontal: 28,
  },
  quantitySelectorStyle: { minWidth: 85, marginTop: -3 },
});
