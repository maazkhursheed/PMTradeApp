import { firebase } from "@react-native-firebase/analytics";
import { isEmpty, isEqual } from "lodash";
import moment from "moment";
import { Button } from "native-base";
import R from "ramda";
import React from "react";
import { DatePickerAndroid, DatePickerIOS, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import UXCam from "react-native-ux-cam";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CheckBox from "~root/Components/CheckBox";
import DisablingComponent from "~root/Components/DisablingComponent";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import ModalView from "~root/Components/ModalView/ModalView";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PermissionSwitch from "~root/Components/PermissionSwitch/PermissionSwitch";
import PermissionTitle from "~root/Components/PermissionTitles/PermissionTitles";
import SmallHeader from "~root/Components/SmallHeader";
import TextField from "~root/Components/TextField";
import {
  alertTypeFailure,
  alertTypeRemove,
  alertTypeRemoveSuccess,
  apiErrorMsg,
  IAlertCallbacks,
  inviteUpdateTitle,
  OKButton,
  permissionUpdateTitle,
  removeBtnText,
  removeTitle,
  sendInviteTitle,
  titleErr,
} from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, navigationalScreens } from "~root/Lib/BranchHelper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, getSelectedAccountId, getTeamMemberAdditionEditObject, occludeSensitiveView } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import PermissionHelper, {
  getPermissionList,
  IEditPermissionReq,
  isCreditLimitEnabled,
  isSwitchOn,
  isTemporaryAccessEnabled,
  isValidEndDate,
} from "~root/Lib/ManageTeamHelper";
import SwitchValues from "~root/Lib/ManageTeamHelper/SwitchValues";
import { stripNonNumbers, validateFullName, validatePhone } from "~root/Lib/StringHelper";
import { safeRender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { EditPermissionActions } from "~root/Reducers/EditPermissionsReducers";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";
import colors from "~root/Themes/Colors";
import Fonts from "~root/Themes/Fonts";
import InviteTypes from "~root/Types/Invites/InviteTypes";
import { PermissionTypes } from "~root/Types/Permissions";
import style from "./EditTeamMemberContainerStyles";

interface OwnProps {}

interface DispatchProps {
  sendInvite: (updateInvite: IEditPermissionReq, callback: IAlertCallbacks) => void;
  updateInvite: (updateInvite: IEditPermissionReq, callback: IAlertCallbacks) => void;
  getPermissionsFromAPI: (param: any) => void;
  deleteInvite: (mobile: string, callback: IAlertCallbacks) => void;
  toggleAdmin: (state: boolean) => void;
  changeStartDate: (date: Date) => void;
  changeCreditLimit: (credit: string) => void;
  changeEndDate: (date: Date) => void;
  resetPermission: () => void;
}

export interface IPermissionState {
  startDate: Date;
  endDate: Date;
  dateError?: string;
  creditLimit: string;
  creditError?: string;
  isAdmin?: boolean;
  switches: { [s: string]: SwitchValues };
}

interface StateProps {
  permissionState: IPermissionState;
  contactsAllowed: boolean;
  digitalId: any;
  userData: any;
  selectedAccountId: any;
  selectedBranch: any;
}

interface State {
  showDatePicker?: boolean;
  isStartDateClicked?: boolean;
  deleteModal: boolean;
  name: string;
  phone: string;
  nameError?: string;
  phoneError?: string;
  alertTitle: string;
  alertContent: any;
  alertBtn: any[];
  viewAlert: boolean;
}

type Props = OwnProps & State & DispatchProps & StateProps & NavigationScreenProps;

class EditTeamMemberContainer extends React.Component<Props, State> {
  public isEditing: boolean = false;
  public memberInfo: {
    name: string;
    phone: string;
    status: InviteTypes;
    invitedOn: string;
    response: any;
    invitedBy: string;
    invitedByName: string;
  };

  private readonly disableButtonInviteType: boolean;
  private creditText: any;

  constructor(props: Props) {
    super(props);
    this.memberInfo = this.props.route?.params?.navParam ?? undefined;
    this.disableButtonInviteType = R.includes(this.memberInfo?.status, [InviteTypes.Rejected]);

    this.state = {
      showDatePicker: false,
      isStartDateClicked: false,
      deleteModal: false,
      name: this.memberInfo?.name,
      phone: stripNonNumbers(this.memberInfo?.phone),
      nameError: undefined,
      phoneError: undefined,
      alertTitle: "",
      alertContent: undefined,
      alertBtn: [],
      viewAlert: false,
    };
  }

  public componentDidMount(): void {
    if (this.memberInfo?.status === InviteTypes.New) {
      this.props.toggleAdmin(false);
    } else {
      this.props.getPermissionsFromAPI(this.memberInfo?.response);
    }
  }

  public componentWillReceiveProps(nextProps: Props): void {
    if (!isEmpty(this.props.permissionState.switches)) {
      this.isEditing = !isEqual(this.props.permissionState, nextProps.permissionState);
    }
  }

  public componentWillUnmount(): void {
    this.props.resetPermission();
  }

  public close = () => {
    this.props.navigation.popToTop();
  };

  public addAnalytics = async (data: any, memberStatus: any) => {
    const teamMemberAdditionEdit = getTeamMemberAdditionEditObject({
      data,
      event: memberStatus,
      userId: this.props.digitalId,
      accountId: this.props.selectedAccountId,
      locationStr: getBranchTownRegion(this.props.selectedBranch),
      storeName: this.props.selectedBranch?.name,
    });
    firebase.analytics().logEvent(memberStatus, teamMemberAdditionEdit);
  };

  public updatePermission = () => {
    const temporaryAccess = isTemporaryAccessEnabled(this.props.permissionState.switches);
    const isCreditLimit = isCreditLimitEnabled(this.props.permissionState.switches);
    const permissionList = getPermissionList(this.props.permissionState.switches);

    const data = {
      permissionList,
      creditLimit: isCreditLimit ? stripNonNumbers(this.props.permissionState.creditLimit) : undefined,
      temporaryAccess,
      startDate: temporaryAccess ? moment(this.props.permissionState.startDate).format("DD/MM/YYYY") : undefined,
      endDate: temporaryAccess ? moment(this.props.permissionState.endDate).format("DD/MM/YYYY") : undefined,
      mobileNumber: stripNonNumbers(this.state.phone),
      isAdmin: this.props.permissionState.isAdmin,
      name: this.state.name,
    };

    const alertParam = (type: string) => {
      return {
        onSuccess: () => this.createAlert(type),
        onFailure: () => this.createAlert(alertTypeFailure),
      };
    };

    switch (this.memberInfo?.status) {
      case InviteTypes.Accepted:
        this.props.updateInvite(data, alertParam(InviteTypes.Accepted));
        setTimeout(() => {
          this.addAnalytics(data, "memberEdit");
        }, 500);
        break;
      case InviteTypes.Expired:
      case InviteTypes.InviteSent:
        this.props.updateInvite(data, alertParam(InviteTypes.InviteSent));
        setTimeout(() => {
          this.addAnalytics(data, "memberEdit");
        }, 500);
        break;
      case InviteTypes.New:
        // @ts-ignore

        this.props.sendInvite(
          {
            ...data,
            mobileNumber: R.compose(
              R.join(""),
              R.prepend("64"),
              R.cond([
                [R.startsWith("0"), R.drop(1)],
                [R.startsWith("64"), R.drop(2)],
                [R.T, R.identity],
              ]),
            )(stripNonNumbers(this.state?.phone)),
            name: this.state.name,
          },
          alertParam(InviteTypes.New),
          setTimeout(() => {
            this.addAnalytics(data, "memberAdded");
          }, 500),
        );
        break;
    }
  };
  public alertBtnClick = () => {
    this.setState({ viewAlert: false });
    this.props.navigation.popToTop();
  };

  public createAlert = (type: string) => {
    UXCam.setAutomaticScreenNameTagging(false);
    this.setState({ viewAlert: true });
    switch (type) {
      case InviteTypes.New:
        this.setState({
          alertTitle: sendInviteTitle,
          alertBtn: [
            {
              text: OKButton,
              onPress: this.alertBtnClick,
              color: colors.lightBlue,
            },
          ],
          alertContent: <Text style={style.modalMsg}>Your invitation to {this.state.name} is sent.</Text>,
        });
        break;
      case InviteTypes.InviteSent:
        this.setState({
          alertTitle: inviteUpdateTitle,
          alertBtn: [
            {
              text: OKButton,
              onPress: this.alertBtnClick,
              color: colors.lightBlue,
            },
          ],
          alertContent: <Text style={style.modalMsg}>Your invitation to {this.memberInfo.name} is sent.</Text>,
        });
        break;
      case InviteTypes.Accepted:
        this.setState({
          alertTitle: permissionUpdateTitle,
          alertBtn: [
            {
              text: OKButton,
              onPress: this.alertBtnClick,
              color: colors.lightBlue,
            },
          ],
          alertContent: () => <Text style={style.modalMsg}>Permissions for {this.memberInfo.name} has been updated</Text>,
        });
        break;
      case alertTypeRemoveSuccess:
        this.setState({
          alertTitle: "REMOVE SUCCESS",
          alertBtn: [
            {
              text: OKButton,
              onPress: this.alertBtnClick,
              color: colors.lightBlue,
            },
          ],
          alertContent: <Text style={style.modalMsg}>Access to this team member has been revoked successfully.</Text>,
        });
        break;
      case alertTypeRemove:
        this.setState({
          alertTitle: removeTitle,
          alertBtn: [
            {
              text: removeBtnText,
              onPress: this.removeMember,
              color: colors.red,
            },
          ],
          alertContent: <Text style={style.modalMsg}>Are you sure you want to remove this member?</Text>,
        });
        break;
      case alertTypeFailure:
        this.setState({
          alertTitle: titleErr,
          alertBtn: [
            {
              text: OKButton,
              color: colors.red,
              onPress: this.alertBtnClick,
            },
          ],
          alertContent: <Text style={style.modalMsg}>{apiErrorMsg}</Text>,
        });
        break;
    }
  };

  public setDate = (newDate: Date) => {
    this.state.isStartDateClicked ? this.props.changeStartDate(newDate) : this.props.changeEndDate(newDate);
  };

  public openDate = async () => {
    if (Platform.OS === "ios") {
      this.setState({ showDatePicker: true });
    } else {
      try {
        const { year, month, day } = await DatePickerAndroid.open({
          date: new Date(),
          minDate: this.state.isStartDateClicked ? new Date() : moment(this.props.permissionState.startDate).toDate(),
        });
        if (year) {
          this.setDate(new Date(year, month, day));
        }
      } catch ({ code, message }) {
        if (__DEV__) {
          // tslint:disable-next-line:no-console
          console.warn("Cannot open date picker", message);
        }
      }
    }
  };

  public setUserName = (text: string) => {
    validateFullName(text)
      ? this.setState({ nameError: undefined, name: text })
      : this.setState({
          name: text,
          nameError: "Please provide a valid user name",
        });
  };

  public setPhoneNumber = (text: string) => {
    this.setState({ phone: text });
    validatePhone(text) ? this.setState({ phoneError: undefined }) : this.setState({ phoneError: "Please provide a valid phone number" });
  };

  public renderCredit = () => {
    return (
      <TextField
        ref={c => (this.creditText = c)}
        autoCorrect={false}
        keyboardType={"numeric"}
        errorMsg={this.props.permissionState.creditError}
        label={"Please insert credit limit"}
        viewStyle={style.creditTextField}
        value={this.props.permissionState.creditLimit}
        onChangeText={this.props.changeCreditLimit}
        {...accessibility("insertCreditLimitText")}
      />
    );
  };

  public renderAccessList = ({ item }) => {
    const isDisabled = this.props.permissionState?.switches[item] === SwitchValues.DISABLED;
    return (
      <View>
        <View style={style.accessListStyle}>
          <PermissionTitle isDisabled={isDisabled} permissionType={new PermissionHelper(item)} />
          <PermissionSwitch isDisabled={isDisabled} permissionType={item} />
        </View>
        {isSwitchOn(this.props.permissionState?.switches[PermissionTypes.TemporaryAccess]) &&
          item === PermissionTypes.TemporaryAccess &&
          this.renderAccessDate()}
        {isSwitchOn(this.props.permissionState?.switches[PermissionTypes.CreditLimit]) && item === PermissionTypes.CreditLimit && this.renderCredit()}
      </View>
    );
  };
  public renderAccessDate = () => {
    return (
      <View style={style.accessDateContainer}>
        <TouchableOpacity
          {...accessibility("accessStartView")}
          style={style.accessDate}
          onPress={() => {
            this.setState({ isStartDateClicked: true });
            this.openDate();
          }}
        >
          <TextField
            editable={false}
            pointerEvents={"none"}
            label={"ACCESS STARTS"}
            value={
              moment(this.props.permissionState.startDate).isSame(new Date(), "d") ? "TODAY" : moment(this.props.permissionState.startDate).format("DD/MM/YYYY")
            }
            {...accessibility("accessStartsText")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          {...accessibility("accessEndView")}
          style={style.accessEnd}
          onPress={() => {
            this.setState({ isStartDateClicked: false });
            this.openDate();
            if (!this.props.permissionState.endDate) {
              this.props.changeEndDate(new Date());
            }
          }}
        >
          <TextField
            pointerEvents={"none"}
            editable={false}
            label={"ACCESS ENDS"}
            value={this.props.permissionState.endDate ? moment(this.props.permissionState.endDate).format("DD/MM/YYYY") : ""}
            errorMsg={isValidEndDate(this.props.permissionState.endDate, this.props.permissionState.startDate) ? undefined : "Please provide a valid end date"}
            {...accessibility("accessEndsText")}
          />
        </TouchableOpacity>
      </View>
    );
  };

  public selectAdmin = () => {
    this.props.toggleAdmin(!this.props.permissionState.isAdmin);
  };

  public removeMember = () => {
    this.setState({ viewAlert: false });

    this.props.deleteInvite(this.memberInfo.phone, {
      onSuccess: () => {
        this.createAlert(alertTypeRemoveSuccess);
      },
      onFailure: () => {
        this.createAlert(alertTypeFailure);
      },
    });
  };

  public deleteMember = () => {
    this.createAlert(alertTypeRemove);
  };

  public isSwitchOnFromState = type => R.compose(isSwitchOn, R.path(["switches", type]));

  public renderRightIcon = () => {
    if (this.memberInfo?.status !== InviteTypes.New) {
      return (
        <Button onPress={this.deleteMember} transparent={true} disabled={this.disableButtonInviteType} {...accessibility("deleteBtn")} style={style.btnStyle}>
          <FbIcon name={"ic_delete"} style={style.rightIconStyle} />
        </Button>
      );
    } else if (this.props.contactsAllowed) {
      return (
        <Button
          onPress={() => {
            this.props.navigation.pop();
          }}
          transparent={true}
          {...accessibility("rightItemBtn")}
        >
          <FbIcon {...accessibility("rightIcon")} name={"ic_contact"} style={style.rightIconStyle} />
        </Button>
      );
    }
  };

  public render() {
    const checkTemp = R.ifElse(
      this.isSwitchOnFromState(PermissionTypes.TemporaryAccess),
      R.both(R.compose(isNilOrEmpty, R.prop("dateError")), R.compose(R.complement(isNilOrEmpty), R.prop("endDate"))),
      R.T,
    )(this.props.permissionState);

    const checkCreditLimit = R.ifElse(
      this.isSwitchOnFromState(PermissionTypes.CreditLimit),
      R.both(R.compose(isNilOrEmpty, R.prop("creditError")), R.compose(R.complement(isNilOrEmpty), R.prop("creditLimit"))),
      R.T,
    )(this.props.permissionState);

    return (
      <MainContainer>
        <SmallHeader
          navigation={this.props.navigation}
          title={this.memberInfo?.status === InviteTypes.New ? "ADD TEAM MEMBER" : "EDIT TEAM MEMBER"}
          actionItem={this.renderRightIcon()}
        />
        <KeyboardAwareFlatList
          removeClippedSubviews={false}
          ListHeaderComponent={
            <View ref={occludeSensitiveView}>
              <TextField
                ref={occludeSensitiveView}
                editable={this.memberInfo?.status === InviteTypes.New}
                value={this.state.name}
                onChangeText={this.setUserName}
                errorMsg={this.state.nameError}
                label={"FULL NAME"}
                placeholder={"Your team member full name"}
                {...accessibility("nameText")}
              />
              <TextField
                ref={occludeSensitiveView}
                editable={this.memberInfo?.status === InviteTypes.New}
                value={this.state.phone}
                viewStyle={style.phoneTextField}
                onChangeText={this.setPhoneNumber}
                errorMsg={this.state.phoneError}
                label={"PHONE NUMBER"}
                placeholder={"Your team member phone number"}
                {...accessibility("phoneNumText")}
              />
              {
                <PermissionComponent hideView={true} style={style.adminCheckBox} permissionTypes={PermissionTypes.AccountOwner}>
                  <DisablingComponent isDisabled={!(this.memberInfo?.status === InviteTypes.New || this.memberInfo?.status === InviteTypes.Expired)}>
                    <CheckBox
                      selected={!!this.props.permissionState?.isAdmin}
                      onPress={this.selectAdmin}
                      checkBoxDesc={
                        <View style={style.canInviteRemove}>
                          <Text style={style.accessNameTxt}>Account admin</Text>
                          <Text style={style.accessDescTxt}>Can see invoices & statements as well as invite or remove team members</Text>
                        </View>
                      }
                    />
                  </DisablingComponent>
                </PermissionComponent>
              }

              <Text style={style.accessTxt}>PROVIDE ACCESS TO</Text>
            </View>
          }
          ListFooterComponent={
            this.memberInfo?.status !== InviteTypes.New ? (
              <Text style={[Fonts.style.caption, style.memberInfoText]} ref={occludeSensitiveView}>
                {"Invited on " + moment(this.memberInfo?.invitedOn).format("DD MMM YYYY") + " by " + this.memberInfo?.invitedByName}
              </Text>
            ) : undefined
          }
          data={R.compose(R.reject(R.either(R.equals(PermissionTypes.UserAdmin), R.equals(PermissionTypes.AccountOwner))), R.values)(PermissionTypes)}
          extraData={this.state}
          style={style.listStyle}
          renderItem={this.renderAccessList}
        />

        {this.state.showDatePicker && (
          <View style={style.datePickerContainer}>
            <Button
              dark={true}
              transparent={true}
              style={style.doneButton}
              onPress={() => {
                this.setState({ showDatePicker: false });
              }}
              {...accessibility("doneBtn")}
            >
              <Text>Done</Text>
            </Button>
            <DatePickerIOS
              mode="date"
              onDateChange={this.setDate}
              date={
                this.state.isStartDateClicked
                  ? moment(this.props.permissionState.startDate).toDate()
                  : moment(this.props.permissionState.endDate).toDate() || new Date()
              }
              minimumDate={this.state.isStartDateClicked ? new Date() : moment(this.props.permissionState.startDate).toDate()}
            />
          </View>
        )}
        <ModalView
          title={this.state.alertTitle}
          visible={this.state.viewAlert}
          buttons={this.state.alertBtn}
          modalContent={this.state.alertContent}
          close={() => {
            this.setState({ viewAlert: false });
          }}
        />
        <LargeButton
          disabled={
            (!this.isEditing && !(this.memberInfo?.status === InviteTypes.New)) ||
            !checkTemp ||
            !checkCreditLimit ||
            (isSwitchOn(this.props.permissionState?.switches[PermissionTypes.TemporaryAccess]) &&
              !isValidEndDate(this.props.permissionState.endDate, this.props.permissionState.startDate)) ||
            this.state.nameError ||
            !this.state.name ||
            this.state.phoneError ||
            !this.state.phone
          }
          onPress={this.updatePermission}
          btnText={this.memberInfo?.status === InviteTypes.New || this.memberInfo?.status === InviteTypes.Expired ? "Send invite" : "Update"}
          isFooter={true}
        />
      </MainContainer>
    );
  }
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleAdmin: state => dispatch(TeamActions.adminClick(state)),
  changeCreditLimit: credit => dispatch(TeamActions.creditChange(credit)),
  changeStartDate: date => dispatch(TeamActions.startDateChange(date)),
  changeEndDate: date => dispatch(TeamActions.endDateChange(date)),
  sendInvite: (updateInvite, callback) => dispatch(EditPermissionActions.sendInviteRequest(updateInvite, callback)),
  updateInvite: (updateInvite, callback) => dispatch(EditPermissionActions.editInviteRequest(updateInvite, callback)),
  deleteInvite: (deleteInvite, callback) => dispatch(EditPermissionActions.deleteInviteRequest(deleteInvite, callback)),
  getPermissionsFromAPI: param => dispatch(TeamActions.permissionAPIs(param)),
  resetPermission: () => dispatch(TeamActions.resetPermission()),
});
export const mapStateToProps = (state: RootState): StateProps => ({
  permissionState: state.manageTeam?.permissionState,
  contactsAllowed: state.manageTeam?.contactsAllowed,
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login?.tempToken?.idToken)) as string,
  userData: state.login?.userData,
  selectedAccountId: getSelectedAccountId(state),
  selectedBranch: state.branchList?.selectedBranch,
});

export default connect(mapStateToProps, mapDispatchToProps)(safeRender(EditTeamMemberContainer, navigationalScreens.TeamMemberAdd_EditScreen));
