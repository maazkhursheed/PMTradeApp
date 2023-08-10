import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  header: {
    backgroundColor: colors.snow,
  },
  headerTitle: {
    textAlign: "center",
    alignSelf: "stretch",
    ...Fonts.style.header1,
  },
  iconStyle: {
    fontSize: Fonts.size.h5,
    color: colors.darkerGrey,
    fontWeight: "bold",
  },
  subHeader: {
    ...Fonts.style.header2,
  },
  subtitle: {
    ...Fonts.style.subtitle,
    paddingTop: 9,
  },
  msgText: {
    alignSelf: "stretch",
    paddingVertical: 32,
  },
  sendBtn: {
    marginBottom: 0,
  },
  msgTextInput: {
    flex: 1,
    alignSelf: "stretch",
    textAlignVertical: "top",
    minHeight: 180,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  listItem: {
    marginTop: 21,
    borderBottomWidth: 1,
    borderBottomColor: Colors.faintWedgeBlue,
    paddingBottom: 10,
  },
  orderDetailsFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDetails: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.small,
    color: Colors.darkerGrey,
  },
  itemQuantity: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.small,
    color: Colors.darkerGrey,
    textAlign: "right",
  },
  itemUnit: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.small,
    color: Colors.darkerGrey,
    textAlign: "left",
    marginLeft: 2,
  },
  skuNumber: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: Fonts.size.small,
    color: Colors.wedgeBlue,
    paddingTop: 2,
  },
  itemDetailsContainer: {
    flex: 5,
  },
  quantityContainer: {
    flex: 1.5,
  },
});
