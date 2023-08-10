import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viInstructions: {
    paddingLeft: 18,
    paddingTop: 18,
  },
  btnInstructions: {
    alignSelf: "center",
  },
  btnTitle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    padding: 20,
  },
  txtInstructions: {
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
    marginTop: 20,
    marginRight: 20,
  },
});
