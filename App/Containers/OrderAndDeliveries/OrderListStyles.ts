import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  orderListItemContainer: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    ...ApplicationStyles.shadow,
  },
  orderNumberLabel: {
    ...Fonts.style.captionLowlight,
    color: Colors.darkGrey,
    fontSize: 12,
  },
  orderNumber: {
    ...Fonts.style.caption,
    color: Colors.darkGrey,
    fontSize: 12,
  },
  statusName: Fonts.style.captionLowlight,
  textName: Fonts.style.subtitleHighlight,
  textTime: {
    textAlign: "left",
    ...Fonts.style.caption,
    color: Colors.darkGrey,
    fontSize: 12,
  },
  orderListItemFlex: {
    flex: 1,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderListItemBottomRow: {
    flex: 1,
    marginBottom: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.faintWedgeBlue,
  },
  groupHeader: {
    marginBottom: 3,
    marginHorizontal: 13,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupHeaderText: {
    color: Colors.brandGrey,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.ProximaBold,
    flex: 1,
  },
  unreadPointer: {
    backgroundColor: Colors.red,
    width: 16,
    height: 16,
    borderRadius: 50,
    marginLeft: 3,
    marginBottom: -8,
    zIndex: 3,
  },
  orderOptionBtn: {
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 15,
  },
  orderOptionsText: {
    ...Fonts.style.captionLowlight,
    color: Colors.lightBlue,
    textAlign: "center",
  },
  emptyOrderListTxt: {
    ...Fonts.style.subtitleLowlight,
  },
  emptyOrderListContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginHorizontal: 20,
  },
  titleStyle: {
    textTransform: "none",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  filterButton: {
    position: "absolute",
    bottom: 5,
  },
  iconStyle: {
    fontSize: 18,
    marginEnd: 5,
    color: Colors.wedgeBlue,
  },
  listContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  colStyle: {
    alignItems: "flex-end",
  },
  statusIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listStyle: {
    marginTop: 10,
  },
  deliveryAddress: {
    flex: 1,
    textAlign: "left",
    ...Fonts.style.caption,
  },
  bottomCartContainer: {
    backgroundColor: Colors.alternativeBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  refContainer: {
    flexDirection: "row",
    flex: 1,
  },
  dateValueText: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  topCartContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  jobNameContainer: {
    flex: 1,
    marginRight: 10,
  },
  refLabel: {
    width: 35,
  },
  dateLabel: { width: 40 },
  textLabel: {
    width: 35,
  },
  refValueText: {
    flex: 1,
    marginRight: 5,
  },
  titleWrapper: { marginBottom: 5 },
  deliveryTypeText: { width: "90%" },
});
