import R from "ramda";
import * as React from "react";
import { View, ViewStyle } from "react-native";
import styles from "./ProgressBarStyle";

interface Props {
  style?: ViewStyle;
  step: number;
}

const ProgressBar: React.SFC<Props> = ({ style, step }: Props) => (
  <View
    style={[
      styles.container,
      style,
      {
        width: R.compose(R.flip(R.concat)("%"), R.toString, R.multiply(100), R.divide(step))(4),
      },
    ]}
  />
);

export default ProgressBar;
