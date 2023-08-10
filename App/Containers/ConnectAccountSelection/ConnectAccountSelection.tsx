import firebase from "@react-native-firebase/app";
import { Button } from "native-base";
import * as R from "ramda";
import React, { Component } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import ConnectedAccountPopup from "~root/Components/ConnectedAccountPopup";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import DropDownPicker from "~root/Components/DropDownPicker/DropDownPicker";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import ModalView from "~root/Components/ModalView/ModalView";
import OopsModalView, { OopsType } from "~root/Components/OopsModalView/OopsModalView";
import SmallButton from "~root/Components/SmallButton";
import TextField from "~root/Components/TextField";
import AppConfig from "~root/Config/AppConfig";
import {
  connectTradeAcc,
  connectTradeAccError,
  enterTradeAccAndBranchMsg,
  IAlertCallbacks,
  logoutError,
  OKButton,
  titleErr,
  titleGenericError,
} from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, getRegistrationFlowAnalyticsObj } from "~root/Lib/DataHelper";
import { tradeAccountConnectPageLoad, tradeAccountConnectSubmit } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { getEmail, LoginActions } from "~root/Reducers/LoginReducers";
import { Colors } from "~root/Themes";
import { ConnectOwnerTradeParams } from "~root/Types/BranchDetail";
import style from "./ConnectSelectionStyle";
interface StateProps {
  branchList: [];
  responseConnect: any;
  email: string;
}

interface DispatchProps {
  requestConnectOwnerAccount: (params: ConnectOwnerTradeParams, alertCallbacks: IAlertCallbacks) => void;
  requestBranchList: (alertCallbacks: IAlertCallbacks) => void;
  requestMultipleAccount: (params: ConnectOwnerTradeParams, alertCallback: IAlertCallbacks) => void;
  logout: (alertCallbacks: IAlertCallbacks) => void;
}

interface OwnProps {}

