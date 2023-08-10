import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  specialOrderContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  specialOrderTextStyle: {
    flex: 1,
  },
  specialOrderText: {
    ...Fonts.style.openSans16,
  },
  specialOrderMessage: {
    ...Fonts.style.openSans11Regualr,
    marginTop: 2,
  },
  icon: {
    color: Colors.darkGrey,
    fontSize: 14,
  },
});
