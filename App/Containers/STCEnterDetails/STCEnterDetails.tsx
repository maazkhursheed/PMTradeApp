import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import React from "react";
import { findNodeHandle, Keyboard, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import STCCommonHeader from "~root/Components/STCCommonHeader/STCCommonHeader";
import TextField from "~root/Components/TextField";
import TextFieldSTC from "~root/Components/TextFieldSTC";
import { checkoutMasterOnHoldMessage, IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getStep1BeginCheckoutEventObj, getStep1FeatureFlowEventObj, STCEventScreenNames } from "~root/Lib/STCHelper";
import { validateSTCPONumber } from "~root/Lib/StringHelper";
import PurchaseHistoryNavigation from "~root/Navigation/PurchaseHistoryNavigation";
import STCTradeAccountNavigation from "~root/Navigation/STCTradeAccountNavigation";
import { RootState } from "~root/Reducers";
import { AppActions } from "~root/Reducers/AppReducers";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";
import style from "./STCEnterDetailsStyle";

export interface State {
  poNumber: string;
  poError?: string;
  sheetState: SheetState;
  sheetContent: any;
  accountErr?: string;
  disabled?: boolean;
  selectedJobAccount: any;
  userId: any;
  selectedBranch: any;
  selectedAccountId: any;
  digitalId: string;
}

export interface OwnProps {}

export interface StateProps {
  selectedTradeAccount?: any;
  isFromNotification: boolean;
}

interface DispatchProps {
  fetchPurchaseToken: (poNumber: string, callback: IAlertCallbacks) => void;
  onFailure: () => void;
  setNotificationFlag: (flag: boolean) => void;
  getUserInfo: () => void;
  resetSTCItem: () => void;
  switchScreen: (screen: STCEventScreenNames, params: any) => void;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

class STCEnterDetails extends React.Component<Props, State> {
  private poNumberText?: TextField | null | undefined;
  private scrollView: any;
  private _unsubscribeFocusListener: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      poNumber: "",
      poError: undefined,
      sheetState: SheetState.CLOSED,
      sheetContent: () => undefined,
      accountErr: undefined,
      disabled: false,
    };
  }

  public async componentDidMount() {
    this.props.getUserInfo();
    this.props.resetSTCItem();
    this.pushFeatureFlowEvent();
    this._unsubscribeFocusListener = this.props.navigation.addListener("focus", async () => {
      if (this.props.isFromNotification) {
        this.props.setNotificationFlag(false);
        this.openRecentPurchases();
      }
    });
  }

  public componentWillUnmount(): void {
    this._unsubscribeFocusListener();
  }

  public back = () => {
    this.props.navigation.pop();
  };

  public poNumber = (text: string) => {
    if (text === "") {
      this.setState({ poNumber: text });
    } else if (validateSTCPONumber(text)) {
      this.setState({ poNumber: text, poError: undefined });
    }
  };
  public openRecentPurchases = () => {
    Keyboard.dismiss();
    this.setState({
      sheetContent: () => <PurchaseHistoryNavigation sheetState={this.state.sheetState} closeSheet={() => this.setState({ sheetState: SheetState.CLOSED })} />,
      sheetState: SheetState.EXPANDED,
    });
  };

  public startOrder = () => {
    if (this.props.selectedTradeAccount.masterOnHold) {
      Toast.show({
        text1: checkoutMasterOnHoldMessage,
        text2: "",
        type: "error",
        topOffset: Platform.OS === "ios" ? 52 : 12,
        visibilityTime: 3000,
      });
    } else {
      this.setState({ disabled: true });
      if (this.props.selectedTradeAccount) {
        this.setState({ accountErr: undefined });
        if (this.state.poNumber.length > 0) {
          Keyboard.dismiss();
          this.props.fetchPurchaseToken(this.state.poNumber, {
            onSuccess: () => {
              this.pushBeginCheckoutEvent();
              this.props.switchScreen(STCEventScreenNames.QrCode, {
                isFrom: STCEventScreenNames.EnterDetails,
              });
            },
            onFailure: () => {
              this.props.onFailure();
              this.setState({ disabled: false });
            },
          });
        } else {
          {
            this.setState({ disabled: false });
            this.setState({ poError: "Please enter PO number" });
          }
        }
      } else {
        this.setState({ disabled: false });
        this.setState({ accountErr: "Please select the account name" });
      }
    }
  };

  public render() {
    return (
      <MainContainer>
        <STCCommonHeader
          title={"Skip the counter"}
          noShadow={true}
          titleStyle={style.titleStyle}
          rightItem={
            <Button
              transparent={true}
              onPress={() => {
                this.back();
              }}
              {...accessibility("rightItemBtn")}
            >
              <Text style={style.closeBtn}>Close</Text>
            </Button>
          }
        />

        {/* Recent Purchases */}
        <TouchableOpacity {...accessibility("stcRecentPurchase")} onPress={this.openRecentPurchases}>
          <View style={[style.recentTextShadow, style.recentPurchasesContainer]}>
            <Text style={style.recentPurchasesText}>Today's Orders</Text>
            <FbIcon style={style.moreIcon} name={"ic_more"} />
          </View>
        </TouchableOpacity>

        <KeyboardAwareScrollView ref={c => (this.scrollView = c)} style={style.scroller}>
          <Text style={style.headerTitle}>{"Let's get started!"}</Text>
          <Text style={style.body}>{"Drive in, scan, confirm order & drive out\n•   Faster, Safer, Smarter & more secure\n•   No more queues!"}</Text>
          <TouchableOpacity
            {...accessibility("stcTradeAccountSelection")}
            onPress={() => {
              this.setState({
                sheetState: SheetState.EXPANDED,
                sheetContent: () => (
                  <STCTradeAccountNavigation closeSheet={() => this.setState({ sheetState: SheetState.CLOSED })} sheetState={this.state.sheetState} />
                ),
              });
            }}
          >
            <TextFieldSTC
              isDropDown={true}
              pointerEvents={"none"}
              editable={false}
              textViewStyle={style.fieldViewStyle}
              viewStyle={style.viewStyle}
              style={style.textFieldStyle}
              ref={c => (this.poNumberText = c)}
              value={
                this.props.selectedJobAccount
                  ? this.props.selectedJobAccount.SearchName
                  : this.props.selectedTradeAccount
                  ? this.props.selectedTradeAccount.name
                  : undefined
              }
              label={"Select account and job"}
              errorMsg={this.state.accountErr}
              isMandatory={false}
              placeholder={"Select the job account"}
              {...accessibility("jobAccountNumberText")}
              autoCorrect={false}
              onFocus={(event: any) => {
                this.scrollView.scrollToFocusedInput(findNodeHandle(event.target), Platform.OS === "ios" ? 110 : 300);
              }}
            />
          </TouchableOpacity>
          <TextFieldSTC
            viewStyle={style.viewStyle}
            style={style.textFieldStyle}
            ref={c => (this.poNumberText = c)}
            value={this.state.poNumber}
            onChangeText={text => this.poNumber(text.trimStart())}
            label={"Purchase order reference"}
            errorMsg={this.state.poError}
            isMandatory={true}
            maxLength={16}
            placeholder={"E.g. 29 Avery Cresent Job"}
            autoCorrect={false}
            onFocus={(event: any) => {
              this.scrollView.scrollToFocusedInput(findNodeHandle(event.target), Platform.OS === "ios" ? 110 : 300);
            }}
            {...accessibility("poNumberText")}
          />
          <Text style={style.infoText}>{"This information will be displayed on your invoice."}</Text>
        </KeyboardAwareScrollView>
        <BottomSheet content={this.state.sheetContent()} sheetState={this.state.sheetState} />
        <LargeButton
          isFooter={true}
          onPress={() => {
            this.props.getUserInfo({
              onSuccess: this.startOrder,
              onFailure: this.props.onFailure,
            });
          }}
          btnText={"Start order"}
          disabled={this.state.disabled}
        />
      </MainContainer>
    );
  }

  private pushFeatureFlowEvent = () => {
    const STCEventsFeatureFlow = getStep1FeatureFlowEventObj({
      props: this.props,
    });
    firebase.analytics().logEvent("feature_flow", STCEventsFeatureFlow);
  };

  private pushBeginCheckoutEvent = () => {
    const STCEventsBeginCheckout = getStep1BeginCheckoutEventObj({
      props: this.props,
      state: this.state,
    });
    firebase.analytics().logEvent("begin_checkout", STCEventsBeginCheckout);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchPurchaseToken: (poNumber, callback) => dispatch(StcActions.purchaseToken(poNumber, callback)),
  onFailure: () => dispatch(AppActions.appGenericErrorVisibility(true)),
  setNotificationFlag: flag => dispatch(NotificationActions.setIsFromNotification(flag)),
  getUserInfo: callback => dispatch(LoginActions.getUserInfo(undefined, callback)),
  resetSTCItem: () => dispatch(StcReviewOrderActions.resetItem()),
  switchScreen: (screen, params) => dispatch(StcActions.switchScreen(screen, params)),
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    selectedJobAccount: state.jobAccounts.selectedJobAccount,
    selectedTradeAccount: state.connectTrade.selectedTradeAccount,
    isFromNotification: state.notification.isFromNotification,
    userId: state.login.userData.cimSubscriberKey,
    selectedBranch: state.branchList.selectedBranch,
    selectedAccountId: getSelectedAccountId(state),
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(STCEnterDetails);
