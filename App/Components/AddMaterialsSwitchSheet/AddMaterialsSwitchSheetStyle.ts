import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: Colors.white, elevation: 5 },
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
  loadingView: { flex: 1 },
  saveButtonStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
});
