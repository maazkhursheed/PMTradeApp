import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    paddingTop: 14,
  },
  iconStyle: {
    color: colors.ochre,
    fontSize: 16,
    marginRight: 10,
  },
  titleStyle: {
    ...Fonts.style.openSans18Bold,
    color: colors.black,
    marginRight: 10,
  },
  smallTitle: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  subTitleText: {
    ...Fonts.style.OpenSansRegular,
    color: colors.black,
    fontSize: 12,
    lineHeight: 20,
  },
  subTitleWrap: {
    marginBottom: 15,
    marginHorizontal: 24,
  },
  productHeaderWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
