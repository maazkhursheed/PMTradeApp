import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  unitStyleQuantity: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginTop: 25,
    marginBottom: 5,
  },
  trimLengthText: {
    textAlign: "center",
    marginBottom: 10,
  },
  lengthBoxViewSelected: {
    minWidth: (Metrics.screenWidth - 78) / 5,
    height: 40,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: Colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginHorizontal: 3,
  },
  lengthBoxView: {
    minWidth: (Metrics.screenWidth - 78) / 5,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginHorizontal: 3,
  },
  sellOrderView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  lengthBoxViewSelectedNew: {
    minWidth: (Metrics.screenWidth - 60) / 2,
    height: 40,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: Colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    // marginHorizontal: 94,
  },
  lengthText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.black,
  },
  lengthSelectedText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.black,
  },
});
