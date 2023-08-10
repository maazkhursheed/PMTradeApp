import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
  selTabView: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    zIndex: 4,
    backgroundColor: Colors.white,
  },
  unSelectedTabView: {
    ...Fonts.style.openSans14,
    color: Colors.lightBlue,
  },
  selTabViewText: {
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.darkBlueHeader,
    fontSize: 14,
  },
  unSelectedTabViewText: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.darkBlueHeader,
    fontSize: 14,
  },
  tabViewContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: -1,
  },
});
