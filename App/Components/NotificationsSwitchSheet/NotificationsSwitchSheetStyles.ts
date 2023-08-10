import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  close: {
    fontSize: 18,
    color: Colors.black,
    marginLeft: 18,
  },
  headerTitle: {
    ...Fonts.style.openSans14Bold,
    color: Colors.darkGrey,
    marginLeft: 24,
    marginVertical: 18,
  },
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
  txtNotification: { ...Fonts.style.openSans18Regular, color: Colors.black },
  txtDesc: { ...Fonts.style.openSans14, color: Colors.darkGrey, marginTop: 4 },
  headerBorderStyle: {
    width: "100%",
    height: 8,
    backgroundColor: colors.offWhite,
    marginTop: -1,
  },
  headerTitleStyle: { ...Fonts.style.openSans18Bold },
});
