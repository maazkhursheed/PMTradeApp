import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  frequentlyOrderContainer: {
    borderTopColor: Colors.offWhite,
    flex: 1,
    justifyContent: "space-between",
  },
  tilteRow: {
    marginTop: 25,
    marginLeft: 24,
    flexDirection: "row",
  },

  title: {
    ...Fonts.style.openSans18Bold,
  },
  icon: {
    marginTop: 2,
    marginRight: 5,
  },
  subTitle: {
    ...Fonts.style.openSans12,
    marginTop: 5,
    marginLeft: 24,
    color: Colors.darkGrey,
  },
  viewAll: {
    backgroundColor: Colors.offWhite,
    marginTop: 24,
    marginBottom: 20,
    borderRadius: 12,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    minWidth: Metrics.screenWidth / 2.5,
  },
  frequentlyOrderedList: {
    flexGrow: 1,
    marginHorizontal: 8,
    paddingRight: 30,
    minHeight: 60,
  },
  viewAllText: {
    ...Fonts.style.openSans14Bold,
    color: Colors.lightBlue,
    textAlign: "center",
    padding: 5,
    marginBottom: 24,
  },
});
