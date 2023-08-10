import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  descriptionStyle: {
    alignSelf: "flex-start",
    marginBottom: 20,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    color: Colors.wedgeBlue,
  },
  emailStyle: {
    color: Colors.facebook,
  },
});
