import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...ApplicationStyles.shadow,
    margin: 24,
  },
  mainSubContainer: {
    paddingVertical: 12,
  },
  tickStyle: { alignSelf: "center" },
  userNameTitle: {
    marginVertical: 17,
    ...Fonts.style.openSans20Regular,
    color: Colors.darkBlueHeader,
    fontWeight: "800",
    textAlign: "center",
  },
  mainElement: {
    paddingHorizontal: 24,
    ...Fonts.style.openSans16Regular,
    textAlign: "center",
    lineHeight: 28,
  },
  mainSubElement: {
    paddingHorizontal: 12,
    ...Fonts.style.openSans16Regular,
    textAlign: "center",
    lineHeight: 28,
  },
  mainElementGrey: {
    ...Fonts.style.openSans14,
    textAlign: "center",
    color: Colors.darkGrey,
    lineHeight: 22,
  },
  userEmail: {
    paddingHorizontal: 12,
    marginVertical: 8,
    ...Fonts.style.openSans16Regular,
    fontWeight: "700",
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginVertical: 12,
  },
  noteContainer: {
    flexDirection: "row",
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.offWhite,
  },
  noteText: {
    ...Fonts.style.openSans14,
    fontStyle: "italic",
    lineHeight: 24,
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 45,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  checkoutButtonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  selectionItem: {
    ...Fonts.style.openSans14,
    color: Colors.lightBlue,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  noteStyle: { fontWeight: "bold" },
});
