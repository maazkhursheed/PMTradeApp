import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  mapviewContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  mapView: {
    height: 112,
  },
  markerContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  markerView: {
    flexDirection: "row",
  },
  marker: {
    alignSelf: "flex-end",
    color: Colors.red,
    fontSize: Fonts.size.h2,
  },
  addressInfoContainer: {
    flex: 1,
    paddingLeft: 18,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  addressLineOneStyle: {
    ...Fonts.style.openSans18Bold,
  },
  addressLineTwoStyle: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  addIconStyle: {
    fontSize: 32,
    color: colors.lightGrey,
    alignSelf: "center",
  },
  addIconContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
