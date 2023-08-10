import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  toLabel: {
    color: Colors.brandGrey,
    fontSize: 15,
    marginRight: 32,
    marginTop: 8,
  },
  emailsContainerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    minHeight: 30,
    marginRight: 50,
  },
  inputStyle: {
    paddingLeft: 5,
    marginRight: 25,
    marginTop: 5,
    minWidth: 30,
    flexWrap: "wrap",
  },
});
