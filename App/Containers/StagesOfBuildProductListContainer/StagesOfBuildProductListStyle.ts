import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  disclosureView: {
    marginHorizontal: 18,
    marginTop: 8,
    marginBottom: 17,
    flexDirection: "row",
    backgroundColor: Colors.white,
  },
  imageStyle: {
    marginRight: 6,
  },
  disclosureMessage: {
    flex: 1,
    ...Fonts.style.disclosureFont,
  },
});
