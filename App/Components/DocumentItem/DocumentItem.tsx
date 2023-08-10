import { Icon } from "native-base";
import * as React from "react";
import { Text } from "react-native";
import NativeWrapper from "~root/Components/NativeWrapper";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./DocumentItemStyle";

interface Props {
  item: any;
  onPress?: any;
}

const DocumentItem: React.SFC<Props> = ({ item, onPress }: Props) => (
  <NativeWrapper onPress={onPress} style={styles.wrapperStyle} {...accessibility("DocumentItem")}>
    <Icon style={styles.iconStyle} type={"FontAwesome5"} name={"file"} />
    <Text style={styles.textStyle}>{item.fileName}</Text>
  </NativeWrapper>
);

export default DocumentItem;
