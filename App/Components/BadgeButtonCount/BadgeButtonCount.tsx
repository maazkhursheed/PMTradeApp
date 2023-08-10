import * as React from "react";
import { Text, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./BadgeButtonCountStyle";

interface Props {
  badgeCount: number;
  style?: ViewStyle;
}

const BadgeButtonCount: React.SFC<Props> = ({ badgeCount, style, ...props }: Props) => (
  <View style={[styles.badgeContainer, style]} {...props}>
    <Text style={styles.cartCounter} {...accessibility("badgeCount")}>
      {badgeCount}
    </Text>
  </View>
);

export default BadgeButtonCount;
