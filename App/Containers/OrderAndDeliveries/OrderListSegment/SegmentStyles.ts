import { StyleSheet } from "react-native";
import { isLargeDevice } from "~root/Lib/CommonHelper";
import { Colors, Fonts } from "~root/Themes";

const styles = StyleSheet.create({
  segmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 20,
  },

  buttonSelected: {
    backgroundColor: Colors.lightBlue,
    justifyContent: "center",
    marginRight: 5,
    shadowOpacity: 0,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  buttonSelectedText: {
    ...Fonts.style.openSans14Bold,
    color: Colors.textLight,
    fontSize: isLargeDevice() ? 14 : 12,
  },
  badgeContainer: {
    overflow: "visible",
    aspectRatio: 1,
    position: "absolute",
    justifyContent: "center",
    right: -5,
    top: -8,
    height: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  badgeContainerText: {
    color: Colors.textLight,
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    width: 20,
  },
  buttonContainerInverse: {
    color: Colors.lightBackground,
    backgroundColor: Colors.grey,
    justifyContent: "center",
    marginRight: 5,
    shadowOpacity: 0,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  buttonTextInverse: {
    ...Fonts.style.openSans14Bold,
    fontSize: isLargeDevice() ? 14 : 12,
  },
  facetIcon: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    paddingHorizontal: 5,
    marginVertical: 8,
  },
  filterCount: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
  filterCountText: {
    color: Colors.lightBlue,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 14,
    color: Colors.black,
    paddingVertical: 8,
    paddingHorizontal: 3,
  },
  verticalSeprator: {
    width: 1,
    backgroundColor: "#ccc",
    height: "100%",
    marginLeft: 15,
  },
  filterBtnContainer: { flexDirection: "row" },
  scrollContainer: { flexDirection: "row", marginVertical: 8, marginLeft: 15 },
});

export default styles;
