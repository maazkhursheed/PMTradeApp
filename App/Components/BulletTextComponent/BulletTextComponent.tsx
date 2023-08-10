import * as React from "react";
import { Text, TextProps, View, ViewStyle } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./BulletTextComponentStyle";

interface Props {
  color?: string;
  text: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextProps;
  onPress?: () => void;
}

const BulletTextComponent: React.SFC<Props> = ({ style, textStyle, onPress, color, text }: Props) =>
  onPress ? (
    <NativeWrapper style={[styles.bulletContainer, style]} onPress={onPress} {...accessibility("BulletText")}>
      <Text style={[styles.bullet, textStyle, color ? { color } : undefined]}>{"\u2022"}</Text>
      <Text style={[styles.bulletText, textStyle, color ? { color } : undefined]}>{text}</Text>
    </NativeWrapper>
  ) : (
    <View style={[styles.bulletContainer, style]}>
      <Text style={[styles.bullet, textStyle, color ? { color } : undefined]}>{"\u2022"}</Text>
      <Text style={[styles.bulletText, textStyle, color ? { color } : undefined]}>{text}</Text>
    </View>
  );

export default BulletTextComponent;
