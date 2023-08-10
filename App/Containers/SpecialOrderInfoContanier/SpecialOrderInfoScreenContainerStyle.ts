import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";
import { ApplicationStyles } from "../../Themes";

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  card: {
    ...ApplicationStyles.shadow,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 6,
    marginHorizontal: 20,
    alignSelf: "stretch",
    marginVertical: 10,
  },
  cardHeader: {
    backgroundColor: colors.alternativeBackground,
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical: 8,
  },
  cardChild: {
    backgroundColor: colors.white,
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  column: { flexDirection: "column" },
  row: { flexDirection: "row" },
  line: {
    width: "100%",
    height: 1,
    borderColor: colors.lightGrey,
    borderWidth: 0.6,
    marginTop: 10,
  },
  lineHeader: {
    borderColor: colors.darkBlue,
    borderWidth: 1,
    backgroundColor: colors.aliceBlue,
    borderRadius: 5,
    flexDirection: "row",
    margin: 20,
    marginTop: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  textStyle: {
    ...Fonts.style.openSans16,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textCardStyle: {
    ...Fonts.style.openSans11Regualr,
    marginBottom: 10,
    paddingRight: 10,
    paddingBottom: 8,
    marinLeft: 10,
    flex: 1,
  },
  textCardStyleBold: {
    ...Fonts.style.openSans12Bold,
    marginBottom: 10,
    marinLeft: 10,
    maxWidth: "90%",
  },
  specialOrderText: {
    ...Fonts.style.openSans12,
    color: colors.tickGreen,
    marginRight: 5,
  },
  blueTextStyle: {
    ...Fonts.style.supplierMessage,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  blueHeaderStyle: {
    ...Fonts.style.supplierMessageBlue,
    flex: 1,
    marginLeft: 7,
  },
  headerText: {
    ...Fonts.style.openSans16Bold,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  headerCardText: {
    ...Fonts.style.openSans14Bold,
  },
  infoIcon: {
    marginRight: 7,
    marginTop: 3,
    height: 15,
    width: 15,
  },
  tickCircle: {
    height: 16,
    width: 16,
    marginRight: 5,
  },
  specialOrderTextBox: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoBox: {
    height: 16,
    width: 35,
    marginRight: 5,
  },
  cardImageStyle: {
    marginRight: 7,
    height: 33,
    width: 33,
    paddingHorizontal: 10,
  },
  parentStyle: { alignItems: "center", justifyContent: "center", paddingVertical: 26 },
});
