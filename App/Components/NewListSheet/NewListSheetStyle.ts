import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  closeIcon: {
    paddingLeft: 6,
    paddingRight: 3,
    color: colors.darkGrey,
    fontSize: 20,
    alignSelf: "center",
  },
  searchContainerStyle: {
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.snow,
    borderTopColor: Colors.snow,
    padding: 0,
  },
  textInputCustom: {
    height: 40,
    color: colors.wedgeBlue,
    marginHorizontal: 10,
    backgroundColor: Colors.snow,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.darkWedgeBlue,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  inputContainerStyle: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: Colors.offWhite,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.offWhite,
    height: 40,
  },
  inputStyle: { ...Fonts.style.subtitle, color: Colors.black },
  warningContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 60,
    paddingTop: 140,
  },
  warningText: {
    ...Fonts.style.openSans16Regular,
    textAlign: "center",
    color: Colors.darkRed,
  },
  loadingView: {
    flex: 1,
  },
  headerTitleStyle: {
    ...Fonts.style.openSans18Bold,
  },
  leftItemBtnStyle: {
    paddingLeft: 16,
  },
  cancelBtnTextStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  rightItemBtnStyle: {
    paddingRight: 16,
  },
});
