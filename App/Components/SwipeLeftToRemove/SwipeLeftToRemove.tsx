import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import CustomIcon from "../CustomIcon";
import styles from "./SwipeLeftToRemoveStyle";

interface Props extends ViewProps {
  text: string;
}

const SwipeLeftToRemove: React.SFC<Props> = ({ text }: Props) => {
  return (
    <View style={styles.content}>
      <CustomIcon name={"noun_swipe_3876203"} style={styles.iconStyle} />
      <Text style={styles.swipLeftText}>{text}</Text>
    </View>
  );
};

export default SwipeLeftToRemove;
