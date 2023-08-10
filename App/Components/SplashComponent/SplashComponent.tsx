import * as React from "react";
import { Image, View } from "react-native";
import { Images } from "~root/Themes";
import styles from "./SplashComponentStyle";

const SplashComponent: React.SFC = () => {
  return (
    <View style={styles.viewStyle}>
      <Image source={Images.logo} />
    </View>
  );
};
export default SplashComponent;
