import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import * as React from "react";
import { AppState, Image, Platform, ScrollView, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import Divider from "~root/Components/Divider";
import MainContainer from "~root/Components/MainContainer";
import ProgressBar from "~root/Components/ProgressBar";
import STCCommonHeader from "~root/Components/STCCommonHeader/STCCommonHeader";
import STCLargeButton from "~root/Components/STCLargeButton";
import AppConfig from "~root/Config/AppConfig";
import style from "~root/Containers/STCEnterDetails/STCEnterDetailsStyle";
import { IOrderHistoryObject, OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, getSTCSelectedTradeAccount, occludeSensitiveView } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { cleanMQTTQueue, createMQQTClient, fetchTradeAccountName, getStep3InProgressEventObj, PREFIX_TRADEAPP, STCEventScreenNames } from "~root/Lib/STCHelper";
import { AppActions } from "~root/Reducers/AppReducers";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";
import { Images } from "~root/Themes";
import { RootState } from "../../Reducers";
// Styles
import styles from "./STCOrderInProgressStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  switchSTCScreen: (screenName: STCEventScreenNames, meta: any) => void;
  requestExpiryToken: (val: IAlertCallbacks) => void;
  updateItem: (token: string, orderId: string, branchId: string) => void;
  setNotificationFlag: (flag: boolean) => void;
  showError: () => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  accountName?: string;
  poNumber?: string;
  token?: string;
  base64?: string;
  deviceToken?: string;
  isFromNotification: boolean;
  selectedBranch: any;
  userId: any;
  selectedAccountId: any;
  orderItem?: IOrderHistoryObject;
  digitalId: string;
  selectedTradeAccount: any;
}

/**
 * The local state
 */
export interface State {
  showAllowNotification: boolean;
  appState: any;
}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

class STCOrderInProgress extends React.Component<Props, State> {
  private client: any;
  private _unsubscribeFocusListener: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      showAllowNotification: false,
      appState: "active",
    };
  }

  public componentDidMount() {
    this.setupMQTTListener();
    AppState.addEventListener("change", this.handleAppState);
    this._unsubscribeFocusListener = this.props.navigation.addListener("focus", async () => {
      if (this.props.isFromNotification) {
        this.props.setNotificationFlag(false);
      }
      if (Platform.OS === "ios") {
        PushNotification.checkPermissions(value => {
          if (!value.alert) {
            this.setState({ showAllowNotification: true });
          } else {
            this.setState({ showAllowNotification: false });
          }
        });
      }
    });
  }

  public pushSTCDataLayer = (orderNumber: any) => {
    const isFrom = this.props.route.params?.isFrom ?? STCEventScreenNames.Dashboard;
    const STCEventsBeginCheckout = getStep3InProgressEventObj({
      props: this.props,
      orderNumber,
      lastScreen: isFrom,
    });
    firebase.analytics().logEvent("begin_checkout", STCEventsBeginCheckout);
  };

  public setupMQTTListener() {
    const clientId = PREFIX_TRADEAPP + this.props.token;

    createMQQTClient(clientId).then(value => {
      this.client = value;
      this.client.connect();
      this.client.on("connect", () => {
        this.client.subscribe(`fbu/pmk/erp/order/response/${AppConfig.MQTT_VERSION}/${this.props.token}`, 1);
      });

      this.client.on("error", msg => {
        console.log("STC Error", msg);
      });

      this.client.on("message", msg => {
        const data = R.compose(JSON.parse, R.prop("data"))(msg);
        const orderNumber = R.path(["data", "orderReference", "orderNumber"], data);
        this.pushSTCDataLayer(orderNumber);
        const branchId = R.path(["data", "orderReference", "branchId"], data);
        const err = R.pathOr("", ["data", "serviceResult", "Code"], data);

        if (err.toString() === "0" && RA.isNotNilOrEmpty(orderNumber)) {
          this.props.updateItem(this.props.token, orderNumber, branchId);
          setTimeout(() => {
            this.client.disconnect();
            cleanMQTTQueue(clientId).then(response => {
              this.props.switchSTCScreen(STCEventScreenNames.ReviewOrders, {
                isFrom: STCEventScreenNames.InProgress,
              });
            });
          }, 50);
        }
      });
    });
  }

  public disconnectMQTT() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  public handleAppState = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
      this.setupMQTTListener();
    } else if (this.state.appState.match("active") && (nextAppState === "inactive" || nextAppState === "background")) {
      this.disconnectMQTT();
    }
    this.setState({ appState: nextAppState });
  };

  public componentWillUnmount(): void {
    this.disconnectMQTT();
    this._unsubscribeFocusListener();
  }

  public onClose = () => {
    this.props.navigation.navigate("OrderDeliveries");
  };

  public render() {
    return (
      <MainContainer>
        <STCCommonHeader
          title={"Skip the counter"}
          rightItem={
            <Button
              transparent={true}
              onPress={() => {
                this.onClose();
              }}
              {...accessibility("rightItemBtn")}
            >
              <Text style={style.closeBtn}>Close</Text>
            </Button>
          }
        />
        <ProgressBar step={2} />
        <ScrollView>
          <View style={styles.container}>
            <Image source={Images.orderInProgress} resizeMode={"contain"} style={style.imageStyle} />
          </View>
          <View style={style.accountPO}>
            <View style={style.rowStyle}>
              <Text style={styles.subHeading}>Account: </Text>
              <Text ref={occludeSensitiveView} style={[styles.subHeading, styles.accountNameStyle]}>
                {this.props.accountName}
              </Text>
            </View>
            <View style={style.rowStyle}>
              <Text style={styles.subHeading}>PO: </Text>
              <Text style={styles.subHeading}> {this.props.poNumber} </Text>
            </View>
            <Text style={styles.heading}>Order in progress</Text>
            <Text style={styles.bottomText}>We will notify you when the order is ready for you to review.</Text>
          </View>
        </ScrollView>
        <Divider />
        <STCLargeButton btnText={"To cancel this order please talk to our staff"} onPress={this.onCancel} isFooter={true} textStyle={style.cancelOrderButton} />
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  switchSTCScreen: (screenToSwitch: STCEventScreenNames, meta: any) => dispatch(StcActions.switchScreen(screenToSwitch, meta)),
  requestExpiryToken: (val: IAlertCallbacks) => dispatch(StcActions.requestExpiryToken(undefined, val)),
  updateItem: (token, orderId, branchId) => {
    dispatch(
      OrderHistoryActions.updateItem({
        token,
        orderId,
        fulfilmentBranchId: branchId,
        status: OrderHistoryStatus.InReview,
      }),
    );
    dispatch(
      StcReviewOrderActions.updateItem({
        token,
        orderId,
        fulfilmentBranchId: branchId,
        status: OrderHistoryStatus.InReview,
      }),
    );
  },
  setNotificationFlag: flag => dispatch(NotificationActions.setIsFromNotification(flag)),
  showError: () => dispatch(AppActions.appGenericErrorVisibility(true)),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    poNumber: state.stcReviewOrder.item.poNumber,
    accountName: fetchTradeAccountName(state),
    token: state.stcReviewOrder.item.token,
    deviceToken: state.notification.token,
    isFromNotification: state.notification.isFromNotification,
    selectedBranch: state.branchList.selectedBranch,
    userId: state.login.userData.uid,
    selectedAccountId: getSTCSelectedTradeAccount(state),
    selectedTradeAccount: state.stcConnectTrade.selectedSTCTradeAccount,
    orderItem: state.stcReviewOrder.item,
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(STCOrderInProgress);
