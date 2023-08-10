import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

const style = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.snow,
  },
  headerTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: Fonts.type.SFProBold,
    fontSize: 18,
    color: Colors.black,
  },
  items: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 17,
    color: Colors.lightBlue,
  },
  headerStyle: {
    flexDirection: "column",
    paddingLeft: 0,
    backgroundColor: Colors.snow,
    borderBottomColor: "#3c3c434a",
    paddingRight: 0,
    borderBottomWidth: 1,
  },
  viewMinWidth: {
    minWidth: 55,
  },
});
export default style;
