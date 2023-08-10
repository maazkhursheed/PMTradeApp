import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  headerContainer: {
    elevation: 1,
    zIndex: 10,
  },
  headerStyle: {
    backgroundColor: "#fff",
  },
  centerItem: {
    minWidth: 55,
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 10,
  },
  rightItem: {
    minWidth: 55,
    marginRight: 15,
    paddingLeft: 10,
  },
  headerTitle: {
    ...Fonts.style.header1,
    textAlign: "center",
    alignSelf: "center",
  },
  searchField: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  searchFieldStyle: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  noMemberText: {
    ...Fonts.style.captionLowlight,
    color: colors.lightWedgeBlue,
    textAlign: "center",
    flex: 1,
    fontSize: 12,
    paddingVertical: 150,
  },
  caretView: {
    width: "100%",
    height: 1,
    backgroundColor: colors.faintWedgeBlue,
  },
  teamIcon: {
    color: colors.wedgeBlue,
    alignSelf: "center",
  },
  manuallyBtnTxt: {
    ...Fonts.style.subtitleSmall,
    paddingRight: 10,
    alignSelf: "flex-end",
  },
  noSearchResultView: {
    paddingTop: 10,
  },
  contactContainer: {},
  closeIcon: {
    fontSize: 18,
    padding: 30,
    color: colors.wedgeBlue,
  },
  manuallyBtn: {
    marginTop: 15,
    height: 30,
    alignSelf: "center",
    flexDirection: "row",
  },
  addBtn: {
    marginLeft: 5,
    marginRight: 10,
    backgroundColor: colors.wedgeBlue,
    color: colors.snow,
    fontSize: 30,
  },
  listStyle: {
    marginHorizontal: 20,
    flex: 1,
  },
  noMemberStyle: {
    paddingVertical: 150,
  },
  noMemberIcon: {
    color: colors.wedgeBlue,
    fontSize: 50,
    alignSelf: "center",
  },
  titleStyle: {
    textTransform: "none",
  },
  listItemStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  contentStyle: {
    marginHorizontal: 30,
  },
  enterManualLabel: {
    color: colors.lightBlue,
  },
  selectContactsList: {
    marginTop: 20,
  },
  loadingView: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  phoneTextStyle: {
    ...Fonts.style.subtitleLowlight,
    fontSize: 12,
    color: colors.darkerGrey,
  },
  iconStyle: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.darkGrey,
    alignSelf: "center",
  },
  inputContainerStyle: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: Colors.offWhite,
    borderRadius: 8,
    backgroundColor: Colors.offWhite,
    height: 40,
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  footerContainer: {
    backgroundColor: "#FFF",
    paddingBottom: 10,
    paddingTop: 20,
    ...ApplicationStyles.shadow,
  },
  largeButtonStyle: {
    height: 45,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: { padding: 0, alignSelf: "center", marginLeft: 10 },
});
