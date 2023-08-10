import moment from "moment";
import React, { Component } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import FbIcon from "~root/Components/FbIcon";
import SearchField from "~root/Components/SearchField";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { AppActions } from "~root/Reducers/AppReducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { Colors } from "~root/Themes";
import style from "./SelectTradeAccountStyle";

interface DispatchProps {
  requestTradeAccounts: () => void;
  searchTradeAccounts: (term: any) => void;
  setSelectedTradeAccount: (account: any) => void;
}

interface StateProps {
  dataList: [];
  filteredAccounts: [];
  selectedAccount: any;
  permissionTempAccess: any;
}

interface State {
  dataToShow: [];
  search: boolean;
  text: string;
}

interface OwnProps {
  onText?: () => void;
  closeBottomSheet?: () => void;
}

type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProps;

class SelectTradeAccountContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataToShow: [],
      search: false,
      text: "",
    };
  }

  public searchTradeAccounts = (term: string) => {
    this.props.searchTradeAccounts(term);
  };

  public render() {
    return (
      <View {...accessibility("selectTradeAccViewID")} style={style.container}>
        <SearchField
          {...accessibility("searchAccTextInput")}
          value={this.state.text}
          onFocus={this.props.onText}
          onChangeText={(term: string) => {
            this.setState({ text: term });
            this.searchTradeAccounts(term);
          }}
          placeholder={"Account search"}
          placeholderTextColor={Colors.placeHolderBg}
        />
        <SectionList
          {...accessibility("tradeAccountSectionListID")}
          accessible={false}
          style={style.sectionList}
          sections={this.props.filteredAccounts}
          renderSectionFooter={({ section: { title } }) => <View style={style.sectionFooter} />}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => this.Item(item)}
          renderSectionHeader={({ section: { title } }) => (
            <Text {...accessibility("tradeAccount")} style={style.header}>
              {title}
            </Text>
          )}
        />
      </View>
    );
  }

  public handleTap = (item: any) => {
    if (this.props.closeBottomSheet) {
      this.props.closeBottomSheet();
    }

    this.props.setSelectedTradeAccount(item);
  };

  private showTradeAccount = (item: any) => {
    if (item.custId !== null && item.custId !== undefined) {
      return item.custId + " " + item.name;
    }
    return item.name;
  };

  private Item = (item: string) => {
    const nonTemporary = (
      <View style={style.item}>
        {this.props.selectedAccount.uid === item.uid && (
          <TouchableOpacity accessible={false}>
            <View style={style.tradeAccountContainer}>
              <FbIcon style={style.tickIcon} name={"ic_tick"} {...accessibility("selectedNonTemporaryAccountTickID")} />
              <Text {...accessibility("selectedNonTemporaryAccountID")} style={style.selectedTitle}>
                {this.showTradeAccount(item)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.props.selectedAccount.uid !== item.uid && (
          <TouchableOpacity accessible={false} onPress={this.handleTap.bind(this, item)}>
            <Text {...accessibility("unSelectedNonTemporaryAccountID")} style={style.title}>
              {item.custId + " " + item.name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );

    const disabledAccount = (
      <View style={style.item}>
        <Text {...accessibility("disabledAccountID")} style={style.disabledTitle}>
          {item.custId + " " + item.name}
        </Text>
      </View>
    );

    const selectedAccount = (
      <View style={style.item}>
        <TouchableOpacity accessible={false}>
          <View style={style.tradeAccountContainer}>
            <FbIcon style={style.tickIcon} name={"ic_tick"} {...accessibility("selectedAccountTickID")} />
            <Text {...accessibility("selectedAccountID")} style={style.selectedTitle}>
              {item.custId + " " + item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    const unselectedAccount = (
      <View style={style.item}>
        <TouchableOpacity accessible={false} onPress={this.handleTap.bind(this, item)}>
          <Text {...accessibility("unselectedAccountID")} style={style.title}>
            {item.custId + " " + item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );

    if (this.props.permissionTempAccess.temporaryAccess === false) {
      return nonTemporary;
    } else {
      if (moment(Date()).isSameOrBefore(this.props.permissionTempAccess.endDate)) {
        return nonTemporary;
      } else {
        if (this.props.permissionTempAccess.uid === item.uid) {
          return disabledAccount;
        } else if (this.props.selectedAccount.uid === item.uid) {
          return selectedAccount;
        } else {
          return unselectedAccount;
        }
      }
    }
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  dataList: state.connectTrade.dataTradeListUserInfo,
  filteredAccounts: state.connectTrade.filteredAccounts || [],
  selectedAccount: state.connectTrade?.selectedTradeAccount,
  permissionTempAccess: state.connectTrade.dataTemporaryAccess,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestTradeAccounts: () => dispatch(ConnectTradeActions.resetTradeAccountFilterList()),
  searchTradeAccounts: term => dispatch(ConnectTradeActions.onGetFilteredList(term)),
  setSelectedTradeAccount: account =>
    dispatch(
      ConnectTradeActions.onSelectedTradeAccount(account, {
        onFailure: () => dispatch(AppActions.appGenericErrorVisibility(true)),
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTradeAccountContainer);
