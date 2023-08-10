import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
  },
  heading: {
    ...Fonts.style.openSansExtraBold28,
    marginTop: 26,
    marginLeft: 24,
  },
  listContainerStyle: {
    paddingLeft: 24,

    paddingBottom: 30,
  },
  viewMoreStyle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    textAlign: "center",
    padding: 5,
    marginBottom: 24,
  },
});
