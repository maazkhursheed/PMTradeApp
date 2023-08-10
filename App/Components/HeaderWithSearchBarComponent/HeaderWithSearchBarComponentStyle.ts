import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  container: {
    borderBottomWidth: Platform.select({ android: 0.1, ios: 0.2 }),
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...ApplicationStyles.shadow,
    marginBottom: 5,
  },
  listingButtonContainer: {
    marginHorizontal: 18,
    marginBottom: 5,
    marginTop: 10,
    paddingVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    height: 40,
    borderColor: Colors.lightBlue,
    alignItems: "flex-end",
  },
  searchField: {
    marginHorizontal: 16,
  },
  iconMore: {
    fontSize: 20,
    paddingLeft: 14,
    paddingRight: 10,
    color: Colors.lightBlue,
  },
  listTitle: {
    flex: 1,
    ...Fonts.style.bodyHighlight,
    color: Colors.lightBlue,
    fontSize: 14,
  },
  itemStyle: {
    alignItems: "center",
    alignSelf: "flex-start",
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
});
