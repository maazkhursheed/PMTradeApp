import { StyleSheet } from "react-native";
import { ApplicationStyles } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  siteDetailItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  itemContainer: {
    height: 80,
    marginRight: 12,
    marginTop: 10,
  },
  truckInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    borderRadius: 10,
    ...ApplicationStyles.shadow,
    elevation: 10,
  },
  labelStyle: {
    ...Fonts.style.openSans16Bold,
    marginLeft: 24,
    flex: 1,
  },
  circle: {
    height: 30,
    width: 30,
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 22,
    width: 22,
    backgroundColor: colors.lightBlue,
    borderRadius: 15,
  },
});
