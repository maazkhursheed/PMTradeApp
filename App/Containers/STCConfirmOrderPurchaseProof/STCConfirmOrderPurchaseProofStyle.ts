import { StyleSheet } from "react-native";
import Fonts from "~root/Themes/Fonts";
import { Colors } from "../../Themes/";

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    fontSize: 20,
  },
  heading: {
    fontFamily: Fonts.type.SFProBold,
    fontSize: 32,
    color: Colors.black,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 8,
  },
  closeBtn: {
    fontSize: 16,
    color: Colors.lightBlue,
    fontFamily: Fonts.type.OpenSansRegular,
    fontWeight: "normal",
  },
  bottomText: {
    fontFamily: Fonts.type.SFProRegular,
    color: Colors.darkerGrey,
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 20,
  },
  modalText: {
    ...Fonts.style.subtitleLowlight,
    marginBottom: 20,
  },
  footerButton: {
    flex: 1,
    borderRadius: 8,
  },
  timeText: {
    marginLeft: 20,
    ...Fonts.style.subtitleSmall,
    marginBottom: 30,
  },
  safeAreaView: {
    flexDirection: "row",
    marginHorizontal: 12,
    alignSelf: "center",
  },
});
