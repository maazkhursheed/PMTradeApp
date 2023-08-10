import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "../../Themes/Colors";

const style = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    padding: 20,
    marginLeft: 10,
  },
  header: {
    backgroundColor: colors.snow,
  },
  headerItems: {
    alignSelf: "center",
  },
  mainview: {
    marginLeft: 20,
    marginBottom: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 15,
    ...Fonts.style.header2,
  },
  subtitle: {
    marginBottom: 10,
    ...Fonts.style.labels,
  },
  orderStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  clearAllText: { ...Fonts.style.body, color: Colors.lightBlue },
  orderview: {},
  checkboxes: {
    marginTop: -8,
  },
  applyBtn: {
    backgroundColor: colors.signInBtn,
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  applyBtnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.fontColor,
  },

  caretView: {
    marginTop: 20,
    width: "100%",
    height: 1,
    backgroundColor: colors.faintWedgeBlue,
  },
  iconStyle: {
    fontSize: 15,
    color: colors.darkerGrey,
    fontWeight: "bold",
  },
  orderStatusText: {
    marginLeft: 10,
    ...Fonts.style.subtitle,
  },
  sortByLabel: { marginTop: 5 },
  filterByLabel: { marginTop: 12 },
  filterByTextStyle: {
    marginTop: 20,
    marginBottom: 15,
    ...Fonts.style.header2,
  },
  close: {},
});
export default style;
