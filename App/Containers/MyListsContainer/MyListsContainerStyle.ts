import { StyleSheet } from "react-native";
import { HEADER_HEIGHT_MAX } from "~root/Config/Constants";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  addButton: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  addCustomIcon: {
    color: Colors.snow,
    fontSize: 24,
  },
  containerStyle: {
    paddingBottom: HEADER_HEIGHT_MAX,
  },
  largeButtonStyle: {
    borderRadius: 10,
    height: 45,
    marginTop: 20,
    marginBottom: 20,
  },
  largeButtonTextStyle: {
    padding: 0,
    fontFamily: Fonts.type.OpenSansBold,
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 16,
  },
  checkoutButtonContainer: {
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: Colors.white,
  },
});
