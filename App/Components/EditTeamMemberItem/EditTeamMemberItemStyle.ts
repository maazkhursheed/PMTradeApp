import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  statusText: {
    ...Fonts.style.bodyHighlight,
    alignSelf: "center",
  },
  memberDetails: {
    alignSelf: "center",
    marginLeft: 10,
    color: colors.darkGrey,
  },
  phoneText: {
    ...Fonts.style.caption,
    marginLeft: 10,
  },
  listItemContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 16,
    ...ApplicationStyles.shadow,
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  nameText: {
    ...Fonts.style.subtitleHighlight,
    colors: colors.black,
  },
  phoneRowContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    backgroundColor: colors.alternativeBackground,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  phoneRow: {
    flexDirection: "row",
  },
  memberDetailsContainer: {
    flexDirection: "row",
  },
  phoneTextLabel: {
    ...Fonts.style.captionHighlight,
  },
  rowContainer: {
    marginTop: 10,
  },
});
