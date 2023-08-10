import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    paddingVertical: 17,
    paddingHorizontal: 20,
    marginVertical: 16,
    alignItems: "center",
  },
  plusIcon: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    fontSize: 17,
    marginRight: 16,
  },
  uploadText: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  label: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
  },
  backToJobDtailsButton: {
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.white,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    flexDirection: "row",
    paddingBottom: 20,
  },
  verticalSeparator: {
    width: 1,
    height: 20,
    backgroundColor: colors.darkGrey,
  },
  icon: {
    color: colors.darkBlue,
    marginLeft: 12,
    fontSize: 18,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    textAlign: "right",
  },
  value: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
    fontSize: 16,
  },
});
