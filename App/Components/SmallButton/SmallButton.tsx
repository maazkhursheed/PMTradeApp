import { Button, Text } from "native-base";
import * as React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import Fonts from "~root/Themes/Fonts";
import styles from "./SmallButtonStyles";

interface Props {
  onPress?: any;
  btnText: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SmallButton: React.SFC<Props> = ({ onPress, btnText, style, textStyle }: Props) => (
  <Button style={[styles.smallBtn, style]} onPress={onPress} {...accessibility("commonSmallBtn")}>
    <Text style={[Fonts.style.btnSmall, textStyle]}>{btnText}</Text>
  </Button>
);

export default SmallButton;
