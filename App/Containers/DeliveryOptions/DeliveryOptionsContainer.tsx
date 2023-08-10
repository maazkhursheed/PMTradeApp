import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import CartMenuCollapes from "~root/Components/CartMenuCollapes";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import DeliveryOptionsItem from "~root/Components/DeliveryOptionsItem";
import LargeButton from "~root/Components/LargeButton";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import AppConfig from "~root/Config/AppConfig";
import {
  cashdeliveryOptionBranchSwitchHeading,
  cashdeliveryOptionBranchSwitchMessage,
  cashdeliveryOptionBranchSwitchMessageTail,
} from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, navigationalScreens, OrderTypes } from "~root/Lib/BranchHelper";
import { CashCustomerBranchSwitchAlert, isNotHomeBranch } from "~root/Lib/CartHelper";
import { getFulfilmentpageAnalyticsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { useCashCustomerStatus } from "~root/Lib/QuoteHelper";
import { safeRender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ExistingOrdersActions } from "~root/Reducers/ExistingOrdersReducer";
import { Colors, Images } from "~root/Themes";
import images from "~root/Themes/Images";
import CartLearnMoreTab from "../../Components/CartLearnMoreTab";
import { BoldText, DELIVERY_REQUEST, DELIVERY_REQUEST_DESCRIPTION_MESSAGE } from "../../Lib/AlertsHelper";
import DeliveryOptions from "./DeliveryOptions";
import styles from "./DeliveryOptionsStyles";

const DeliveryOptionsContainer = () => {
  const {
    selectedBranch,
    // myBranches,
    orderType,
    isFetchingCart,
    isDeletingContact,
    existingData,
    contacts,
    digitalId,
    selectedAccountId,
    selectedAddress,
    cartDetail,
    eligibility,
    selectedTradeAccount,
    entries,
    payNowDetails,
    payCallBackDetails,
    myBranches,
  } = useSelector((state: RootState) => ({
    selectedBranch: state.branchList?.selectedBranch,
    eligibility: state.cart?.eligibility,
    // myBranches: state.branchList.dataDepots,
    contacts: R.map(R.prop("code"))(state.cart?.userCartDetail?.siteContacts || []),
    orderType: state?.branchList?.selectedOrderType,
    isFetchingCart: state.cart?.fetching || state.existingOrders?.fetching,
    isDeletingContact: state.cart?.fetchingContactInfo || false,
    existingData: state.existingOrders?.data?.deliveries,
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login?.tempToken?.idToken)) as string,
    selectedAccountId: getSelectedAccountId(state),
    selectedAddress: state.address ? state.address.selectedAddress : undefined,
    cartDetail: state.cart?.userCartDetail,
    selectedTradeAccount: state.connectTrade?.selectedTradeAccount,
    entries: state.cart?.userCart?.entries,
    payNowDetails: state?.cart?.payNowDetails,
    payCallBackDetails: state?.cart?.payCallBackDetails,
    myBranches: state.branchList?.dataDepots,
  }));
  let previousBranchCode = selectedBranch?.branchCode;
  const [showErrorMsg, setErrorMsg] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { CashCustomerStatus } = useCashCustomerStatus();
  const { dispatchAlert } = useCustomAlert();
  const getParentBranch = React.useCallback(R.always(R.head(myBranches || [])), [myBranches]);

  useEffect(() => {
    dispatch(CartActions.checkFulfilmentEligibility({}, { onSuccess: () => setErrorMsg(false), onFailure: () => setErrorMsg(true) }));
    dispatch(ExistingOrdersActions.request());
    logFirebaseEvent(1, "");
  }, [dispatch]);

  useEffect(() => {
    // willrecieveprops
    if (previousBranchCode !== selectedBranch?.branchCode) {
      previousBranchCode = selectedBranch?.branchCode;
      dispatch(ExistingOrdersActions.request());
    }
  }, [dispatch, previousBranchCode, selectedBranch?.branchCode]);

  useEffect(() => {
    if (isNotHomeBranch(selectedBranch, myBranches) && CashCustomerStatus) {
      branchSwitchAlertFunction();
    }
  }, [CashCustomerStatus, myBranches, selectedBranch]);

  const logFirebaseEvent = React.useCallback((step: number, orderType: string) => {
    const props = { digitalId, selectedAccountId, selectedAddress, cartDetail };
    const eventLogObject = getFulfilmentpageAnalyticsObj({
      step,
      orderType,
      props,
      location: getBranchTownRegion(selectedBranch),
      storeName: selectedBranch?.name,
    });
    if (!__DEV__) {
      firebase.analytics().logEvent("begin_checkout", eventLogObject);
    }
  }, []);
  const addToExistingTapped = React.useCallback(() => {
    if (contacts?.length) {
      dispatch(
        CartActions.deleteSiteContactDetails(contacts, () => {
          setTimeout(() => navigateToAddToExisting(), 10);
        }),
      );
    } else {
      navigateToAddToExisting();
    }
  }, []);

  const branchSwitchAlertFunction = () => {
    CashCustomerBranchSwitchAlert(
      cashdeliveryOptionBranchSwitchHeading,
      cashdeliveryOptionBranchSwitchMessage,
      () => {
        dispatch(BranchDetailsActions.onSelectBranch(getParentBranch()));
        setTimeout(() => {
          dispatch(CartActions.checkFulfilmentEligibility());
        }, 10);
      },
      () => {
        navigation.goBack();
      },
      "Update to " + selectedTradeAccount.branch.name,
      cashdeliveryOptionBranchSwitchMessageTail,
      selectedTradeAccount?.branch?.name,
      selectedBranch?.name,
      "?",
      dispatchAlert,
    );
  };

  const navigateToAddToExisting = React.useCallback(() => {
    logFirebaseEvent(2, OrderTypes.ADD_TO_EXISTING);
    logFirebaseEvent(3, OrderTypes.ADD_TO_EXISTING);
    logFirebaseEvent(4, OrderTypes.ADD_TO_EXISTING);
    dispatch(BranchDetailsActions.setOrderType(OrderTypes.STANDARD));
    navigation.navigate("AddToExisting");
  }, []);

  const retryClick = React.useCallback(() => {
    dispatch(CartActions.checkFulfilmentEligibility({}, { onSuccess: () => setErrorMsg(false), onFailure: () => setErrorMsg(true) }));
  }, []);

  return (
    <MainContainer style={styles.container}>
      <SmallHeader navigation={navigation} title={"Delivery options"} />
      {showErrorMsg || R.isEmpty(eligibility) ? (
        <View style={{ flex: 1, alignContent: "center", alignItems: "center", marginTop: 40, marginHorizontal: 38 }}>
          <FastImage source={images.somethingWentWrong} style={styles.image} resizeMode={FastImage.resizeMode.contain} />

          <Text style={styles.topHeading}>Oops something went wrong...</Text>
          <Text style={styles.messageStyle}>Don't worry your cart is still saved, retry or cancel to return to your cart.</Text>
          <Text style={styles.bottomMessageStyle}>
            If the problem persists please{" "}
            <Text style={styles.linkStyle} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}>
              Contact Support.
            </Text>
          </Text>

          <LargeButton textStyle={styles.retryButtonTextStyle} style={styles.retryButtonStyle} onPress={retryClick} btnText={"Retry"} />
          <LargeButton textStyle={styles.cancelButtonTextStyle} style={styles.cancelButtonStyle} onPress={navigation.goBack} btnText={"Cancel"} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <LoadingView
            isLoading={isFetchingCart || isDeletingContact}
            hideViewOnLoading={true}
            style={[(isFetchingCart || isDeletingContact) && styles.loadingViewStyle]}
          >
            {CashCustomerStatus && <CartMenuCollapes />}
          </LoadingView>
          <View style={styles.deliveryViewContainer}>
            {CashCustomerStatus && payNowDetails?.length === 0 && payCallBackDetails?.length > 0 && (
              <CartLearnMoreTab
                title={<BoldText>{DELIVERY_REQUEST}</BoldText>}
                subtitle={<Text>{DELIVERY_REQUEST_DESCRIPTION_MESSAGE}</Text>}
                iconColor={Colors.lightGreen}
                iconName={"info"}
              />
            )}
            <Text style={styles.header}>How would you like to get your order?</Text>
            <LoadingView isLoading={isFetchingCart || isDeletingContact} hideViewOnLoading={true}>
              <DeliveryOptions logFirebaseEvent={logFirebaseEvent} />
              <DeliveryOptionsItem
                key={OrderTypes.ADD_TO_EXISTING}
                image={Images.addToExisting}
                title={OrderTypes.ADD_TO_EXISTING}
                time={existingData?.length > 0 ? "Standard deliveries only" : "No deliveries scheduled"}
                onPress={addToExistingTapped}
                optionAvailable={existingData?.length > 0 ? true : false}
              />
            </LoadingView>
          </View>
        </ScrollView>
      )}
    </MainContainer>
  );
};
export default safeRender(DeliveryOptionsContainer, navigationalScreens.DeliveryOptionsScreen);
