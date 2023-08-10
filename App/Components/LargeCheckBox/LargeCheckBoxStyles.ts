import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  tickIconContainer: {
    borderColor: colors.lightGrey,
    borderWidth: 1,
    width: 28,
    height: 28,
    borderRadius: 10,
    marginVertical: 24,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  tickIconStyle: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 18,
  },
  siteDetailItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
