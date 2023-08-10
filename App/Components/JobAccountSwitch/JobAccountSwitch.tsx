import React from "react";
import { Text, View } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import styles from "./JobAccountSwitchStyles";

interface DispatchProps {}

interface StateProps {
  accountName: string;
}

interface OwnProps extends NavigationStackScreenProps {}

type Props = StateProps & OwnProps & DispatchProps;

const JobAccountSwitch = ({ accountName }: Props) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.label}>Account name</Text>
      <Text ref={occludeSensitiveView} style={styles.text} numberOfLines={3} {...accessibility("accountName")}>
        {accountName}
      </Text>
    </View>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  accountName: state.jobAccounts.selectedJobAccount?.SearchName || state.connectTrade.selectedTradeAccount.name,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(JobAccountSwitch);
