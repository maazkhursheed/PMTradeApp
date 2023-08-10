import { firebase } from "@react-native-firebase/analytics";
import moment from "moment";
import { Body, Button, ListItem, Text } from "native-base";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import { Divider } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Subject } from "rxjs";
import { delay, map, throttleTime } from "rxjs/operators";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import ModalView from "~root/Components/ModalView/ModalView";
import ProgressBar from "~root/Components/ProgressBar";
import STCCommonHeader from "~root/Components/STCCommonHeader/STCCommonHeader";
import STCLargeButton from "~root/Components/STCLargeButton";
import AppConfig from "~root/Config/AppConfig";
import { IOrderHistoryObject, OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, getSTCSelectedTradeAccount } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { parseOrder } from "~root/Lib/OrderHistoryHelper";
import {
  cleanMQTTQueue,
  createMQQTClient,
  getStep4ItemReviewEventObj,
  getStep4ReviewEventObj,
  PREFIX_TRADEAPP,
  STCEventScreenNames,
} from "~root/Lib/STCHelper";
import { RootState } from "~root/Reducers";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";
import { Colors } from "~root/Themes";
import OrderDetailModel from "~root/Types/OrderDetail";
import style from "./STCReviewOrderStyle";

export interface State {
  isModalVisible: boolean;
}

export interface OwnProps {}

export interface StateProps {
  data: OrderDetailModel | undefined;
  orderItem?: IOrderHistoryObject;
  cartData?: any;
  selectedTradeAccount: any;
  userData: any;
  selectedAccountId: any;
  selectedBranch: any;
  digitalId: string;
}

interface DispatchProps {
  getReviewOrders: (token: string, callback: IAlertCallbacks) => void;
  confirmOrderRequest: (orderNumber: string, callback: IAlertCallbacks) => void;
  updateItem: (item: IOrderHistoryObject) => void;
  showLoader: () => void;
  hideLoader: () => void;
  getSTCReviewOrder: (token: string) => void;
  onResumeOrder: (token: string, callback: IAlertCallbacks) => void;
  switchScreen: (screen: STCEventScreenNames, params: {}) => void;
}

type Props = OwnProps & StateProps & NavigationScreenProps & DispatchProps;

class STCReviewOrders extends React.Component<Props, State> {
  private client: any;
  private confirmOrderSubject$ = new Subject();

