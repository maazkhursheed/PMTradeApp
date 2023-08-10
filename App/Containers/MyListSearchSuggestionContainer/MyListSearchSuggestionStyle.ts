import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    shadowColor: Colors.lightWedgeBlue,
    elevation: 6,
    zIndex: 1,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 0.9, android: 0.9 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: "#c9c9c9",
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
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
  cart: {
    fontSize: 32,
    alignSelf: "center",
    color: Colors.darkGrey,
  },
  cartQty: {
    ...Fonts.style.header1,
    color: Colors.darkGrey,
    alignSelf: "center",
    fontWeight: "bold",
    paddingLeft: 0,
    paddingRight: 0,
  },
  viewOrderButton: {
    marginLeft: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  rightIconStyle: {
    fontSize: 24,
    alignSelf: "center",
    marginRight: 10,
  },
  header: {
    borderBottomWidth: 0,
  },
  listContainer: {
    flex: 1,
  },
  smallHeader: {
    ...ApplicationStyles.noShadow,
  },
});
