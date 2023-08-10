import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: 18,
    paddingRight: 24,
    marginLeft: 24,
    backgroundColor: Colors.white,
  },
  text: {
    ...Fonts.style.openSans18Regular,
    flex: 1,
    color: Colors.black,
  },
  iconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  icon: {
    color: Colors.darkGrey,
    fontSize: 14,
  },
  iconLeft: {
    color: Colors.darkGrey,
    fontSize: 18,
  },
});
