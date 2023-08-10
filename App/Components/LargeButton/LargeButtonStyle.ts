import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

const commonButton = {
  justifyContent: "center",
  shadowColor: "transparent",
  flexDirection: "row",
};

export default StyleSheet.create({
  bgActive: { ...commonButton, backgroundColor: Colors.buttonPressed },
  bgInActive: { ...commonButton, backgroundColor: Colors.lightBlue },
  bgDisabled: { ...commonButton, backgroundColor: Colors.wildSandColor },
  btnText: Fonts.style.btnLarge,
  btnTextDisabled: { ...Fonts.style.btnLarge, color: Colors.black },
  textContainer: { justifyContent: "center", flex: 1, alignSelf: "stretch" },
  icon: {
    fontSize: 20,
    color: Colors.red,
    alignSelf: "center",
  },
});
