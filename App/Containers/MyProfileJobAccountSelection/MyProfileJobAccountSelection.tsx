import React, { Component } from "react";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ImmutableArray } from "seamless-immutable";
import CustomIcon from "~root/Components/CustomIcon";
import SmallHeader from "~root/Components/SmallHeader";
import JobAccount from "~root/Containers/JobAccount/JobAccount";
import style from "~root/Containers/MyProfileJobAccountSelection/MyProfileJobAccountSelectionStyle";
import { RootState } from "~root/Reducers";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import AppThemeContext from "~root/Themes/AppThemeContext";
import { JobItem } from "~root/Types/JobAccounts";

interface DispatchProps {
  selectJobAccount: (item: JobItem | undefined) => void;
}

interface StateProps {
  jobAccounts: never[] | ImmutableArray<JobItem>;
  selectedTradeAccount: any;
}

interface State {}

interface OwnProps {}

type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProps;

class MyProfileJobAccountSelection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <AppThemeContext.Provider value={"light"}>
        <SmallHeader
          actionItem={<CustomIcon name={"close"} style={style.close} onPress={() => this.props.navigation.getParent().pop()} />}
          title={"Job accounts"}
          navigation={this.props.navigation}
        />
        <JobAccount onDismiss={() => this.props.navigation.getParent().pop()} />
      </AppThemeContext.Provider>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedTradeAccount: state.connectTrade.selectedTradeAccount,
  jobAccounts: state.jobAccounts.data || [],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  selectJobAccount: item => dispatch(JobAccountsActions.selectJobAccount(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileJobAccountSelection);
