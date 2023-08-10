import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  alternativeContainerView: {
    backgroundColor: Colors.alternativeBackground,
    paddingVertical: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: Colors.lighterGrey,
    borderTopWidth: 0,
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  alternativeText: {
    ...Fonts.style.openSans11Regualr,
    marginLeft: 4,
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  relatedContainerView: {
    backgroundColor: Colors.segmentBackgroundColor,
    paddingVertical: 13,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: Colors.lighterGrey,
    borderTopWidth: 0,
    paddingLeft: 7,
    justifyContent: "space-between",
  },
  relatedText: {
    ...Fonts.style.openSans12,
  },
  iconContainer: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
