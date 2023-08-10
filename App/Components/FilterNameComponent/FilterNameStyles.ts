import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  siteDetailItemContainer: {
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingVertical: 18,
  },
  labelStyle: {
    ...Fonts.style.openSans18Regular,
    flex: 0.9,
  },
  labelSelectedStyle: {
    ...Fonts.style.openSans18Bold,
    flex: 0.9,
  },
  siteItemTickContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
