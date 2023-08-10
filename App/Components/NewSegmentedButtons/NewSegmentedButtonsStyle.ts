import { StyleSheet } from "react-native";
import { isLargeDevice } from "~root/Lib/CommonHelper";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonSelected: {
    backgroundColor: Colors.darkBlue,
    justifyContent: "center",
    flex: 1,
    height: 60,
    paddingHorizontal: 0,
    marginRight: 0,
    borderWidth: 0,
    borderBottomColor: Colors.snow,
    borderBottomWidth: 5,
  },
  buttonSelectedText: {
    fontFamily: Fonts.type.ProximaBold,
    color: Colors.snow,
    textAlign: "center",
    fontSize: isLargeDevice() ? 12 : 9,
  },
  buttonContainerInverse: {
    flex: 1,
    color: Colors.darkBlue,
    backgroundColor: Colors.darkBlue,
    justifyContent: "center",
    marginRight: 0,
    borderWidth: 0,
    height: 60,
    borderBottomColor: Colors.snow,
    borderBottomWidth: 1,
  },
  buttonTextInverse: {
    fontFamily: Fonts.type.ProximaBold,
    color: Colors.lightBlue,
    textAlign: "center",
    fontSize: isLargeDevice() ? 12 : 9,
  },
});
