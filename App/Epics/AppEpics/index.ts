import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import remoteConfig from "@react-native-firebase/remote-config";
import * as R from "ramda";
import { Platform } from "react-native";
import VersionCheck from "react-native-version-check";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";

const SCREENS_STATUS = "ScreensStatus";
const FEATURE_TOGGLE_STATUS = "FeatureToggleStatus";
export const epicFetchRemoteConfigs: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AppActions.fetchRemoteConfig)),
    mergeMap(async () => {
      const actions = [];
      try {
        await remoteConfig().setDefaults({
          android_force_update: "false",
          ios_force_update: "false",
          [SCREENS_STATUS]: "{}",
          [FEATURE_TOGGLE_STATUS]: "{}",
        });
        const netState = await NetInfo.fetch();
        if (netState.isConnected) {
          const fetchedRemotely = await remoteConfig().fetchAndActivate();
          let forceUpdate = undefined;
          let screensStatus = undefined;
          let featureToggle = undefined;
          if (fetchedRemotely) {
            forceUpdate = Platform.select({
              ios: remoteConfig().getValue("ios_force_update").asString(),
              android: remoteConfig().getValue("android_force_update").asString(),
            });
            screensStatus = remoteConfig().getValue(SCREENS_STATUS).asString();
            featureToggle = remoteConfig().getValue(FEATURE_TOGGLE_STATUS).asString();
            await AsyncStorage.setItem(SCREENS_STATUS, screensStatus);
            await AsyncStorage.setItem(FEATURE_TOGGLE_STATUS, featureToggle);
            await AsyncStorage.setItem(VersionCheck.getCurrentVersion(), forceUpdate || "false");
          } else {
            forceUpdate = await AsyncStorage.getItem(VersionCheck.getCurrentVersion());
            screensStatus = await AsyncStorage.getItem(SCREENS_STATUS);
            featureToggle = await AsyncStorage.getItem(FEATURE_TOGGLE_STATUS);
          }
          actions.push(AppActions.setScreensStatus(JSON.parse(screensStatus || "{}")));
          actions.push(AppActions.setFeatureToggle(JSON.parse(featureToggle || "{}")));
          actions.push(AppActions.appForceUpdateVisibility(forceUpdate === "true"));
        } else {
          actions.push(AppActions.appForceUpdateVisibility(false));
        }
      } catch (err) {
        actions.push(AppActions.appForceUpdateVisibility(false));
      }
      return R.apply(of, actions);
    }),
    mergeMap(response => from(response)),
  );
