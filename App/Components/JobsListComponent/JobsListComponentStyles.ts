import { Dimensions, StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "~root/Themes";
import colors from "~root/Themes/Colors";

const deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadMoreJobsBtn: {
    alignSelf: "center",
    backgroundColor: colors.offWhite,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 40,
  },
  loadMoreJobsBtnText: {
    ...Fonts.style.openSans16Bold,
    color: colors.darkBlueHeader,
  },
  jobsCountFooter: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  headerText: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginTop: 5,
  },
  contentContainer: {
    minHeight: Metrics.screenHeight,
  },
  loadingView: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    minHeight: 65,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
  },
  buttonStyle: {
    backgroundColor: colors.lightBlue,
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
  },
  buttonText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.snow,
    textAlign: "center",
  },
});
