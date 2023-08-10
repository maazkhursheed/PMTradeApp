import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 257,
    marginVertical: 24,
    marginRight: 12,
  },
  truckInfoContainer: {
    width: 150,
    height: 205,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...ApplicationStyles.shadow,
    elevation: 10,
    shadowColor: "#000",
  },
  imageStyle: {
    width: 150,
    height: 112,
  },
  labelStyle: {
    ...Fonts.style.openSans16Bold,
    marginLeft: 24,
    marginTop: 16,
  },
  descStyle: {
    ...Fonts.style.openSans14,
    marginLeft: 24,
    marginTop: 2,
    color: Colors.darkGrey,
  },
  continueButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 40,
    marginVertical: 10,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
  },
  tickIconContainer: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    width: 28,
    height: 28,
    borderRadius: 10,
    marginVertical: 24,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  tickIconStyle: {
    marginLeft: 5,
    color: Colors.white,
    width: 18,
    height: 13,
    alignSelf: "center",
  },
  siteDetailItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  iconContainer: {
    flex: 1,
    marginLeft: 16,
  },
  iconStyle: {
    fontSize: 22,
    color: Colors.darkGrey,
  },
  labelContainer: {
    flex: 5,
  },
  siteItemLabelStyle: {
    ...Fonts.style.openSans18Regular,
  },
  siteItemDesc: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  siteItemTickContainer: {
    marginRight: 28,
    alignSelf: "flex-end",
  },
  scrollViewStyle: {
    backgroundColor: Colors.wildSandColor,
  },
  cardSectionStyle: {
    marginLeft: 18,
  },
  flatListStyle: {
    paddingLeft: 18,
  },
  cardStyle: {
    paddingTop: 18,
  },
  siteCardStyle: {
    paddingLeft: 18,
    paddingTop: 18,
  },
});
