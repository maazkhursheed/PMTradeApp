import { Button } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { BranchResponse, getBranchAddress, getBranchName } from "~root/Lib/BranchHelper";
import { accessibility, addOcclusionForTextFields, occludeSensitiveView, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { getAccountName } from "~root/Lib/TradeAccountsHelper";
import ConnectedTradeAccountNavigation from "~root/Navigation/ConnectedTradeAccountNavigation";
import { RootState } from "~root/Reducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { Colors } from "~root/Themes";
import { JobItem } from "~root/Types/JobAccounts";
import BranchSelectSheetContainer from "../BranchSelectSheetContainer/BranchSelectSheetContainer";
import styles from "./AccountBranchSwitchSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  onSuccess?: (name: string) => void;
  onClose: () => void;
}

interface DispatchProps {
  removeNewTradeAccountFromState: () => void;
}

interface StateProps {
  selectedBranch: BranchResponse;
  selectedJobAccount: JobItem | undefined;
  selectedTradeAccount: any;
}

type Props = OwnProps & StateProps & DispatchProps;

const AccountBranchSwitchSheet: React.SFC<Props> = ({
  onClose,
  selectedBranch,
  selectedTradeAccount,
  selectedJobAccount,
  sheetState,
  removeNewTradeAccountFromState,
}: Props) => {
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [tradeAccountSheet, setTradeAccountSheet] = React.useState(SheetState.CLOSED);

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Account_Branch Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"Menu"}
              titleStyle={styles.headerTitleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              rightItem={
                <Button
                  transparent={true}
                  onPress={() => {
                    setSheetStateInternal(SheetState.CLOSED);
                    onClose();
                    removeOcclusionFromTextFields();
                  }}
                  {...accessibility("rightItemBtn")}
                >
                  <Text style={styles.doneStyle}>{"Close"}</Text>
                </Button>
              }
            />
            <NativeWrapper
              style={styles.itemStyle}
              onPress={() => {
                removeNewTradeAccountFromState();
                setTradeAccountSheet(SheetState.EXPANDED);
              }}
              {...accessibility("selectAccountItem")}
            >
              <View>
                <Text style={styles.selectionItem}>Accounts/Job accounts</Text>
                <Text ref={occludeSensitiveView} style={styles.valueItem}>
                  {getAccountName(selectedTradeAccount, selectedJobAccount)}
                </Text>
              </View>
              <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
            </NativeWrapper>
            <BranchSelectSheetContainer
              closeAll={() => {
                setSheetStateInternal(SheetState.CLOSED);
                onClose();
              }}
            >
              <View style={styles.itemStyle} {...accessibility("selectBranchItem")}>
                <View>
                  <Text style={styles.selectionItem}>Branch location</Text>
                  <Text ref={occludeSensitiveView} style={styles.valueItem}>
                    {`${getBranchName(selectedBranch)}, ${getBranchAddress(selectedBranch)}`}
                  </Text>
                </View>
                <CustomIcon style={styles.iconStyle} name={"chevron-right"} />
              </View>
            </BranchSelectSheetContainer>
          </View>
        }
        sheetState={sheetStateInternal}
      />
      <BottomSheet
        content={
          <ConnectedTradeAccountNavigation
            closeAll={() => {
              setTradeAccountSheet(SheetState.CLOSED);
              setSheetStateInternal(SheetState.CLOSED);
              onClose();
            }}
            closeSheet={() => {
              setSheetStateInternal(SheetState.CLOSED);
              setTradeAccountSheet(SheetState.CLOSED);
              onClose();
            }}
            sheetState={tradeAccountSheet}
          />
        }
        sheetState={tradeAccountSheet}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  removeNewTradeAccountFromState: () => dispatch(ConnectTradeActions.removeNewTradeAccountFromState()),
});

const mapStateToProps = (state: RootState): StateProps => ({
  selectedBranch: state.branchList.selectedBranch,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  selectedTradeAccount: state.connectTrade.selectedTradeAccount,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountBranchSwitchSheet);
