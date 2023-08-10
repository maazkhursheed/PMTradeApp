import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts, Metrics } from "~root/Themes";

export default StyleSheet.create({
  container: {
    height: Metrics.navBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingRight: 5,
    ...ApplicationStyles.shadow,
  },
  title: {
    ...Fonts.style.openSans18Bold,
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    textAlign: "center",
  },
  backIcon: {
    fontSize: 20,
  },
  backIconContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  leftItem: {
    flex: 1,
  },
  rightItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
