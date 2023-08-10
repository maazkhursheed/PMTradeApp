import * as React from "react";
import { View } from "react-native";
import styles from "./MainContainerStyle";

const MainContainer = ({ style, children, ...props }: any) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default MainContainer;
