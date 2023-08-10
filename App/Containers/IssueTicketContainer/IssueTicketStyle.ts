import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  back: {
    fontSize: 20,
  },
  headerTitle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    color: Colors.black,
  },
  barcodeTitle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 20,
    color: Colors.black,
  },
  heading: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 32,
    color: Colors.black,
    marginBottom: 8,
  },
  subHeading: {
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
    fontSize: 14,
    marginBottom: 6,
  },
  bottomText: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 18,
    marginBottom: 20,
  },
  barcodeText: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 18,
    marginBottom: 20,
  },
  validitytext: {
    color: Colors.darkRed,
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 14,
  },
  modalText: {
    ...Fonts.style.subtitleLowlight,
    marginBottom: 20,
  },
  closeBtn: {
    fontSize: 16,
    marginRight: 10,
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontWeight: "normal",
  },
  titleStyle: {
    marginVertical: 10,
  },
  contentStyle: {
    flex: 1,
  },
  accountPO: {
    marginVertical: 50,
    flex: 1,
    marginHorizontal: 24,
  },
  rowStyle: {
    flexDirection: "row",
  },
  returnToReviewButton: {
    backgroundColor: Colors.backgroundSTCGrey,
    margin: 24,
    borderRadius: 8,
    ...ApplicationStyles.shadow,
  },
  accountName: {
    flex: 1,
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.subHeadingColor,
    fontSize: 14,
    marginBottom: 6,
  },
});
