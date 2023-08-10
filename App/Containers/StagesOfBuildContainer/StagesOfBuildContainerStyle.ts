import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    elevation: 10,
    zIndex: 10,
  },
  accountName: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    ...Fonts.style.openSans16Regular,
  },
  accountNameBold: {
    ...Fonts.style.openSans14Bold,
    padding: 24,
  },
  stagesOfBuildHeader: {
    ...Fonts.style.openSans16Bold,
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  shadow: {
    shadowColor: Platform.OS === "android" ? colors.darkGrey : colors.lightGrey,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: colors.white,
  },
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
    marginBottom: 20,
  },
  infoText: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
  },
  infoIcon: {
    marginRight: 14,
    fontSize: 16,
    color: colors.darkBlue,
  },
  contentContainer: {
    marginTop: 20,
    paddingBottom: 25,
  },
});
