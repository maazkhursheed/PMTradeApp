import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  quoteProductsView: {
    flexDirection: "row",
    flex: 1,
  },
  productView: {
    borderRightWidth: 0.5,
    borderRightColor: Colors.lightGrey,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    maxWidth: "33%",
  },
  relatedView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    maxWidth: "50%",
  },
  borderView: {
    width: 1,
    backgroundColor: Colors.lightGrey,
    marginTop: 5,
    marginBottom: 5,
  },
  alternativeViewParent: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGrey,
    flex: 1,
    flexDirection: "row",
  },
  alternativeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    maxWidth: "50%",
  },
  alternativeViewProps: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 29,
  },
  productTextView: {
    ...Fonts.style.openSans10Bold,
  },
  relatedTextView: {
    ...Fonts.style.caption,
    marginLeft: 3,
  },
  alternativeTextView: {
    ...Fonts.style.caption,
    marginLeft: 3,
  },
});
