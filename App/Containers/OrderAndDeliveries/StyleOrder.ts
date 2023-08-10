import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

const StyleOrder = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  filterContainer: {
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  // @ts-ignore
  filterButtonText: {
    ...Fonts.style.ctaSmall,
  },
  filterButtonIcon: {
    fontSize: 20,
    marginRight: 10,
    color: Colors.textInverse,
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#DBE2EC',
  // },
  header: {
    backgroundColor: Colors.faintWedgeBlue,
  },
  headerItems: {
    alignSelf: "center",
  },
  formContainer: {
    marginTop: -75,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  // headerTitle: {
  //   paddingTop: 30,
  //   textAlign: "center",
  //   flex: 1,
  //   paddingBottom: 3,
  //   ...Fonts.style.header1,
  //   marginLeft:35
  // },

  // @ts-ignore
  headerTitle: {
    textAlign: "center",
    alignSelf: "stretch",
    ...Fonts.style.header1,
  },
  logoutView: {
    position: "absolute",
    // bottom: 0,
    right: 10,
    justifyContent: "center",
    alignSelf: "center",
    height: 30,
    width: 30,
    backgroundColor: Colors.wedgeBlue,
    borderRadius: 50,
  },
  logoutbtnText: {
    color: "white",
    textAlign: "center",
    fontFamily: Fonts.type.ProximaBold,
  },
  close: {
    position: "absolute",
    // bottom: 0,
    right: 10,
    alignSelf: "center",
  },
});

export default StyleOrder;
