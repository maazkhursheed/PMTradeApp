import firebase from "@react-native-firebase/app";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment, { Moment } from "moment";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartMenuCollapes from "~root/Components/CartMenuCollapes";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import {
  addContactErrorMsg,
  apiErrorBtnTxt,
  apiErrorMsg,
  cancelBtnTxt,
  loginErrBtnTxt,
  showAlertMessage,
  titleErr,
  titleGenericError,
  unableToAddContactTitle,
} from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, OrderTypes, SMSFlags } from "~root/Lib/BranchHelper";
import { getSelectedTimeRange, isSameContact } from "~root/Lib/CartHelper";
import { isToday } from "~root/Lib/CommonHelper";
import { getEarliestDateParam, getFulfilmentpageAnalyticsObj, getSelectedAccountId, incrementDayForDeliveryOrPickup } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ContactStreamlineAction } from "~root/Reducers/ContactStreamlineReducers";
import { RequestedTime } from "~root/Types/CommonTypes";
import { useCashCustomerStatus } from "../../Lib/QuoteHelper";
import FulfillmentDateTimeSelector from "./FulfillmentDateTimeSelector";
import FulfilmentAddressBranchView from "./FulfilmentAddressBranchView";
import FulfilmentContactView from "./FulfilmentContactView";
import FulfilmentContentFooter from "./FulfilmentContentFooter";
import styles from "./FulfilmentDetailsContainerStyles";
import FulfilmentLocation from "./FulfilmentLocation";

