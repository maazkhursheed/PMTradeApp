import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  doneStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  close: {
    fontSize: 18,
    color: Colors.black,
    marginLeft: 18,
  },
  topViewContainer: {
    width: "100%",
    height: 220,
    backgroundColor: colors.offWhite,
    justifyContent: "center",
  },
  initials: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 32,
    color: colors.ochre,
    textAlign: "center",
  },
  infoItemView: {
    paddingVertical: 15,
    backgroundColor: Colors.textInverse,
    paddingLeft: 24,
  },
  separator: {
    backgroundColor: Colors.offWhite,
    height: 8,
  },
  itemValue: {
    ...Fonts.style.openSans18Regular,
  },
  itemLabel: { ...Fonts.style.openSans14, color: Colors.darkGrey },
  subSeparator: {
    backgroundColor: colors.lightGrey,
    marginLeft: 24,
    height: 0.5,
  },
  cameraIcon: {
    fontSize: 18,
    color: Colors.black,
  },
  notificationIcon: {
    fontSize: 24,
    color: Colors.darkGrey,
  },
  rightIcon: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  btnCamera: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    ...Fonts.style.openSans14Bold,
    color: Colors.darkGrey,
    marginLeft: 24,
    marginVertical: 18,
  },
  viNotification: {
    marginHorizontal: 24,
    marginVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtDesc: {
    marginHorizontal: 24,
    marginTop: 18,
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  txtLearnMore: {
    marginLeft: 24,
    ...Fonts.style.openSans14,
    color: Colors.lightBlue,
  },
  btnLearnMore: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  upArrow: {
    fontSize: 8,
    color: Colors.lightBlue,
    marginLeft: 3,
    marginTop: 3,
  },
  inputContainer: { flexDirection: "row", justifyContent: "space-between" },
  clearInputIcon: { fontSize: 18, color: colors.darkGrey, marginRight: 24 },
});
