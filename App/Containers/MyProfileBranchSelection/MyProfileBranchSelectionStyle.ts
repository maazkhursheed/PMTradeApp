import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textInverse,
  },
  branchName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.OpenSansRegular,
  },
  branchAddress: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.darkGrey,
    marginTop: 5,
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
    paddingBottom: 20,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: Colors.textInverse,
  },
  parentBranch: {
    marginLeft: 20,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.medium,
    color: Colors.darkGrey,
    marginTop: 20,
    paddingBottom: 10,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginLeft: 20,
  },
  listStyle: {
    borderBottomColor: Colors.offWhite,
    borderBottomWidth: 8,
    backgroundColor: Colors.textInverse,
  },
  close: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
});
