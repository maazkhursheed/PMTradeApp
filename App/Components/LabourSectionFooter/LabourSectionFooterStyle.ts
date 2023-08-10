import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: "flex-end",
  },
  changeText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginTop: 5,
    marginRight: 4,
  },
  value: {
    ...Fonts.style.openSans18Bold,
    color: Colors.black,
  },
  buttonStyle: {
    borderRadius: 6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 16,
    flexDirection: "row",
  },
  buttonText: {
    ...Fonts.style.openSans16Bold,
    color: Colors.white,
  },
});
