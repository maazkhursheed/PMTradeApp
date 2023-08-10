import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import Fonts from "~root/Themes/Fonts";

export default StyleSheet.create({
  listView: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 0,
    marginVertical: 16,
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
    alignItems: "center",
  },
  profileBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnTxt: {
    ...Fonts.style.openSans18Bold,
    color: Colors.greenCheck,
  },
  user: {
    ...Fonts.style.openSans18Regular,
  },
  subUser: {
    ...Fonts.style.openSans14,
    color: Colors.darkGrey,
  },
  contactView: {
    paddingLeft: 16,
  },
});
