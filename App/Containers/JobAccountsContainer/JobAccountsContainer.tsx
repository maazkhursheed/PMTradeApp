import { Button } from "native-base";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import ModalView from "~root/Components/ModalView/ModalView";
import AppConfig from "~root/Config/AppConfig";
import { IAlertCallbacks, jobAccountsUnavailable } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { IForgotPasswordTemplate } from "~root/Lib/EmailHelper";
import { showJobAddress, showJobSearchName } from "~root/Lib/JobAccountsHelper";
import { RootState } from "~root/Reducers";
import { EmailActions, IEmailRequest } from "~root/Reducers/EmailReducers";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import { getEmail, getFullName, getPhoneNumber } from "~root/Reducers/LoginReducers";
import { PermissionActions } from "~root/Reducers/PermissionReducers";
import { Colors } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import JobArchiveTemplate from "../JobAccount/JobArchive";
import style from "./JobAccountsStyle";

interface StateProps {
  userName: string;
  email: string;
  phone: string;
  selectedAccount?: any;
  jobAccounts: any[];
  branchEmail: string;
}

interface OwnProps {}

interface State {
  jobAccountIndex: number;
  visible: boolean;
}

interface DispatchProps {
  sendEmail: (payload: IEmailRequest, params: IForgotPasswordTemplate) => void;
  sendCustomerEmail: (payload: IEmailRequest, params: IForgotPasswordTemplate) => void;
  getJobAccounts: (callback: IAlertCallbacks) => void;
  recheckPermissions: (callback: IAlertCallbacks) => void;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

const permissionsForThisPage = [PermissionTypes.AccountOwner];
class JobAccountsContainer extends Component<Props, State> {
  private screen = "Job Accounts";

  constructor(props: Props) {
    super(props);
    this.state = {
      jobAccountIndex: -1,
      visible: false,
    };
  }

  public getDetails = () => {
    this.props.recheckPermissions({ onSuccess: () => this.props.getJobAccounts({ onFailure: () => this.setState({ visible: true }) }) });
  };

  public componentDidMount(): void {
    this.props.getJobAccounts({ onFailure: () => this.setState({ visible: true }) });
  }

  public back = () => {
    this.props.navigation.pop();
  };

  public sendEmail = () => {
    this.setState({ jobAccountIndex: -1 });
    this.props.sendEmail(
      {
        fromAddress: AppConfig.ORDER_EMAIL_ADDRESS,
        templatePath: JobArchiveTemplate,
        subject: this.props.userName + ` Requested to archive the job ` + this.props.jobAccounts[this.state.jobAccountIndex].JobNumber + ` in ACE.`,
        onSuccess: () => null,
        isPersisted: true,
        realmId: undefined,

        recipientEmail: AppConfig.IS_PRODUCTION ? this.props.branchEmail : AppConfig.BRANCH_EMAIL,
      },
      {
        email: this.props.email,
        phone: this.props.phone,
        userName: this.props.userName,
        customerID: "N/A",
        accountId: this.props.selectedAccount.custId,
        jobId: this.props.jobAccounts[this.state.jobAccountIndex].JobNumber,
        firstName: R.compose(R.ifElse(RA.isNotNilOrEmpty, R.head, R.identity), R.split(" "))(this.props.userName || ""),
      },
    );
  };

  public render() {
    return (
      <MainContainer>
        <CommonHeader
          noShadow={true}
          onChange={this.getDetails}
          navigation={this.props.navigation}
          title={"Job Accounts"}
          titleStyle={style.titleStyle}
          leftItem={
            <Button transparent={true} onPress={() => this.props.navigation.pop()} {...accessibility("leftItemBtn")}>
              <FbIcon name={"ic_back"} style={style.back} />
            </Button>
          }
        />
        <FlatList
          style={[style.flexContainer]}
          contentContainerStyle={style.contentContainer}
          data={this.props.jobAccounts}
          renderItem={({ item, index }) => (
            <View style={style.list}>
              <View style={style.flexContainer}>
                <Text {...accessibility("jobSearchName")} style={style.jobAccount}>
                  {showJobSearchName(item)}
                </Text>
                <Text {...accessibility("jobAddress")} style={style.jobAddress}>
                  {showJobAddress(item)}
                </Text>
              </View>
              <Button
                {...accessibility("archiveJobAccountBtn")}
                transparent={true}
                onPress={() => {
                  this.setState({ jobAccountIndex: index });
                }}
              >
                <FbIcon name={"ic_delete"} style={style.delete} />
              </Button>
            </View>
          )}
          {...accessibility("jobAccountsFlatList")}
        />

        <ModalView
          title={"ARCHIVE JOB ACCOUNT"}
          visible={this.state.jobAccountIndex !== -1}
          buttons={[
            {
              text: "CANCEL",
              onPress: () => {
                this.setState({ jobAccountIndex: -1 });
              },
              color: Colors.brandGrey,
            },
            { text: "ARCHIVE", onPress: this.sendEmail, color: Colors.red },
          ]}
          modalContent={
            <Text style={style.modalMsg} {...accessibility("archiveModalMsgLabel")}>
              Once you archive a job account you cannot see orders and deliveries for that job account. Are you sure you want to archive this job account?
            </Text>
          }
          close={() => {
            this.setState({ jobAccountIndex: -1 });
          }}
        />
        <CustomAlert
          heading={undefined}
          msg={jobAccountsUnavailable}
          visible={this.state.visible}
          button1Text="OK"
          onClose={() => this.setState({ visible: false })}
          onButton1Press={() => {
            this.setState({ visible: false });
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  userName: getFullName(state.login?.userData),
  email: getEmail(state.login?.userData),
  phone: getPhoneNumber(state.login?.userData),
  selectedAccount: R.path(["connectTrade", "selectedTradeAccount"], state),
  jobAccounts: state.jobAccounts?.data || [],
  branchEmail: R.pathOr("", ["branchList", "branchDetails", "address", "email"], state),
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  sendEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
  sendCustomerEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
  getJobAccounts: callback => dispatch(JobAccountsActions.request(undefined, callback)),
  recheckPermissions: callback =>
    dispatch(
      PermissionActions.validatePermissionRecheck(
        {
          permissionsToCheck: permissionsForThisPage,
        },
        callback,
      ),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobAccountsContainer);
