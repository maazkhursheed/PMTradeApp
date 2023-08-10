import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  addressInputStyle: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    paddingLeft: 10,
    marginRight: 20,
  },
  addressSuggestionItem: {
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  suggestionsContainer: {
    shadowColor: Platform.OS === "android" ? colors.darkGrey : colors.lightGrey,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    maxHeight: Dimensions.get("window").height * 0.5,
    marginRight: 20,
  },
});
