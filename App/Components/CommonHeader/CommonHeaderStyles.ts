import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

const style = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.faintWedgeBlue,
  },
  headerTitle: {
    alignSelf: "center",
    ...Fonts.style.header1,
  },
  dropDownIcon: {
    fontSize: 12,
    color: Colors.snow,
    alignSelf: "center",
    fontFamily: Fonts.type.ProximaBold,
    marginRight: 3,
  },
  headerView: {
    flexDirection: "column",
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "center",
    height: 25,
    backgroundColor: Colors.brandPrimary,
  },
  textStyles: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    color: Colors.snow,
    fontFamily: Fonts.type.ProximaBold,
    paddingVertical: 3,
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 5,
  },
  leftRightItemView: {
    minWidth: 55,
  },
});
export default style;
