import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  modalView: {
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
    backgroundColor: Colors.windowTint,
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.snow,
    width: "100%",
    alignSelf: "center",
  },
  viewDetails: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  modalTitle: {
    ...Fonts.style.header2,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  btn: {
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flex: 1,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  btnTxt: {
    ...Fonts.style.btnLarge,
    paddingVertical: 5,
  },
  btnView: {
    flexDirection: "row",
  },
  childrenContainer: {
    backgroundColor: Colors.snow,
    width: "100%",
    alignSelf: "center",
    borderRadius: 6,
  },
  customModalView: {
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
    backgroundColor: Colors.windowTint,
    justifyContent: "center",
    padding: 30,
  },
});
