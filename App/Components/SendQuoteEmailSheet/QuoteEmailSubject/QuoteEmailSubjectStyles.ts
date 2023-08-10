import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  subject: {
    color: Colors.brandGrey,
    fontSize: 15,
    marginRight: 15,
  },
  emailsContainerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 20,
  },
  inputStyle: {
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 50,
  },
});
