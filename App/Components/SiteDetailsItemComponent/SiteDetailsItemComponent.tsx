import * as React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import LargeCheckBox from "../LargeCheckBox";
import styles from "./SiteDetailsItemComponentStyles";

interface Props {
  item: any;
  style?: ViewStyle;
}

const SiteDetailsItemComponent: React.SFC<Props> = ({ item, style }: Props) => (
  <TouchableOpacity onPress={item.onPress} style={styles.siteDetailItemContainer} {...accessibility(item.label)}>
    <Text style={styles.siteItemLabelStyle} {...accessibility(item.label)}>
      {item.label}
    </Text>
    <LargeCheckBox onPress={item.onPress} selected={item.selected} style={styles.siteItemTickContainer} {...accessibility(item.label)} />
  </TouchableOpacity>
);

export default SiteDetailsItemComponent;
