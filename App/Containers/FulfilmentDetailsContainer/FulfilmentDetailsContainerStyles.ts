import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
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
  changeBranchStyle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    textAlign: "center",
    marginBottom: 24,
    paddingRight: 18,
  },
  changeContactStyle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    textAlign: "center",
    marginBottom: 24,
    paddingRight: 18,
  },
  viInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
    marginRight: 18,
  },
  infoToast: {
    fontSize: 24,
    color: Colors.darkBlueHeader,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGrey,
  },
  txtProductAvailability: {
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
  },
  txtAvailability: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  cardStyle: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  loadingView: {
    minHeight: 80,
  },
  containerStyle: {
    backgroundColor: Colors.wildSandColor,
  },
  contactView: {
    marginLeft: 18,
  },
});
