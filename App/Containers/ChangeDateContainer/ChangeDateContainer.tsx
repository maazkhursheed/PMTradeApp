import firebase from "@react-native-firebase/app";
import moment from "moment";
import { Button } from "native-base";
import R from "ramda";
import React from "react";
import { DatePickerAndroid, DatePickerIOS, Keyboard, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import OfflineNotice from "~root/Components/OfflineNotice";
import SmallButton from "~root/Components/SmallButton/SmallButton";
import TextField from "~root/Components/TextField";
import AppConfig from "~root/Config/AppConfig";
import { OKButton, titleInfo, titleSuccess } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, OrderTypes } from "~root/Lib/BranchHelper";
import { curryMomentFormat } from "~root/Lib/CommonHelper";
import { accessibility, getOrderListAnalyticsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { IChangeDateTemplate } from "~root/Lib/EmailHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { EmailActions, IEmailRequest } from "~root/Reducers/EmailReducers";
import { getEmail, getFullName, getPhoneNumber } from "~root/Reducers/LoginReducers";
import OrderDetailModel from "~root/Types/OrderDetail";
import style from "./ChangeDateContainerStyles";
import ChangeOrderDateTemplate from "./ChangeOrderDate";
import ChangeOrderDateCustomerTemplate from "./ChangeOrderDateCustomer";

interface OwnProps {}

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

interface State {
  requestedDate: Date | undefined;
  notes: string;
  showPicker: boolean;
  customModelData: any;
}

export interface ChangeDateParams {
  requestedDate: Date | undefined;
  notes: string;
}

export interface DispatchProps {
  sendEmail: (payload: IEmailRequest, params: IChangeDateTemplate) => void;
  sendCustomerEmail: (payload: IEmailRequest, params: IChangeDateTemplate) => void;
}

type Props = OwnProps & StateProps & NavigationScreenProps<{ order: OrderDetailModel }> & DispatchProps;

class ChangeDateContainer extends React.Component<Props, State> {
  private thisYear = new Date().getFullYear();

  constructor(props: Props) {
    super(props);
    this.state = {
      requestedDate: undefined,
      notes: "",
      showPicker: false,
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

  public logOrderDateChangeEvents(item: any, status: string, event: any) {
    const eventLogObject = getOrderListAnalyticsObj({
      event,
      userId: this.props.digitalId,
      accountId: this.props.selectedAccountId,
      location: getBranchTownRegion(this.props.selectedBranch),
      order_reference: item.order.orderNumber,
      order_address: item.order.original?.deliveryAddress?.address1 + "," + item.order.original?.deliveryAddress?.city,
      order_eta: moment(this.state.requestedDate).format("DD/MM/YYYY"),
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
          style={style.header}
          noShadow={true}
          title={this.props.route.params.title}
          rightItem={
            <Button transparent={true} onPress={this.back} {...accessibility("rightItemCloseBtn")}>
              <FbIcon name={"ic_close"} style={style.iconStyle} />
            </Button>
          }
        />
        <OfflineNotice />
        <KeyboardAwareScrollView style={style.scrollView}>
          <Text style={style.subHeader} {...accessibility("orderNumLabel")}>
            ORDER NUMBER
          </Text>
          <Text style={style.subtitle} {...accessibility("subTitleLabel")}>
            {"#" + this.props.route.params.order.orderNumber}
          </Text>
          <Text style={style.subHeader} {...accessibility("currentDateLabel")}>
            CURRENT DATE
          </Text>
          <View style={style.dateView}>
            <Text style={style.subtitle} {...accessibility("dateFormatLabel")}>
              {curryMomentFormat("ddd MMM D YYYY", this.props.route.params.order.requestDate)}
            </Text>
            <SmallButton style={style.changeBtn} onPress={this.changeButton} btnText={"Change"} />
          </View>
          {!!this.state.requestedDate && (
            <React.Fragment>
              <Text style={style.subHeader} {...accessibility("requestedDateLabel")}>
                REQUESTED DATE
              </Text>
              <Text style={style.subtitle} {...accessibility("requestedDateformatLabel")}>
                {moment(this.state.requestedDate).format("ddd MMM D YYYY")}
              </Text>
            </React.Fragment>
          )}
          <TextField
            multiline={true}
            placeholder={"Enter instruction"}
            onChangeText={text => {
              this.setState({ notes: text });
            }}
            viewStyle={style.msgText}
            style={style.msgTextInput}
            label={"MESSAGE"}
            {...accessibility("enterInstText")}
          />
        </KeyboardAwareScrollView>
        <LargeButton isFooter={true} disabled={!this.state.requestedDate} style={style.sendBtn} onPress={this.sendNotes} btnText={"Send"} />

        {this.state.showPicker && (
          <View style={style.pickerContainer}>
            <Button
              dark={true}
              transparent={true}
              style={style.doneButtonStyle}
              onPress={() => {
                this.setState({
                  showPicker: false,
                });
              }}
              {...accessibility("doneBtn")}
            >
              <Text>Done</Text>
            </Button>
            <DatePickerIOS
              mode="date"
              onDateChange={this.setDate}
              date={this.state.requestedDate || new Date()}
              minimumDate={new Date()}
              maximumDate={new Date(this.thisYear, 11, 31)}
              {...accessibility("changeDatePickeriOS")}
            />
          </View>
        )}
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
    if (this.state.requestedDate) {
      const item = this.props.route.params;
      const orderItems = R.compose(
        R.map(
          R.applySpec({
            sku: R.prop("sku"),
            detail: R.prop("description"),
            quantity: R.prop("qtyOrdered"),
            uom: R.prop("unitOfMeasure"),
          }),
        ),
      )(item.order.original.orderLines);
      const orderNumber = item.order.orderNumber;
      const currentDeliveryDate = moment(item.order.requestDate).format("DD/MM/YYYY");
      const requestedDate = moment(this.state.requestedDate).format("DD/MM/YYYY");
      const jobName = item.order.jobDetails.jobName;
      const custId = item.order.customerId;
      const instruct = R.defaultTo("N/A", R.path(["delivery", "delivery_requirements"], item.order));
      const deliveryAddress = R.defaultTo("N/A", R.path(["delivery", "address"], item.order));
      const branchContact = this.props.branchAddress + " | " + this.props.branchPhone;
      const pickupTypeCheck = this.props.route.params.order.fulfilmentType === OrderTypes.PICKUP ? true : false;

      this.props.sendEmail(
        {
          subject: `${custId} date change for order ${orderNumber} from ${currentDeliveryDate} to ${requestedDate}`,
          fromAddress: AppConfig.TRADE_APP_EMAIL_ADDRESS,
          templatePath: ChangeOrderDateTemplate,

          recipientEmail: AppConfig.IS_PRODUCTION ? this.props.branchEmail + "," + AppConfig.SUPPORT_EMAIL : AppConfig.BRANCH_EMAIL,
          onSuccess: () => {
            this.props.sendCustomerEmail(
              {
                fromAddress: AppConfig.ORDER_EMAIL_ADDRESS,
                onSuccess: () => {
                  this.setState({
                    customModelData: {
                      visible: true,
                      heading: titleSuccess,
                      message: "Your request for date change has been submitted",
                      onClose: () => {
                        this.disableCustomModel();
                      },
                      button1Text: OKButton,
                      onButton1Press: () => {
                        this.disableCustomModel();
                        this.props.navigation.pop();
                        this.logOrderDateChangeEvents(item, "Delivery Date", "order_update");
                      },
                    },
                  });
                },
                subject: pickupTypeCheck ? `Pickup Date changed for Order ${orderNumber}` : `Delivery Date changed for Order ${orderNumber}`,
                templatePath: ChangeOrderDateCustomerTemplate,
                recipientEmail: `${this.props.email}`,
              },
              {
                requestedDate,
                userNotes: this.state.notes.length === 0 && this.state.notes === "" ? "N/A" : this.state.notes,
                address: deliveryAddress,
                userName: this.props.userName,
                previousDate: currentDeliveryDate,
                orderNo: orderNumber,
                jobName,
                order: orderItems,
                instructions: instruct,
                branchDetails: branchContact,
                pickupType: pickupTypeCheck,
              },
            );
          },
        },
        {
          requestedDate,
          userNotes: this.state.notes.length === 0 && this.state.notes === "" ? "N/A" : this.state.notes,
          address: deliveryAddress,
          userName: this.props.userName,
          previousDate: currentDeliveryDate,
          orderNo: orderNumber,
          email: this.props.email,
          phone: this.props.phone,
          pickupType: pickupTypeCheck,
        },
      );
    } else {
      this.setState({
        customModelData: {
          visible: true,
          heading: titleInfo,
          message: "Please select a new delivery date before sending email",
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: OKButton,
          onButton1Press: () => {
            this.disableCustomModel();
          },
        },
      });
    }
  };

  private changeButton = async () => {
    if (Platform.OS === "ios") {
      Keyboard.dismiss();
      this.setState({ showPicker: true });
    } else {
      try {
        const { year, month, day } = await DatePickerAndroid.open({
          date: new Date(),
          minDate: new Date(),
          maxDate: new Date(this.thisYear, 11, 31),
        });
        if (year) {
          this.setState({
            requestedDate: new Date(year, month, day),
          });
        }
      } catch ({ code, message }) {
        if (__DEV__) {
          // tslint:disable-next-line:no-console
          console.warn("Cannot open date picker", message);
        }
      }
    }
  };

  private setDate = newDate => {
    this.setState({ requestedDate: newDate });
  };

  private back = () => {
    this.props.navigation.pop();
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  userName: getFullName(state.login.userData),
  email: getEmail(state.login.userData),
  phone: getPhoneNumber(state.login.userData),
  branchAddress: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "formattedAddress"], state),
  branchPhone: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "phone"], state),
  branchEmail: R.pathOr("", ["branchList", "orderFulfilmentBranch", "address", "email"], state),
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  selectedAccountId: getSelectedAccountId(state),
  selectedBranch: state.branchList.selectedBranch,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  sendEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
  sendCustomerEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDateContainer);
