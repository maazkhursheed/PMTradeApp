import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "flex-end",
    marginTop: 165,
    marginBottom: 16,
  },
  textContainer: {
    flex: 3,
  },
  msg1: {
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    ...Fonts.style.openSans16Bold,
    marginBottom: 10,
  },
  msg2: {
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    ...Fonts.style.openSans16,
    color: Colors.darkGrey,
    marginHorizontal: 24,
    marginVertical: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  icon: {
    alignSelf: "center",
    marginRight: 5,
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
  },
  iconAdd: {
    alignSelf: "center",
    marginRight: 5,
    ...Fonts.style.openSans16Bold,
    color: Colors.white,
  },
  rightItemStyle: { paddingHorizontal: 15 },
});
