// Styles
import * as R from "ramda";
import * as React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LargeButton from "~root/Components/LargeButton";
import LoadingView from "~root/Components/LoadingView";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import { EXCLUDING_GST_DES, genericErrorMessage, PAYNOW_TEXT, PAYON_CALLBACK } from "~root/Lib/AlertsHelper";
import { isItemUpdatingOrDeleting } from "~root/Lib/CartHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { PermissionTypes } from "~root/Types/Permissions";
import { RootState } from "../../Reducers";
import styles from "./CartViewStyle";

interface OwnProps {
  checkoutTapped?: () => void;
  isScrolledToBottom?: any;
  cashCustomerData?: any;
}

const RenderCheckoutView = ({ isScrolledToBottom, checkoutTapped, cashCustomerData = {} }: OwnProps) => {
  const { itemDeleteMap, isLoading, totalPrice, itemUpdateMap, payOnCallTotalPrice }: any = useSelector<RootState>(state => {
    const payOnCallTotalPrice = R.pathOr(0, ["excludedItemsSubtotal", "formattedValue"])(state.cart.userCartDetail) as number;
    const total = R.pathOr(0, ["subTotal", "value"])(state.cart.userCartDetail) as number;
    return {
      itemUpdateMap: state.cart.itemUpdateMap,
      itemDeleteMap: state.cart.itemDeleteMap,
      payOnCallTotalPrice: payOnCallTotalPrice,
      totalPrice: total,
      isLoading: state?.cart?.fetching,
    };
  });
  const { isPayLater, isCashCustomer, payNowCount, payOnCallBackCount } = cashCustomerData;
  const dispatch = useDispatch();
  const txtTotal = isScrolledToBottom ? "All prices are exclusive of GST" : "Total :";

  const renderPriceView = React.useCallback(
    (text, value, direction = "") => {
      return (
        <View style={styles.priceViewWrapper}>
          <Text {...accessibility("txtTotal")} style={styles.gstText}>
            {text}
            {":"}
          </Text>
          <PriceComponent style={styles.gstPrice} value={value} {...accessibility("totalProductPricePayLater")} />
          {direction === "bothCallPay&CallBack" && (
            <>
              <Text style={styles.gstText}>{" | " + PAYON_CALLBACK + ": "}</Text>
              <PriceComponent style={styles.gstPrice} value={payOnCallTotalPrice} {...accessibility("totalProductPricePayLater")} />
            </>
          )}
          <Text style={styles.gstExclusiveText}>{EXCLUDING_GST_DES}</Text>
        </View>
      );
    },
    [cashCustomerData],
  );

  const getTxtTotalText = React.useCallback(() => {
    if (isPayLater) {
      return renderPriceView(PAYON_CALLBACK, payOnCallTotalPrice);
    } else if (payNowCount > 0 && payOnCallBackCount > 0) {
      return renderPriceView(PAYNOW_TEXT, totalPrice, "bothCallPay&CallBack");
    } else if (payNowCount > 0) {
      return renderPriceView(PAYNOW_TEXT, totalPrice);
    }
  }, [cashCustomerData]);

  return (
    <View style={[styles.checkoutButtonContainer, { shadowOpacity: isScrolledToBottom ? 0 : 0.25 }]}>
      <LargeButton
        textStyle={styles.largeButtonTextStyle}
        style={styles.largeButtonStyle}
        onPress={() => {
          dispatch(LoginActions.getUserInfo(undefined, { onSuccess: checkoutTapped, onFailure: () => alert(genericErrorMessage) }));
        }}
        btnText={"Checkout"}
        disabled={isLoading}
      />
      <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
        <LoadingView
          style={styles.loadingViewStyle}
          isLoading={isItemUpdatingOrDeleting({
            itemUpdateMap,
            itemDeleteMap,
          })}
          hideViewOnLoading={true}
        >
          <View style={styles.subTotalView}>
            {isCashCustomer ? (
              getTxtTotalText()
            ) : (
              <>
                <Text {...accessibility("txtTotal")} style={styles.gstText}>
                  {txtTotal}
                  {isPayLater && <Text style={styles.gstExclusiveText}>{EXCLUDING_GST_DES}</Text>}
                </Text>
                {!isScrolledToBottom && <PriceComponent style={styles.gstPrice} value={totalPrice} {...accessibility("totalProductPricePayLater")} />}
              </>
            )}
          </View>
        </LoadingView>
      </PermissionComponent>
    </View>
  );
};

export default RenderCheckoutView;
