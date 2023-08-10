import firebase from "@react-native-firebase/app";
import moment from "moment";
import { Button, Col } from "native-base";
import R from "ramda";
import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import OfflineNotice from "~root/Components/OfflineNotice";
import TextField from "~root/Components/TextField";
import AppConfig from "~root/Config/AppConfig";
import { OKButton, titleSuccess } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { renameKeys } from "~root/Lib/CommonHelper";
import { accessibility, getOrderListAnalyticsObj, getSelectedAccountId, getTruncatedListItemsByProp } from "~root/Lib/DataHelper";
import { IChangeItemTemplate } from "~root/Lib/EmailHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { EmailActions, IEmailRequest } from "~root/Reducers/EmailReducers";
import { getEmail, getFullName, getPhoneNumber } from "~root/Reducers/LoginReducers";
import OrderDetailModel from "~root/Types/OrderDetail";
import ChangeOrderItemTemplate from "./ChangeOrderItem";
import style from "./ChangeOrderItemContainerStyles";
import ChangeOrderItemCustomerTemplate from "./ChangeOrderItemCustomer";

interface OwnProps {}

interface State {
  notes: string;
  customModelData: any;
}

interface StateProps {
  userName: string;
  email: string;
  phone: string;
  branchEmail: string;
  branchAddress: string;
  branchPhone: string;
  digitalId: any;
  selectedAccountId: string;
  selectedBranch: any;
}

interface DispatchProps {
  sendEmail: (payload: IEmailRequest, params: IChangeItemTemplate) => void;
  sendCustomerEmail: (payload: IEmailRequest, params: IChangeItemTemplate) => void;
}

type Props = OwnProps & DispatchProps & StateProps & NavigationScreenProps<{ order: OrderDetailModel }>;

class ChangeOrderItemContainer extends React.Component<Props, State> {
  private mapOrderLinesToOrderItem = R.map(
    R.compose(
      R.over(R.lensProp("quantity"), R.compose(R.invoker(1, "toFixed")(2), Number)),
      renameKeys({
        description: "detail",
        unitOfMeasure: "uom",
        qtyOrdered: "quantity",
      }),
      R.pick(["description", "unitOfMeasure", "qtyOrdered", "sku"]),
    ),
  );

