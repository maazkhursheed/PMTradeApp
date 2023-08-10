import firebase from "@react-native-firebase/app";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartMenuCollapes from "~root/Components/CartMenuCollapes";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import JobAccountSwitch from "~root/Components/JobAccountSwitch";
import LargeButton from "~root/Components/LargeButton";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import NativeWrapper from "~root/Components/NativeWrapper";
import SmallHeader from "~root/Components/SmallHeader";
import { IAlertCallbacks, showAlertMessage } from "~root/Lib/AlertsHelper";
import { BranchResponse, getBranchTownRegion, navigationalScreens, OrderTypes, SiteRequirements } from "~root/Lib/BranchHelper";
import { getFulfilmentpageAnalyticsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { validatePONumber } from "~root/Lib/StringHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { useCashCustomerStatus } from "../../Lib/QuoteHelper";
import styles from "./AccountDetailsContainerStyle";

interface DispatchProps {
  callUpdateAccountInfoAPI: (payload: any, callback: IAlertCallbacks) => void;
}

interface StateProps {
  loading: boolean;
  poFromCart?: string;
  orderType: OrderTypes;
  cartData: any;
  selectedBranch: BranchResponse;
  digitalId: any;
  cartDetail: any;
  selectedAccountId: string;
  selectedAddress: string | undefined;
  addressDistanceDriveTime: any;
}

interface OwnProps extends NavigationStackScreenProps {}

type Props = StateProps & OwnProps & DispatchProps;

const AccountDetailsContainer = ({
  navigation,
  route,
  callUpdateAccountInfoAPI,
  poFromCart,
  orderType,
  cartData,
  loading,
  selectedBranch,
  digitalId,
  cartDetail,
  selectedAccountId,
  selectedAddress,
  addressDistanceDriveTime,
}: Props) => {
  const previousOrder = route.params?.previousOrder ?? undefined;
  const isFromAddToExisting = route?.params?.isFromAddToExisting ?? false;
  const [poNumber, setPoNumber] = useState(poFromCart ?? "");
  const { dispatchAlert } = useCustomAlert();
  const { CashCustomerStatus } = useCashCustomerStatus();
  const logFirebaseEvent = (step: number) => {
    const eventLogObject = getFulfilmentpageAnalyticsObj({
      step,
      orderType: isFromAddToExisting ? OrderTypes.ADD_TO_EXISTING : orderType,
      props: {
        digitalId,
        cartDetail,
        selectedAccountId,
        selectedAddress: previousOrder?.formattedAddress || selectedAddress || "",
      },
      location: getBranchTownRegion(selectedBranch),
      storeName: selectedBranch?.name,
      deliveryType: cartData.truckRequirements,
      onSiteLift: cartData.siteRequirements.includes(SiteRequirements.OnSiteLift).toString(),
      onSiteHazards: cartData.siteRequirements.includes(SiteRequirements.OnSiteHazards).toString(),
      restrictedAccess: cartData.siteRequirements.includes(SiteRequirements.RestrictedAccess).toString(),
      orderNumber: previousOrder?.orderNumber || "",
    });
    if (!__DEV__) {
      firebase.analytics().logEvent("begin_checkout", eventLogObject);
    }
  };

  const poRef = useRef<TextInput>();
  useEffect(() => {
    logFirebaseEvent(7);
    poRef.current.focus();
    return navigation.addListener("focus", () => {
      // The screen is focused
      poRef.current.focus();
    });
  }, []);

  const onPoPress = useCallback(() => {
    poRef.current?.focus();
  }, []);

  const onReviewPress = useCallback(() => {
    logFirebaseEvent(8);
    if (poNumber.length > 0) {
      let payloadTemp = { poNumber };
      if (previousOrder) {
        payloadTemp = {
          poNumber,
          deliveryMode: "standard-delivery",
          requestedDate: moment(previousOrder?.requestDate).format("DD/MM/YYYY"),
          requestedTime: previousOrder?.DSP ?? "",
          previousOrderCode: previousOrder?.orderNumber ?? "",
        };
      } else if (orderType === OrderTypes.STANDARD) {
        payloadTemp = {
          poNumber,
          siteRequirements: cartData.siteRequirements,
          truckRequirements: cartData.truckRequirements,
          additionalInfo: cartData.additionalInfo,
          travelTime: addressDistanceDriveTime?.results?.[0]?.value?.drive_time,
          travelDistance: addressDistanceDriveTime?.results?.[0]?.value?.distance,
        };
      }
      callUpdateAccountInfoAPI(payloadTemp, {
        onSuccess: () => {
          navigation.navigate("OrderReview", {
            isFromAddToExisting: previousOrder ? true : false,
            previousOrder,
          });
        },
        onFailure: () => {
          showAlertMessage("Something went wrong", "An error occurred while loading this screen. Please try again.", dispatchAlert);
        },
      });
    } else {
      Toast.show({
        text1: "PO reference is mandatory",
        type: "info",
        visibilityTime: 3000,
      });
    }
  }, [poNumber]);

  return (
    <MainContainer style={styles.container}>
      <SmallHeader
        onBackPress={() => {
          Keyboard.dismiss();
          navigation.goBack();
        }}
        title={"Account details"}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"} extraScrollHeight={Platform.select({ android: 0, ios: 50 })}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {CashCustomerStatus && <CartMenuCollapes />}
          <LoadingView isLoading={loading} style={styles.container}>
            <JobAccountSwitch />
            <NativeWrapper onPress={onPoPress}>
              <View style={styles.textContainer}>
                <Text style={styles.label}>PO reference / Job reference </Text>
                <TextInput
                  // @ts-ignore
                  ref={poRef}
                  placeholder={"Enter here"}
                  value={poNumber}
                  onChangeText={text => {
                    if (text === "" || validatePONumber(text)) {
                      setPoNumber(text);
                    }
                  }}
                  style={styles.text}
                  returnKeyType="done"
                />
              </View>
            </NativeWrapper>
            <Text style={styles.infoText}>This information is mandatory and will be displayed on your invoice.</Text>
          </LoadingView>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={styles.checkoutButtonContainer}>
        <LargeButton textStyle={styles.largeButtonTextStyle} style={styles.largeButtonStyle} onPress={onReviewPress} btnText={"Review"} />
      </View>
    </MainContainer>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  poFromCart: state.cart.userCartDetail.purchaseOrderNumber,
  loading: state.cart.fetchingDeliveryInfo,
  orderType: state.branchList.selectedOrderType,
  cartData: state.cart,
  selectedBranch: state.branchList.selectedBranch,
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  selectedAddress: state.address ? state.address.selectedAddress : undefined,
  selectedAccountId: getSelectedAccountId(state),
  cartDetail: state.cart.userCartDetail,
  addressDistanceDriveTime: state.address.addressDistanceDriveTime,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  callUpdateAccountInfoAPI: (payload, callback) => dispatch(CartActions.requestSaveDeliveryInfoToUserSessionCart(payload, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(safeRender(AccountDetailsContainer, navigationalScreens.AccountDetailsScreen)));
