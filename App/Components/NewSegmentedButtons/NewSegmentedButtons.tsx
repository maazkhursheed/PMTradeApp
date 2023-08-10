import * as React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./NewSegmentedButtonsStyle";

interface Props {
  onPress: () => void;
  selected?: boolean;
  text: string;
  style?: ViewStyle;
  textStyle?: ViewStyle;
}

const NewSegmentedButtons: React.SFC<Props> = ({ style, onPress, selected, text, textStyle }: Props) => (
  <TouchableOpacity onPress={onPress} style={[selected ? styles.buttonSelected : styles.buttonContainerInverse, style]} {...accessibility("NewSegmentButton")}>
    <Text style={[selected ? styles.buttonSelectedText : styles.buttonTextInverse, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

export default NewSegmentedButtons;
