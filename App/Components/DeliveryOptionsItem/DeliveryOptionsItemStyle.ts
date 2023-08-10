import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGrey,
  },
  image: {
    width: 72,
    height: 72,
    marginBottom: 24.5,
  },
  textContainer: {
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 16,
    flex: 1,
  },
  timeText: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
  },
  timeTextDisabled: {
    ...Fonts.style.openSans14,
    color: Colors.textTertiary,
    textTransform: "uppercase",
  },
  titleText: {
    ...Fonts.style.openSans18Bold,
  },
  titleTextDisabled: {
    ...Fonts.style.openSans18Bold,
    color: Colors.textTertiary,
  },
});
