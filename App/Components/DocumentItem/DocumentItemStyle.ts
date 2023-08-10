import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperStyle: {
    margin: 24,
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
  },
  iconStyle: {
    color: Colors.darkGrey,
    fontSize: 32,
  },
  textStyle: {
    marginLeft: 20,
    ...Fonts.style.openSans18Regular,
    marginBottom: 5,
  },
});
