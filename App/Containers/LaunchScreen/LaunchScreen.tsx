import firebase from "@react-native-firebase/app";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import VersionInfo from "react-native-version-info";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import * as Redux from "redux";
import LargeButton from "~root/Components/LargeButton";
import ModalView from "~root/Components/ModalView/ModalView";
import SplashComponent from "~root/Components/SplashComponent/SplashComponent";
import {
  ACCOUNT_LINKER_MESSAGE_LAUNCH_SCREEN,
  ALREADY_USER_MESSAGE_LAUNCH_SCREEN,
  CLICK_HERE,
  CLICK_TO_REGISTER,
  genericErrorMessage,
  IAlertCallbacks,
  isAuth0UserCancel,
  LAUNCH_SCREEN_MESSAGE,
  loginErrBtnTxt,
  QUESTION_MESSAGE_LAUNCH_SCREEN,
} from "~root/Lib/AlertsHelper";
import { accessibility, getRegistrationFlowAnalyticsObj } from "~root/Lib/DataHelper";
import { registrationStart } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { Colors, Images } from "~root/Themes";
import emailClickableFromError from "../../Components/EmailClickableFromError/EmailClickableFromError";
import style from "./SignInScreenStyles";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  checkDbLogin: (prompt: string, alert: IAlertCallbacks) => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {}

/**
 * The local state
 */
export interface State {
  url: string;
  showLogin: boolean;
  showLoader: boolean;
  showErrorAlert: boolean;
}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

class LaunchScreen extends React.Component<Props, State> {
  constructor(state: Props) {
    super(state);
    this.state = {
      url: "",
      showLogin: false,
      showLoader: false,
      showErrorAlert: false,
    };
  }

  public componentDidMount(): void {
    this.openLogin(undefined);
  }

  public render() {
    return (
      <View style={style.rootContainer}>
        {this.state.showLoader ? (
          <SplashComponent />
        ) : this.state.showLogin ? (
          <ScrollView style={style.safeAreaStyle}>
            {/* Main Container */}
            <View style={style.mainContainer}>
              <View style={style.logoStyle}>
                <Image source={Images.logo} />
              </View>

              <View style={style.registerContainer}>
                <Text style={style.labelTopStyle}>{QUESTION_MESSAGE_LAUNCH_SCREEN}</Text>
                <LargeButton
                  onPress={() => {
                    this.openLogin("signup");
                    this.sendRegistrationAnalytics("user_registration");
                  }}
                  btnText={CLICK_TO_REGISTER}
                  isFooter={false}
                  style={style.registerButtonStyle}
                  textStyle={style.registerButtonText}
                  {...accessibility("signUpBtn")}
                />
              </View>

              <View style={style.ORContainer}>
                <View style={style.viewStyle} />
                <Text style={style.ORLabelStyle}> OR </Text>
                <View style={style.viewStyle} />
              </View>
              <View>
                <Text style={style.labelMidStyle}>{ALREADY_USER_MESSAGE_LAUNCH_SCREEN}</Text>
                <LargeButton
                  onPress={() => {
                    this.openLogin("signin");
                    this.setState({ showLoader: true });
                  }}
                  btnText={"Sign in"}
                  isFooter={false}
                  style={style.signInBtn}
                  textStyle={style.signInButtonText}
                  {...accessibility("signInBtn")}
                />
              </View>
            </View>
            <View style={style.versionContainerStyle}>
              <View style={style.viewStyleGrey} />
              <Text style={style.message}>Note: {LAUNCH_SCREEN_MESSAGE}</Text>
              <Text style={style.disclosureAccountStyle}>
                {ACCOUNT_LINKER_MESSAGE_LAUNCH_SCREEN}{" "}
                <Text style={style.clickHere} onPress={() => this.openLogin("signup")}>
                  {CLICK_HERE}
                </Text>
              </Text>
              <View style={style.viewStyleGrey} />
              <Text style={style.versionStyle}>
                v{VersionInfo.appVersion} ({VersionInfo.buildVersion})
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View style={style.mainLogoStyle}>
            <Image source={Images.logo} />
          </View>
        )}
        <ModalView
          modalContent={emailClickableFromError(genericErrorMessage)}
          title={"Something went wrong"}
          buttons={[
            {
              color: Colors.brandGrey,
              text: "Cancel",
              onPress: () => {
                this.setState({ showErrorAlert: false });
              },
            },
            {
              color: Colors.red,
              text: loginErrBtnTxt,
              onPress: () => {
                this.setState({ showErrorAlert: false });
                this.openLogin(undefined);
              },
            },
          ]}
          close={() => null}
          visible={this.state.showErrorAlert}
        />
      </View>
    );
  }

  public openLogin = (prompt: string) => {
    this.props.checkDbLogin(prompt, {
      onFailure: err => {
        this.setState({ showLoader: false });
        this.setState({ showLogin: true });
        setTimeout(() => {
          if (!isAuth0UserCancel(err)) {
            this.setState({ showErrorAlert: true });
          }
        }, 300);
      },
    });
  };

  public sendRegistrationAnalytics = (event: any) => {
    const params = {
      event,
      step: 1,
      step_label: registrationStart,
      userId: "",
      accountId: "",
      location: "",
    };
    const eventLogObject = getRegistrationFlowAnalyticsObj(params);
    firebase.analytics().logEvent(event, eventLogObject);
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  checkDbLogin: (prompt, alert) => dispatch(LoginActions.checkDbLogin(prompt, alert)),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
