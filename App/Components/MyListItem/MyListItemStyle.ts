import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerListItem: {
    padding: 24,
    paddingTop: 15,
    paddingBottom: 0,
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  containerListItemInneriOS: {
    borderRadius: 8,
    overflow: "hidden",
    // https://github.com/facebook/react-native/issues/10049#issuecomment-366426897
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    elevation: 4,
    ...ApplicationStyles.shadowParent,
  },
  containerListItemInnerAndroid: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    elevation: 10,
    shadowColor: Colors.darkGray,
  },
  containerListItemSub: {
    flex: 1,
    padding: 10,
    paddingLeft: 16,
    backgroundColor: Colors.alternativeBackground,
  },
  containerListItemTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansBold,
    color: Colors.black,
  },
  containerListItemCount: {
    fontSize: 10,
    fontFamily: Fonts.type.OpenSansRegular,
    color: Colors.darkGrey,
  },
  image: {
    width: (Metrics.screenWidth - 48) / 3.0,
    height: (Metrics.screenWidth - 48) / 3.0,
    borderColor: Colors.lightGrey,
  },
  imageWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    marginTop: 5,
  },
  imageView: {
    borderRightWidth: 0.5,
  },
});
