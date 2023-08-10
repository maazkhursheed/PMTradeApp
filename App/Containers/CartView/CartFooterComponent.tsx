import * as R from "ramda";
import * as React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import EstimateProductDisclosure from "~root/Components/EstimateProductDisclosure";
import LoadingView from "~root/Components/LoadingView";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import styles from "~root/Containers/CartView/CartViewStyle";
import { DISCLOSURE_TEXT_CART_BOTTOM } from "~root/Lib/AlertsHelper";
import { isItemUpdatingOrDeleting, isVoucherApplied } from "~root/Lib/CartHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { PermissionTypes } from "~root/Types/Permissions";

const CartFooterComponent = () => {
  const { itemDeleteMap, totalPrice, discountPrice, isPromoApplied, itemUpdateMap, entries, subTotalPrice }: any = useSelector<RootState>(state => {
    const total = R.pathOr(0, ["subTotal", "value"])(state.cart.userCartDetail) as number;
    const discount = R.pathOr(0, ["totalDiscounts", "value"])(state.cart.userCartDetail) as number;
    const subTotal = total + discount;

    return {
      itemUpdateMap: state.cart.itemUpdateMap,
      itemDeleteMap: state.cart.itemDeleteMap,
      entries: R.pathOr([], ["entries"])(state.cart.userCartDetail),
      subTotalPrice: subTotal,
      isPromoApplied: isVoucherApplied(state.cart),
      discountPrice: discount,
      totalPrice: total,
    };
  });

  if (entries.length > 0) {
    return (
      <View style={styles.footerContainer}>
        <PermissionComponent
          style={styles.permissionViewStyle}
          hideView={true}
          permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
        >
          <View style={styles.priceView}>
            <Text style={styles.subTotalText}>{"Subtotal"}</Text>
            <LoadingView
              style={styles.loadingViewStyle}
              isLoading={isItemUpdatingOrDeleting({
                itemUpdateMap,
                itemDeleteMap,
              })}
              hideViewOnLoading={true}
            >
              <PriceComponent style={styles.subTotalPrice} value={subTotalPrice} {...accessibility("subTotalPrice")} />
            </LoadingView>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.priceView}>
            <Text style={styles.subTotalText}>{"Cartage"}</Text>
            <LoadingView
              style={styles.loadingViewStyle}
              isLoading={isItemUpdatingOrDeleting({
                itemUpdateMap,
                itemDeleteMap,
              })}
              hideViewOnLoading={true}
            >
              <Text style={styles.deliveryValue}>{"Calculated at checkout"}</Text>
            </LoadingView>
          </View>

          <View style={styles.lineSeparator} />
          {isPromoApplied && (
            <View>
              <View style={styles.priceView}>
                <Text style={styles.subTotalText}>{"Total Discount"}</Text>
                <LoadingView
                  style={styles.loadingViewStyle}
                  isLoading={isItemUpdatingOrDeleting({
                    itemUpdateMap,
                    itemDeleteMap,
                  })}
                  hideViewOnLoading={true}
                >
                  <View style={styles.discountPriceView}>
                    <CustomIcon name={"Tag-icon"} style={styles.tagIconStyle} />
                    <View>
                      <PriceComponent {...accessibility("discountPrice")} style={styles.subTotalPrice} value={`${discountPrice}`} prefix={"-$"} />
                    </View>
                  </View>
                </LoadingView>
              </View>
              <View style={styles.lineSeparator} />
            </View>
          )}
          <View style={styles.priceView}>
            <Text style={styles.totalText}>{"Total"}</Text>
            <LoadingView
              style={styles.loadingViewStyle}
              isLoading={isItemUpdatingOrDeleting({
                itemUpdateMap,
                itemDeleteMap,
              })}
              hideViewOnLoading={true}
            >
              <PriceComponent style={styles.totalPrice} value={totalPrice} {...accessibility("totalPrice")} />
            </LoadingView>
          </View>
          <View style={styles.lineSeparator} />
        </PermissionComponent>
        <EstimateProductDisclosure style={styles.disclosureContainer} disClosureText={DISCLOSURE_TEXT_CART_BOTTOM} />
      </View>
    );
  }
  return null;
};

export default CartFooterComponent;
