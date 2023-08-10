import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: Colors.white },
  headerTitleStyle: { ...Fonts.style.openSans18Bold },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 18,
  },
  accessListStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: colors.faintWedgeBlue,
    marginHorizontal: 16,
    paddingVertical: 6,
    alignItems: "center",
  },
  titleStyle: {
    ...Fonts.style.openSansExtraBold20,
    lineHeight: 20,
    color: Colors.darkBlueHeader,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 10,
  },
  titleMarginTop: {
    marginTop: 40,
  },
  textStyle: {
    ...Fonts.style.openSans16,
  },
});
