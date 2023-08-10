import { Platform, StyleSheet } from "react-native";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 24,
    borderRadius: 10,
    shadowColor: Platform.OS === "android" ? "#555" : "#00000029",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 24,
    backgroundColor: "white",
  },
  imageStyle: {
    width: "100%",
    aspectRatio: 1.3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.wildSandColor,
  },
  textStyle: {
    ...Fonts.style.openSans18Bold,
    fontSize: 16,
    margin: 24,
  },
});
