import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import DeliveryOptionsItem from "~root/Components/DeliveryOptionsItem";
import { deliveryOptionBranchSwitchHeading, deliveryOptionBranchSwitchMessage } from "~root/Lib/AlertsHelper";
import { OrderTypes, OrderTypesCapital } from "~root/Lib/BranchHelper";
import { branchSwitchAlert, checkIsOptionAvailable, getTime, isNotHomeBranch } from "~root/Lib/CartHelper";
import { convertEligibilityToOrderType, getImage, getTitle } from "~root/Lib/OrderItemHelper";
import { useCashCustomerStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { CartActions } from "~root/Reducers/CartReducer";

interface OwnProps {
  logFirebaseEvent: (step: number, orderType: string) => void;
}
type Props = OwnProps;
const DeliveryOptions: React.SFC<Props> = ({ logFirebaseEvent }: Props) => {
  const { selectedBranch, myBranches, orderType, contacts, eligibility } = useSelector((state: RootState) => ({
    selectedBranch: state.branchList?.selectedBranch,
    myBranches: state.branchList?.dataDepots,
    contacts: R.map(R.prop("code"))(state?.cart?.userCartDetail?.siteContacts || []),
    orderType: state.branchList?.selectedOrderType,
    eligibility: state.cart?.eligibility,
  }));
  const { CashCustomerStatus } = useCashCustomerStatus();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const orderTypes = [OrderTypesCapital.DELIVERY, OrderTypesCapital.COURIER, OrderTypesCapital.PICKUP];
  const onContinueSuccess = React.useCallback((value: any) => {
    switch (value.deliveryType) {
      case "Delivery":
        standardClick(moment(value.earliestDate + " 08:00 AM", "yyyy-MM-DD hh:mm A"));
        break;
      case "Courier":
        courierClick(moment(value.earliestTime, "hh:mm A"));
        break;
      case "PickUp":
        pickUp(moment(value.earliestDate + " " + value.earliestTime, "yyyy-MM-DD hh:mm A"), value);
        break;
    }
  }, []);

  const standardClick = React.useCallback((earliestDate: any) => {
    logFirebaseEvent(2, OrderTypes.STANDARD);
    if (isNotHomeBranch(selectedBranch, myBranches)) {
      branchSwitchAlertFunction();
    } else {
      dispatch(BranchDetailsActions.setOrderType(OrderTypes.STANDARD));
      navigation.navigate("FulfilmentDetails", { earliestDate });
    }
  }, []);
  const courierClick = React.useCallback((earliestDate: any) => {
    logFirebaseEvent(2, OrderTypes.EXPRESS);

    if (isNotHomeBranch(selectedBranch, myBranches)) {
      branchSwitchAlertFunction();
    } else {
      dispatch(BranchDetailsActions.setOrderType(OrderTypes.EXPRESS));
      navigation.navigate("FulfilmentDetails", { earliestDate });
    }
  }, []);
  const pickUp = React.useCallback((earliestDate: any, eligilibilityItem: any) => {
    if (!__DEV__) {
      logFirebaseEvent(2, OrderTypes.PICKUP);
    }

    dispatch(BranchDetailsActions.setOrderType(OrderTypes.PICKUP));
    navigation.navigate("FulfilmentDetails", {
      earliestDate,
      selectedOption: eligilibilityItem,
    });
  }, []);

  const getParentBranch = React.useCallback(R.always(R.head(myBranches || [])), [myBranches]);
  const branchSwitchAlertFunction = () => {
    branchSwitchAlert(
      deliveryOptionBranchSwitchHeading,
      deliveryOptionBranchSwitchMessage,
      () => {
        dispatch(BranchDetailsActions.onSelectBranch(getParentBranch()));
        setTimeout(() => {
          dispatch(CartActions.checkFulfilmentEligibility());
        }, 10);
      },
      dispatchAlert,
    );
  };

  const onPressDeliveryOptionsItem = React.useCallback(
    value => {
      if (contacts?.length && orderType !== convertEligibilityToOrderType(value.deliveryType)) {
        dispatch(
          CartActions.deleteSiteContactDetails(contacts, {
            onSuccess: () => onContinueSuccess(value),
          }),
        );
      } else {
        onContinueSuccess(value);
      }
    },
    [contacts, dispatch, onContinueSuccess, orderType],
  );

  return (
    <>
      {eligibility &&
        orderTypes?.map(value => {
          const eligilibilityItem = R.find(R.propEq("deliveryType", value))(eligibility);
          if (CashCustomerStatus && value === "Courier") {
            return null;
          }
          return (
            <DeliveryOptionsItem
              key={value}
              optionAvailable={eligilibilityItem ? checkIsOptionAvailable(eligilibilityItem, selectedBranch, myBranches) : false}
              image={getImage(convertEligibilityToOrderType(value))}
              title={getTitle(convertEligibilityToOrderType(value))}
              time={
                eligilibilityItem
                  ? getTime(
                      value,
                      eligilibilityItem?.earliestTime,
                      eligilibilityItem?.earliestDate,
                      eligilibilityItem?.eligibleToOrder,
                      selectedBranch,
                      myBranches,
                    )
                  : "This option is not available for this order"
              }
              onPress={() => {
                if (eligilibilityItem) {
                  onPressDeliveryOptionsItem(eligilibilityItem);
                }
              }}
            />
          );
        })}
    </>
  );
};
export default DeliveryOptions;
