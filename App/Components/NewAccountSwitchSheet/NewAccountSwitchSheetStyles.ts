import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  inputStyle: {
    ...Fonts.style.title,
    color: Colors.black,
    textAlign: "right",
    width: "55%",
  },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  doneStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  selectionItem: {
    ...Fonts.style.openSans18Regular,
  },
  valueItem: {
    ...Fonts.style.openSans18Regular,
    color: Colors.darkGrey,
    marginRight: 12,
  },
  message: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginRight: 12,
  },
  iconStyle: {
    alignSelf: "center",
    height: 14,
    color: Colors.darkGrey,
    marginTop: 4,
  },
  smallSeparator: {
    backgroundColor: Colors.lightGrey,
    height: 1,
    opacity: 100,
    marginVertical: 16,
  },
  homeBranchView: {
    flexDirection: "row",
    marginRight: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  chooseBtnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "60%",
  },
  accountCodeView: {
    flexDirection: "row",
    marginRight: 20,
    justifyContent: "space-between",
  },
  titleStyle: { ...Fonts.style.openSans18Bold },
  mainView: { marginLeft: 20, marginTop: 24 },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
});
