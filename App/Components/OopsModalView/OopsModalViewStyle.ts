import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  modalTitle: {
    fontWeight: "bold",
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.black,
    position: "absolute",
    width: "100%",
    paddingRight: 10,
  },
  textStyleRegular: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 12,
    color: Colors.black,
  },
  textStyleBold: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 12,
    color: Colors.black,
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
  },
  modalInnerView: {
    backgroundColor: "white",
    marginHorizontal: 12,
    marginVertical: 40,
    padding: 15,
  },
  modalTitleView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 10,
  },
  teamMemberMainView: {
    marginHorizontal: 0,
    marginTop: 15,
    marginBottom: 10,
    flex: 1,
  },
  flexDirectionRowStyle: { flexDirection: "row" },
  textStyleIf: { flex: 1, marginRight: 10, ...Fonts.style.oopsMessage },
  textStyleThen: { flex: 1, marginLeft: 10, ...Fonts.style.oopsMessage },
  dividerStyle: { marginVertical: 15, height: 1 },
  ifSectionTextsStyle: { flex: 0.5, marginRight: 10 },
  thenSectionTextsStyle: { flex: 0.5, marginLeft: 10 },
  emailUSText: {
    flex: 0.5,
    marginLeft: 10,
    textDecorationLine: "underline",
    textDecorationColor: Colors.facebook,
    color: Colors.facebook,
    fontSize: 12,
    fontFamily: Fonts.type.OpenSansRegular,
  },
  accountOwnerMainView: {
    marginHorizontal: 0,
    marginTop: 15,
    marginBottom: 10,
  },
  otherDividerStyle: { marginBottom: 15, marginTop: 10, height: 1 },
  underlineTextStyle: {
    flex: 0.5,
    marginLeft: 10,
    textDecorationLine: "underline",
    textDecorationColor: Colors.facebook,
    color: Colors.facebook,
  },
  disclosureStyle: {
    color: Colors.red,
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconStyle: { color: Colors.darkGrey, fontSize: 21 },
});
