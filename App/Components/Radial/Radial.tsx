import { Text } from "native-base";
import * as React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./RadialStyles";

interface Props {
  selected: boolean;
  onPress: any;
  text: string;
  style?: ViewStyle;
}

const Radial: React.SFC<Props> = ({ selected, onPress, text, style }: Props) => (
  <TouchableOpacity onPress={onPress} style={[styles.touchableOpacityStyle, style]} {...accessibility("radialTouchable")}>
    <View style={styles.viewStyle}>{selected && <View style={styles.selectedView} />}</View>
    <Text style={styles.text}> {text} </Text>
  </TouchableOpacity>
);

export default Radial;
