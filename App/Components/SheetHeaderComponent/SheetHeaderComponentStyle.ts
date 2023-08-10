import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  headerTitleStyle: {
    ...Fonts.style.openSans18Bold,
  },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 18,
  },
  saveStyle: {
    ...Fonts.style.openSans16,
    marginRight: 18,
    color: Colors.lightBlue,
  },
});
