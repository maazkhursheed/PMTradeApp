import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  title: {
    ...Fonts.style.openSans18Bold,
    color: colors.lightBlue,
    marginHorizontal: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
  },
  iconMegaPhone: {
    fontSize: 20,
    color: colors.lightGrey,
    marginLeft: 20,
  },
  iconTrash: {
    fontSize: 18,
    color: colors.black,
  },
  requestItem: {
    ...Fonts.style.openSans16Regular,
    color: colors.darkGrey,
    marginLeft: 55,
    paddingTop: 10,
    paddingBottom: 20,
    marginRight: 16,
  },
  container: {
    borderBottomWidth: 8,
    borderBottomColor: colors.wildSandColor,
  },
  inputText: {
    ...Fonts.style.openSans18Regular,
    marginHorizontal: 20,
    paddingVertical: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.wildSandColor,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  editText: {
    ...Fonts.style.openSans16Bold,
    color: colors.black,
    marginHorizontal: 10,
  },
  iconsContainer: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 20, paddingBottom: 20 },
});