  private callback: IAlertCallbacks = {
    onSuccess: args => {
      if (args) {
        this.confirmOrder();
      }
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
    this.confirmOrderSubject$
      .pipe(
        throttleTime(500),
        map(this.listenForOrderConfirmation),
        map(() => {
          this.props.confirmOrderRequest(this.props.orderItem.token, {
            onSuccess: () => {
              this.props.updateItem({
                ...this.props.orderItem,
                status: OrderHistoryStatus.PendingConfirmation,
              });
            },
          });
        }),
        delay(20000),
      )
      .subscribe(value => {
        this.disconnectConfirmOrderEvent();
        this.setState({ isModalVisible: true });
      });
  }

  public disconnectConfirmOrderEvent = () => {
    if (this.client) {
      this.props.hideLoader();
      this.client.disconnect();
    }
  };

  public listenForOrderConfirmation = async () => {
    this.props.showLoader();
    const clientId = PREFIX_TRADEAPP + this.props.orderItem.token;
    this.client = await createMQQTClient(clientId, true).catch(this.props.hideLoader);

    this.client.connect();
    this.client.on("connect", () => {
      this.client.subscribe(`fbu/pmk/erp/order/response/${AppConfig.MQTT_VERSION}/${this.props.orderItem.token}`, 1);
    });

    this.client.on("error", this.props.hideLoader);

    this.client.on("close", this.props.hideLoader);

    this.client.on("message", msg => {
      this.disconnectConfirmOrderEvent();
      cleanMQTTQueue(clientId);

      const data = R.compose(JSON.parse, R.prop("data"))(msg);

      const orderNumber = R.pathOr("", ["data", "orderId"])(data);
      const err = R.pathOr("", ["data", "serviceResult", "Code"], data);
      console.log("STC Order confirmation event", err);

      if (RA.isNotNilOrEmpty(orderNumber)) {
        this.fireGTMStcReviewOrderEvent();
        this.props.updateItem({
          ...this.props.orderItem,
          orderId: orderNumber.toString(),
          time: moment().toISOString(),
          status: OrderHistoryStatus.Confirmed,
        });
        this.props.switchScreen(STCEventScreenNames.GatePass, {
          header: true,
          item: this.props.orderItem,
          isFrom: STCEventScreenNames.ReviewOrders,
        });
      } else {
        this.setState({ isModalVisible: true });
      }
    });
  };

  public confirmOrder = () => {
    this.confirmOrderSubject$.next(true);
  };

  public fireGTMStcReviewOrderEvent = () => {
    const isFrom = this.props.route.params?.isFrom ?? STCEventScreenNames.Dashboard;
    const reviewOrderObj = getStep4ItemReviewEventObj({
      props: this.props,
      lastScreen: isFrom,
    });
    firebase.analytics().logEvent("begin_checkout", reviewOrderObj);
  };

  public componentDidMount() {
    this.props.getReviewOrders(this.props.orderItem.token, this.callback);
    if (this.props.orderItem.status === OrderHistoryStatus.PendingConfirmation) {
      this.confirmOrder();
    }
    this.props.getSTCReviewOrder(this.props.orderItem.token);
    this.fireBeginCheckoutEvent();
  }

  public resumeOrder = () => {
    this.props.onResumeOrder(this.props.orderItem.token, {
      onSuccess: () => {
        this.props.switchScreen(STCEventScreenNames.QrCode, {
          isFrom: STCEventScreenNames.ReviewOrders,
          isResumedOrder: true,
        });
      },
    });
  };

  public componentWillUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  public render() {
    const data = this.props.data;
    const order = R.path(["orders", "0"], data);
    return (
      <MainContainer>
        <STCCommonHeader
          title={"Skip the counter"}
          noShadow={true}
          titleStyle={style.headerTitle}
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
        <ProgressBar step={3} />
        {!!data && (
          <>
            <ScrollView>
              <View style={style.container}>
                <Text style={style.subHeading}>Account: {R.propOr("", "accountName", data)} </Text>
                <Text style={style.subHeading}>PO: {R.propOr("", "customerPOReference", order)} </Text>
                <Text style={style.heading}>Review your order </Text>
                <Text style={style.bottomText}>Please review and confirm your order before leaving the store.</Text>
                <Text style={style.redtext}>All confirmed or unconfirmed orders will be invoiced overnight.</Text>
              </View>
              <Divider />
              <FlatList data={R.propOr([], "orderLines", order)} style={style.listStyle} renderItem={this.renderOrder} {...accessibility("stcOrderList")} />
            </ScrollView>
            <SafeAreaView style={style.addProductsView}>
              <STCLargeButton style={style.addButtonStyle} onPress={this.resumeOrder} btnText={"Add products"} />
              <LargeButton style={style.footerButton} onPress={this.confirmOrder} btnText={"Complete order"} />
            </SafeAreaView>
          </>
        )}
        <ModalView
          modalContent={
            <Text style={style.errorModal}>
              Oops - something went wrong confirming your order. Please try again. If the problem persists, please speak to a staff member.
            </Text>
          }
          title={"Error"}
          buttons={[{ color: Colors.red, text: "OK", onPress: this.modalClose }]}
          close={this.modalClose}
          visible={this.state.isModalVisible}
        />
      </MainContainer>
    );
  }

  public back = () => {
    this.props.navigation.navigate("Dashboard");
  };

  public renderOrder = ({ item }) => {
    return (
      <ListItem noIndent={true}>
        <Body>
          <View>
            <Text style={style.itemDescription}>{item.description}</Text>
            <View style={style.SKU}>
              <Text note={true} style={style.itemText}>{`SKU ${item.sku}`}</Text>
              <Text style={style.itemUnit}>
                {item.qtyOrdered} {item.unitOfMeasure}
              </Text>
            </View>
          </View>
        </Body>
      </ListItem>
    );
  };

  private fireBeginCheckoutEvent = async () => {
    const pushEventObj = getStep4ReviewEventObj({
      props: this.props,
    });
    firebase.analytics().logEvent("feature_flow", pushEventObj);
  };
  private modalClose = () => this.setState({ isModalVisible: false });
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getReviewOrders: (token, callback) => dispatch(StcReviewOrderActions.request(token, callback)),
  confirmOrderRequest: (token, callback) => dispatch(StcReviewOrderActions.requestOrderConfirm(token, callback)),
  updateItem: (item: IOrderHistoryObject) => {
    dispatch(OrderHistoryActions.updateItem(item));
    dispatch(StcReviewOrderActions.updateItem(item));
  },
  showLoader: () => dispatch(StcReviewOrderActions.showLoader()),
  hideLoader: () => dispatch(StcReviewOrderActions.hideLoader()),
  getSTCReviewOrder: token => dispatch(StcActions.request(token)),
  onResumeOrder: (token, callback) => dispatch(StcReviewOrderActions.resumeOrder(token, callback)),
  switchScreen: (screen, params) => dispatch(StcActions.switchScreen(screen, params)),
});
const mapStateToProps = (state: RootState): StateProps => {
  return {
    data: parseOrder(state.stcReviewOrder.data),
    orderItem: state.stcReviewOrder.item,
    cartData: state.stc.cartData,
    selectedTradeAccount: state.stcConnectTrade.selectedSTCTradeAccount,
    userData: state.login.userData,
    selectedAccountId: getSTCSelectedTradeAccount(state),
    selectedBranch: state.branchList.selectedBranch,
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(STCReviewOrders);
