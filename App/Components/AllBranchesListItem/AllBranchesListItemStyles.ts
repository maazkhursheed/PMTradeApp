import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  branchName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.OpenSansRegular,
  },

  itemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },

  branchItem: {
    width: "90%",
  },
});
