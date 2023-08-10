import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  loadingViewStyle: {
    flex: 1,
  },
  productCount: {
    marginHorizontal: 24,
    marginTop: 110,
    marginBottom: 24,
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
  },
  productCountItems: {
    marginHorizontal: 24,
    marginTop: 110,
    marginBottom: 24,
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
  },
});
