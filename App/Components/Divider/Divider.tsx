import * as React from "react";
import { View, ViewStyle } from "react-native";
import styles from "./DividerStyle";

interface Props {
  style?: ViewStyle;
}

const Divider: React.SFC<Props> = ({ style }: Props) => <View style={[styles.container, style]} />;

export default Divider;
