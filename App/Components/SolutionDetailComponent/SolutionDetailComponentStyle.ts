import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  solutionDetailsContainer: {
    padding: 24,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  back: {
    fontSize: 20,
  },
  topView: {
    marginTop: 24,
    marginRight: 39,
    marginLeft: 31,
    marginHorizontal: 15,
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
    ...Fonts.style.header1,
    textAlign: "left",
  },
  listItem: {
    marginTop: 17,
    paddingBottom: 30,
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
    ...Fonts.style.openSans18Regular,
  },
  textURLStyle: {
    ...Fonts.style.openSans18Regular,
    color: colors.lightBlue,
  },
  textSubHeaderStyle: {
    ...Fonts.style.openSans18Bold,
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
    alignSelf: "flex-start",
  },
  directionBtn: {
    justifyContent: "center",
  },
  addressText: {
    ...Fonts.style.body,
  },
  storeFinder: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  listView: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
  bar: {
    marginTop: 8,
    borderWidth: 0.4,
    borderBottomColor: Colors.darkGrey,
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
  },
  rightIcon: {
    fontSize: 14,
    textAlign: "right",
  },
  separator: {
    width: Metrics.screenWidth,
    marginLeft: -24,
    marginVertical: 24,
    backgroundColor: Colors.offWhite,
    height: 8,
  },
  solutionDetailsView: { padding: 24, backgroundColor: colors.white },
});
