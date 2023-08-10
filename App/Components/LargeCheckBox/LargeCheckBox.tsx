import * as React from "react";
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import styles from "./LargeCheckBoxStyles";

interface Props extends TouchableOpacityProps {
  selected: boolean;
  style?: ViewStyle;
  onPress?: any;
}

const LargeCheckBox: React.SFC<Props> = ({ selected, style, ...props }: Props) => (
  <TouchableOpacity
    {...props}
    style={[styles.tickIconContainer, { backgroundColor: selected ? colors.lightBlue : undefined }, style]}
    {...accessibility(selected ? "filterSelected" : "filterUnSelected")}
  >
    {selected && <CustomIcon style={styles.tickIconStyle} name={"tick"} {...accessibility("filterSelected")} />}
  </TouchableOpacity>
);

export default LargeCheckBox;
