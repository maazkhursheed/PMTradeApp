import { Button } from "native-base";
import React from "react";
import { Modal, SectionList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import FbIcon from "~root/Components/FbIcon";
import { DispatchProps } from "~root/Containers/ChangeDateContainer/ChangeDateContainer";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import ConnectableAccountListItem from "./ConnectableAccountListItem";
import styles from "./ConnectedAccountPopupStyle";

export interface OwnProps {
  title: string;
  close: () => void;
  visible: boolean;
  onGotAnIssue?: () => void;
  onConnect: () => void;
}

export interface StateProps {
  accountList?: any;
  listCount: any;
}

export interface State {}

type Props = OwnProps & StateProps & DispatchProps;

const ConnectedAccountPopup: React.SFC<Props> = ({ title, close, visible, onGotAnIssue, onConnect }: Props) => {
  const { accountList, listCount } = useSelector((state: RootState) => ({
    accountList: state.connectTrade?.linkableConnectAccounts,
    listCount: state.connectTrade?.linkableConnectAccountsCount,
  }));

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={close} visible={visible}>
      <View style={styles.mainView}>
        <View style={styles.innerView}>
          <View style={styles.iconView}>
            <FbIcon name={"ic_close"} onPress={close} style={styles.iconStyle} />
          </View>
          <View>
            <Text style={styles.modalTitle} {...accessibility("headerTitleLable")}>
              {title}
            </Text>
            <Text style={styles.subText}>{"Showing the list of " + listCount + " Trade Accounts connected to your ID"}</Text>
          </View>
          <View style={styles.sectionListView}>
            <SectionList
              {...accessibility("connectedAccountSectionListID")}
              style={styles.sectionList}
              sections={accountList ?? []}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <ConnectableAccountListItem listItem={item} />}
              renderSectionHeader={({ section: { title } }) => (
                <Text {...accessibility("tradeAccount")} style={styles.header}>
                  {title}
                </Text>
              )}
            />
          </View>
          <View style={styles.btnMainView}>
            <View style={styles.btnInnerView}>
              <Button transparent={false} style={styles.connectBtnStyle} {...accessibility("connectAccountBtn")} onPress={onConnect} full={true}>
                <Text style={styles.connectTextStyle}>Connect</Text>
              </Button>
              <Button
                transparent={true}
                {...accessibility("connectAccountBtn")}
                onPress={() => {
                  if (onGotAnIssue) {
                    onGotAnIssue();
                  }
                }}
                full={true}
              >
                <Text style={styles.gotIssueTextStyle}>Got an Issue?</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConnectedAccountPopup;
