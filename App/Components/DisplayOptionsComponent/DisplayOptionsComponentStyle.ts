import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  loadingView: { flex: 1, marginLeft: 20, marginTop: 24 },
  accessListStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: colors.faintWedgeBlue,
    marginHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  textStyle: {
    ...Fonts.style.openSans16,
    marginTop: 4,
  },
  switchStyle: {
    marginTop: 4,
  },
});
