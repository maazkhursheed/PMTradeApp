import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  iconStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    color: Colors.darkGrey,
  },
  barCodeView: {
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    borderColor: Colors.offWhite,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.offWhite,
  },
  productTextStyle: {
    flex: 1,
    ...Fonts.style.subtitle,
    color: colors.darkGrey,
  },
  touchableOpacityStyle: {
    flex: 1,
    flexDirection: "row",
  },
});
