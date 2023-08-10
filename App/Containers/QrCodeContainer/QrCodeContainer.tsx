import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { AppState, SafeAreaView, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import Divider from "~root/Components/Divider";
import MainContainer from "~root/Components/MainContainer";
import ProgressBar from "~root/Components/ProgressBar";
import STCCancelModal from "~root/Components/STCCancelModalContainer/STCCancelModal";
import STCCommonHeader from "~root/Components/STCCommonHeader/STCCommonHeader";
import STCLargeButton from "~root/Components/STCLargeButton";
import AppConfig from "~root/Config/AppConfig";
import style from "~root/Containers/STCEnterDetails/STCEnterDetailsStyle";
import { IOrderHistoryObject, OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { accessibility, getSTCSelectedTradeAccount, occludeSensitiveView } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { generateBase64Encoded } from "~root/Lib/QrCodeHelper";
import { cleanMQTTQueue, createMQQTClient, fetchTradeAccountName, getStep2QrCodeEventObj, STCEventScreenNames } from "~root/Lib/STCHelper";
import { safeRender } from "~root/Provider/Appender";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";
import { RootState } from "../../Reducers";
import Metrics from "../../Themes/Metrics";
// Styles
import styles from "./QrCodeContainerStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  requestExpiryToken: (val: IAlertCallbacks) => void;
  updateItem: (token: string | undefined, status: OrderHistoryStatus, resumeCount: string) => void;
  requestPreviousAccount: () => void;
  setNotificationFlag: (flag: boolean) => void;
  switchSTCScreen: (screenName: STCEventScreenNames, meta: any) => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  poNumber?: string;
  token?: string;
  expiryDate?: Date;
  base64?: string;
  tradeAccount?: string;
  selectedJobAccount?: string;
  isFromNotification: boolean;
  orderId?: string;
  selectedTradeAccount: any;
  selectedBranch: any;
  userData: any;
  orderItem?: IOrderHistoryObject;
  selectedAccountId: any;
  digitalId: string;
}

/**
 * The local state
 */
export interface State {
  showAlert: boolean;
  appState: any;
}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

class QrCodeContainer extends React.Component<Props, State> {
  private client: any;
  private _unsubscribeFocusListener: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      showAlert: false,
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
    });
  }

  public isFromResumedOrder(): boolean {
    return this.props.route.params?.isResumedOrder === true;
  }

  public setupMQTTListener() {
    const clientId = this.props.token;
    createMQQTClient(clientId).then(value => {
      this.client = value;
      this.client.connect();
      this.client.on("connect", () => {
        this.client.subscribe(`fbu/pmk/erp/purchaseauthorisation/created/${AppConfig.MQTT_VERSION}/${this.props.token}`, 1);
      });

      this.client.on("error", msg => {
        console.log("QR ERROR", msg);
      });

      this.client.on("message", (msg: any) => {
        this.client.disconnect();
        const isTokenValid = R.compose(R.path(["data", "body", "isTokenValid"]), JSON.parse, R.propOr("", "data"))(msg);
        cleanMQTTQueue(clientId).then(response => {
          if (isTokenValid) {
            const resumeCount = (Number(this.props.orderItem.resumeCount) + 1).toString();
            this.props.updateItem(this.props.token, OrderHistoryStatus.InProgress, resumeCount);
            this.fireGTMEvent();
            this.props.switchSTCScreen(STCEventScreenNames.InProgress, {
              isFrom: STCEventScreenNames.QrCode,
            });
          }
        });
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

  public onCancel = () => {
    this.setState({ showAlert: true });
  };

  public clearToken = () => {
    this.setState({ showAlert: false });
    this.props.requestExpiryToken({
      onSuccess: () => {
        if (this.client) {
          this.client.disconnect();
          cleanMQTTQueue(this.props.token);
        }
        this.props.navigation.navigate("OrderDeliveries");
        this.props.updateItem(this.props.token, OrderHistoryStatus.Cancelled);
      },
    });
  };

  public onClose = () => {
    this.props.navigation.navigate("OrderDeliveries");
  };

  public popToBack = () => {
    this.props.switchSTCScreen(STCEventScreenNames.ReviewOrders);
  };

  public showMessage = () => {
    if (this.isFromResumedOrder()) {
      return "To add more products show this screen to a staff member";
    }
    return "Show this screen to a staff member";
  };

  public render() {
    return (
      <MainContainer>
        <STCCommonHeader
          title={"Skip the counter"}
          navigation={this.props.navigation}
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
        <ProgressBar step={1} />
        <ScrollView>
          <View style={styles.container}>
            <QRCode value={this.props.base64} ecl={"H"} size={Metrics.screenWidth - 40} />
          </View>
          <View style={style.accountPO}>
            <View style={style.rowStyle}>
              <Text style={styles.subHeading}>Account: </Text>
              <Text ref={occludeSensitiveView} style={styles.accountTextStyle}>
                {this.props.tradeAccount}
              </Text>
            </View>
            <View style={style.rowStyle}>
              <Text style={styles.subHeading}>PO: </Text>
              <Text style={styles.subHeading}> {this.props.poNumber} </Text>
            </View>
            <Text style={styles.heading}>{this.props.orderId ? "Order SU: " + this.props.orderId : "Order pass"}</Text>
            <Text style={styles.bottomText}>{this.showMessage()}</Text>
            <Text style={styles.validitytext}>Valid for use within 12 hours</Text>
          </View>
        </ScrollView>
        <Divider />
        {this.isFromResumedOrder() ? (
          <SafeAreaView
            style={{
              flexDirection: "row",
              marginHorizontal: 12,
              alignSelf: "center",
            }}
          >
            <STCLargeButton style={[styles.footerBackToReview, styles.buttonStyle]} onPress={this.popToBack} btnText={"Back to review"} />
          </SafeAreaView>
        ) : (
          <STCLargeButton btnText={"Cancel"} onPress={this.onCancel} isFooter={true} />
        )}
        <STCCancelModal
          modalContent={<Text>You can re-generate a new order pass anytime for later use.</Text>}
          title={"Do you want to cancel the Order pass?"}
          close={() => this.setState({ showAlert: false })}
          visible={this.state.showAlert}
          onPressCancel={() => this.setState({ showAlert: false })}
          onPressOK={() => this.clearToken()}
        />
      </MainContainer>
    );
  }

  private fireGTMEvent = () => {
    const isFrom = this.props.route.params?.isFrom ?? STCEventScreenNames.Dashboard;
    const checkoutObj = getStep2QrCodeEventObj({
      props: this.props,
      lastScreen: isFrom,
    });
    firebase.analytics().logEvent("begin_checkout", checkoutObj);
  };
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  switchSTCScreen: (screenToSwitch: STCEventScreenNames, meta: any) => dispatch(StcActions.switchScreen(screenToSwitch, meta)),
  requestExpiryToken: (val: IAlertCallbacks) => dispatch(StcActions.requestExpiryToken(undefined, val)),
  updateItem: (token: string, status: OrderHistoryStatus, resumeCount: string) => {
    dispatch(
      OrderHistoryActions.updateItem({
        status,
        token,
        resumeCount,
      }),
    );
    dispatch(
      StcReviewOrderActions.updateItem({
        status,
        token,
        resumeCount,
      }),
    );
  },
  setNotificationFlag: flag => dispatch(NotificationActions.setIsFromNotification(flag)),
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    poNumber: state.stcReviewOrder.item.poNumber,
    token: state.stcReviewOrder.item.token,
    expiryDate: state.stc.expiryDate,
    // @ts-ignore
    base64: generateBase64Encoded({
      token: state.stcReviewOrder.item.token,
      accountName: fetchTradeAccountName(state),
      poNumber: state.stcReviewOrder.item.poNumber,
      orderId: state.stcReviewOrder.item.orderId,
    }),
    orderId: state.stcReviewOrder.item.orderId,
    tradeAccount: fetchTradeAccountName(state),
    isFromNotification: state.notification.isFromNotification,
    selectedTradeAccount: state.stcConnectTrade.selectedSTCTradeAccount,
    selectedBranch: state.branchList.selectedBranch,
    userData: state.login.userData,
    orderItem: state.stcReviewOrder.item,
    selectedAccountId: getSTCSelectedTradeAccount(state),
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(safeRender(QrCodeContainer, navigationalScreens.STCQRCodeScreen));
