import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.wildSandColor,
  },
  listContainer: {
    flex: 1,
  },
  iconAdd: {
    alignSelf: "center",
    marginRight: 5,
    ...Fonts.style.openSans16Bold,
    color: Colors.white,
  },
  listEmptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listEmptyText: {
    ...Fonts.style.openSans18Regular,
    color: colors.darkGrey,
  },
  contentContainer: {
    flexGrow: 1,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rightItemStyle: { paddingHorizontal: 15 },
});
