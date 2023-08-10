import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import ApplicationStyles from "~root/Themes/ApplicationStyles";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  textView: {
    flex: 1,
  },
  cartItemView: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.snow,
    marginTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  textHeading: {
    ...Fonts.style.bodyHighlight,
    alignSelf: "flex-start",
  },
  textSubtitle: {
    ...Fonts.style.captionHighlight,
    alignSelf: "flex-start",
  },
  textStatus: {
    ...Fonts.style.smallCaption,
    alignSelf: "flex-start",
  },
  qtyView: {
    flexDirection: "row",
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  txtRight: {
    paddingLeft: 10,
    textAlign: "right",
  },
  headerTitle: {
    ...Fonts.style.header1,
    alignSelf: "stretch",
  },
  back: {
    fontSize: 20,
    color: Colors.white,
  },
  cart: {
    fontSize: 30,
    alignSelf: "center",
    color: colors.white,
  },
  cartQty: {
    ...Fonts.style.header1,
    color: Colors.white,
    alignSelf: "center",
    fontWeight: "bold",
    paddingLeft: 0,
    paddingRight: 0,
  },
  headerLeftRight: {
    flex: 1,
  },
  headerBody: {
    flex: 3,
  },
  list: {
    flex: 1,
    marginHorizontal: 15,
  },
  modalText: {
    ...Fonts.style.subtitleLowlight,
  },
  noMatchTxt: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 28,
    color: Colors.black,
    marginHorizontal: 48,
    textAlign: "center",
    marginBottom: 24,
  },
  browseProducts: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.lightBlue,
    textAlign: "center",
  },
  noMatchTxtBold: {
    ...Fonts.style.subtitleHighlight,
    color: Colors.wedgeBlue,
  },
  noMatchTxtContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listSelection: {
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    marginHorizontal: 18,
    height: 40,
  },
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
    borderColor: Colors.wildSandColor,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.wildSandColor,
    height: 40,
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  rightItemStyle: { fontSize: 16, alignSelf: "center", paddingHorizontal: 15, paddingVertical: 10 },
  header: { backgroundColor: Colors.brandPrimary },
  titleStyle: { textTransform: "none", color: Colors.white },
  loadingView: { height: 75, width: "100%" },
  resultsText: {
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 32,
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 28,
    color: Colors.black,
  },
  stcHeader: {
    borderBottomWidth: 0,
  },
  rightButton: {
    paddingRight: 15,
  },
  listContainer: {
    flex: 1,
  },
  newList: {
    marginBottom: 20,
  },
  headerRightButton: { paddingRight: 15 },
  productDetailContainer: { flex: 1 },
  containerNew: {
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...ApplicationStyles.shadow,
    marginBottom: 5,
  },
});
