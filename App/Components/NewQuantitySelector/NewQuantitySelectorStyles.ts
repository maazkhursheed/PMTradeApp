import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  view: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.faintWedgeBlue,
    padding: 5,
    borderRadius: 8,
  },
  qtyText: {
    ...Fonts.style.openSans18Bold,
    minWidth: 80,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  quantityView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
  },
  estimatedView: {
    minHeight: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomColor: Colors.wildSandColor,
    backgroundColor: Colors.wildSandColor,
  },
  estimatedTextView: {
    ...Fonts.style.estimatedFont,
    textAlign: "center",
  },
  viewSubContainer: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  iconContainer: { paddingVertical: 8, paddingHorizontal: 3 },
});
