import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ImmutableArray } from "seamless-immutable";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import Divider from "~root/Components/Divider";
import FbIcon from "~root/Components/FbIcon";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import NativeWrapper from "~root/Components/NativeWrapper";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import SwiperComponent from "~root/Components/SwiperComponent";
import ArchiveButton from "~root/Components/SwiperComponent/ArchiveButton";
import AppConfig from "~root/Config/AppConfig";
import { swipeLeftToArchive } from "~root/Lib/AlertsHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { IForgotPasswordTemplate } from "~root/Lib/EmailHelper";
import { RootState } from "~root/Reducers";
import { EmailActions, IEmailRequest } from "~root/Reducers/EmailReducers";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import { getEmail, getFullName, getPhoneNumber } from "~root/Reducers/LoginReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { JobItem } from "~root/Types/JobAccounts";
import { PermissionTypes } from "~root/Types/Permissions";
import style from "./JobAccountStyle";
import JobArchiveTemplate from "./JobArchive";
interface DispatchProps {
  sendEmail: (payload: IEmailRequest, params: IForgotPasswordTemplate) => void;
  selectJobAccount: (item: JobItem | undefined) => void;
  clearCart: () => void;
}

interface StateProps {
  jobAccounts: never[] | ImmutableArray<JobItem>;
  selectedTradeAccount: any;
  userName: string;
  email: string;
  phone: string;
  branchEmail: string;
  isLoading?: boolean;
  cartCount: number;
  cartLoading: boolean;
}

interface State {
  customModelData: any;
}

interface OwnProps {
  onDismiss: () => void;
}

type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProps;