interface State {
  selected?: string;
  showPicker: boolean;
  accountID: string;
  branchName: string;
  selectedValue?: any;
  branchID: string;
  inviteCode: string;
  showAlert: boolean;
  showError: boolean;
  showValidationError: boolean;
  showMultiAccounts: boolean;
  customModelData: any;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

class ConnectAccountSelection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: "1",
      showPicker: false,
      accountID: "",
      branchName: "",
      branchID: "",
      inviteCode: "",
      showAlert: false,
      showError: false,
      showValidationError: false,
      showMultiAccounts: false,
      customModelData: {
        heading: "",
        message: "",
        visible: false,
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    };
  }

  public componentDidMount(): void {
    this.props.requestBranchList({ onFailure: this.onFailureConnectAccount });
    this.sendRegistrationAnalytics("user_registration", 8, tradeAccountConnectPageLoad, "", "", "");
  }

  public sendRegistrationAnalytics = (event: any, step: number, step_label: string, userId: string, accountId: string, location: string) => {
    const params = {
      event,
      step,
      step_label,
      userId,
      accountId,
      location,
    };
    const eventLogObject = getRegistrationFlowAnalyticsObj(params);
    firebase.analytics().logEvent(event, eventLogObject);
  };

  public close = () => {
    this.setState({ showAlert: true });
  };

  public signOut = () => {
    this.setState({ showAlert: false });
    this.props.logout({ onFailure: this.onFailureLogout });
  };

  public accountOwner = () => {
    this.setState({ selected: "1" }, () => this.connect("1"));
  };

  public invitation = () => {
    this.setState({ selected: "2" }, () => this.connect("2"));
  };

  public setAccountID = (value: string) => {
    this.setState({ accountID: value });
  };

  public contactUs = () => {
    Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`);
  };

  public connect = (selectedStr: string) => {
    let params;
    if (selectedStr === "1") {
      if (isNilOrEmpty(this.state.accountID) || isNilOrEmpty(this.state.branchID)) {
        this.setState({ showValidationError: true });
        return;
      } else {
        params = {
          email: this.props.email,
          accountId: this.state.accountID,
          branchId: this.state.branchID,
          isAccountOwner: true,
        };
        this.props.requestMultipleAccount(params, {
          onSuccess: this.onSuccessShowMultiTradeAccount,
          onFailure: this.onFailureShowTradeAccount,
        });
        this.sendRegistrationAnalytics(
          "user_registration",
          9,
          tradeAccountConnectSubmit,
          "",
          this.state.accountID,
          this.state.branchID ? getBranchTownRegion(this.state.branchID) : "",
        );
      }
    } else {
      this.onLinkTradeAccount();
      this.sendRegistrationAnalytics("user_registration", 9, tradeAccountConnectSubmit, "", "", "");
    }
  };

  public onConnectItemSelected = (value: any) => {
    if (value) {
      this.setState({ selectedValue: value, branchName: value.name, branchID: value.branchCode });
    }
  };

  private disableCustomModel = () => {
    this.setState({
      customModelData: {
        heading: "",
        message: "",
        visible: false,
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    });
  };

  public showLocalAlertMessage = (direction: string) => {
    if (direction === "onSuccessConnectTradeAccount") {
      this.setState({
        customModelData: {
          visible: true,
          heading: undefined,
          message: connectTradeAcc,
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: OKButton,
          onButton1Press: () => {
            this.props.navigation.navigate("Dashboard");
          },
        },
      });
    } else if (direction === "onFailureLogout") {
      this.setState({
        customModelData: {
          visible: true,
          heading: titleErr,
          message: logoutError,
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: OKButton,
          onButton1Press: () => {
            this.disableCustomModel();
          },
        },
      });
    } else if (direction === "onFailureConnectAccount") {
      this.setState({
        customModelData: {
          visible: true,
          heading: titleErr,
          message: connectTradeAccError,
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

  public render() {
    const isNotSignUp = !!this.props.route.params?.isNotSignUp;

    return (
      <MainContainer style={style.rootContainer}>
        {!isNotSignUp && (
          <>
            <CommonHeader
              noShadow={true}
              title={"Connect Trade Account"}
              titleStyle={style.titleStyle}
              style={style.header}
              rightItem={
                <Button {...accessibility("rightItemCloseBtn")} transparent={true} onPress={this.close}>
                  <FbIcon name={"ic_close"} style={style.close} />
                </Button>
              }
            />
            <View style={style.stepsTextContainer}>
              <Text style={style.stepTextStyle}> Step 4 of 4</Text>
            </View>
          </>
        )}
        <ScrollView style={style.container}>
          <View>
            {!isNotSignUp && <Text style={[style.message, style.ownerTxtStyle]}>If you're an Account Owner</Text>}
            <TextField
              viewStyle={style.IDTextField}
              textViewStyle={style.IDTextViewStyle}
              placeholder={"Enter your 5 to 7 digit account code"}
              value={this.state.accountID}
              onChangeText={value => this.setAccountID(value)}
            />

            <DropDownPicker
              textProps={{
                placeholder: "Select your branch",
                value: this.state.branchName.length < 0 ? "SELECT BRANCH" : this.state.branchName,
                textViewStyle: style.branchDropdownViewStyle,
              }}
              containerProps={{
                style: style.branchDropdownContainerStyle,
              }}
              dropIconStyle={style.dropdownIconStyle}
              headerTitle={"BRANCH"}
              onValueChange={this.onConnectItemSelected}
              selectedValue={this.state.selectedValue}
              itemLabel={"name"}
              items={this.props.branchList}
              zeroIndexObject={{
                name: "Select Branch",
              }}
            />
            <View style={style.invitationButtonContainer}>
              <TouchableOpacity onPress={this.invitation} style={style.invitationButton}>
                <Text style={style.invitationTextStyle}>I have an invitation</Text>
              </TouchableOpacity>
            </View>
            <View style={style.messageContainer}>
              <Text style={[style.message, style.helpTextStyle]}>Need help?</Text>
              <SmallButton btnText={"Contact us"} onPress={this.contactUs} style={style.contactUsButton} />
            </View>
          </View>
        </ScrollView>
        <LargeButton
          onPress={this.accountOwner}
          btnText={"Complete registration"}
          isFooter={true}
          textStyle={style.completeRegistrationStyle}
          style={style.completeRegistrationButton}
        />
        <ModalView
          title={"You're about to exit the sign up process"}
          visible={this.state.showAlert}
          buttons={[
            {
              text: "Cancel",
              onPress: () => {
                this.setState({ showAlert: false });
              },
              color: Colors.brandGrey,
              styleTextTransform: "none",
            },
            {
              text: "Sign out",
              onPress: this.signOut,
              color: Colors.red,
              styleTextTransform: "none",
            },
          ]}
          modalContent={
            <Text style={style.modalMsg} {...accessibility("modalMsgLabel")}>
              You've created sign in details, however if you're an {"\n \n"}
              {"\u25CF"}
              <Text style={style.textStyle}> Account Owner</Text>, you will need to complete this current stage{"\n \n"}
              {"\u25CF"}
              <Text style={style.textStyle}> Invitee</Text>, just tap ‘CONNECT’ to enter the app
            </Text>
          }
          close={() => {
            this.setState({ showAlert: false });
          }}
        />
        <ConnectedAccountPopup
          title={"Your connected Trade Accounts"}
          onGotAnIssue={() => {
            this.setState({ showError: true, showMultiAccounts: false });
          }}
          onConnect={this.onLinkTradeAccount}
          close={() => this.setState({ showMultiAccounts: false })}
          visible={this.state.showMultiAccounts}
        />
        <OopsModalView
          title={this.state.selected === "1" ? "Sorry, we couldn’t verify the account details you entered…" : "Sorry, we couldn’t find an invitation for you…"}
          close={() => {
            this.setState({ showError: false });
          }}
          visible={this.state.showError}
          errorType={this.state.selected === "1" ? OopsType.ERROR_ACCOUNT_OWNER : OopsType.ERROR_TEAM_MEMBER}
          invitation={() => {
            this.setState({ showError: false });
            this.invitation();
          }}
        />
        <ModalView
          modalContent={<Text style={style.enterTradeAccountText}>{enterTradeAccAndBranchMsg}</Text>}
          title={titleGenericError}
          buttons={[
            {
              color: Colors.red,
              text: "OK",
              onPress: () => {
                this.setState({ showValidationError: false });
              },
            },
          ]}
          close={() => null}
          visible={this.state.showValidationError}
        />
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

  private onLinkTradeAccount = () => {
    let params;

    if (this.state.selected === "1") {
      params = {
        email: this.props.email,
        accountId: this.state.accountID,
        branchId: this.state.branchID,
        isAccountOwner: true,
      };
    } else {
      params = {
        email: this.props.email,
        isAccountOwner: false,
      };
    }

    this.setState({ showMultiAccounts: false });

    this.props.requestConnectOwnerAccount(params, {
      onSuccess: this.onSuccessConnectTradeAccount,
      onFailure: this.onFailureShowTradeAccount,
    });
  };

  private onFailureConnectAccount = () => {
    this.showLocalAlertMessage("onFailureConnectAccount");
  };

  private onSuccessConnectTradeAccount = () => {
    const isNotSignUp = !!this.props.route.params?.isNotSignUp;

    if (!isNotSignUp) {
      return;
    }
    this.showLocalAlertMessage("onSuccessConnectTradeAccount");
  };

  private onSuccessShowMultiTradeAccount = () => {
    this.setState({ showMultiAccounts: true, showError: false });
  };

  private onFailureShowTradeAccount = (error: any) => {
    this.setState({ showError: true, showMultiAccounts: false });
  };

  private onFailureLogout = () => {
    this.showLocalAlertMessage("onFailureLogout");
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  branchList: R.pathOr([], ["branchList", "data"], state),
  responseConnect: state.connectTrade.dataConnectTrade,
  email: getEmail(state.login.userData),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestConnectOwnerAccount: (item: ConnectOwnerTradeParams, alertCallbacks: any) => dispatch(ConnectTradeActions.onLinkTradeAccount(item, alertCallbacks)),
  requestBranchList: (alertCallbacks: any) => dispatch(BranchDetailsActions.requestBranchList(alertCallbacks)),
  requestMultipleAccount: (params: ConnectOwnerTradeParams, alertCallback: any) =>
    dispatch(ConnectTradeActions.requestLinkableConnectAccount(params, alertCallback)),
  logout: alertCallbacks => dispatch(LoginActions.logoutRequest(undefined, alertCallbacks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectAccountSelection);
