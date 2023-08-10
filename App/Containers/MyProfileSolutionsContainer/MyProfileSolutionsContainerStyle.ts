import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  close: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.textInverse,
    paddingHorizontal: 24,
  },
  itemContainer: {
    flex: 1,
    paddingLeft: 0,
  },
  itemText: {
    ...Fonts.style.openSans18Regular,
  },
  separator: {
    backgroundColor: Colors.offWhite,
    height: 8,
  },
  subSeparator: {
    backgroundColor: Colors.lightGrey,
    marginLeft: 24,
    height: 0.6,
  },

  chevron: {
    fontSize: 14,
    color: colors.darkGrey,
  },
});
