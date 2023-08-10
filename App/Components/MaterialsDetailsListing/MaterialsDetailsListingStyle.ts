import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  loadingViewStyle: {
    flex: 1,
  },
  swipeLeft: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginHorizontal: 20,
    marginVertical: 15,
    alignSelf: "flex-end",
  },
  loadingView: {
    flex: 1,
  },
  emptyViewContainer: {
    flex: 1,
    backgroundColor: Colors.borderGrey,
    justifyContent: "center",
    alignContent: "center",
  },
  emptyViewText: {
    flex: 2,
    ...Fonts.style.openSans18Regular,
    color: Colors.darkGrey,
    textAlign: "center",
  },
  productCount: {
    marginTop: 155,
    paddingBottom: 16,
    paddingTop: 10,
    ...Fonts.style.openSans16Bold,
  },
  headerContainer: {
    marginHorizontal: 24,
    marginBottom: 10,
  },
});
