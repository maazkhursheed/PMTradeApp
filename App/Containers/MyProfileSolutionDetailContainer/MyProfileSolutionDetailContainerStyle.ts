import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  close: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  itemContainer: {
    flex: 1,
    paddingLeft: 0,
  },
  itemText: {
    ...Fonts.style.openSans18Regular,
  },
  headerStyle: {
    ...Fonts.style.openSansExtraBold28,
    marginHorizontal: 24,
    marginTop: 24,
  },
  headerView: {
    paddingBottom: 50,
  },
});
