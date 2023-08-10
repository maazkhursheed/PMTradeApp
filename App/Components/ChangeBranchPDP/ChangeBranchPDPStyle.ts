import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  branchNameContainer: {
    borderWidth: 1,
    borderColor: colors.frost,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 8,
  },
  selectedBranchName: {
    ...Fonts.style.openSans14,
  },
});
