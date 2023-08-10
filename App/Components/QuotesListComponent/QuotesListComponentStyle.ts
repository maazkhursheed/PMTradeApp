import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "~root/Themes";
import colors from "~root/Themes/Colors";

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
    padding: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 65,
  },
  headerText: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 200,
  },
  loadingView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
    zIndex: -1,
  },
  animatedFLPB: {
    minHeight: Metrics.screenHeight,
    paddingBottom: 120,
    width: Metrics.screenWidth,
  },
  buttonContainer: {
    flexDirection: "row",
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
    width: "48%",
    borderRadius: 5,
    paddingVertical: 8,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.snow,
    marginLeft: 10,
  },
  btnViewSelected: {
    borderRadius: 40,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  btnText: {
    ...Fonts.style.openSans14Bold,
  },
  btnTextSelected: {
    ...Fonts.style.openSans14Bold,
    color: Colors.snow,
  },
  btnView: {
    borderRadius: 40,
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  statusBtnView: {
    flexDirection: "row",
    paddingBottom: 10,
    shadowColor: Platform.OS === "android" ? colors.darkGrey : colors.lightGrey,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  statusView: {
    flex: 1,
  },
  messageView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  messageStyle: {
    ...Fonts.style.openSans14Bold,
    color: Colors.lightGrey,
    lineHeight: 20,
  },
  marginLeft: { marginLeft: 16 },
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
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
});
