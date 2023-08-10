import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  loadingViewStyle: {
    flex: 1,
  },
  listHeaderTitle: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.black,
  },
  listHeaderItemCount: {
    fontSize: 12,
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.darkGrey,
  },
  listHeaderContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    borderBottomWidth: 0.5,
    paddingBottom: 8,
    borderBottomColor: Colors.lightGrey,
  },
  loadMoreProductsBtn: {
    alignSelf: "center",
    backgroundColor: colors.offWhite,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 40,
  },
  loadMoreProductsBtnText: {
    ...Fonts.style.openSans16Bold,
    color: colors.darkBlueHeader,
  },
  productsCountFooter: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
});
