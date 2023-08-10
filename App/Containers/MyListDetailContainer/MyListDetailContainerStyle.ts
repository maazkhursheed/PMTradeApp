import { StyleSheet } from "react-native";
import Fonts from "~root/Themes/Fonts";
import { Colors, Metrics } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 32,
    ...Fonts.style.openSans28PlainBold,
  },
  productCount: {
    marginHorizontal: 24,
    marginTop: 110,
    marginBottom: 24,
    ...Fonts.style.openSans14Bold,
    color: Colors.darkGrey,
  },
  swipLeftText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: Metrics.screenHeight / 4,
    alignSelf: "flex-end",
  },
  loadingView: { flex: 1 },
});
