import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  modalView: {
    backgroundColor: Colors.windowTint,
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.snow,
  },
  viewDetails: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  subText: {
    paddingTop: 20,
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.black,
  },

  modalTitle: {
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    color: Colors.brandPrimary,
    textAlign: "left",
    width: "100%",
  },
  btn: {
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flex: 1,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  btnTxt: {
    ...Fonts.style.btnLarge,
    paddingVertical: 5,
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
  sectionList: {
    margin: 10,
    height: Metrics.screenHeight * 0.4,
  },
  item: {
    flexDirection: "row",
    marginLeft: 10,
    marginVertical: 5,
  },
  header: {
    ...Fonts.style.header2,
    backgroundColor: Colors.lightBackground,
    color: Colors.black,
    textTransform: "capitalize",
    marginVertical: 5,
  },
  itemText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
  },
  mainView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
  },
  innerView: {
    backgroundColor: "white",
    marginHorizontal: 12,
    marginVertical: 40,
    padding: 15,
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconStyle: {
    color: Colors.darkGrey,
    fontSize: 21,
  },
  sectionListView: {
    backgroundColor: Colors.lightBackground,
    marginTop: 10,
  },
  btnMainView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnInnerView: {
    flexDirection: "column",
  },
  connectBtnStyle: {
    backgroundColor: Colors.lightBlue,
    marginTop: 20,
  },
  connectTextStyle: {
    color: Colors.snow,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    textAlign: "center",
  },
  gotIssueTextStyle: {
    color: Colors.facebook,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  emptyView: { flexDirection: "row" },
});
