import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  pdfContainer: {
    padding: 24,
    backgroundColor: colors.white,
  },
  iconStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  pdfView: {
    alignItems: "center",
  },
  pdf: {
    width: 300,
    height: 380,
  },
  pdfReadyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    marginHorizontal: 20,
  },
  pdfReadyIcon: {
    color: colors.darkBlueHeader,
    fontSize: 16,
  },
  pdfReadyText: {
    ...Fonts.style.openSans14Bold,
    color: colors.darkBlueHeader,
    paddingTop: 1,
    paddingLeft: 7,
  },
  pdfReadySearch: {
    paddingTop: 2,
    color: colors.darkBlueHeader,
    fontSize: 20,
  },
  pdfFailView: {
    backgroundColor: Colors.offWhite,
    padding: 30,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  pdfFail: {
    ...Fonts.style.openSans18Bold,
    color: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  pdfFailIconView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pdfFailIcon: {
    color: colors.red,
    fontSize: 16,
  },
  pdfFailText: {
    ...Fonts.style.openSans14Bold,
    color: colors.red,
    paddingLeft: 7,
  },
  regenerateBtn: {
    paddingTop: 2,
    backgroundColor: Colors.offWhite,
    borderRadius: 6,
  },
  regenerateBtnText: {
    ...Fonts.style.openSans14Bold,
    color: colors.darkBlueHeader,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  loadingView: {
    backgroundColor: Colors.offWhite,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  loadingIcon: {
    fontSize: 16,
  },
  loadingText: {
    ...Fonts.style.openSans14Bold,
    color: colors.shadow,
    paddingLeft: 10,
    paddingTop: 1,
  },
  loader: {},
  iconTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
