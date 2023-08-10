import firebase from "@react-native-firebase/app";
import moment from "moment";
import { Button } from "native-base";
import R from "ramda";
import React from "react";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import { accessibility, getOrderListAnalyticsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { IChangeStatusTemplate } from "~root/Lib/EmailHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { EmailActions, IEmailRequest } from "~root/Reducers/EmailReducers";
import { getEmail, getFullName, getPhoneNumber } from "~root/Reducers/LoginReducers";
import OrderDetailModel from "~root/Types/OrderDetail";
import ChangeOrderStatusTemplate from "./ChangeOrderStatus";
import style from "./ChangeStatusContainerStyles";

interface OwnProps {}

interface State {
  notes: string;
  customModelData: any;
}

interface StateProps {
  userName: string;
  phone: string;
  email: string;
  branchEmail: string;
  digitalId: any;
  selectedAccountId: string;
  selectedBranch: any;
}

interface DispatchProps {
  sendEmail: (payload: IEmailRequest, params: IChangeStatusTemplate) => void;
}

type Props = OwnProps & NavigationScreenProps<{ order: OrderDetailModel }> & DispatchProps & StateProps;

class ChangeStatusContainer extends React.Component<Props, State> {
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
      item_id: "",
    });
    firebase.analytics().logEvent(event, eventLogObject);
  }

  public render() {
    return (
      <MainContainer>
        <CommonHeader
          noShadow={true}
          title={"STATUS UPDATE"}
          style={style.header}
          rightItem={
            <Button
              transparent={true}
              style={style.close}
              {...accessibility("rightItemBtn")}
              onPress={() => {
                this.props.navigation.pop();
              }}
            >
              <FbIcon name={"ic_close"} style={style.iconStyle} />
            </Button>
          }
        />
        <OfflineNotice />
        <KeyboardAwareScrollView style={style.scrollView}>
          <Text style={style.subHeader} {...accessibility("orderNumLabel")}>
            ORDER NUMBER
          </Text>
          <Text style={style.subtitle} {...accessibility("orderValueLabel")}>
            {"#" + this.props.route.params.order.orderNumber}
          </Text>
          <TextField
            multiline={true}
            onChangeText={text => {
              this.setState({ notes: text });
            }}
            placeholder={"Enter instruction"}
            viewStyle={style.msgText}
            style={style.msgTextInput}
            label={"MESSAGE"}
            {...accessibility("enterInstText")}
          />
        </KeyboardAwareScrollView>
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

  private sendNotes = () => {
    const item = this.props.route.params;
    const orderNumber = item.order.orderNumber;
    const jobNumber = item.order.jobDetails.jobPoNumber;
    const custId = item.order.customerId;
    const instruction = this.state.notes;
    this.props.sendEmail(
      {
        subject: `${custId} Order status update for ${orderNumber}`,
        fromAddress: AppConfig.TRADE_APP_EMAIL_ADDRESS,
        templatePath: ChangeOrderStatusTemplate,
        recipientEmail: AppConfig.IS_PRODUCTION ? this.props.branchEmail + "," + AppConfig.SUPPORT_EMAIL : AppConfig.BRANCH_EMAIL,

        onSuccess: () => {
          this.setState({
            customModelData: {
              visible: true,
              heading: titleSuccess,
              message: "Your request for status update has been submitted",
              onClose: () => {
                this.disableCustomModel();
              },
              button1Text: OKButton,
              onButton1Press: () => {
                this.disableCustomModel();
                this.props.navigation.pop();
                this.logOrderUpdateEvents(item, "Status", "order_update");
              },
            },
          });
        },
      },
      {
        accountName: custId,
        contact: this.props.phone,
        customerMsg: this.state.notes,
        userName: this.props.userName,
        email: this.props.email,
        jobNo: jobNumber,
        orderNo: orderNumber,
      },
    );
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  userName: getFullName(state.login.userData),
  email: getEmail(state.login.userData),
  phone: getPhoneNumber(state.login.userData),
  branchEmail: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "email"], state),
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  selectedAccountId: getSelectedAccountId(state),
  selectedBranch: state.branchList.selectedBranch,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  sendEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusContainer);
