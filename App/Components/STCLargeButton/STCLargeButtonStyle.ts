import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

const commonButton = {
  justifyContent: "center",
  shadowColor: "transparent",
  flexDirection: "row",
};

export default StyleSheet.create({
  bgActive: { ...commonButton, backgroundColor: Colors.snow },
  bgInActive: { ...commonButton, backgroundColor: Colors.snow },
  bgDisabled: { ...commonButton, backgroundColor: Colors.snow },
  btnText: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 18,
    padding: 16,
    textAlign: "center",
    color: Colors.lightBlue,
  },
  btnTextDisabled: { ...Fonts.style.btnLarge, color: Colors.snow },
  textContainer: { justifyContent: "center", flex: 1, alignSelf: "stretch" },
  btnTextStyle: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.SFProBold,
    fontSize: 18,
  },
  btnStyle: { backgroundColor: Colors.snow },
});
