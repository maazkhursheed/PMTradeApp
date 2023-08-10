import { Icon } from "native-base";
import * as React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./CheckBoxStyles";

interface Props {
  selected: boolean;
  onPress: any;
  style?: ViewStyle;
  checkBoxDesc: React.ReactElement;
}

const CheckBox: React.SFC<Props> = ({ selected, onPress, disabled, style, checkBoxDesc }: Props) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]} {...accessibility("radioTouchable")}>
    <View {...accessibility("radioBoxView")} style={styles.viewStyle}>
      {selected && <Icon type={"FontAwesome"} name={"check"} style={styles.iconStyle} />}
    </View>
    {checkBoxDesc}
  </TouchableOpacity>
);

export default CheckBox;
