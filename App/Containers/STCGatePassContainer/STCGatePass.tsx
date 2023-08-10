import { firebase } from "@react-native-firebase/analytics";
import moment from "moment";
import { Body, Button, Icon, ListItem, Text } from "native-base";
import * as R from "ramda";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Divider } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import STCCommonHeader from "~root/Components/STCCommonHeader/STCCommonHeader";
import { accessibility, getSTCSelectedTradeAccount } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload, extractSignUpFromJWTPayload } from "~root/Lib/LoginHelper";
import { parseOrder } from "~root/Lib/OrderHistoryHelper";
import { getStep5GatePassEventObj, STCEventScreenNames } from "~root/Lib/STCHelper";
import { RootState } from "~root/Reducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";
import OrderDetailModel from "~root/Types/OrderDetail";
import style from "./STCGatePassStyle";

export interface State {
  packNo: string;
  isEventTriggered: boolean;
}

export interface OwnProps {}

export interface StateProps {
  reviewOrders: OrderDetailModel | undefined;
  item: any;
  selectedBranch: any;
  userData: any;
  selectedAccountId: any;
  digitalId: string;
  userType: any;
  selectedTradeAccount: any;
}

interface DispatchProps {
  switchSTCScreen: (screenName: STCEventScreenNames, meta: any) => void;
  getReviewOrders: (orderNumber: string) => void;
}

type Props = OwnProps & StateProps & NavigationScreenProps & DispatchProps;

class STCGatePass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEventTriggered: false,
      packNo: "",
    };
  }

  public getItem = () => this.props.route.params?.item ?? this.props.item;

  public componentDidMount() {
    this.props.getReviewOrders(this.getItem().token);
  }

  public checkEventOrder = () => {
    const isFrom = this.props.route.params?.isFrom ?? "";
    if (isFrom === STCEventScreenNames.ReviewOrders) {
      const data = parseOrder(this.props.reviewOrders);
      const order = R.path(["orders", "0"], data);
      const orderLines = R.propOr([], "orderLines", order);
      if (orderLines.length > 0 && order?.packNumber) {
        this.setState({
          isEventTriggered: true,
        });
        this.pushSTCDataLayer(orderLines, order);
      }
    }
  };

  public pushSTCDataLayer = (orderlines, order) => {
    const STCEventsPurchase = getStep5GatePassEventObj({
      props: this.props,
      orderLines: orderlines,
      order,
    });
    firebase.analytics().logEvent("purchase", STCEventsPurchase);
  };

  public render() {
    const data = parseOrder(this.props.reviewOrders);
    const order = R.path(["orders", "0"], data);
    if (!this.state.isEventTriggered) {
      this.checkEventOrder();
    }
    return (
      <MainContainer>
        {!!this.props.route.params?.header && (
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
        )}
        <ScrollView>
          {!!data && (
            <View>
              <View style={style.orderCompleteInfo}>
                <Icon name={"checkmark-circle"} style={style.iconStyle} />
                <View style={style.orderCompleteContainer}>
                  <Text style={style.orderCompleteText}>Order Complete</Text>
                  <Text style={style.headerText}>show this receipt if asked on your way out of the store</Text>
                </View>
              </View>
              <View style={style.container}>
                <Text style={style.subHeading}>Account: {R.propOr("", "accountName", data)} </Text>
                <Text style={style.subHeading}>PO: {R.propOr("", "customerPOReference", order)} </Text>
                <Text style={[style.heading]}>Pack {R.propOr("", "packNumber", order)}</Text>
                <Text style={style.timeText}>Created: {moment(this.getItem().time).format("LT")}</Text>
              </View>
              <Divider />
              <FlatList data={R.propOr([], "orderLines", order)} style={style.orderList} renderItem={this.renderOrder} />
            </View>
          )}
        </ScrollView>
        <LargeButton
          isFooter={true}
          onPress={() =>
            this.props.navigation.navigate("STCConfirmOrderPurchaseProof", {
              header: this.props.route.params?.header,
              item: this.getItem(),
            })
          }
          btnText={"Show Receipt"}
        />
      </MainContainer>
    );
  }

  public back = () => {
    this.props.navigation.pop();
  };

  public renderOrder = ({ item }) => {
    return (
      <ListItem noIndent={true}>
        <Body>
          <View>
            <Text style={style.itemDescription}>{item.description}</Text>
            <View style={style.sku}>
              <Text note={true} style={style.itemText}>
                {`SKU ${item.sku}`}
              </Text>
              <Text style={style.itemUnit}>
                {item.qtyOrdered} {item.unitOfMeasure}
              </Text>
            </View>
          </View>
        </Body>
      </ListItem>
    );
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  switchSTCScreen: (screenToSwitch: STCEventScreenNames, meta: any) => dispatch(StcActions.switchScreen(screenToSwitch, meta)),
  getReviewOrders: orderNumber => {
    dispatch(StcReviewOrderActions.request(orderNumber));
  },
});
const mapStateToProps = (state: RootState): StateProps => {
  return {
    reviewOrders: state.stcReviewOrder.data,
    item: state.stcReviewOrder.item,
    selectedBranch: state.branchList.selectedBranch,
    userData: state.login.userData,
    selectedAccountId: getSTCSelectedTradeAccount(state),
    selectedTradeAccount: state.stcConnectTrade.selectedSTCTradeAccount,
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
    userType: extractSignUpFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) ? "New" : "Returning",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(STCGatePass);
