import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { ApplicationStyles, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  checkoutButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  subTotalView: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 45,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  iconStyle: { color: Colors.lightGrey },
  iconStyleNew: {
    fontSize: 24,
  },
  separator: {
    height: 8,
    backgroundColor: Colors.wildSandColor,
  },
  separatorPopUp: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.lightGrey,
    marginVertical: 8,
  },
  priceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 16,
    paddingVertical: 10,
  },
  AdditionalCharges: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 16,
  },
  mainSectionView: {
    paddingLeft: 24,
    paddingTop: 18,
  },
  summaryText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 14,
  },
  dspText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
  },
  freightAgreementText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    marginTop: 2,
  },
  siteText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    marginBottom: 5,
  },
  deliveryContainer: {
    flex: 1,
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
    marginBottom: 22,
  },
  additionalInfoContainer: {
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
  },
  dividerSpace: {
    marginTop: 20,
  },

  deliveryRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  subTotalText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  subTotalTextCash: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  subTotalTextPayNow: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  subTotalTextCashItalic: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansItalic,
    fontSize: 12,
  },
  cartageItalic: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansItalic,
    fontSize: 18,
  },
  deliveryText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  totalText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  lineSeparator: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginLeft: 15,
  },
  lineSeparatorMain: {
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  gstText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  additionalInfoTextDescrption: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  additionalInfoText: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  linkText: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  linkTextCash: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  loadingViewStyle: {
    height: 30,
    marginHorizontal: 10,
  },
  tagIconStyle: {
    fontSize: 18,
    marginRight: 8,
    paddingVertical: 5,
  },
  contactView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  contactNotificationView: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 8,
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
  },
  mainContactView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
    marginVertical: 18,
    marginLeft: 10,
  },
  accountView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
    marginVertical: 18,
  },
  truckSectionView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    marginLeft: 10,
  },
  mainDeliveryOptionsDetailView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  deliverOptionView: {
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  deliverOptionViewText: {
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
    paddingLeft: 8,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: Colors.textInverse,
    paddingLeft: 14,
  },
  profileBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#fff",
    width: 48,
    height: 48,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnTxt: {
    ...Fonts.style.openSans18Bold,
    color: Colors.greenCheck,
    fontSize: 24,
  },
  user: {
    ...Fonts.style.openSans18Regular,
    flex: 1,
    paddingLeft: 16,
  },
  travelTime: {
    ...Fonts.style.openSans18Regular,
  },
  travelDistance: {
    ...Fonts.style.openSans18Regular,
    paddingLeft: 16,
  },
  seperator: {
    ...Fonts.style.openSans18Regular,
    paddingRight: 5,
  },
  additionalInfo: {
    ...Fonts.style.openSans18Regular,
    flex: 1,
    paddingRight: 24,
    marginVertical: 24,
  },
  subUser: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    flex: 1,
    paddingLeft: 16,
    paddingRight: 44,
  },
  image: {
    width: 60,
    height: 60,
  },
  imageAccount: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  imageLocation: {
    width: 38,
    height: 38,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#ffffff",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  imageTruck: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  titleImageTruck: {
    ...Fonts.style.openSans16Regular,
    flex: 1,
    paddingLeft: 22,
  },
  subTitleImageTruck: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    flex: 1,
    paddingLeft: 8,
  },
  imagePickUpDetails: {
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#fff",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    marginLeft: 6,
  },
  closeBtnText: {
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 18,
  },
  modelError: {
    alignItems: "center",
    paddingBottom: 10,
  },
  modelAlert: {
    width: "100%",
    height: 395,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  invalidCodeTxt: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    marginTop: 20,
  },
  poCodeTxt: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
    marginTop: 24,
  },
  errorText: {
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    textAlign: "center",
  },
  modalBtn: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    marginVertical: 12,
    paddingLeft: 30,
    paddingRight: 30,
  },
  directionIconContainer: {
    backgroundColor: Colors.lighterGreen,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 4,
    marginLeft: 6,
  },
  travelDistanceContainer: {
    flex: 1,
    flexDirection: "row",
  },
  directionIcon: {
    fontSize: 22,
    color: Colors.darkBlueHeader,
  },
  locationIconContainer: {
    backgroundColor: colors.ochreBg,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 4,
    marginLeft: 6,
  },
  locationIconStyle: {
    fontSize: 22,
    color: colors.darkRed,
  },
  colorStyle: {
    color: Colors.darkGrey,
  },
  permissionComponentStyle: {
    marginTop: 4,
  },
  priceComponentStyle: {
    flexDirection: "row",
  },
  txtTotalStyle: {
    textAlign: "right",
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  txtTotalStyleTax: {
    color: Colors.darkGrey,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 14,
  },
  txtTotalTax: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disclosureContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  footerContainer: {
    paddingBottom: 20,
  },
  truckIconContainer: {
    backgroundColor: colors.lighterGrey,
    borderRadius: 4,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  truckIcon: {
    fontSize: 24,
    color: colors.darkGrey,
  },
  infoIconCartage: {
    color: colors.darkBlueHeader,
    fontSize: 16,
    marginTop: 3,
  },
  headerRowInstructionsCartage: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
    paddingVertical: 16,
    paddingLeft: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    backgroundColor: "rgba(243,248,253,1)",
  },
  disclosureText: {
    ...Fonts.style.openSans12,
    color: Colors.blue,
    lineHeight: 24,
  },
  messageHeader: {
    ...Fonts.style.openSans14Bold,
    color: Colors.darkBlueHeader,
  },
  innerView: {
    marginLeft: 5,
    marginRight: 16,
    flex: 1,
  },
  gstPriceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 16,
    marginVertical: 14,
  },
});
