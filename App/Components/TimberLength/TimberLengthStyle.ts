import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignSelf: "stretch",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  bottomRowView: {
    marginTop: 10,
  },
  timberLengthText: {
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
  },
});
