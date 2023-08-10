import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  headerContainer: {
    padding: 15,
  },
  headerTitle: {
    textAlign: "center",
    ...Fonts.style.header1,
  },
  headerClose: {
    fontSize: Fonts.size.h5,
    position: "absolute",
    top: 10,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  headerSubTitle: {
    marginTop: 10,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.small,
    color: Colors.wedgeBlue,
  },
  orderFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryEta: {
    flex: 0.8,
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.small,
  },
  statusView: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
  },
  statusIcon: {
    fontSize: Fonts.size.medium,
  },
  statusText: {
    fontFamily: Fonts.type.OpenSansBold,
    fontSize: Fonts.size.small,
    marginLeft: 5,
  },
});