const FulfilmentContentView = () => {
  const { CashCustomerStatus } = useCashCustomerStatus();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { dispatchAlert } = useCustomAlert();
  const { cartDetail, selectedAccountId, selectedAddress, digitalId, eligibility, orderType, selectedBranch, userData, deliveryAddress, cartDetailData } =
    useSelector((state: RootState) => ({
      contacts: R.map(R.prop("code"))(state.cart.userCartDetail?.siteContacts || []),
      isLoading: state.quotes.fetching,
      orderType: state.branchList.selectedOrderType,
      selectedBranch: state.branchList.selectedBranch,
      userData: state.login.userData,
      loading: state.cart.fetchingDeliveryInfo,
      deliveryAddress: R.path(["cart", "userCartDetail", "deliveryAddress"], state),
      cartDetailData: state.cart.userCartDetail,
      eligibility: state.cart.eligibility,
      digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
      selectedAddress: state.address ? state.address.selectedAddress : undefined,
      selectedAccountId: getSelectedAccountId(state),
      cartDetail: state.cart.userCartDetail,
    }));
  const [previousBranchCode, setPreviousBranchCode] = useState(selectedBranch?.branchCode);
  const [isBranchChanged, setIsBranchChanged] = useState<boolean>(false);
  const [selectedTimeRange, setSelectedTimeRange] = React.useState(
    orderType === OrderTypes.STANDARD ? RequestedTime.ANYTIME : orderType === OrderTypes.PICKUP ? route.params?.selectedOption.earliestTime : "",
  );

  const [earliestSelectedDate, setEarliestSelectedDate] = useState(incrementDayForDeliveryOrPickup(route.params?.earliestDate, orderType));

  const onFailureGeoCode = useCallback((address: string) => {
    dispatchAlert?.({
      visible: true,
      heading: titleErr,
      msg: apiErrorMsg,
      button1Text: apiErrorBtnTxt,
      onButton1Press: () => {
        dispatchAlert?.({ visible: false });
        dispatch(
          AddressActions.requestGeocode(address, {
            onFailure: () => {
              onFailureGeoCode(address);
            },
          }),
        );
      },
      button2Text: cancelBtnTxt,
      onButton2Press: () => dispatchAlert?.({ visible: false }),
    });
  }, []);

  const requestGeoCode = useCallback((address: string, callBackSuccess: () => void) => {
    dispatch(
      AddressActions.requestGeocode(address, {
        onSuccess: (geocode: any) => {
          dispatch(AddressActions.setSelectedAddress(address));
          dispatch(AddressActions.requestAddUpdateDeliveryAddress({ address, geocode }, {}));
          if (callBackSuccess) {
            callBackSuccess();
          }
        },
        onFailure: () => {
          onFailureGeoCode(address);
        },
      }),
    );
  }, []);

  const showAddressFailureAlert = useCallback(() => {
    dispatchAlert?.({
      visible: true,
      heading: titleGenericError,
      msg: apiErrorMsg,
      button1Text: loginErrBtnTxt,
      onButton1Press: () => {
        dispatchAlert?.({ visible: false });
        callMountAPIs();
      },
      button2Text: cancelBtnTxt,
      onButton2Press: () => dispatchAlert?.({ visible: false }),
    });
  }, []);

  const callMountAPIs = useCallback(() => {
    if (orderType !== OrderTypes.PICKUP) {
      dispatch(
        AddressActions.requestPreviouslyUsedAddresses({
          onSuccess: firstAddress => {
            dispatch(AddressActions.requestGeocode(deliveryAddress?.formattedAddress || firstAddress, {}));
          },
          onFailure: showAddressFailureAlert,
        }),
      );
    }
    dispatch(
      ContactStreamlineAction.requestContacts({
        onSuccess: RA.noop,
        onFailure: RA.noop,
      }),
    );
  }, [deliveryAddress?.formattedAddress, dispatch, orderType, showAddressFailureAlert]);

  const logFirebaseEvent = useCallback((step: number, orderTypeLocal: string) => {
    const eventLogObject = getFulfilmentpageAnalyticsObj({
      step,
      orderTypeLocal,
      props: { digitalId, selectedAccountId, selectedAddress, cartDetail },
      location: getBranchTownRegion(selectedBranch),
      storeName: selectedBranch?.name,
    });
    if (!__DEV__) {
      firebase.analytics().logEvent("begin_checkout", eventLogObject);
    }
  }, []);

  const moveToNextStep = useCallback(() => {
    if (orderType === OrderTypes.STANDARD) {
      navigation.navigate("OptionalRequirements");
    } else {
      logFirebaseEvent(5, orderType);
      logFirebaseEvent(6, orderType);
      navigation.navigate("AccountDetails");
    }
    dispatch(
      CartActions.updateRequestDateTime({
        requestDate: earliestSelectedDate?.format("DD/MM/YYYY"),
        requestTime: getSelectedTimeRange(selectedTimeRange, earliestSelectedDate, orderType),
      }),
    );
  }, [dispatch, earliestSelectedDate, logFirebaseEvent, navigation, orderType, selectedTimeRange]);

  const selectContact = useCallback(
    (selectedContact: any, isMoveToNext: boolean = false) => {
      let payload = [selectedContact];
      let apiPayload = selectedContact;
      if (cartDetailData?.siteContacts?.length > 0) {
        if (orderType !== OrderTypes.STANDARD) {
          const firstObj = cartDetailData.siteContacts[0];
          payload = [
            {
              ...selectedContact,
              code: firstObj?.code,
            },
          ];
          apiPayload = payload[0];
        } else {
          payload = cartDetailData?.siteContacts?.map((siteContact: any) => {
            if (isSameContact(siteContact, selectedContact)) {
              apiPayload = {
                ...selectedContact,
                code: siteContact.code,
              };
              return apiPayload;
            } else {
              return siteContact;
            }
          });
        }
      }
      if (!apiPayload.lastName) {
        apiPayload.lastName = "";
      }
      dispatch(
        CartActions.requestSaveCartContactDetails(apiPayload, {
          onSuccess: () => {
            if (isMoveToNext) {
              moveToNextStep();
            }
          },
          onFailure: () => {
            showAlertMessage(unableToAddContactTitle, addContactErrorMsg, dispatchAlert);
          },
        }),
      );
    },
    [cartDetailData.siteContacts, dispatch, moveToNextStep, orderType],
  );

  const showAccountFailureAlert = useCallback(() => {
    dispatchAlert?.({
      visible: true,
      heading: titleGenericError,
      msg: apiErrorMsg,
      button1Text: loginErrBtnTxt,
      onButton1Press: () => {
        dispatchAlert?.({ visible: false });
        callUpdateAccountApi();
      },
      button2Text: cancelBtnTxt,
      onButton2Press: () => dispatchAlert?.({ visible: false }),
    });
  }, []);

  const callUpdateAccountApi = useCallback(() => {
    dispatch(
      CartActions.requestSaveDeliveryInfoToUserSessionCart(
        { poNumber: cartDetailData?.purchaseOrderNumber ?? "" },
        {
          onSuccess: () => {
            callMountAPIs();
          },
          onFailure: () => {
            showAccountFailureAlert();
          },
        },
      ),
    );
  }, [callMountAPIs, cartDetailData?.purchaseOrderNumber, showAccountFailureAlert]);

  useEffect(() => {
    if (orderType === OrderTypes.STANDARD) {
      // call api for delivery requirements
      dispatch(CartActions.requestDeliveryRequirements({}));
    }
  }, []);
  useEffect(() => {
    logFirebaseEvent(3, orderType);
    if (!cartDetailData.siteContacts?.length) {
      selectContact({
        firstName: userData.name,
        lastName: userData.lastName,
        mail: userData.uid,
        mobile: userData.mobileNumber,
        smsFlags:
          orderType === OrderTypes.PICKUP
            ? [SMSFlags.READY_FOR_PICKUP]
            : orderType === OrderTypes.STANDARD
            ? [SMSFlags.SCHEDULE_FOR_DELIVERY, SMSFlags.LEFT_BRANCH, SMSFlags.ON_ITS_WAY, SMSFlags.MISSED_DELIVERY]
            : [],
      });
    }
    if (cartDetailData?.deliveryMode) {
      callMountAPIs();
    }
  }, [callMountAPIs, cartDetailData?.deliveryMode, cartDetailData.siteContacts?.length, dispatch, logFirebaseEvent, orderType]);

  useEffect(() => {
    if (!cartDetailData?.deliveryMode) {
      dispatch(
        CartActions.updateRequestDateTime({
          requestDate: earliestSelectedDate?.format("DD/MM/YYYY"),
          requestTime: getSelectedTimeRange(selectedTimeRange, earliestSelectedDate, orderType),
        }),
      );
      callUpdateAccountApi();
    }
  }, [callUpdateAccountApi, selectedTimeRange, earliestSelectedDate, orderType]);

  useEffect(() => {
    if (previousBranchCode !== selectedBranch?.branchCode) {
      setPreviousBranchCode(selectedBranch?.branchCode);
      setIsBranchChanged(true);
      dispatch(CartActions.checkFulfilmentEligibility());
    }
    if (orderType === OrderTypes.PICKUP) {
      eligibility?.map((value: any) => {
        if (value.deliveryType === "PickUp") {
          const compareDate = moment(value.earliestDate + " " + value.earliestTime, "yyyy-MM-DD hh:mm A");
          if (earliestSelectedDate?.isBefore(compareDate)) {
            setEarliestSelectedDate(compareDate);
          }
        }
      });
    }
  }, [dispatch, earliestSelectedDate, eligibility, orderType, previousBranchCode, selectedBranch?.branchCode]);

  const onDateSelected = useCallback(
    date => {
      if (earliestSelectedDate.isSame(date, "d")) {
        setEarliestSelectedDate(date);
      } else {
        if (isToday(date)) {
          setEarliestSelectedDate(
            date
              .set("h", getEarliestDateParam(earliestSelectedDate, orderType, eligibility).get("h"))
              .set("m", getEarliestDateParam(earliestSelectedDate, orderType, eligibility).get("m")),
          );
        } else {
          setEarliestSelectedDate(date.set("h", 8).set("m", 0));
        }
      }
    },
    [earliestSelectedDate, eligibility, orderType],
  );

  const onTimeSelected = useCallback(
    (time: Moment) => {
      setSelectedTimeRange("");
      setEarliestSelectedDate(moment(earliestSelectedDate).set("h", time.get("h")).set("m", time.get("m")));
    },
    [earliestSelectedDate],
  );

  const onTimeRangeSelected = useCallback((timeRangeStr: string) => {
    setSelectedTimeRange(timeRangeStr);
  }, []);

  const continueTapped = useCallback(() => {
    logFirebaseEvent(4, orderType);
    moveToNextStep();
  }, [logFirebaseEvent, moveToNextStep, orderType]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.containerStyle}>
        {CashCustomerStatus && <CartMenuCollapes />}
        <FulfillmentDateTimeSelector
          selectedTimeRange={selectedTimeRange}
          earliestDate={earliestSelectedDate}
          onDateSelected={onDateSelected}
          onTimeSelected={onTimeSelected}
          onTimeRangeSelected={onTimeRangeSelected}
        />
        <FulfilmentAddressBranchView isBranchChanged={isBranchChanged} requestGeoCode={requestGeoCode} />
        <FulfilmentLocation />
        <FulfilmentContactView selectContact={selectContact} />
      </ScrollView>
      <FulfilmentContentFooter continueTapped={continueTapped} />
    </>
  );
};

export default FulfilmentContentView;
