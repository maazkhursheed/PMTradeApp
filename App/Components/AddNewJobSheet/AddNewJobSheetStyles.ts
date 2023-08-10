import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { backgroundColor: Colors.white, marginBottom: 30, paddingTop: 80 },
  headerStyle: {
    elevation: 2,
    zIndex: 2,
    position: "absolute",
    width: "100%",
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
  addButtonStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  quantityContainerStyle: {
    width: "50%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  textQuantityStyle: {
    ...Fonts.style.openSans18Bold,
  },
  customerDetailsStyle: {
    ...Fonts.style.openSans16Bold,
    marginTop: 24,
  },
});
