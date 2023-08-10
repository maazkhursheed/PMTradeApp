import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginHorizontal: 24,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  products: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
    marginRight: 5,
  },
  productContainer: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  iconStyle: {
    fontSize: 12,
    color: colors.lightBlue,
    marginTop: 2,
  },
  description: {
    ...Fonts.style.openSans16,
    flex: 1,
  },
});
