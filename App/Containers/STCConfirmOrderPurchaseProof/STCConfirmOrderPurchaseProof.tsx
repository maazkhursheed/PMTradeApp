// Styles
import moment from "moment";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
// tslint:disable-next-line:no-duplicate-imports
import QRCode from "react-native-qrcode-svg";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import Divider from "~root/Components/Divider";
import MainContainer from "~root/Components/MainContainer";
import ProgressBar from "~root/Components/ProgressBar";
import STCCommonHeader from "~root/Components/STCCommonHeader/STCCommonHeader";
import STCLargeButton from "~root/Components/STCLargeButton";
import { accessibility } from "~root/Lib/DataHelper";
import { parseOrder } from "~root/Lib/OrderHistoryHelper";
import { generateBase64Encoded } from "~root/Lib/QrCodeHelper";
import { STCEventScreenNames } from "~root/Lib/STCHelper";
import { StcActions } from "~root/Reducers/StcReducers";
import { RootState } from "../../Reducers";
import Metrics from "../../Themes/Metrics";
import styles from "./STCConfirmOrderPurchaseProofStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  switchScreen: (screen: STCEventScreenNames, params: {}) => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  base64: any;
  packNumber: string;
  reviewOrder: any;
}

/**
 * The local state
 */
export interface State {}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

const getParsedOrder = (reviewOrder: any): any => {
  const parsedOrder = parseOrder(reviewOrder);
  return R.path(["orders", "0"], parsedOrder);
};

const getPackNumber = (reviewOrder: any): string => {
  return R.propOr("", "packNumber", getParsedOrder(reviewOrder));
};

const getAccountId = (data: any): string => {
  return R.pathOr("", ["tradeAccount", "accountId"], data);
};

class STCConfirmOrderPurchaseProof extends React.Component<Props, State> {
  public state = {};

  public onClose = () => {
    this.props.navigation.navigate("OrderDeliveries");
  };

  public popToBack = () => {
    this.props.navigation.pop();
  };

  public getItem = () => this.props.route.params?.item;

  public getOrderQRCode = (): any => {
    const order = getParsedOrder(this.props.reviewOrder);
    // @ts-ignore
    return generateBase64Encoded({
      packLiteral: "PackQRCode",
      branchId: R.propOr("", "branchId", this.props.reviewOrder),
      accountId: R.pathOr("", ["tradeAccount", "accountId"], this.props.reviewOrder),
      poNumber: this.getItem().poNumber,
      orderId: this.getItem().orderId,
    });
  };

  public render() {
    return (
      <MainContainer>
        {!!this.props.route.params?.header && (
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
                <Text style={styles.closeBtn}>Close</Text>
              </Button>
            }
          />
        )}
        <ProgressBar step={4} />
        <ScrollView>
          <View style={styles.container}>
            <QRCode value={this.props.base64.length > 0 ? this.props.base64 : this.getOrderQRCode()} ecl={"H"} size={Metrics.screenWidth - 40} />
          </View>
          <Text style={styles.heading}>Pack {this.props.packNumber}</Text>
          <Text style={styles.timeText}>Created: {moment(this.getItem().time).format("LT")}</Text>
          <Text style={styles.bottomText}>{"Show this screen to a staff member"}</Text>
        </ScrollView>
        <Divider />
        <SafeAreaView style={styles.safeAreaView}>
          <STCLargeButton style={styles.footerButton} onPress={this.popToBack} btnText={"Back to order"} />
        </SafeAreaView>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  switchScreen: (screen, params) => dispatch(StcActions.switchScreen(screen, params)),
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    base64: state.stcReviewOrder.item
      ? // @ts-ignore
        generateBase64Encoded({
          packLiteral: "PackQRCode",
          branchId: state.stcReviewOrder.item.branchId,
          accountId: getAccountId(state.stcReviewOrder.data),
          poNumber: state.stcReviewOrder.item.poNumber,
          orderId: state.stcReviewOrder.item.orderId,
        })
      : "",
    reviewOrder: state.stcReviewOrder.data,
    packNumber: getPackNumber(state.stcReviewOrder.data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(STCConfirmOrderPurchaseProof);
