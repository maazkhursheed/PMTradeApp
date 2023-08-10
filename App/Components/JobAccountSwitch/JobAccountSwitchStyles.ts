import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    //flex: 1
    height: 70,
  },
  textContainer: {
    paddingVertical: 18,
    marginLeft: 24,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  label: {
    ...Fonts.style.openSans18Regular,
    marginRight: 8,
  },
  cancelText: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    paddingLeft: 16,
  },
  text: {
    ...Fonts.style.openSans18Regular,
    color: Colors.darkGrey,
    paddingRight: 24,
    flex: 1,
    textAlign: "right",
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sheetTextContainer: {
    marginLeft: 24,
    paddingRight: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tick: {
    color: Colors.lightBlue,
    fontSize: 18,
  },
  sheetSelectedText: {
    ...Fonts.style.openSans18Bold,
  },
  sheetText: {
    ...Fonts.style.openSans18Regular,
  },
});
