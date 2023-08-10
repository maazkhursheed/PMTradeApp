import React from "react";
import { Text, View } from "react-native";
import { DispatchProps } from "~root/Containers/ChangeDateContainer/ChangeDateContainer";
import styles from "./ConnectedAccountPopupStyle";

export interface OwnProps {
  listItem: any;
}

export interface StateProps {}

export interface State {}

type Props = OwnProps & StateProps & DispatchProps;

const ConnectableAccountListItem: React.SFC<Props> = ({ listItem }: Props) => {
  const showConnectableTradeAccount = React.useCallback(
    (item: any) => {
      if (item.custId !== null && item.custId !== undefined) {
        return item.custId + " " + item.name;
      }
      return item.name;
    },
    [listItem],
  );

  return (
    <View style={styles.item}>
      <View style={styles.emptyView} />
      <Text style={styles.itemText}>{showConnectableTradeAccount(listItem)}</Text>
    </View>
  );
};

export default ConnectableAccountListItem;
