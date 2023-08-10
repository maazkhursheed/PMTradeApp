import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: Colors.white },
  headerStyle: {
    elevation: 2,
  },
  titleStyle: { ...Fonts.style.openSans18Bold, marginLeft: 0 },
  mainView: { marginLeft: 20, marginTop: 24 },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
  addButtonStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  loadingView: { flex: 1 },

  saveButtonStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  tipSectionText: {
    color: Colors.darkBlueHeader,
    fontFamily: Fonts.type.OpenSansRegular,
    fontWeight: "normal",
    fontSize: Fonts.size.regular,
    marginLeft: 12,
    marginRight: 16,
    marginVertical: 10,
    flex: 1,
  },
  tipSectionContainer: {
    flex: 1,
    backgroundColor: Colors.aliceBlue,
    flexDirection: "row",
    borderRadius: 6,
    borderColor: Colors.darkBlueHeader,
    borderWidth: 1,
    marginRight: 20,
  },
  iconStyle: {
    color: Colors.darkBlueHeader,
    fontSize: 18,
    marginTop: 13,
    paddingLeft: 15,
  },
  rowStyle: {
    flexDirection: "row",
  },
  container: { flex: 1 },
  noteStyle: { minHeight: 80, height: undefined },
  warningStyle: {
    ...Fonts.style.openSans12Bold,
    color: Colors.red,
    marginTop: 2,
  },
});
