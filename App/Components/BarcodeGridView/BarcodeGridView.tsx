import * as React from "react";
import { View } from "react-native";
import styles from "./BarcodeGridViewStyle";

interface Props {}

const BarcodeGridView: React.SFC<Props> = () => (
  <View style={styles.grid}>
    <View style={styles.gridRow}>
      <View style={[styles.gridView, styles.gridTopLeftView]} />
      <View style={[styles.gridView, styles.gridTopRightView]} />
    </View>

    <View style={styles.gridRow}>
      <View style={[styles.gridView, styles.gridBottomLeftView]} />
      <View style={[styles.gridView, styles.gridBottomRightView]} />
    </View>
  </View>
);

export default BarcodeGridView;
