import React, { Component } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import Divider from "~root/Components/Divider";
import FbIcon from "~root/Components/FbIcon";
import { IAlertCallbacks, MESSAGE_CHANGE_ACCOUNT, OKButton, STC_NOT_AVAILABLE, TITLE_CHANGE_ACCOUNT } from "~root/Lib/AlertsHelper";
import { TradeAccounts } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import style from "./STCTradeAccountStyle";
interface DispatchProps {
  requestTradeAccounts: () => void;
  searchTradeAccounts: (term: any) => void;
  setSelectedTradeAccount: (account: any, alertCallBack: IAlertCallbacks) => void;
  clearCart: () => void;
}

interface StateProps {
  filteredAccounts: [];
  selectedAccount: any;
  cartCount: number;
  selectedJobAccount: any;
}

interface State {
  customModelData: any;
}

interface OwnProps {
  bottomSheet: any;
}

type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProps;

class STCTradeAccount extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    };
  }

  public render() {
    return (
      <>
        <SectionList
          {...accessibility("tradeAccountSectionListID")}
          accessible={false}
          style={style.sectionList}
          sections={this.props.filteredAccounts}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => this.Item(item)}
          contentContainerStyle={style.sectionContainerStyle}
          renderSectionHeader={({ section: { title } }) => (
            <View style={style.sectionHeaderTitle}>
              <Text {...accessibility("tradeAccount")} style={style.header}>
                {title}
              </Text>
            </View>
          )}
        />
        <CustomAlert
          heading={this.state.customModelData?.heading}
          msg={this.state.customModelData?.message}
          visible={this.state.customModelData?.visible}
          onClose={this.state.customModelData?.onClose}
          button1Text={this.state.customModelData?.button1Text}
          onButton1Press={this.state.customModelData?.onButton1Press}
        />
      </>
    );
  }

  public disableCustomModel = () => {
    this.setState({
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    });
  };

  public changeTradeAccount = (item: any) => {
    this.props.setSelectedTradeAccount(item, {
      onSuccess: this.onJobAccountSuccess,
      onFailure: this.onJobAccountFailure,
    });
  };

  public handleTap = (item: any) => {
    if (this.props.selectedAccount?.uid !== item.uid || this.props.selectedJobAccount) {
      if (item.accountTypeEnum === TradeAccounts.CASH) {
        this.confirmCashAccountChange();
      } else if (this.props.cartCount > 0) {
        this.confirmChangeAccount(item);
      } else {
        this.changeTradeAccount(item);
        setTimeout(this.props.clearCart);
      }
    } else {
      this.changeTradeAccount(item);
      // this.props.clearCart();
    }
  };

  public confirmChangeAccount = (item: any) => {
    this.setState({
      customModelData: {
        visible: true,
        heading: TITLE_CHANGE_ACCOUNT,
        message: MESSAGE_CHANGE_ACCOUNT,
        onClose: () => {
          this.disableCustomModel();
        },
        button1Text: OKButton,
        onButton1Press: () => {
          this.disableCustomModel();
          this.props.clearCart();
          this.changeTradeAccount(item);
        },
      },
    });
  };

  /**
   *  Message DialogBox for User
   *  This method will show a Dialog Box to charge customer if they try to change the account
   *  from charge to cash during STC flow
   */

  public confirmCashAccountChange = () => {
    this.setState({
      customModelData: {
        visible: true,
        heading: TITLE_CHANGE_ACCOUNT,
        message: STC_NOT_AVAILABLE,
        onClose: () => {
          this.disableCustomModel();
        },
        button1Text: OKButton,
        onButton1Press: () => {
          this.disableCustomModel();
        },
      },
    });
  };

  public onJobAccountSuccess = jobs => {
    if (jobs.length > 0) {
      this.props.navigation.navigate("JobAccountSelection");
      this.props.route.params?.changeHeaderTitle();
    } else {
      this.props.route.params?.closeSheet();
    }
  };

  public onJobAccountFailure = () => {};

  private Item = (item: string) => {
    return (
      <TouchableOpacity style={style.itemStyle} {...accessibility("stcTradeAccountSelected")} onPress={this.handleTap.bind(this, item)}>
        <View style={style.item}>
          <Text style={style.itemText}>{item.custId + " " + item.name}</Text>
          <FbIcon name={"ic_chevron"} style={style.iconStyle} />
        </View>
        <Divider />
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  cartCount: state.cart.cartEntriesCount,
  filteredAccounts: state.connectTrade.dataTradeListUserInfo || [],
  selectedAccount: state.connectTrade?.selectedTradeAccount,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  clearCart: () => dispatch(ProductActions.clearCart()),
  setSelectedTradeAccount: (account, alertCallBack) => {
    dispatch(ConnectTradeActions.onSelectedTradeAccount(account, alertCallBack));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(STCTradeAccount);
