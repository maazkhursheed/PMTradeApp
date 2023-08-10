import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  headerStyle: {
    backgroundColor: Colors.white,
  },
  flashButtonStyle: {
    alignSelf: "flex-start",
    paddingLeft: 15,
    paddingRight: 15,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
  touchContainerForDismiss: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailsContainer: {
    height: undefined,
    width: "100%",
    paddingHorizontal: 24,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    alignSelf: "center",
  },
  productDetailsContainerTopPosition: {
    height: undefined,
    width: "100%",
    paddingHorizontal: 24,
    top: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    alignSelf: "center",
  },
  textStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.OpenSansRegular,
    position: "absolute",
    bottom: 0,
    color: Colors.white,
    marginBottom: 35,
    alignSelf: "center",
  },
  titleStyle: {
    textTransform: "none",
    color: Colors.black,
    fontFamily: Fonts.type.OpenSansBold,
  },
  cameraView: {
    flex: 1,
  },
  closeButtonStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
