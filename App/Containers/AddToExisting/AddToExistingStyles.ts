import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { ApplicationStyles, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  continueButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 40,
    marginVertical: 10,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  sectionSeparator: {
    marginTop: 10,
    height: 8,
    backgroundColor: Colors.wildSandColor,
  },
  lineSeparator: {
    flex: 1,
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.faintWedgeBlue,
  },
  sectionTitle: {
    ...Fonts.style.openSans14Bold,
    color: Colors.darkGrey,
    marginTop: 20,
    paddingBottom: 10,
    marginLeft: 20,
  },
  viMessage: {
    borderBottomWidth: 8,
    borderBottomColor: Colors.wildSandColor,
  },
  txtMessage: {
    marginLeft: 20,
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginTop: 10,
    marginBottom: 35,
  },
  btnArrow: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 15,
  },
  viHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingViewStyle: {
    flex: 1,
  },
  viewSeparator: {
    flex: 1,
    marginTop: 8,
    marginBottom: 0,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.faintWedgeBlue,
  },
});
