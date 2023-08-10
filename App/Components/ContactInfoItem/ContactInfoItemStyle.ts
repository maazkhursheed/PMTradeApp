import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  clearInputIcon: {
    fontSize: 18,
    color: colors.darkGrey,
    marginRight: 24,
    marginTop: 15,
  },
  itemValue: {
    ...Fonts.style.openSans18Regular,
    width: "80%",
    paddingVertical: 15,
  },
  itemLabel: { ...Fonts.style.openSans14, color: Colors.darkGrey },
  infoItemView: {
    paddingTop: 15,
    backgroundColor: Colors.textInverse,
    paddingLeft: 24,
  },
  inputContainer: { flexDirection: "row", justifyContent: "space-between" },
  subSeparator: {
    backgroundColor: colors.lightGrey,
    marginLeft: 24,
    height: 0.5,
  },
});