  constructor(props: Props) {
    super(props);
    this.state = {
      notes: "",
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

  public logOrderUpdateEvents(item: any, status: string, event: any) {
    const eventLogObject = getOrderListAnalyticsObj({
      event,
      userId: this.props.digitalId,
      accountId: this.props.selectedAccountId,
      location: getBranchTownRegion(this.props.selectedBranch),
      order_reference: item.order.orderNumber,
      order_address: item.order.original?.deliveryAddress?.address1 + "," + item.order.original?.deliveryAddress?.city,
      order_eta: moment(item.order.requestDate).format("DD/MM/YYYY"),
      order_fulfilment: item.order.fulfilmentType,
      order_change: status,
      item_id: getTruncatedListItemsByProp("sku", this.mapOrderLinesToOrderItem(item.order.original.orderLines)),
    });
    firebase.analytics().logEvent(event, eventLogObject);
  }

  public renderItems = ({ item }) => {
    return (
      <View style={style.listItem}>
        <View style={style.orderDetailsFlex}>
          <Col style={style.itemDetailsContainer}>
            <Text style={style.itemDetails}>{item.detail}</Text>
          </Col>
          <Col style={style.quantityContainer}>
            <Text style={style.itemQuantity}>
              {item.quantity} {item.uom}
            </Text>
          </Col>
        </View>
        <Text style={style.skuNumber}>SKU {item.sku}</Text>
      </View>
    );
  };

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

  public sendNotes = () => {
    const item = this.props.route.params;
    const orderNumber = item.order.orderNumber;
    const jobNumber = item.order.jobDetails.jobPoNumber; // jobAccountId selected before placing order
    const custId = item.order.customerId;
    const instruct = R.defaultTo("N/A", R.path(["delivery", "delivery_requirements"], item.order));
    const orders = this.mapOrderLinesToOrderItem(item.order.original.orderLines);
    const branchContact = this.props.branchAddress + " | " + this.props.branchPhone;
    const deliveryAddress = R.defaultTo("N/A", R.path(["delivery", "address"], item.order));
    this.props.sendEmail(
      {
        subject: `${custId} Item Change for order ${orderNumber}`,
        fromAddress: AppConfig.TRADE_APP_EMAIL_ADDRESS,
        templatePath: ChangeOrderItemTemplate,

        recipientEmail: AppConfig.IS_PRODUCTION ? this.props.branchEmail + "," + AppConfig.SUPPORT_EMAIL : AppConfig.BRANCH_EMAIL,
        onSuccess: () => {
          this.props.sendCustomerEmail(
            {
              templatePath: ChangeOrderItemCustomerTemplate,
              subject: `Some Item/s changed in the Order ${orderNumber}`,
              onSuccess: () => {
                this.setState({
                  customModelData: {
                    visible: true,
                    heading: titleSuccess,
                    message: "Your request for changes in order items are submitted",
                    onClose: () => {
                      this.disableCustomModel();
                    },
                    button1Text: OKButton,
                    onButton1Press: () => {
                      this.disableCustomModel();
                      this.props.navigation.pop();
                      this.logOrderUpdateEvents(item, "Order Update", "order_update");
                    },
                  },
                });
              },
              fromAddress: AppConfig.ORDER_EMAIL_ADDRESS,
              recipientEmail: `${this.props.email}`,
            },
            {
              customerMsg: this.state.notes,
              orderNo: orderNumber,
              originalOrder: orders,
              deliveryAddress,
              userName: this.props.userName,
              jobName: item.order.jobDetails.jobName,
              branchDetails: branchContact,
              instruction: instruct,
            },
          );
        },
      },
      {
        customerMsg: this.state.notes,
        instruction: instruct,
        accountName: custId,
        invoiceTo: custId,
        jobNo: jobNumber,
        orderNo: orderNumber,
        originalOrder: orders,
        userName: this.props.userName,
        phone: this.props.phone,
        email: this.props.email,
      },
    );
  };

  public render() {
    return (
      <MainContainer>
        <CommonHeader
          style={style.header}
          noShadow={true}
          title={"CHANGE ORDER ITEMS"}
          rightItem={
            <Button
              onPress={() => {
                this.props.navigation.pop();
              }}
              transparent={true}
              {...accessibility("rightItemBtn")}
            >
              <FbIcon name={"ic_close"} style={style.iconStyle} />
            </Button>
          }
        />
        <OfflineNotice />
        <KeyboardAwareFlatList
          ListHeaderComponent={() => (
            <View>
              <Text style={style.subHeader} {...accessibility("orderNumLabel")}>
                ORDER NUMBER
              </Text>
              <Text style={style.subtitle} {...accessibility("orderValueLabel")}>
                {"#" + this.props.route.params.order.orderNumber}
              </Text>
            </View>
          )}
          ListFooterComponent={
            <TextField
              multiline={true}
              placeholder={"Enter Message"}
              onChangeText={text => {
                this.setState({ notes: text });
              }}
              viewStyle={style.msgText}
              style={style.msgTextInput}
              label={"NOTES:"}
              {...accessibility("enterMsgText")}
            />
          }
          data={this.mapOrderLinesToOrderItem(this.props.route.params.order.original.orderLines)}
          renderItem={this.renderItems}
          style={style.scrollView}
          {...accessibility("orderFlatList")}
        />
        <LargeButton isFooter={true} disabled={this.state.notes.length === 0} style={style.sendBtn} onPress={this.sendNotes} btnText={"Send"} />
        <CustomAlert
          heading={this.state.customModelData?.heading}
          msg={this.state.customModelData?.message}
          visible={this.state.customModelData?.visible}
          onClose={this.state.customModelData?.onClose}
          button1Text={this.state.customModelData?.button1Text}
          onButton1Press={this.state.customModelData?.onButton1Press}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  userName: getFullName(state.login.userData),
  email: getEmail(state.login.userData),
  phone: getPhoneNumber(state.login.userData),
  branchEmail: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "email"], state),
  branchPhone: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "phone"], state),
  branchAddress: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "formattedAddress"], state),
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  selectedAccountId: getSelectedAccountId(state),
  selectedBranch: state.branchList.selectedBranch,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  sendEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
  sendCustomerEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeOrderItemContainer);
