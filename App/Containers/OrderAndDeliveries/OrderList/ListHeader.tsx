import * as React from "react";
import { Text, View } from "react-native";
import FbIcon from "~root/Components/FbIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import styles from "~root/Containers/OrderAndDeliveries/OrderListStyles";
import { accessibility } from "~root/Lib/DataHelper";

interface OwnProps {
  collapsed: boolean;
  onPressed: () => void;
  headerText: string;
}

type Props = OwnProps;

const ListHeader: React.SFC<Props> = ({ collapsed, onPressed, headerText }: Props) => {
  return (
    <NativeWrapper {...accessibility("listHeaderBtn")} onPress={onPressed}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupHeaderText}>{headerText}</Text>
        <FbIcon style={styles.iconStyle} name={collapsed ? "ic_downarrow" : "ic_uparrow"} />
      </View>
    </NativeWrapper>
  );
};
export default ListHeader;
