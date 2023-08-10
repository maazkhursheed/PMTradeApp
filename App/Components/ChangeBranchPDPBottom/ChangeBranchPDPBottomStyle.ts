import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  text: {
    ...Fonts.style.openSans18Regular,
    flex: 1,
    color: Colors.black,
  },
  icon: {
    color: Colors.darkGrey,
    fontSize: 14,
  },
  checkStockContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 18,
    paddingRight: 24,
    marginLeft: 36,
    backgroundColor: Colors.white,
    alignItems: "center",
    marginBottom: 50,
  },
  branchName: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginTop: 2,
  },
  storeIcon: {
    fontSize: 20,
    marginRight: 28,
    color: colors.darkGrey,
  },
  iconDisabled: {
    color: Colors.lightGrey,
    fontSize: 14,
  },
  branchNameDisabled: {
    ...Fonts.style.openSans14,
    color: colors.lightGrey,
    marginTop: 2,
  },
  storeIconDisabled: {
    fontSize: 20,
    marginRight: 28,
    color: colors.lightGrey,
  },
  textDisabled: {
    ...Fonts.style.openSans18Regular,
    flex: 1,
    color: Colors.lightGrey,
  },
});
