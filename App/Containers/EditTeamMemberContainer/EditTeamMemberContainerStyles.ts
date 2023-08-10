import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  contentStyle: {
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  closeIcon: {
    fontSize: Fonts.size.h5,
    color: colors.wedgeBlue,
    fontWeight: "bold",
    alignSelf: "center",
  },
  accessTxt: {
    ...Fonts.style.header2,
    marginTop: 35,
  },
  accessNameTxt: {
    ...Fonts.style.bodyHighlight,
  },
  accessDescTxt: {
    ...Fonts.style.subtitleLowlight,
    fontSize: 12,
  },
  caretView: {
    marginTop: 10,
    backgroundColor: colors.faintWedgeBlue,
    height: 1,
    width: "100%",
  },
  accessEnd: {
    flex: 1,
    marginLeft: 20,
  },
  endDateView: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.lightWedgeBlue,
    color: colors.darkerGrey,
    alignItems: "center",
    height: 52,
    padding: 15,
    ...Fonts.style.body,
  },
  accessEndHeading: {
    ...Fonts.style.labels,
  },
  modalMsg: {
    alignSelf: "flex-start",
    marginBottom: 30,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 12,
    color: Colors.wedgeBlue,
  },
  accessDateView: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  disableStyle: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: colors.faintWedgeBlue,
    paddingBottom: 10,
  },
  creditTextField: {
    marginBottom: 10,
    marginTop: 10,
  },
  accessListStyle: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: colors.faintWedgeBlue,
    paddingBottom: 10,
  },
  accessDateContainer: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  accessDate: {
    flex: 1,
  },
  rightIconStyle: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  phoneTextField: {
    marginTop: 20,
  },
  adminCheckBox: {
    marginTop: 20,
  },
  canInviteRemove: {
    marginLeft: 10,
  },
  memberInfoText: {
    color: colors.darkGrey,
    marginVertical: 15,
  },
  listStyle: {
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  datePickerContainer: {
    backgroundColor: "#fff",
  },
  doneButton: {
    alignSelf: "flex-end",
    margin: 5,
  },
  btnStyle: { paddingVertical: 10 },
});
