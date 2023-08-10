// Styles
import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { InteractionManager, NativeScrollEvent, NativeSyntheticEvent, Platform, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import BigBlueHeader from "~root/Components/BigBlueHeader/BigBlueHeader";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import EmptyList from "~root/Components/EmptyList";
import { CART_PAY_ON_CALL_SUB_TITLE, checkoutMasterOnHoldMessage, creditLimitError, OKButton } from "~root/Lib/AlertsHelper";
import { navigationalScreens, TradeAccounts } from "~root/Lib/BranchHelper";
import { removeDeletedCartItems } from "~root/Lib/CartHelper";
import { checkOrderCreditLimit } from "~root/Lib/OrderSummaryHelper";
import { getSpecialFromCartResponse, getSpecialProducts } from "~root/Lib/ProductHelper";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { CartActions } from "~root/Reducers/CartReducer";
import { PermissionTypes } from "~root/Types/Permissions";
import { RootState } from "../../Reducers";
import CartList from "./CartList";
import styles from "./CartViewStyle";
import RenderCheckoutView from "./RenderCheckoutView";

const CartView = () => {
  const [isScrolledToBottom, setIsScrolledToBottom] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { selectedBranch, selectedJobAccount, selectedTradeAccount, entries, subTotalPrice, creditLimit, itemDeleteMap }: any = useSelector<RootState>(
    state => {
      const total = R.pathOr(0, ["subTotal", "value"])(state.cart.userCartDetail) as number;
      const discount = R.pathOr(0, ["totalDiscounts", "value"])(state.cart.userCartDetail) as number;
      const subTotal = total + discount;

      return {
        selectedBranch: state.branchList.selectedBranch,
        selectedJobAccount: state.jobAccounts.selectedJobAccount,
        selectedTradeAccount: state.connectTrade.selectedTradeAccount,
        entries: R.pathOr([], ["entries"])(state.cart.userCartDetail),
        isLoading: state.cart.fetching,
        totalPrice: total,
        subTotalPrice: subTotal,
        creditLimit: state.permission.availablePermissions[PermissionTypes.CreditLimit],
        itemUpdateMap: state.cart.itemUpdateMap,
        itemDeleteMap: state.cart.itemDeleteMap,
      };
    },
  );

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => dispatch(CartActions.requestUserCart()));
  }, []);

  React.useEffect(() => {
    if (selectedTradeAccount || selectedJobAccount || selectedJobAccount?.JobNumber || selectedBranch || selectedBranch?.branchID) {
      InteractionManager.runAfterInteractions(() => dispatch(CartActions.requestUserCart()));
    }
  }, [selectedTradeAccount, selectedJobAccount, selectedBranch, selectedJobAccount?.JobNumber, selectedBranch?.branchID]);

  const checkoutTapped = () => {
    if (selectedTradeAccount.masterOnHold) {
      Toast.show({
        text1: checkoutMasterOnHoldMessage,
        text2: "",
        type: "error",
        topOffset: Platform.OS === "ios" ? 52 : 12,
        visibilityTime: 3000,
      });
    } else if (checkOrderCreditLimit({ subTotal: subTotalPrice, creditLimit })) {
      setVisible(true);
    } else {
      navigation.navigate("DeliveryOptions");
    }
  };

  const renderEmptyView = () => {
    return (
      <EmptyList
        linkText={"Browse all products"}
        title={"Start adding \nproducts to this \nCart"}
        onPress={() => {
          navigation.navigate("OrderProduct", {
            categoryId: ":Sort By:category:root",
          });
        }}
      />
    );
  };

  const getCartSectionedData = (totalEntry: any) => {
    const isCashCustomer = selectedTradeAccount.accountTypeEnum === TradeAccounts.CASH;
    const specialProductsEntries = R.filter(isCashCustomer ? getSpecialProducts : getSpecialFromCartResponse)(totalEntry) as any[];
    const standardProductsEntries = R.reject(isCashCustomer ? getSpecialProducts : getSpecialFromCartResponse)(totalEntry) as any[];

    const payload = {
      isPayLater: isCashCustomer && standardProductsEntries?.length === 0 && specialProductsEntries.length > 0,
      isCashCustomer,
      payNowCount: isCashCustomer ? standardProductsEntries.length : 0,
      payOnCallBackCount: isCashCustomer ? specialProductsEntries.length : 0,
    };

    const sectionedData = [] as any;
    if (specialProductsEntries.length > 0) {
      sectionedData.push({
        title: isCashCustomer ? "Pay on Callback" : "Special orders",
        subTitle: isCashCustomer ? CART_PAY_ON_CALL_SUB_TITLE : "",
        data: specialProductsEntries,
      });
    }
    if (standardProductsEntries.length > 0) {
      sectionedData.push({
        title: isCashCustomer ? "Pay Now" : "Standard products",
        data: standardProductsEntries,
      });
    }
    return { data: sectionedData, cashCustomerData: payload };
  };

  const totalEntries = removeDeletedCartItems({
    itemDeleteMap,
    entries,
  });

  const { data: entry, cashCustomerData }: any = getCartSectionedData(totalEntries);

  return (
    <AnimationProvider>
      <BigBlueHeader title={"Cart"} />
      <View style={styles.container}>
        {!entry?.length && renderEmptyView()}
        {!!entry?.length && (
          <CartList
            handleScroll={(nativeScroll: NativeSyntheticEvent<NativeScrollEvent>) => {
              if (nativeScroll.nativeEvent) {
                const { layoutMeasurement, contentOffset, contentSize } = nativeScroll.nativeEvent;
                const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
                const pixelsFromBottom = 60;
                const is50pxFromBottom = layoutMeasurement.height + contentOffset.y <= contentSize.height - pixelsFromBottom;
                if (isBottom && !isScrolledToBottom) {
                  setIsScrolledToBottom(true);
                } else if (is50pxFromBottom && isScrolledToBottom) {
                  setIsScrolledToBottom(false);
                }
              }
            }}
            entries={entry}
            cashCustomerData={cashCustomerData}
          />
        )}
        {!!entry.length && <RenderCheckoutView checkoutTapped={checkoutTapped} isScrolledToBottom={isScrolledToBottom} cashCustomerData={cashCustomerData} />}
      </View>
      <CustomAlert
        heading={""}
        msg={creditLimitError}
        visible={visible}
        onClose={() => setVisible(false)}
        button1Text={OKButton}
        onButton1Press={() => setVisible(false)}
      />
    </AnimationProvider>
  );
};

export default withAppender(safeRender(CartView, navigationalScreens.CartScreen));
