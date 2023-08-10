import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  main: {
    paddingLeft: 24,
  },
  support_txt: {
    ...Fonts.style.openSans14,
    marginTop: 18,
    marginBottom: 32,
    color: Colors.darkGrey,
  },
  header: {},
  heading: {
    ...Fonts.style.openSans14Bold,
    color: Colors.darkGrey,
    paddingTop: 18,
    paddingBottom: 18,
  },
  schedule: {
    ...Fonts.style.openSans18Regular,
    flexDirection: "row",
    alignItems: "center",
    color: Colors.darkGrey,
    textAlign: "right",
    marginRight: 24,
  },
  alert: {
    ...Fonts.style.openSans18Regular,
    flexDirection: "row",
    alignItems: "flex-end",
    color: Colors.darkRed,
    textAlign: "right",
    marginRight: 24,
  },
  linkItem: {
    ...Fonts.style.openSans18Regular,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.textInverse,
    color: Colors.lightBlue,
  },
  mail: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mailTxt: {
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
    paddingTop: 18,
    paddingBottom: 18,
  },
  separator: {
    width: "100%",
    backgroundColor: Colors.lightGrey,
    height: 2,
  },
  smallSeparator: {
    borderBottomWidth: 0.67,
    borderColor: Colors.lightGrey,
  },
  half: {
    flex: 1,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    textAlign: "right",
  },
  iconStyle: {
    marginRight: 10,
    fontSize: 20,
    color: Colors.darkGrey,
    maxWidth: 20,
  },
  dayOpeningHourView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
});
