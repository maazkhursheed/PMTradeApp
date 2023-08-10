import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    padding: 20,
  },
  MainContainer: {
    padding: 20,
  },
  Header: {
    ...Fonts.style.header1,
    textAlign: "left",
    backgroundColor: Colors.snow,
    textTransform: "none",
  },
  sendBtn: {
    marginBottom: 0,
  },
  subHeader: {
    ...Fonts.style.subtitleHighlight,
    justifyContent: "center",
    textAlign: "left",
    color: "#333333",
    marginTop: 15,
  },
  subtitle: {
    ...Fonts.style.body,
    marginTop: 5,
  },
  subHeading: {
    ...Fonts.style.labels,
  },
  subView: {
    flexDirection: "row",
  },
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
    backgroundColor: Colors.darkBlue,
    color: "white",
    marginBottom: 10,
  },
  textStyle: {
    color: Colors.snow,
  },
  colStyle: {
    flex: 0.5,
  },
  divider: {
    backgroundColor: "#333333",
    marginTop: 4,
  },
  directionsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonDirection: {
    alignSelf: "flex-end",
  },
  billTextStyle: {
    marginTop: 15,
  },
});
