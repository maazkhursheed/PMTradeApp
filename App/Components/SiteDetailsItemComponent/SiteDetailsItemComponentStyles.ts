import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  siteDetailItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: 22,
    color: colors.darkGrey,
  },
  siteItemLabelStyle: {
    ...Fonts.style.openSans16Regular,
    flex: 1,
  },
  siteItemTickContainer: {
    marginRight: 28,
    alignSelf: "flex-end",
    marginVertical: 18,
  },
});
