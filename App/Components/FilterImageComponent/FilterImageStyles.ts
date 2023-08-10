import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  siteDetailItemContainer: {
    marginLeft: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelStyle: {
    ...Fonts.style.openSans18Regular,
  },
  labelSelectedStyle: {
    ...Fonts.style.openSans18Bold,
  },
  siteItemDesc: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
  },
  siteItemTickContainer: {
    marginRight: 20,
    alignSelf: "flex-end",
  },
  image: {
    width: 60,
    height: 60,
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameView: { marginLeft: 14 },
});
