import "@react-native-firebase/analytics";
import firebase from "@react-native-firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { Root } from "native-base";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { withPendoRN } from "rn-pendo-sdk";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { getAllPagesAnalyticsObj, getSelectedAccountId, tagScreenName } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload, extractSignUpFromJWTPayload } from "~root/Lib/LoginHelper";
import { getScreenNames } from "~root/Lib/OrderItemHelper";
import NavigationService from "~root/Navigation/NavigationService";
import { getEmail } from "~root/Reducers/LoginReducers";
import RootContainer from "./RootContainer";

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading
 */

interface OwnProps {
  onStateChange: (navigationState: any) => void;
  navigationRef: any;
  routeNameRef: any;
  store: any;
}

type Props = OwnProps;

const PendoContainer = ({ onStateChange, navigationRef, routeNameRef, store }: Props) => {
  return (
    <NavigationContainer
      ref={navRef => {
        navigationRef = navRef;
        NavigationService.setTopLevelNavigator(navRef);
      }}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute?.().name;
        onStateChange(navigationRef?.getCurrentRoute());
      }}
      onStateChange={navigationState => {
        onStateChange(navigationState);
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.getCurrentRoute?.()?.name;
        const hasToken = store?.getState()?.login?.tempToken?.idToken;
        if (previousRouteName !== currentRouteName) {
          if (!hasToken) {
            return;
          }
          const state = store?.getState();
          const params = {
            userType: extractSignUpFromJWTPayload(decodeJWTToken(state.login?.tempToken?.idToken)) ? "New" : "Returning",
            digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login?.tempToken?.idToken)) as string,
            selectedAccountId: getSelectedAccountId(state),
            email: getEmail(state.login?.userData),
            cartDetailData: state.cart?.userCartDetail,
            storeName: state.branchList?.selectedBranch?.name || "",
            location: state.branchList?.selectedBranch ? getBranchTownRegion(state.branchList?.selectedBranch) : "",
            timestamp: new Date().getTime(),
            page_type: currentRouteName || "",
          };
          const eventLogObject = getAllPagesAnalyticsObj(params);
          firebase.analytics().logEvent("allPage", eventLogObject);
        }
        // // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
        tagScreenName(getScreenNames(currentRouteName));
      }}
    >
      <Provider store={store}>
        <Root>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootContainer />
          </GestureHandlerRootView>
        </Root>
      </Provider>
    </NavigationContainer>
  );
};

export default withPendoRN(PendoContainer, {});
