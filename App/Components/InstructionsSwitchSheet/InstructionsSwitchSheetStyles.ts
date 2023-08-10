import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  input: {
    margin: 24,
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
  },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  doneStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 18,
  },
  saveText: {
    ...Fonts.style.openSans16,
    marginRight: 18,
    color: Colors.lightBlue,
  },
  titleStyle: { ...Fonts.style.openSans18Bold },
});
