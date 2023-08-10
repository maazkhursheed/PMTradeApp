import PushNotificationIOS from "@react-native-community/push-notification-ios";
import "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import * as React from "react";
import { AppState, DeviceEventEmitter, EventSubscription } from "react-native";
import MCReactModule from "react-native-marketingcloudsdk";
import PushNotification from "react-native-push-notification";
import RNUxcam from "react-native-ux-cam";
import Reactotron from "reactotron-react-native";
import { NavigationLibraryType, PendoSDK } from "rn-pendo-sdk";
import AppConfig, { initializeAppConfig } from "~root/Config/AppConfig";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import "../Config";
import DebugConfig from "../Config/DebugConfig";
import createStore from "../Reducers";
import PendoContainer from "./PendoContainer";

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading
 */

class App extends React.Component {
  public state = {
    appState: AppState.currentState,
    navigationRef: React.createRef(),
    routeNameRef: React.createRef(),
    didInitializeAppConfig: false,
  };

  private subs: EventSubscription = DeviceEventEmitter.addListener("onNotificationData", data => {
    this.onNotificationReceived(data);
  });

  public initPendo() {
    const navigationOptions = { library: NavigationLibraryType.ReactNavigation, navigation: null };
    const pendoKey = AppConfig.PENDO_APP_KEY;
    PendoSDK.setup(pendoKey, navigationOptions);
  }

  public async componentDidMount() {
    const store = await createStore();
    await initializeAppConfig();
    this.initPendo();
    this.setState({ store, didInitializeAppConfig: true });
    RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
    RNUxcam.startWithKey(AppConfig.UX_CAM_APP_KEY);
    AppState.addEventListener("change", this._handleAppStateChange);
    crashlytics().setCrashlyticsCollectionEnabled(true);

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        store.dispatch(NotificationActions.tokenSuccess(token.token));
      },
      senderID: AppConfig.SENDER_ID,
      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        if (notification.userInteraction || notification.data.userInteraction) {
          this.onNotificationReceived(notification.data);
        }
        MCReactModule.refreshMessages().then(didRefresh => {
          store.dispatch(NotificationActions.getInboxMessages());
        });
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: { alert: true, badge: true, sound: true },
      requestPermissions: true,
    });
  }

  public componentWillUnmount() {
    const subscription = AppState.addEventListener("change", appState => {
      subscription.remove();
    });
  }

  public onNotificationReceived = (notification: any) => {
    this.state.store?.dispatch(
      NotificationActions.notificationReceived({
        notifyType: notification.NotifyType,
        orderId: notification.OrderNumber,
        pdoNumber: notification.PDONumber,
        customerId: notification.TradeAccountID,
        index: 0,
        jobId: notification.JobAccountID,
        branchId: notification.BranchID,
        fulfilmentBranchId: notification.FBranchID,
      }),
    );
  };

  public _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
      // App has come to the foreground!
      this.state.store?.dispatch(NotificationActions.getInboxMessages());
    }
    this.setState({ appState: nextAppState });
  };

  public render() {
    if (this.state.store && this.state.didInitializeAppConfig) {
      return <PendoContainer store={this.state.store} navigationRef={this.state.navigationRef} routeNameRef={this.state.routeNameRef} />;
    } else {
      return null;
    }
  }
}

//  allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? Reactotron.overlay(App) : App;
