import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionHeader: {
    ...Fonts.style.openSans14Bold,
    color: colors.darkGrey,
    marginLeft: 20,
    marginVertical: 18,
  },
  subSeparator: {
    backgroundColor: colors.lightGrey,
    marginLeft: 20,
    height: 1,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: Colors.wildSandColor,
  },
  icon: {
    fontSize: 14,
    color: colors.lightBlue,
  },
  viewMore: {
    ...Fonts.style.openSans18Regular,
    color: colors.lightBlue,
    marginLeft: 16,
  },
  pickupMsg: {
    ...Fonts.style.openSans14,
    marginHorizontal: 24,
    marginTop: 20,
    textAlign: "left",
    alignSelf: "center",
  },
  highlightedText: {
    color: Colors.lightBlue,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  resetText: {
    ...Fonts.style.openSans16,
    marginLeft: 18,
    color: Colors.lightBlue,
  },
});
