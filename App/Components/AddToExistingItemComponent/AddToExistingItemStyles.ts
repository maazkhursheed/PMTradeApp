import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  siteDetailItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginVertical: 14,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  iconStyle: {
    fontSize: 22,
  },
  siteItemLabelStyle: {
    ...Fonts.style.openSans18Regular,
    marginVertical: 2,
  },
  siteSelectedItemLabelStyle: {
    ...Fonts.style.openSans18Bold,
    marginVertical: 2,
  },
  siteItemDesc: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
  },
  siteItemTickContainer: {
    marginRight: 28,
    alignSelf: "flex-end",
  },
  viAddress: {
    marginLeft: 16,
    width: "70%",
  },
  siteDetailView: { flexDirection: "row" },
});
