import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  quoteWonLostContainer: {
    position: "absolute",
    elevation: 1,
    bottom: 0,
    padding: 20,
    marginBottom: Platform.select({ android: -10, ios: 0 }),
    backgroundColor: colors.white,
    flexDirection: "row",
    ...ApplicationStyles.shadow,
    shadowOffset: {
      width: 0,
      height: -5,
    },
  },
  container: {
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 16,
    justifyContent: "space-between",
  },
  icon: {
    ...Fonts.style.openSans16Regular,
    color: Colors.black,
    fontSize: 14,
    marginRight: 10,
  },
  text: {
    ...Fonts.style.openSans16Regular,
    color: Colors.darkGrey,
    fontSize: 16,
  },
  changeText: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    fontSize: 16,
    marginRight: 10,
  },
  separator: {
    height: 1,
    marginHorizontal: 24,
    backgroundColor: Colors.lightGrey,
  },
  value: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
    fontSize: 16,
    flex: 2,
    textAlign: "right",
  },
  buttonStyle: {
    borderRadius: 6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 16,
    flexDirection: "row",
  },
  buttonText: {
    ...Fonts.style.openSans14Bold,
    color: Colors.white,
  },
  tickIcon: {
    ...Fonts.style.openSans16Regular,
    color: Colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  totalGSTValue: {
    alignItems: "flex-end",
  },
  gstText: {
    ...Fonts.style.openSans12,
    paddingTop: 16,
  },
  backToJobDtailsButton: {
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
});
