import "./App/Config/ReactotronConfig";
import * as React from "react";
import { AppRegistry, LogBox, Platform } from "react-native";
import App from "./App/Containers/App";
import "react-native-gesture-handler";
import NewRelic from "newrelic-react-native-agent";
import AppConfig from "./App/Config/AppConfig";
import VersionInfo from "react-native-version-info";

let appToken;

if (Platform.OS === "ios") {
  appToken = AppConfig.NEWRELIC_IOS_KEY;
} else {
  appToken = AppConfig.NEWRELIC_ANDROID_KEY;
}

NewRelic.startAgent(appToken);
NewRelic.setJSAppVersion(VersionInfo.appVersion);
console.disableYellowBox = true;
AppRegistry.registerComponent("FletcherBuilderTradeApp", () => App);
