import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingRight: 14,
  },
  mapviewContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: Platform.OS === "ios" ? -10 : 0,
  },
  mapAndInfoContainer: {
    flex: 1,
    minHeight: 207,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    shadowColor: Platform.OS === "android" ? "#00000060" : "#00000040",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  mapView: {
    height: Platform.OS === "android" ? 112 : 122,
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
  branchInfoContainer: {
    flex: 1,
    paddingLeft: 18,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  branchNameStyle: {
    ...Fonts.style.openSans18Bold,
  },
  branchAddressStyle: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  branchStatusContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
  openTextStyle: {
    ...Fonts.style.openSans14,
    color: Colors.greenCheck,
  },
  dot: {
    marginHorizontal: 8,
    height: 3,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.darkGrey,
    alignSelf: "center",
  },
  branchStatusStyle: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    textAlignVertical: "center",
  },
  changeBranchStyle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    textAlign: "center",
    marginBottom: 24,
    paddingRight: 18,
  },
  viInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
    marginRight: 18,
  },
  infoToast: {
    fontSize: 24,
    color: Colors.darkBlueHeader,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGrey,
  },
  txtProductAvailability: {
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
  },
  txtAvailability: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
});
