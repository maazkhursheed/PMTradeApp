import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import styles from "./EmptyListStyle";

interface Props extends ViewProps {
  title: string;
  linkText: string;
  onPress: () => void;
}

const EmptyList: React.SFC<Props> = ({ title, linkText, onPress, style, ...props }: Props) => (
  <View style={[styles.container, style]} {...props}>
    <Text style={styles.header}>{title}</Text>
    <Text style={styles.link} onPress={onPress}>
      {linkText}
    </Text>
  </View>
);

export default EmptyList;
