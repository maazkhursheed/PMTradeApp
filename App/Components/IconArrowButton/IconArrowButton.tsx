import * as React from "react";
import { Text, ViewStyle } from "react-native";
import FbIcon from "~root/Components/FbIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./IconArrowButtonStyle";

interface Props {
  onPress?: () => void;
  icon: string;
  text: string;
  iconSize?: number;
  style?: ViewStyle;
}

const IconArrowButton: React.SFC<Props> = ({ onPress, style, icon, text, iconSize }: Props) => (
  <NativeWrapper style={[styles.container, style]} onPress={onPress} {...accessibility("iconArrowButton")}>
    <FbIcon name={icon} style={[styles.icon, iconSize ? { fontSize: iconSize } : undefined]} />
    <Text style={styles.text}>{text}</Text>
    <FbIcon name={"ic_chevron"} style={styles.icon_chevron} />
  </NativeWrapper>
);

export default IconArrowButton;
