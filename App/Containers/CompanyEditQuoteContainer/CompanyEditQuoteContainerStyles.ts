import { Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
const { height } = Dimensions.get("window");

export default StyleSheet.create({
  quotesContainer: {
    flex: 1,
    paddingBottom: 24,
  },
  textStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.white,
    marginRight: 5,
  },
  contentContainer: { backgroundColor: Colors.offWhiteWithAlpha },
  mainView: { flex: 1 },
  imageContainer: {
    flex: 1,
    marginTop: 15,
  },
  label: {
    ...Fonts.style.labelLogo,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.offWhiteWithAlpha,
    borderColor: Colors.lightGrey,
  },
  buttonSendStyle: {
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightBlue,
    backgroundColor: Colors.lightBlue,
    height: 32,
    width: "90%",
    marginLeft: 15,
    marginTop: 10,
  },
  buttonSendText: {
    ...Fonts.style.openSans16Bold,
    color: Colors.white,
  },
  imageView: {
    flexDirection: "column",
  },
  uploadView: {
    flexDirection: "column",
    marginRight: 10,
    marginBottom: 20,
  },
  uploadParentView: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 15,
  },
  iconStyle: {
    color: Colors.lightBlue,
    height: 12,
    marginRight: 12,
    marginTop: 2,
    width: 12,
  },
  labelMaxSize: {
    ...Fonts.style.labelLogo,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
  },
  quoteItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
  },
  editButton: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  separator: {
    height: 1,
    marginRight: 25,
    marginLeft: 10,
    backgroundColor: Colors.lightGrey,
  },
  formViewParant: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    padding: 15,
  },
  privacyView: {
    backgroundColor: Colors.white,
    marginTop: 20,
    paddingLeft: 10,
  },
  formView: {
    backgroundColor: Colors.white,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  separatorView: {
    height: 5,
    marginTop: 15,
    backgroundColor: Colors.offWhiteWithAlpha,
  },
  inputView: {
    flex: 0.8,
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 0.95,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.black,
  },
  textCountStyle: {
    flex: 0.1,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.black,
    alignSelf: "flex-end",
    marginLeft: 20,
    padding: 5,
  },
  centeredLogo: {
    alignItems: "center",
  },
  topSeparator: {
    marginLeft: 0,
    marginTop: 24,
  },
  buttonHidden: {
    textAlign: "center",
    marginBottom: 20,
  },
  rightItemStyle: { paddingHorizontal: 15 },
});
