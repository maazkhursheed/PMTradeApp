import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  viewStyle: {
    flex: 1,
    padding: 40,
    paddingHorizontal: 20,
    flexDirection: "column",
    backgroundColor: Colors.snow,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  title: {
    marginTop: 60,
    ...Fonts.style.updateTitle,
  },
  message: {
    marginTop: 20,
    textAlign: "center",
    ...Fonts.style.updateMessage,
  },
  btnStyle: {
    marginTop: 60,
  },
});
