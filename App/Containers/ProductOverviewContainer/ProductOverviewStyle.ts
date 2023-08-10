import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  scrollView: {
    marginTop: 16,
  },
  titleView: {
    marginLeft: 24,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightWedgeBlue,
  },
  titleText: {
    color: Colors.darkGrey,
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansBold,
  },
  bulletText: {
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.black,
    fontSize: 18,
    marginBottom: 5,
  },
  back: {
    fontSize: 20,
    color: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 48,
  },
  noResult: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 28,
    color: Colors.black,
    textAlign: "center",
  },
  header: {
    backgroundColor: Colors.brandPrimary,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 16,
  },
  titleStyle: {
    textTransform: "none",
    color: Colors.white,
  },
  bulletTextContainer: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  itemsContainer: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  noInfoContainer: {
    flex: 1,
    padding: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  noInfoText: {
    ...Fonts.style.openSansExtraBold12,
    fontSize: 28,
    textAlign: "center",
  },
  listStyle: { marginVertical: 24, marginHorizontal: 24 },
  bulletTextStyle: { marginHorizontal: 24 },
  bulletComponentStyle: { marginBottom: 16 },
  featureView: { marginTop: 16 },
});
