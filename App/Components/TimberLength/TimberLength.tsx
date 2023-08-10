import * as React from "react";
import { Text, View, ViewProps, ViewStyle } from "react-native";
import styles from "./TimberLengthStyle";

interface Props extends ViewProps {
  isTimberFlag: boolean;
  multiple: number;
  uom: string;
  quantity: number | string;
  fraction?: number;
  bottomViewStyle?: ViewStyle;
  trimLengthText?: string;
}

const TimberLength = ({ style, trimLengthText = "Trim Length", bottomViewStyle, isTimberFlag, multiple, uom, quantity, fraction = 1, ...props }: Props) =>
  isTimberFlag ? (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.rowView]}>
        <Text style={styles.timberLengthText}>{trimLengthText}</Text>
        <Text style={styles.timberLengthText}>
          {multiple?.toString()} {uom}
        </Text>
      </View>
      <View style={[styles.rowView, styles.bottomRowView, bottomViewStyle]}>
        <Text style={styles.timberLengthText}>Total length</Text>
        <Text style={styles.timberLengthText}>
          {(Number(quantity) * multiple).toFixed(fraction)} {uom}
        </Text>
      </View>
    </View>
  ) : null;
export default TimberLength;
