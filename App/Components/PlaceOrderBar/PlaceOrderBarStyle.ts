import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  containerPO: {
    height: 95,
    paddingHorizontal: 45,
    paddingVertical: 20,
    marginBottom: 6,
  },
  iconViewAddToList: {
    backgroundColor: Colors.offWhite + "bf",
    width: 80,
    height: 40,
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  iconViewPOBar: {
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    width: Metrics.screenWidth - 35,
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  iconViewPOBarDisable: {
    backgroundColor: Colors.faintWedgeBlue,
    alignItems: "center",
    width: Metrics.screenWidth - 35,
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  iconStyle: {
    fontSize: 24,
    color: Colors.black,
  },
  placeOrderView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  placeOrderText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansBold,
  },
  subTotalView: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  subTotalText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
});
