import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  subSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    marginTop: 8,
    marginLeft: 20,
  },
  sectionHeader: {
    ...Fonts.style.openSans14Bold,
    color: colors.darkGrey,
    marginLeft: 20,
    marginVertical: 18,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: colors.wildSandColor,
    marginTop: -1,
  },
  icon: {
    fontSize: 14,
    color: colors.lightBlue,
  },
  viewMore: {
    ...Fonts.style.openSans18Regular,
    color: colors.lightBlue,
    marginLeft: 16,
  },
  buttonViewMore: {
    marginLeft: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
  },
});
