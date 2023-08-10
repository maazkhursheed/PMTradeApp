import { StackActions } from "@react-navigation/native";

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(name: any, params?: any) {
  _navigator.navigate({
    name,
    params,
  });
}

function push(name: any, params?: any) {
  _navigator.dispatch(StackActions.push(name, params));
}

function goBack() {
  _navigator.goBack();
}

function reset(resetRouteName: any) {
  _navigator.reset({
    routes: [{ name: resetRouteName }],
  });
}
// add other navigation functions that you need and export them

export default {
  navigate,
  push,
  goBack,
  setTopLevelNavigator,
  reset,
};
