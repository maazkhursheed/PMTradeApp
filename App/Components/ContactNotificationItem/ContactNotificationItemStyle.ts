import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  subSeparator: {
    backgroundColor: Colors.lightGrey,
    marginLeft: 24,
    height: 0.5,
  },
  viRow: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
  },
  txtNotification: {
    ...Fonts.style.openSans18Regular,
    color: Colors.black,
  },
  txtDesc: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginTop: 4,
  },
  notificationIconStyle: {
    fontSize: 24,
    marginRight: 20,
    color: colors.darkGrey,
  },
});
