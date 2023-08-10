import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

const style = StyleSheet.create({
  header: {
    justifyContent: "space-between",
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
  viewMinWidth: {
    minWidth: 55,
  },
  headerStyle: {
    alignItems: "center",
    backgroundColor: Colors.snow,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    height: 36,
    justifyContent: "center",
  },
  viewStyle: {
    height: 4,
    width: 40,
    backgroundColor: Colors.subHeadingColor,
    borderRadius: 5,
  },
});
export default style;
