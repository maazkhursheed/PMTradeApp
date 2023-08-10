import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  iconStyle: {
    fontSize: 50,
    color: colors.darkGrey,
    textAlign: "center",
  },
  itemContainer: {
    width: "100%",
    backgroundColor: colors.white,
  },
  placeHolder: {
    width: "100%",
    aspectRatio: 1.33,
    backgroundColor: colors.shadowWithAlpha,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "100%",
    aspectRatio: 1.33,
  },
  imageFooter: {
    flexDirection: "row",
    marginHorizontal: 24,
    paddingVertical: 15,
    borderBottomWidth: 1.2,
    borderBottomColor: colors.lightGrey,
  },
  text: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginLeft: 6,
    marginRight: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  includeText: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    marginRight: 10,
  },
  imageName: {
    ...Fonts.style.openSans16Bold,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  icon: {
    color: colors.darkGrey,
    fontSize: 16,
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  loaderStyle: {
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "70%",
    marginTop: 40,
  },
  uploadFailedContainer: {
    position: "absolute",
    bottom: 60,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: 1.32,
    marginTop: 40,
    borderTopWidth: 4,
    borderColor: colors.darkRed,
    backgroundColor: colors.lightGrey,
  },
  retryButton: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 15,
  },
  sizeErrorText: {
    marginTop: 15,
    textAlign: "center",
    marginHorizontal: 30,
  },
  clearButton: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 15,
  },
  retryIcon: {
    color: colors.white,
    fontSize: 15,
  },
  clearIcon: {
    color: colors.white,
    fontSize: 22,
  },
  retryText: {
    ...Fonts.style.openSans14Bold,
    color: colors.white,
    marginLeft: 10,
  },
  clearText: {
    ...Fonts.style.openSans14Bold,
    color: colors.white,
    marginLeft: 4,
  },
  pdfIconStyle: {
    fontSize: 150,
    color: colors.darkGrey,
    paddingVertical: 20,
    textAlign: "center",
  },
  infoIconStyle: {
    fontSize: 45,
    color: colors.darkGrey,
    textAlign: "center",
  },
});
