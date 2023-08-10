import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  listingContainer: {
    backgroundColor: Colors.white,
    paddingTop: 15,
    paddingHorizontal: 24,
  },
  listingContainerBorder: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: Colors.lightGrey,
  },
  listingRowHeading: {
    flexDirection: "row",
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  listingTextHeading: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
  },

  listingRowHours: {
    flexDirection: "row",
    paddingTop: 16,
    alignItems: "baseline",
  },
  listingTextContainerHours: {
    ...Fonts.style.openSans16Regular,
    flexDirection: "row",
    alignItems: "baseline",
    color: Colors.darkGrey,
  },
  listingTextContainerRate: {
    marginLeft: 45,
    marginRight: 5,
  },
  valueHours: {
    ...Fonts.style.openSans16Regular,
    color: Colors.black,
  },

  listingTextPara: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    fontSize: 16,
    paddingTop: 16,
  },
  value: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
  },
  hourContainer: {
    flexDirection: "row",
    flex: 3,
  },
  rateContainer: {
    flexDirection: "row",
    flex: 4,
  },
  btnViewStyle: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  deleteView: {
    justifyContent: "center",
    alignItems: "center",
  },
  editView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
