import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import UXCam from "react-native-ux-cam";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import Divider from "~root/Components/Divider";
import FbIcon from "~root/Components/FbIcon";
import { GENERIC_MESSAGE_POPUP, IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { TradeAccountContext } from "./TradeAccount";
import style from "./TradeAccountStyle";
interface DispatchProps {
  setSelectedTradeAccount: (account: any, alertCallBack: IAlertCallbacks) => void;
  clearCart: () => void;
}

interface ItemProps {
  item: any;
}

interface StateProps {
  cartCount: number;
  filteredAccounts: [];
  newTradeAccountData: undefined;
  selectedJobAccount: any;
  selectedAccount: any;
}

interface State {}

export type Props = StateProps & ItemProps & DispatchProps & NavigationScreenProp<any, any>;

const Item: React.SFC<Props> = ({ selectedAccount, selectedJobAccount, cartCount, newTradeAccountData, item, setSelectedTradeAccount, clearCart }: Props) => {
  const context = useContext(TradeAccountContext);
  const { dispatchAlert } = useCustomAlert();
  const onTradeAccountSuccess = React.useCallback((jobs: any) => {
    context?.onSelect(jobs);
  }, []);

  const changeTradeAccount = React.useCallback(() => {
    UXCam.setAutomaticScreenNameTagging(false);
    setSelectedTradeAccount(item, {
      onSuccess: onTradeAccountSuccess,
      onFailure: GENERIC_MESSAGE_POPUP,
    });
  }, []);

  const confirmChangeAccount = React.useCallback(() => {
    dispatchAlert?.({
      visible: true,
      heading: "Change Account",
      msg: "If you change your account while there are items in your cart, these will be removed and you will have to start a new cart. Are you sure you want to change account?",
      button1Text: "OK",
      onButton1Press: () => {
        dispatchAlert?.({ visible: false });
        changeTradeAccount();
        clearCart();
      },
      button2Text: "Cancel",
      onButton2Press: () => dispatchAlert?.({ visible: false }),
    });
  }, []);

  const handleTap = React.useCallback(() => {
    if (selectedAccount?.uid !== item.uid || selectedJobAccount) {
      if ((cartCount ?? 0) > 0) {
        confirmChangeAccount();
      } else {
        changeTradeAccount();
        setTimeout(clearCart);
      }
    } else {
      changeTradeAccount();
    }
  }, []);
  return (
    <TouchableOpacity style={style.itemStyle} onPress={handleTap} {...accessibility("TradeAccountItem")}>
      <View style={style.item}>
        <Text style={style.itemText} ref={occludeSensitiveView} {...accessibility("TradeAccountName")}>
          {item.custId + " " + item.name}
        </Text>
        <View style={style.newView}>
          {newTradeAccountData && item?.custId === newTradeAccountData.custId && (
            <View style={style.newTextView}>
              <Text style={style.newText}>New</Text>
            </View>
          )}
          <FbIcon name={"ic_chevron"} style={style.iconStyle} />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  cartCount: state.cart.cartEntriesCount,
  selectedAccount: state.connectTrade?.selectedTradeAccount,
  filteredAccounts: state.connectTrade.dataTradeListUserInfo || [],
  newTradeAccountData: state.connectTrade.newTradeAccountData,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  clearCart: () => dispatch(ProductActions.clearCart()),
  setSelectedTradeAccount: (account, alertCallBack) => {
    dispatch(ConnectTradeActions.onSelectedTradeAccount(account, alertCallBack));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
