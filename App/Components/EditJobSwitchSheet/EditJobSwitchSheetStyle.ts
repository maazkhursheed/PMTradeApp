import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

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
});
