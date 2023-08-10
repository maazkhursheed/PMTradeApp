import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  picker: {
    width: "100%",
    opacity: Platform.select({ ios: 1, android: 0 }),
    height: 70,
    position: "absolute",
    marginTop: 20,
  },
});
