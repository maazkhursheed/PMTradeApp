import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  inputStyle: {
    ...Fonts.style.subtitleSmall,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
  },
  headerStyle: {
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
  titleStyle: { ...Fonts.style.openSans18Bold, marginLeft: 30 },
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
  loadingView: { flex: 1 },
  itemValueOptional: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginBottom: 6.5,
    marginTop: 16,
  },
  itemValueRequired: {
    ...Fonts.style.openSans14,
    // paddingVertical: 8,
    color: Colors.darkRed,
    marginBottom: 6.5,
    marginTop: 16,
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
});
