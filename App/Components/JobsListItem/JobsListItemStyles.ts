import { Platform, StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 14,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: Platform.OS === "android" ? colors.darkGrey : colors.lightGrey,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: colors.white,
  },
  orderProducts: {
    alignSelf: "flex-end",
    backgroundColor: colors.offWhite,
    padding: 8,
    borderRadius: 10,
  },
  orderProductsText: {
    ...Fonts.style.openSans14Bold,
    color: colors.darkBlueHeader,
    alignSelf: "center",
  },
  jobsCountFooter: {
    ...Fonts.style.openSans14,
    color: colors.darkGrey,
    textAlign: "center",
    marginVertical: 20,
  },
  quoteView: {
    flexDirection: "row",
    marginBottom: 15,
  },
  jobsItemLabel: {
    ...Fonts.style.openSans14Bold,
    color: colors.darkGrey,
    fontSize: 12,
  },
  separatorView: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
    marginBottom: 15,
    marginTop: 20,
  },
  datesContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: "row",
    flex: 1,
  },
  textStyle: {
    ...Fonts.style.openSans12,
    color: colors.darkGrey,
  },
  accountName: {
    ...Fonts.style.openSans18Bold,
  },
  buttonRow: {
    flexDirection: "row",
  },
  emptyView: {
    flex: 1,
  },
  noDateContainer: {
    flex: 1,
    marginBottom: 10,
  },
});
