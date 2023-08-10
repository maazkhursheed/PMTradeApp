import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  iconStyle: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  notificationItemContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    padding: 5,
  },
  textName: {
    ...Fonts.style.bodyHighlightNew,
    color: Colors.black,
  },
  notificationTime: {
    textAlign: "left",
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
  },
  notificationSubItem: {
    textAlign: "left",
    marginTop: 10,
    ...Fonts.style.openSans16,
  },
  sectionSeparator: {
    marginTop: 10,
    height: 8,
    backgroundColor: Colors.wildSandColor,
  },
  lineSeparator: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.faintWedgeBlue,
  },
  parentBranch: {
    marginLeft: 20,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.medium,
    color: Colors.darkGrey,
    marginTop: 20,
    paddingBottom: 10,
  },
  separator: {
    marginVertical: 10,
  },
  emptyView: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: Fonts.size.regular,
    color: Colors.darkGrey,
    textAlign: "center",
  },
  containerStyle: {
    flex: 1,
  },
  notificationView: {
    marginTop: 8,
  },
  itemSeparator: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.faintWedgeBlue,
    marginTop: 15,
  },
});
