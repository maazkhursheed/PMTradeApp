import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  buttonSendStyle: {
    borderRadius: 8,
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightBlue,
    margin: 24,
    paddingVertical: 9,
    alignItems: "center",
  },
  buttonSendText: {
    ...Fonts.style.openSans16Bold,
    color: colors.white,
  },
  totalItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 24,
  },
  itemLabel: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
    marginRight: 8,
  },
  buttonDisabled: {
    backgroundColor: Colors.wildSandColor,
    borderColor: Colors.wildSandColor,
    color: Colors.black,
  },
});
