import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  badgeContainer: {
    overflow: "visible",
    aspectRatio: 1,
    justifyContent: "center",
    height: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  badgeContainerText: {
    color: Colors.textLight,
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    width: 20,
  },
  filterContainer: {
    alignSelf: "center",
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 0,
    marginVertical: 10,
    zIndex: 0,
    elevation: 0,
    justifyContent: "center",
  },
  // @ts-ignore
  filterButtonText: {
    ...Fonts.style.ctaSmall,
    marginRight: 20,
  },
  rightButton: {
    backgroundColor: Colors.brandInfo,
    borderTopRightRadius: 25,
    padding: 10,
    alignSelf: "stretch",
    borderBottomRightRadius: 25,
    justifyContent: "center",
  },
  rightButtonText: {
    ...Fonts.style.ctaSmall,
    marginRight: 10,
    marginLeft: 5,
  },
  filterButtonIcon: {
    fontSize: 20,
    marginRight: 10,
    color: Colors.textInverse,
  },
  mainView: {
    width: 30,
    marginRight: 5,
  },
});
