import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignContent: "center",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: Colors.white,
    width: "100%",
    marginRight: 100,
  },
  changeText: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginTop: 5,
    marginRight: 10,
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
  header: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
  },
  icon: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    fontSize: 18,
    marginRight: 16,
    marginTop: 3,
  },
  text: {
    ...Fonts.style.openSans16Regular,
    color: Colors.lightBlue,
    fontSize: 18,
  },
  separator: {
    backgroundColor: Colors.lightGrey,
  },
  rowFooter: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    ...ApplicationStyles.shadow,
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
  value: {
    ...Fonts.style.openSans16Bold,
    color: Colors.black,
    alignSelf: "baseline",
  },
});
