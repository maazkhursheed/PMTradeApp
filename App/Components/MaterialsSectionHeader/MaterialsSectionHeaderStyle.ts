import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    marginTop: 60,
    borderTopWidth: 18,
    borderColor: Colors.borderGrey,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignContent: "center",
    alignItems: "center",
  },
  icon: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    fontSize: 18,
    marginRight: 16,
  },
  text: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    fontSize: 18,
  },
  separator: {
    height: 1,
    marginHorizontal: 24,
    backgroundColor: Colors.lightGrey,
  },
});
