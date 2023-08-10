import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: Colors.white },
  headerTitleStyle: { ...Fonts.style.openSans18Bold },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 18,
  },
  loadingView: { flex: 1, marginLeft: 20, marginTop: 24 },
  inputStyle: {
    ...Fonts.style.subtitleSmall,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    minHeight: 120,
  },
  notesContainer: {
    minHeight: 120,
    height: 0,
  },
  iconContainer: {
    backgroundColor: Colors.tickGreen,
    borderRadius: 22,
    padding: 6,
    marginTop: 4,
    marginHorizontal: 10,
  },
  iconAlertContainer: {
    marginTop: 4,
    marginHorizontal: 10,
  },
  icon: {
    color: Colors.white,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 5,
    marginTop: 25,
  },
  textItem: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
    marginRight: 12,
    marginLeft: 10,
    marginBottom: 20,
  },
  textRegularItem: {
    ...Fonts.style.openSans16Regular,
    color: Colors.black,
    marginRight: 12,
    marginLeft: 10,
    marginBottom: 20,
  },
  infoTextItem: {
    flex: 1,
    flexDirection: "column",
  },
  confirmButton: {
    ...Fonts.style.openSans16,
    marginRight: 18,
    color: Colors.lightBlue,
  },
  headerBorder: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
  },
});
