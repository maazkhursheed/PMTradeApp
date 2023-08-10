import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    ...Fonts.style.ctaLarge,
    color: Colors.lightWedgeBlue,
    marginLeft: 20,
  },
  linkText: {
    ...Fonts.style.bodyHighlight,
    color: Colors.lightBlue,
  },
  listText: {
    ...Fonts.style.openSans18Regular,
    justifyContent: "center",
  },
  textTicked: {
    ...Fonts.style.subtitleHighlight,
    color: Colors.lightBlue,
  },
  containerRow: {
    alignItems: "center",
    alignContent: "flex-end",
    flexDirection: "row",
    marginHorizontal: 20,
    minHeight: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.faintWedgeBlue,
  },
  list: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    minHeight: 60,
    alignSelf: "center",
  },
  listTextRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexGrow: 1,
    // flex: 3,
    width: "95%",
  },
  listIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleContainer: {
    paddingTop: 8,
    backgroundColor: Colors.wildSandColor,
  },
  titleText: {
    ...Fonts.style.openSans18Bold,
    fontSize: 14,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.darkGrey,
  },
  containerLabel: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginVertical: 10,
    paddingRight: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
  expandIcon: {
    fontSize: 24,
  },
  tickIcon: {
    fontSize: 18,
    width: 20,
    color: Colors.lightBlue,
    alignSelf: "flex-end",
  },
  containerLineItem: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    flex: 1,
    borderBottomColor: Colors.lightGrey,
  },
  descriptionContainer: {
    flex: 1,
    margin: 16,
    marginBottom: 24,
  },
  image: {
    width: 72,
    height: 72,
  },
  brandStyle: {
    ...Fonts.style.openSans16Regular,
    color: Colors.ochre,
  },
  nameStyle: {
    ...Fonts.style.openSans18Bold,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: Fonts.type.OpenSansBold,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    backgroundColor: Colors.darkBlue,
  },
  doneTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansRegular,
    paddingHorizontal: 22,
    textAlign: "right",
    color: Colors.lightBlue,
  },
  newTextStyle: {
    color: Colors.lightBlue,
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansRegular,
    paddingHorizontal: 22,
    textAlign: "right",
  },
  cardInnerContainer: {
    minHeight: 90,
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightWedgeBlue,
  },
  imageStyle: {
    width: 72,
    height: 72,
  },
  productInfoView: {
    marginLeft: 4,
    marginRight: 70,
  },
  contentContainer: {
    paddingBottom: Metrics.screenHeight * 0.11,
  },
});
