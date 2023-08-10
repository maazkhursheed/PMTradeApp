import React from "react";
import { View } from "react-native";
import colors from "~root/Themes/Colors";
import style from "./EllipsesStyles";

export interface OwnProps {
  number: number;
  styles?: any;
}

const EllipsesView = ({ number, styles }: OwnProps) => {
  return (
    <View style={[style.view, styles]}>
      <View style={[style.roundView, { backgroundColor: number === 1 ? colors.snow : colors.darkGrey }]} />
      <View style={[style.roundView, { backgroundColor: number === 2 ? colors.snow : colors.darkGrey }]} />
      <View style={[style.roundView, { backgroundColor: number === 3 ? colors.snow : colors.darkGrey }]} />
    </View>
  );
};

export default EllipsesView;
