import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  loadingView: {
    flex: 1,
    marginTop: 16,
  },
  textStyle: {
    ...Fonts.style.openSans16Bold,
    marginVertical: 16,
  },
  itemsContainer: {
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
  sectionItemContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  button: {
    flexDirection: "row",
    marginVertical: 16,
  },
  buttonText: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  icon: {
    alignSelf: "center",
    marginRight: 5,
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
});
