import { Platform, StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  markerContainerStyle: {
    flexDirection: "row",
    marginRight: 24,
    marginVertical: 18,
  },
  iconStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: colors.darkGrey,
  },
  addressText: {
    ...Fonts.style.openSans18Regular,
    color: colors.black,
    marginLeft: 18,
  },
  addressTextBold: {
    ...Fonts.style.openSans18Bold,
    color: colors.black,
    marginLeft: 18,
  },
  

});
