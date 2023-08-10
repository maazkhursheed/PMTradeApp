import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...ApplicationStyles.shadow,
    marginBottom: 5,
    paddingTop: 10,
  },
  listingButtonContainer: {
    marginHorizontal: 18,
    marginBottom: 5,
    marginTop: 10,
    paddingVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    height: 40,
    borderColor: Colors.lightBlue,
    alignItems: "flex-end",
  },
  searchField: {
    marginHorizontal: 16,
  },
  iconMore: {
    fontSize: 20,
    paddingLeft: 14,
    paddingRight: 10,
    color: Colors.lightBlue,
  },
  listTitle: {
    flex: 1,
    ...Fonts.style.bodyHighlight,
    color: Colors.lightBlue,
    fontSize: 14,
  },
  iconDownArrow: {
    color: "#666666",
    height: 12,
  },
  textStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.black,
    fontSize: Fonts.size.small,
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  accountBranchSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -10,
  },
  inputContainerStyle: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: Colors.offWhite,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.offWhite,
    height: 40,
  },
  iconStyle: {
    paddingLeft: 6,
    paddingRight: 3,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  closeIcon: {
    paddingLeft: 6,
    paddingRight: 3,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
  },
});
