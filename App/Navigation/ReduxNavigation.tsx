import remoteConfig from "@react-native-firebase/remote-config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as RA from "ramda-adjunct";
import * as React from "react";
import { AppState, Linking, Platform } from "react-native";
import MCReactModule from "react-native-marketingcloudsdk";
import VersionCheck from "react-native-version-check";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ForceUpdateView from "~root/Components/ForceUpdateView/ForceUpdateView";
import SplashComponent from "~root/Components/SplashComponent/SplashComponent";
import AppConfig from "~root/Config/AppConfig";
import ConnectAccountSelection from "~root/Containers/ConnectAccountSelection/ConnectAccountSelection";
import LaunchScreen from "~root/Containers/LaunchScreen/LaunchScreen";
import { getSelectedAccountId } from "~root/Lib/DataHelper";
import { hasTradeAccounts } from "~root/Lib/LoginHelper";
import { transformResponseToAvailablePermission } from "~root/Lib/PermissionHelperLib";
import { safeRender } from "~root/Provider/Appender";
import { AppActions } from "~root/Reducers/AppReducers";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { PermissionActions } from "~root/Reducers/PermissionReducers";
import { RootState } from "../Reducers";
import AppNavigation from "./AppNavigation";

export interface StateProps {
  user: any;
  permissions: any;
  nav: any;
  isForceUpdate: boolean;
  selectedTradeAccount: any;
  showIntro: string;
  accountId: string;
  selectedBranch: string;
  selectedJobAccount: string;
}

export interface DispatchProps {
  updateUser: () => void;
  setForceUpdate: (val: boolean) => void;
  checkLatestVersion: () => void;
}

export interface State {
  url: string;
}

type Props = StateProps & DispatchProps;

const AppStack = createNativeStackNavigator();

function AppNavigationContainer() {
  return (
    <AppStack.Navigator initialRouteName="AppMain" mode={"card"} screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AppMain" component={AppNavigation} />
    </AppStack.Navigator>
  );
}

const LaunchStack = createNativeStackNavigator();

function LaunchNavigationContainer() {
  return (
    <LaunchStack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }} mode={"card"}>
      <LaunchStack.Screen name="Main" component={LaunchScreen} />
    </LaunchStack.Navigator>
  );
}

const ConnectNavStack = createNativeStackNavigator();

function ConnectTradeNavigationContainer() {
  return (
    <ConnectNavStack.Navigator initialRouteName="AccountOwnerSelection" screenOptions={{ headerShown: false }} mode={"card"}>
      <ConnectNavStack.Screen name="AccountOwnerSelection" component={ConnectAccountSelection} />
    </ConnectNavStack.Navigator>
  );
}

// here is our redux-aware smart component
class ReduxNavigation extends React.Component<Props, State> {
  constructor(state: Props) {
    super(state);
    this.state = {
      url: "",
    };
  }

  public async componentDidMount() {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 10000,
    });
    MCReactModule.startWatchingLocation();
    this.props.checkLatestVersion();
    AppState.addEventListener("change", this.handleAppState);
    // if (DebugConfig.useFixtures) {
    //   this.props.updateUser();
    // }
  }

  public async onOpenAppLink() {
    const appStoreURI = `itms-apps://apps.apple.com/app/id${AppConfig.APPID_FOR_UPDATE}?mt=8`;
    const appStoreURL = `https://apps.apple.com/app/id${AppConfig.APPID_FOR_UPDATE}?mt=8`;

    if (Platform.OS === "ios") {
      Linking.canOpenURL(appStoreURI).then(supported => {
        if (supported) {
          Linking.openURL(appStoreURI);
        } else {
          Linking.openURL(appStoreURL);
        }
      });
    } else {
      Linking.openURL(await VersionCheck.getStoreUrl());
    }
  }

  public handleAppState = appState => {
    if (appState === "active") {
      this.props.checkLatestVersion();
    }
  };

  public onUpdateApp = () => {
    this.onOpenAppLink();
  };

  public getVersionUpdate = () => {
    if (!__DEV__) {
      VersionCheck.needUpdate().then(async res => {
        if (res.isNeeded) {
          this.props.setForceUpdate(true);
        } else {
          this.props.setForceUpdate(false);
        }
      });
    }
  };

  public render() {
    if (this.props.isForceUpdate) {
      return (
        <ForceUpdateView
          title={"Time to update!"}
          message={"We've added some new features and fixed some bugs to make your experience as smooth as possible."}
          visible={this.props.isForceUpdate}
          onUpdate={this.onUpdateApp}
        />
      );
    } else if (this.props.user) {
      if (hasTradeAccounts(this.props.user) === 0) {
        return <ConnectTradeNavigationContainer />;
      } else if (RA.isNotNilOrEmpty(this.props.permissions)) {
        if (!this.props.selectedTradeAccount) {
          return <SplashComponent />;
        }
        return <AppNavigationContainer />;
      } else {
        return <LaunchNavigationContainer />;
      }
    } else {
      return <LaunchNavigationContainer />;
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateUser: () => {
    dispatch(LoginActions.userSuccess(require("../Fixtures/UserInfo.json"), {}));
    dispatch(PermissionActions.permissionSuccess(transformResponseToAvailablePermission(require("../Fixtures/PermissionResponse.json"))));
  },
  setForceUpdate: val => dispatch(AppActions.appForceUpdateVisibility(val)),
  checkLatestVersion: () => dispatch(AppActions.fetchRemoteConfig()),
});

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.login.userData,
  permissions: state.permission.availablePermissions,
  showIntro: state.marketingScreens.showIntro,
  isForceUpdate: state.appDetail.isForceUpdate,
  selectedTradeAccount: state.connectTrade.selectedTradeAccount,
  accountId: getSelectedAccountId(state),
  selectedBranch: state.branchList.selectedBranch,
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
});

export default connect(mapStateToProps, mapDispatchToProps)(safeRender(ReduxNavigation, "App"));
