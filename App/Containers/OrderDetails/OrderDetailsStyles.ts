import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
  },
  flatList: {
    marginVertical: 10,
  },
  orderListItemFlex: {
    marginBottom: 21,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeader: {
    ...Fonts.style.labels,
    marginVertical: 10,
    fontSize: 14,
  },
  orderDetailsFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderName: {
    ...Fonts.style.subtitleHighlight,
    marginBottom: 6,
    flex: 1,
  },
  deliveryType: {
    ...Fonts.style.labels,
    marginLeft: 10,
  },
  deliveryDetail: {
    ...Fonts.style.caption,
    color: Colors.wedgeBlue,
    flex: 1,
    marginBottom: 13,
  },
  deliveryId: { ...Fonts.style.captionLowlight, marginLeft: 10 },
  deliveryDetailKey: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.wedgeBlue,
  },
  deliveryDetailVal: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.OpenSansBold,
    textAlign: "right",
    color: Colors.darkerGrey,
  },
  deliveryCaption: {
    ...Fonts.style.caption,
    marginBottom: 10,
  },
  deliverCaptionHeader: {
    ...Fonts.style.captionLowlight,
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 15,
    padding: 2,
  },
  itemDetails: {
    ...Fonts.style.bodyHighlight,
  },
  itemQuantity: {
    ...Fonts.style.subtitleHighlight,
    textAlign: "right",
  },
  itemUnit: {
    ...Fonts.style.subtitleHighlight,
    textAlign: "left",
    marginLeft: 2,
  },
  skuNumber: {
    ...Fonts.style.captionLowlight,
  },
  siteContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  siteDetailsText: {
    flex: 1,
    marginBottom: 5,
  },
  callButton: {
    marginHorizontal: 10,
  },
  marginStyle: {
    marginBottom: 10,
  },
  branchTextStyle: {
    marginBottom: 2,
  },
  orderOptionsBtnContainer: {
    paddingTop: -100,
  },
  deliveryDetailContainer: {
    flexDirection: "row",
    flex: 1,
  },
  deliveryLabel: { flexDirection: "column", flex: 1 },
  liveTrackButton: { justifyContent: "flex-end", marginHorizontal: 10 },
  dividerStyle: { marginTop: 10 },
});
