import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlueHeader,
    zIndex: 10,
  },
  headerTabButton: {
    backgroundColor: Colors.darkBlueHeader,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 15,
  },
  unselectedButtonProduct: {
    paddingBottom: 10,
  },
  selectedButton: {
    borderBottomColor: Colors.lightBlue,
    borderBottomWidth: 4,
    paddingBottom: 10,
  },
  selectedButtonOthers: {
    borderBottomColor: Colors.lightBlue,
    borderBottomWidth: 4,
    paddingBottom: 10,
    marginLeft: 20,
  },
  unSelectedButton: {
    marginLeft: 20,
  },
  backBtnStyle: {
    fontSize: 14,
    textAlign: "right",
    color: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
  headerTitleText: {
    ...Fonts.style.openSans18Bold,
    width: "80%",
    color: Colors.white,
    position: "absolute",
    left: 30,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 14,
  },
  buttonDisableText: {
    color: Colors.white,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  titleIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    bottom: 10,
    paddingLeft: 10,
  },
});
