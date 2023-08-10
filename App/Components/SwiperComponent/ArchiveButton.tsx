import * as React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import CustomIcon from "../CustomIcon";
import styles from "./SwiperComponentStyle";

interface Props extends ViewProps {
  onPress: () => void;
  style?: any;
}

const RemoveButton: React.SFC<Props> = ({ onPress, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.archiveViewStyle, style]}>
      <View style={styles.deleteView}>
        <CustomIcon style={styles.iconStyle} name={"archive"} />
        <Text style={styles.textStyle}>Archive</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RemoveButton;
