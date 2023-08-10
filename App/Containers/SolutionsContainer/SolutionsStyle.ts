import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    backgroundColor: Colors.faintWedgeBlue,
  },
  headerTitle: {
    textAlign: "center",
    alignSelf: "stretch",
    ...Fonts.style.header1,
  },
  logoutView: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignSelf: "center",
    height: 30,
    width: 30,
    backgroundColor: Colors.wedgeBlue,
    borderRadius: 50,
  },
  logoutbtnText: {
    color: "white",
    textAlign: "center",
    fontFamily: Fonts.type.ProximaBold,
  },
  topView: {
    marginTop: 24,
    marginRight: 39,
    marginLeft: 31,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.faintWedgeBlue,
  },
  header2Styles: {
    ...Fonts.style.header2,
    marginBottom: 17,
  },
  optionView: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  optionHeader: {
    marginRight: 120,
    ...Fonts.style.header1,
    textAlign: "left",
  },
  listItem: {
    marginTop: 17,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.faintWedgeBlue,
  },
  optionDetailFlex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemName: {
    ...Fonts.style.optionItems,
    textTransform: "uppercase",
  },

  iconStyle: {
    fontSize: Fonts.size.medium,
    color: colors.wedgeBlue,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  textStyle: {
    ...Fonts.style.body,
    marginBottom: 10,
  },
  textURLStyle: {
    ...Fonts.style.body,
    color: colors.lightBlue,
  },
  textSubHeaderStyle: {
    ...Fonts.style.bodyHighlight,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "flex-end",
    marginTop: 34,
  },
  subHeader: {
    marginTop: 20,
    paddingTop: 3,
    ...Fonts.style.header2,
    fontSize: Fonts.size.h6,
    alignSelf: "flex-start",
  },
  directionBtn: {
    justifyContent: "center",
  },
  addressText: {
    ...Fonts.style.body,
  },
  storeFinder: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  listView: {
    marginTop: 10,
    marginBottom: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  bar: {
    marginTop: 8,
    borderWidth: 0.4,
  },
  linkContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    ...Fonts.style.contactData,
  },
  contactEmail: {
    paddingRight: 5,
  },
  highlightText: Fonts.style.contactData,
  addressView: {
    marginTop: 10,
  },
  subHeading: {
    ...Fonts.style.bodyHighlight,
    fontSize: Fonts.size.medium,
  },
  rightIcon: {
    fontSize: 14,
    textAlign: "right",
  },
  versionText: {
    ...Fonts.style.bodyHighlight,
    textAlign: "center",
  },
  titleStyle: { textTransform: "none" },
  selectJobAccounts: { flex: 1 },
  signout: { marginTop: 20, paddingBottom: 10 },
  versionStyle: {
    backgroundColor: "#efeff4",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  signOutText: {
    ...Fonts.style.bodyHighlight,
    fontSize: Fonts.size.medium,
    color: Colors.red,
  },
  extraMarginStyle: {
    marginTop: 30,
  },
});
