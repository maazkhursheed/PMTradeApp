import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  buttonText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.snow,
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: colors.lightBlue,
    width: "48%",
    borderRadius: 5,
    paddingVertical: 8,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  DoneStyle: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: 16,
    color: Colors.white,
    marginRight: 5,
    marginBottom: 3,
  },
  sentImage: {
    marginTop: 20,
    height: 77,
    width: 77,
  },

  heading: {
    ...Fonts.style.openSans24Bold,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  subHeading: {
    ...Fonts.style.openSans16Bold,
    marginBottom: 10,
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  innerCardContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  innerCardSubContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  cardDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  cardLabel: {
    ...Fonts.style.openSans12Bold,
  },
  cardData: {
    ...Fonts.style.openSans12,
    flex: 1,
    marginLeft: 10,
    textAlign: "right",
  },
  lastText: {
    ...Fonts.style.openSans14,
    color: "#666666",
    paddingVertical: 5,
    paddingHorizontal: 20,
    lineHeight: 22,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    minHeight: 65,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    elevation: 4,
    position: "absolute",
    bottom: 0,
  },
  cardDataBold: {
    flex: 1,
    marginLeft: 10,
    textAlign: "right",
    ...Fonts.style.openSans12Bold,
  },
  cardHeading: {
    ...Fonts.style.openSans16Bold,
    marginBottom: 4,
  },
  cardSubHeading: {
    ...Fonts.style.openSans12,
    color: "#666666",
  },
  seperator: {
    height: 1,
    backgroundColor: "#DDDDDD",
  },
});