class JobAccount extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        button2Text: "",
        onButton1Press: undefined,
        onButton2Press: undefined,
      },
    };
  }

  public sendEmail = (jobAccount, onSuccess: () => void) => {
    const { email, phone, userName, selectedTradeAccount, branchEmail, sendEmail } = this.props;

    sendEmail(
      {
        fromAddress: AppConfig.ORDER_EMAIL_ADDRESS,
        templatePath: JobArchiveTemplate,
        subject: userName + ` Requested to archive the job ` + jobAccount.JobNumber + ` in ACE.`,
        onSuccess: () => onSuccess(),
        isPersisted: true,
        realmId: undefined,

        recipientEmail: AppConfig.IS_PRODUCTION ? branchEmail : AppConfig.BRANCH_EMAIL,
      },
      {
        email,
        phone,
        userName,
        customerID: "N/A",
        accountId: selectedTradeAccount?.custId,
        jobId: jobAccount.JobNumber,
        firstName: R.compose(R.ifElse(RA.isNotNilOrEmpty, R.head, R.identity), R.split(" "))(userName || ""),
      },
    );
  };

  public dismissView = () => {
    if (this.props?.route?.params?.onDismiss) {
      this.props.route.params?.onDismiss();
    } else {
      this.props.onDismiss();
    }
  };

  private disableCustomModel = () => {
    this.setState({
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        button2Text: "",
        onButton1Press: undefined,
        onButton2Press: undefined,
      },
    });
  };

  public renderItems = ({ item }) => {
    let swiperRef: SwiperComponent;
    const confirmJobArchive = (value: any) => {
      this.setState({
        customModelData: {
          visible: true,
          heading: "ARCHIVE JOB ACCOUNT",
          message:
            "Once you archive a job account you cannot see orders and deliveries for that job account. Are you sure you want to archive this job account?",
          onClose: () => {
            this.disableCustomModel();
          },
          button1Text: "Archive",
          button2Text: "Cancel",
          onButton1Press: () => {
            this.disableCustomModel();
            this.sendEmail(value, () => swiperRef?.swipe());
          },
          onButton2Press: () => {
            this.disableCustomModel();
            swiperRef?.swipe();
            setTimeout(() => {
              swiperRef?.swipe();
            }, 150);
          },
        },
      });
    };

    const onPress = () => {
      const success = () => {
        this.props.selectJobAccount(item);
        setTimeout(this.props.clearCart);
        this.dismissView();
      };
      if (this.props.cartCount > 0) {
        this.setState({
          customModelData: {
            visible: true,
            heading: "Change Account",
            message:
              "If you change your account while there are items in your cart, these will be removed and you will have to start a new cart. Are you sure you want to change account?",
            onClose: () => {
              this.disableCustomModel();
            },
            button1Text: "OK",
            button2Text: "Cancel",
            onButton1Press: () => {
              this.disableCustomModel();
              success();
            },
            onButton2Press: () => {
              this.disableCustomModel();
            },
          },
        });
      } else {
        success();
      }
    };

    return (
      <PermissionComponent disallowDisable={true} permissionTypes={[PermissionTypes.AccountOwner, PermissionTypes.UserAdmin]}>
        {({ hasPermission }) =>
          hasPermission ? (
            <SwiperComponent
              ref={ref => (swiperRef = ref)}
              onFullSwipe={() => {
                confirmJobArchive(item);
              }}
              backView={
                <ArchiveButton
                  onPress={() => {
                    confirmJobArchive(item);
                  }}
                />
              }
            >
              <NativeWrapper {...accessibility("JobAccountItem")} onPress={onPress}>
                <View style={style.item}>
                  <Text style={style.itemText} {...accessibility("JobAccountName")} ref={occludeSensitiveView}>
                    {item.SearchName}
                  </Text>
                </View>
                <Divider />
              </NativeWrapper>
            </SwiperComponent>
          ) : (
            <NativeWrapper {...accessibility("JobAccountItem")} onPress={onPress}>
              <View style={style.item}>
                <Text style={style.itemText} {...accessibility("JobAccountName")} ref={occludeSensitiveView}>
                  {item.SearchName}
                </Text>
              </View>
              <Divider />
            </NativeWrapper>
          )
        }
      </PermissionComponent>
    );
  };

  public render() {
    const { selectedTradeAccount } = this.props;
    return (
      <MainContainer>
        <View style={style.item}>
          <Text ref={occludeSensitiveView} style={style.itemText} {...accessibility("SelectedJobAccount")} onPress={this.dismissView}>
            {selectedTradeAccount?.custId + " " + selectedTradeAccount?.name}
          </Text>
          <FbIcon name={"ic_tick"} style={style.tickStyle} />
        </View>
        <View style={style.jobAccountContainer}>
          <Text style={style.jobAccount}>Job accounts</Text>
        </View>
        <LoadingView isLoading={this.props.cartLoading} style={{ flex: 1 }}>
          <FlatList
            style={style.flatListStyle}
            data={this.props.jobAccounts}
            renderItem={this.renderItems}
            contentContainerStyle={style.listStyle}
            ListFooterComponent={
              !this.props.isLoading ? (
                <PermissionComponent permissionTypes={[PermissionTypes.AccountOwner, PermissionTypes.UserAdmin]} hideView={true}>
                  <Text style={style.swipLeftText}>{swipeLeftToArchive}</Text>
                </PermissionComponent>
              ) : undefined
            }
          />
        </LoadingView>
        <CustomAlert
          heading={this.state.customModelData?.heading}
          msg={this.state.customModelData?.message}
          visible={this.state.customModelData?.visible}
          onClose={this.state.customModelData?.onClose}
          button1Text={this.state.customModelData?.button1Text}
          button2Text={this.state.customModelData?.button2Text}
          onButton1Press={this.state.customModelData?.onButton1Press}
          onButton2Press={this.state.customModelData?.onButton2Press}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedTradeAccount: state.connectTrade?.selectedTradeAccount,
  jobAccounts: state.jobAccounts?.data || [],
  userName: getFullName(state.login?.userData),
  email: getEmail(state.login?.userData),
  phone: getPhoneNumber(state.login?.userData),
  branchEmail: R.pathOr("", ["branchList", "branchDetails", "address", "email"], state),
  isLoading: state.jobAccounts?.fetching,
  cartCount: state.cart?.cartEntriesCount,
  cartLoading: state?.cart?.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  sendEmail: (payload, params) => dispatch(EmailActions.emailRequest(payload, params)),
  selectJobAccount: item => {
    if (!item || item.JobName === "Select Job Account") {
      dispatch(JobAccountsActions.selectJobAccount(undefined));
    } else {
      dispatch(JobAccountsActions.selectJobAccount(item));
    }
  },
  clearCart: () => dispatch(ProductActions.clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobAccount);
