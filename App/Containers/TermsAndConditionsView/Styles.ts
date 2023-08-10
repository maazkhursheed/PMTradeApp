import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.white,
    paddingHorizontal: 15,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 16,
    borderTopColor: colors.offWhiteWithAlpha,
  },
  buttonSendStyle: {
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightBlue,
    backgroundColor: Colors.lightBlue,
    height: 32,
    width: "90%",
  },
  separator: {
    height: 1,
    marginRight: 25,
    marginLeft: 10,
    backgroundColor: Colors.lightGrey,
  },
  separatorView: {
    height: 5,
    marginTop: 5,
    backgroundColor: Colors.offWhiteWithAlpha,
  },
  input: {
    ...Fonts.style.subtitle,
    color: Colors.black,
    marginVertical: 15,
    flex: 2,
    textAlignVertical: "top",
    marginTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  textCountStyle: {
    flex: 0.1,
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: Colors.black,
    alignSelf: "flex-end",
    marginLeft: 20,
    padding: 5,
  },
  characterLimit: {
    ...Fonts.style.openSans14,
    backgroundColor: colors.white,
    padding: 20,
    width: "100%",
    textAlign: "right",
  },
  characterLimitContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 20,
  },
});
