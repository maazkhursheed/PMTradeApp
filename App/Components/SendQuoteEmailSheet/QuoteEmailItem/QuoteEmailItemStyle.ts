import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  container: {
    margin: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 2,
    paddingVertical: 7,
    alignItems: "center",
  },
  emailValid: {
    color: Colors.lightBlue,
    paddingLeft: 6,
    paddingRight: 35,
  },
  emailInvalid: {
    color: Colors.white,
    paddingLeft: 6,
    paddingRight: 35,
    flexWrap: "wrap",
  },
  removeInvalid: {
    fontSize: 13,
    color: Colors.white,
    flexWrap: "wrap",
  },
  removeValid: {
    fontSize: 13,
    color: Colors.lightBlue,
  },
  removeIcon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
