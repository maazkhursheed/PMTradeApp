import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    borderTopWidth: 8,
    borderBottomWidth: 16,
    borderColor: Colors.offWhite,
    padding: 24,
  },
  chevron: {
    fontSize: 16,
    color: colors.lightBlue,
    marginTop: 16,
  },
  sectionItemContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    ...Fonts.style.openSans16,
    marginTop: 15,
  },
  sectionDescription: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
  },
  iconContainer: {
    backgroundColor: colors.darkBlueHeader,
    borderRadius: 8,
    marginTop: 15,
    marginHorizontal: 6,
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: colors.white,
    fontSize: 10,
  },
});
