import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  textView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  featureList: {
    backgroundColor: colors.white,
    padding: 23,
  },
  itemStyle: {
    alignItems: "center",
    alignSelf: "flex-start",
    width: Metrics.screenWidth * 0.29,
  },
  searchField: {
    marginHorizontal: 16,
  },
  searchFieldContainer: {
    backgroundColor: Colors.white,
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  featureItemView: {
    flex: 1,
    paddingTop: 24,
    justifyContent: "flex-end",
    alignContent: "flex-start",
  },
  featureItemText: {
    ...Fonts.style.openSans12,
    color: Colors.black,
    textAlign: "center",
    marginTop: 8,
  },
  heading: {
    ...Fonts.style.openSansExtraBold28,
    alignSelf: "center",
    fontSize: 36,
    color: Colors.darkBlue,
    // marginLeft: 24,
    marginTop: 24,
    maxWidth: 227,
  },
  headingPlain: {
    ...Fonts.style.openSansExtraBold28,
    marginTop: 26,
    marginLeft: 24,
  },
  products: {
    minHeight: 112,
    ...Fonts.style.openSansExtraBold28,
    textAlign: "center",
    maxWidth: 227,
  },
  detailsHeading: {
    ...Fonts.style.openSans18Bold,
    marginVertical: 16,
    marginHorizontal: 24,
  },
  textSubtitle: {
    ...Fonts.style.captionHighlight,
    alignSelf: "flex-start",
  },
  textStatus: {
    ...Fonts.style.smallCaption,
    alignSelf: "flex-start",
  },
  headerTitle: {
    ...Fonts.style.header1,
    alignSelf: "stretch",
  },
  back: {
    fontSize: 20,
    color: Colors.white,
  },
  headerLeftRight: {
    flex: 1,
  },
  headerBody: {
    flex: 3,
  },
  container: {
    backgroundColor: Colors.white,
  },
  headerContainer: {
    elevation: 1,
    zIndex: 10,
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 18,
  },
  header: { backgroundColor: Colors.brandPrimary },
  frequentlyOrderedList: {
    flexGrow: 1,
    marginHorizontal: 8,
    paddingRight: 30,
    minHeight: 60,
  },
  frequentlyOrderContainer: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  viewAllFrequentlyOrdered: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    textAlign: "center",
    padding: 5,
    marginBottom: 24,
  },
  frequentlyOrderedMessage: {
    ...Fonts.style.openSans16Regular,
    textAlign: "center",
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 60,
    marginTop: 10,
  },
  itemText: {
    fontFamily: Fonts.type.SFProRegular,
    fontSize: 18,
    flex: 1,
    color: Colors.black,
  },
  allProductsStyle: {
    marginHorizontal: 24,
  },
  iconStyle: {
    fontSize: 18,
    textAlign: "right",
    color: Colors.darkGrey,
  },
  marketingTileView: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
});
