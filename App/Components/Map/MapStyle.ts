import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  mapView: {
    width: "100%",
    minHeight: 200,
    flexGrow: 1,
  },
  markerContainer: {
    justifyContent: "flex-end",
  },
  markerView: {
    flexDirection: "row",
    marginLeft: 140,
  },
  marker: {
    alignSelf: "flex-end",
    color: Colors.red,
    fontSize: Fonts.size.h2,
  },
  markerAddress: {
    marginLeft: 5,
    width: 150,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: Colors.darkRed,
  },
});
