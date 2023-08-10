import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Text } from "react-native";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import NativeWrapper from "~root/Components/NativeWrapper";
import { getBranchName } from "~root/Lib/BranchHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { getAccountName } from "~root/Lib/TradeAccountsHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import AccountBranchSwitchSheet from "../AccountBranchSwitchSheet";
import { SheetState } from "../BottomSheet/BottomSheet";
import styles from "./AccountBranchSelectorStyle";

interface OwnProps {}

interface IStateProps {
  selectedBranch: any;
  selectedTradeAccount: any;
  selectedJobAccount: any;
}

type Props = OwnProps & IStateProps;

const AccountBranchSelector: React.SFC<Props> = ({ selectedBranch, selectedTradeAccount, selectedJobAccount }: Props) => {
  const [accountBranchSwitchSheetState, setAccountBranchSwitchSheetState] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();

  React.useEffect(() => {
    append(
      <AccountBranchSwitchSheet
        sheetState={accountBranchSwitchSheetState}
        onClose={() => setTimeout(() => setAccountBranchSwitchSheetState(SheetState.CLOSED), 0)}
      />,
      "AccountBranchSwitchSheet",
      0,
    );
  }, [accountBranchSwitchSheetState]);

  const onAccountBranchSwitcherClick = React.useCallback(() => {
    Keyboard.dismiss();
    setAccountBranchSwitchSheetState(SheetState.EXPANDED);
  }, []);
  return (
    <NativeWrapper style={styles.accountBranchSwitcher} onPress={onAccountBranchSwitcherClick} {...accessibility("AccountBranchSwitcher")}>
      <Text ref={occludeSensitiveView} style={styles.accountNameStyle} numberOfLines={1}>
        {getAccountName(selectedTradeAccount, selectedJobAccount)}
      </Text>
      <Button transparent={true} onPress={onAccountBranchSwitcherClick}>
        <CustomIcon style={styles.iconDownArrow} name={"chevron-down"} />
      </Button>
      <Text ref={occludeSensitiveView} style={styles.branchNameStyle}>
        {getBranchName(selectedBranch)}
      </Text>
    </NativeWrapper>
  );
};

const mapStateToProps = (state: RootState): IStateProps => ({
  selectedBranch: state.branchList.selectedBranch,
  selectedTradeAccount: state.connectTrade.selectedTradeAccount,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
});

export default connect(mapStateToProps)(AccountBranchSelector);
