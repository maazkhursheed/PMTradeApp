import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes/";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  deliveryOptionItemView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    marginVertical: 18,
  },
  site: {
    ...Fonts.style.openSans16Regular,
    flex: 1,
    paddingLeft: 16,
  },

  iconContainer: {
    backgroundColor: colors.lighterGrey,
    borderRadius: 4,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 14,
    color: colors.darkBlue,
  },
});
