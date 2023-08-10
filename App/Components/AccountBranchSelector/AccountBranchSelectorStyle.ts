import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  iconDownArrow: {
    color: "#666666",
    height: 12,
  },
  textStyle: {
    ...Fonts.style.openSans12,
    flex: 1,
    marginHorizontal: 18,
  },
  accountBranchSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -10,
  },
  accountNameStyle: {
    ...Fonts.style.openSans12,
    flex: 1,
    marginHorizontal: 18,
    marginRight: 5,
  },
  branchNameStyle: {
    ...Fonts.style.openSans12,
    flex: 1,
    marginHorizontal: 18,
    textAlign: "right",
  },
});
