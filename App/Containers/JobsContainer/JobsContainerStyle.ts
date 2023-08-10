import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.darkBlueHeader,
    paddingBottom: 8,
  },
  tabStyle: {
    flexDirection: "row",
    backgroundColor: Colors.disabledBackround,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    padding: 2,
    borderRadius: 8,
    height: 40,
  },
  textStyle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
    color: Colors.black,
    textAlign: "center",
    paddingVertical: 8,
  },
  innerView: {
    backgroundColor: Colors.snow,
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    borderRadius: 5,
  },
  inputContainerStyle: {
    marginHorizontal: 16,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: colors.offWhite,
    borderRadius: 8,
    backgroundColor: colors.offWhite,
    marginTop: 20,
  },
  iconStyle: {
    paddingLeft: 6,
    paddingRight: 3,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
  },
  inputStyle: {
    ...Fonts.style.subtitle,
    color: Colors.black,
  },
  viewAllJobsBtnContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 45,
  },
  buttonText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.snow,
    marginLeft: 10,
  },
  buttonInnerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    marginBottom: 4,
    backgroundColor: Colors.lightBlue,
    paddingVertical: 8,
    borderRadius: 5,
  },
  permissionViewStyle: { paddingBottom: 8, backgroundColor: Colors.darkBlueHeader },
  headerSegmentStyle: { marginHorizontal: 20, backgroundColor: "rgb(61,97,141)" },
  selectedBtnStyle: { backgroundColor: Colors.snow },
  selectedTextStyle: { color: Colors.black },
  unSelectedTextStyle: { color: Colors.offWhiteWithAlpha },
});
