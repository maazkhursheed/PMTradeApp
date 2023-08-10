import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    borderTopWidth: 8,
    borderBottomWidth: 16,
    borderColor: Colors.offWhite,
    padding: 24,
  },
  address: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  addressWithOutStatus: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    marginRight: 10,
  },
  editJob: {
    textAlign: "center",
    marginTop: 24,
    ...Fonts.style.openSans16Bold,
    color: Colors.lightBlue,
  },
  divider: {
    backgroundColor: "#DDDDDD",
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 18,
  },
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  infoText: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
  },
  infoIcon: {
    marginRight: 7,
    fontSize: 17,
    color: colors.darkGrey,
  },
  btnViewStatus: {
    borderRadius: 40,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  btnText: {
    ...Fonts.style.openSans14Bold,
    color: Colors.snow,
  },
  segmentStyle: {
    marginBottom: 10,
  },
});
