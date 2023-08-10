import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    marginRight: 20,
  },
  itemValueOptional: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginTop: 16,
  },
  itemValueRequired: {
    ...Fonts.style.openSans14,
    color: Colors.darkRed,
    marginTop: 16,
    fontWeight: "400",
  },
  viewStyle: {
    ...Fonts.style.openSans16Regular,
    height: 40,
    paddingLeft: 10,
    paddingVertical: 8,
    textAlignVertical: "top",
  },
});
