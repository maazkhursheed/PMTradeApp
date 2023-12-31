import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkNewBlueHeader,
    zIndex: 10,
  },
  headerTitleText: {
    color: Colors.white,
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 20,
    marginLeft: 10,
  },
  jobAccountView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    flex: 1,
  },
  storeNameView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.ricePaper,
    paddingVertical: 2,
  },
  textStyles: {
    ...Fonts.style.openSans16Regular,
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    color: Colors.white,
    fontSize: Fonts.size.medium,
    paddingLeft: 0,
    marginRight: 5,
  },
  plusBtn: {
    padding: 10,
    color: Colors.white,
    marginHorizontal: 11,
  },
  profileBtn: {
    marginRight: 24,
    marginLeft: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnTxt: {
    ...Fonts.style.openSans18Bold,
    color: Colors.ochre,
  },
  addCustomIcon: { color: Colors.white, fontSize: 22 },
  iconStyle: {
    marginHorizontal: 5,
    fontSize: 16,
    color: Colors.white,
    alignSelf: "center",
  },
  iconNotificationStyle: {
    fontSize: 24,
    color: Colors.white,
    marginTop: 5,
  },
  accountBranchContainerStyle: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: Colors.darkBlueHeader,
    justifyContent: "space-around",
  },
  titleIconContainer: {
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
    bottom: 10,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 1, android: 1 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    left: 24,
  },
  changeBtn: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 8,
    color: Colors.ricePaper,
  },
  accountNameStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.white,
    fontSize: 12,
    marginRight: Platform.select({ ios: 10, android: 3 }),
    maxWidth: "60%",
  },
  branchStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.white,
    fontSize: 12,
    marginRight: 5,
    flex: 1,
  },
});
