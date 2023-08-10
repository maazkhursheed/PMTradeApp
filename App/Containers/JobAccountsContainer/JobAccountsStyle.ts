import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    padding: 20,
  },
  flexContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  header: { backgroundColor: Colors.faintWedgeBlue },
  back: {
    fontSize: 20,
  },
  edit: {
    fontSize: 24,
    color: Colors.darkerGrey,
    marginRight: 0,
  },
  add: { fontSize: 20, color: Colors.wedgeBlue },
  subHeaderView: {
    flexDirection: "row",
    marginBottom: 25,
  },
  title: {
    ...Fonts.style.header2,
    fontSize: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
  },
  list: {
    paddingVertical: 10,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 0.25,
    flexDirection: "row",
    alignContent: "center",
  },
  jobAccount: {
    ...Fonts.style.subtitleHighlight,
    flex: 1,
  },
  jobAddress: {
    marginTop: 5,
    fontFamily: Fonts.type.OpenSansRegular,
    color: colors.darkGrey,
    fontSize: 14,
    flex: 1,
  },
  accountName: {
    fontSize: 12,
    color: Colors.darkerGrey,
  },

  delete: {
    fontSize: 20,
    color: Colors.lightWedgeBlue,
    textAlign: "right",
    marginRight: 10,
    marginTop: 10,
  },
  modalMsg: {
    alignSelf: "flex-start",
    marginBottom: 30,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    color: Colors.wedgeBlue,
  },
  titleStyle: {
    textTransform: "none",
  },
  contentContainer: {
    paddingBottom: 40,
  },
});
