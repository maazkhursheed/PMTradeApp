import * as React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import CustomIcon from "../CustomIcon";
import styles from "./SwiperComponentStyle";

interface Props extends ViewProps {
  onPress: () => void;
  style?: any;
  text?: string;
}

const RemoveButton: React.SFC<Props> = ({ onPress, style, text }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnViewStyle, style]}>
      <View style={styles.deleteView}>
        <CustomIcon style={styles.iconStyle} name={"trash"} />
        <Text style={styles.textStyle}>{text ?? "Remove"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RemoveButton;
