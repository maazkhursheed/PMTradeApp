import { Platform, StyleSheet } from "react-native";
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
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderTopWidth: Platform.select({ android: 1, ios: 0 }),
    borderTopColor: Colors.borderGrey,
  },
  buttonSendStyle: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightBlue,
  },
  buttonPreviewStyle: {
    flex: 1,
    width: "50%",
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightBlue,
    backgroundColor: colors.white,
  },
  buttonSendText: {
    ...Fonts.style.openSans16Bold,
    color: colors.white,
  },
  buttonPreviewText: {
    ...Fonts.style.openSans16Bold,
    color: colors.lightBlue,
  },
  totalItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 16,
    marginRight: 24,
    marginBottom: 10,
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
