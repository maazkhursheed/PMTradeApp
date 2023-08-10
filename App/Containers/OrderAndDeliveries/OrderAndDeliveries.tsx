import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { Component } from "react";
import { InteractionManager, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Subject, Subscription } from "rxjs";
import { buffer, debounceTime } from "rxjs/operators";
import BigBlueHeader from "~root/Components/BigBlueHeader/BigBlueHeader";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import OfflineNotice from "~root/Components/OfflineNotice";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import { cancelBtnTxt, IAlertCallbacks, orderListErrBtnTxt, orderListErrMsg, titleErr } from "~root/Lib/AlertsHelper";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { safeRender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { OrderDeliveriesActions } from "~root/Reducers/OrderDeliveriesReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { GroupOrderItem } from "~root/Transforms/OrderItem";
import { EnumOrderType, OrderItemGroupType, OrderSort } from "~root/Types/OrderItem";
import { PermissionTypes } from "~root/Types/Permissions";
import OrderList from "./OrderList";
import OrderListSegment from "./OrderListSegment";
import styles from "./OrderListStyles";
interface DispatchProps {
  requestOrderList: (alertCallbacks: IAlertCallbacks) => void;
  logout: (alertCallbacks: IAlertCallbacks) => void;
  logPixelEvent: (event: string, params: any) => void;
}

interface StateProps {
  loading: boolean;
  data?: OrderItemGroupType;
  orderType: EnumOrderType;
  tradeAccount: any;
  jobAccount: any;
  branchName: string;
}

interface State {
  isFirstTime: string;
  appState: any;
  visible: boolean;
}

type Props = State & StateProps & DispatchProps;

const OrderListScrollView = () => {
  const navigation = useNavigation();
  return (
    <ScrollView bounces={false} scrollEventThrottle={16} accessible={false}>
      <OfflineNotice />
      <OrderListSegment navigation={navigation} />
      <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewOrdersAndDeliveries, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
        <OrderList navigation={navigation} />
      </PermissionComponent>
    </ScrollView>
  );
};

class OrderAndDeliveries extends Component<Props, State> {
  public requestOrdersItem$?: Subject<any>;
  private requestSubjectDispose?: Subscription;
  private _unsubscribeFocusListenerFocus: any;
  private _unsubscribeFocusListenerBlur: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isFirstTime: "true",
      appState: "",
      visible: false,
    };
  }

  public async componentDidMount() {
    this._unsubscribeFocusListenerBlur = this.props.navigation.addListener("blur", () => {
      this.requestOrdersItem$ = undefined;
      this.requestSubjectDispose?.unsubscribe();
    });
    this._unsubscribeFocusListenerFocus = this.props.navigation.addListener("focus", () => {
      const params = {
        title: "Order And Deliveries",
        ptype: "other",
      };
      InteractionManager.runAfterInteractions(() => {
        this.props.logPixelEvent("pageview", params);
        this.requestOrderList();
      });

      this.requestOrdersItem$ = new Subject();
      this.requestSubjectDispose = this.requestOrdersItem$.pipe(buffer(this.requestOrdersItem$.pipe(debounceTime(500)))).subscribe(this.requestOrderList);
    });
  }

  public componentWillUnmount(): void {
    if (this._unsubscribeFocusListenerFocus) {
      this._unsubscribeFocusListenerFocus();
    }
    if (this._unsubscribeFocusListenerBlur) {
      this._unsubscribeFocusListenerBlur();
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (
      nextProps.tradeAccount !== this.props.tradeAccount ||
      nextProps.jobAccount?.JobNumber !== this.props.jobAccount?.JobNumber ||
      nextProps.branchName !== this.props.branchName
    ) {
      InteractionManager.runAfterInteractions(() => this.requestOrdersItem$?.next());
    }
  }

  public requestOrderList = () => {
    this.props.requestOrderList({ onFailure: this.onFailureOrderList });
  };

  public setMessage = (val: EnumOrderType) => {
    switch (val) {
      case EnumOrderType.All:
        return "You currently don’t have any orders of any type";
      case EnumOrderType.Delivery:
        return "You have no Delivery orders";
      case EnumOrderType.Important:
        return "You have no orders scheduled for today or tomorrow";
      case EnumOrderType.Pickup:
        return "You have no Pickup orders";
    }
  };

  public render() {
    return (
      <AnimationProvider>
        <BigBlueHeader title={"My Orders"} />
        <View style={styles.contentContainer} accessible={false}>
          <OrderListScrollView />
          {R.isEmpty(this.props.data) ? (
            <View style={styles.emptyOrderListContainer} accessible={false}>
              <Text style={styles.emptyOrderListTxt} accessible={false}>
                {this.setMessage(this.props.orderType)}
              </Text>
            </View>
          ) : null}
        </View>
        <CustomAlert
          heading={titleErr}
          msg={orderListErrMsg}
          visible={this.state.visible}
          onClose={() => {
            this.disableCustomModel();
          }}
          button1Text={orderListErrBtnTxt}
          button2Text={cancelBtnTxt}
          onButton1Press={() => {
            this.disableCustomModel();
            this.requestOrderList();
          }}
          onButton2Press={() => {
            this.disableCustomModel();
          }}
        />
      </AnimationProvider>
    );
  }

  public disableCustomModel = () => {
    this.setState({ visible: false });
  };

  private onFailureOrderList = () => {
    this.setState({ visible: true });
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  loading: state.orderDeliveries.fetching,
  orderType: state.orderDeliveries.selectedOrderType,
  data:
    state.orderDeliveries.filteredData && R.reject(R.isEmpty, GroupOrderItem(OrderSort[state.orderDeliveries.filter.sort], state.orderDeliveries.filteredData)),
  isFromNotification: state.notification.isFromNotification,
  tradeAccount: state.connectTrade.selectedTradeAccount,
  jobAccount: state.jobAccounts.selectedJobAccount,
  branchName: state.branchList?.selectedBranch?.name,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestOrderList: alertCallbacks => dispatch(OrderDeliveriesActions.request(undefined, alertCallbacks)),
  logout: alertsCallback => dispatch(LoginActions.logoutRequest(undefined, alertsCallback)),
  logPixelEvent: (event, params) => dispatch(PixelActions.pixelRequest(event, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(safeRender(OrderAndDeliveries, navigationalScreens.MyOrdersScreen));
