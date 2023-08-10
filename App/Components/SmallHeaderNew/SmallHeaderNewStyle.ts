import { StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkBlueHeader,
    paddingHorizontal: 11,
    paddingBottom: 5,
    paddingTop: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    ...Fonts.style.openSans18Bold,
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    textAlign: "center",
  },
  subTitle: {
    ...Fonts.style.openSans12,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 5,
  },
  backIcon: {
    fontSize: 16,
  },
  backIconContainer: {
    paddingTop: 8,
    paddingLeft: 10,
  },
  leftItem: {
    flex: 1,
  },
});
