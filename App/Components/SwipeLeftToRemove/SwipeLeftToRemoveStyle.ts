import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  swipLeftText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginRight: 20,
    marginLeft: 8,
    marginTop: 15,
    marginBottom: 40,
    alignSelf: "flex-end",
  },
  separator: {
    height: 2,
    backgroundColor: Colors.wildSandColor,
  },
  iconStyle: {
    fontSize: 24,
    marginTop: 10,
    color: Colors.blue,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
