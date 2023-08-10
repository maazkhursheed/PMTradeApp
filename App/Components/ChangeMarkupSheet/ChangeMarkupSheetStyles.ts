import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: Colors.white },
  headerStyle: {
    elevation: 2,
  },
  titleStyle: { ...Fonts.style.openSans18Bold },
  cancelStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginLeft: 20,
  },
  saveButtonStyle: {
    ...Fonts.style.openSans16,
    color: Colors.lightBlue,
    marginRight: 10,
  },
  loadingView: { flex: 1, paddingHorizontal: 24 },
  quantityContainerStyle: {
    width: "55%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  textQuantityStyle: {
    ...Fonts.style.openSans18Bold,
  },
  labelStyle: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
    marginTop: 24,
  },
});
