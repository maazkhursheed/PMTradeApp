import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  listView: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 0,
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
  },
  image: {
    width: 72,
    height: 72,
  },
  descriptionContainerNew: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 14,
    marginBottom: 7,
  },
  productDescription: {
    height: undefined,
    ...Fonts.style.openSans18Bold,
    fontSize: 16,
    marginLeft: 7,
    marginVertical: 4,
  },
  productAvailability: {
    ...Fonts.style.openSans12,
    color: Colors.darkGrey,
    marginLeft: 6,
    marginVertical: 4,
  },
  brand: {
    ...Fonts.style.openSans14,
    color: Colors.ochre,
    textTransform: "uppercase",
    marginLeft: 7,
    marginTop: 12,
  },
});
