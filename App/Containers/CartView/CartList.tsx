import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareSectionList } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import CartItem from "~root/Components/CartItem/CartItem";
import CartLearnMoreTab from "~root/Components/CartLearnMoreTab";
import CartSectionHeader from "~root/Components/CartSectionHeader";
import CustomIcon from "~root/Components/CustomIcon";
import PromoCodeSwitch from "~root/Components/PromoCodeSwitch";
import RequestAnItem from "~root/Components/RequestAnItem/RequestAnItem";
import CartFooterComponent from "~root/Containers/CartView/CartFooterComponent";
import CartFooterComponentCash from "~root/Containers/CartView/CartFooterComponentCash";
import styles from "~root/Containers/CartView/CartViewStyle";
import {
  BoldText,
  DISCLOSURE_TEXT_CART,
  DISCLOSURE_TEXT_CART_CONSTRAINED,
  EXCLUDING_GST,
  ITEMS,
  LEARN_MORE,
  PAYON_CALLBACK,
  SO1_DESCRIPTION_LINK_MSG,
  SO1_DESCRIPTION_LINK_MSG1,
  SPECIAL_ORDER,
} from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { Colors } from "~root/Themes";
import { SwapContext } from "../../Components/MaterialsDetailsListing/MaterilasDetailsListing";
import CardPayLaterInfo from "./CardPayLaterInfo";
export interface Props {
  entries: any[];
  handleScroll?: any;
  ref?: any;
  cashCustomerData?: any;
}

const GetCashCustomerLayout = ({ cashCustomerData, excludedItemsTotal }) => {
  const { isPayLater, payNowCount, payOnCallBackCount } = cashCustomerData;
  return isPayLater ? (
    <CartFooterComponentCash />
  ) : payNowCount > 0 && payOnCallBackCount > 0 ? (
    <>
      <CartFooterComponent />
      <View style={{ backgroundColor: Colors.wildSandColor }}>
        <CardPayLaterInfo title={`${PAYON_CALLBACK} (${payOnCallBackCount} ${ITEMS})`} description={EXCLUDING_GST} amount={excludedItemsTotal} />
      </View>
    </>
  ) : (
    <CartFooterComponent />
  );
};

const CartList: React.FC<Props> = forwardRef((props, fRef) => {
  const { entries, handleScroll, cashCustomerData = {} } = props;
  const navigation = useNavigation();
  const { cartDetails, excludedItemsTotal }: any = useSelector<RootState>(state => ({
    cartDetails: state.cart.userCartDetail,
    excludedItemsTotal: R.pathOr(0, ["excludedItemsSubtotal", "formattedValue"])(state?.cart?.userCartDetail) as number,
  }));
  const lastSection = entries[entries.length - 1];
  const ref = useRef<any>(undefined);
  const { isPayLater, isCashCustomer, payOnCallBackCount, payNowCount } = cashCustomerData;
  useImperativeHandle(fRef, () => ({ scrollToEnd: ref.current?.scrollToEnd }));
  const showSpecialOrderMsg = isCashCustomer && payOnCallBackCount > 0 ? true : false;

  return (
    <SwapContext.Provider
      value={{
        onSwapSuccess: () => {},
      }}
    >
      <KeyboardAwareSectionList
        ref={ref}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        sections={entries}
        keyExtractor={(item: any) => item?.product?.code + item?.entryNumber}
        renderItem={({ item }: any) => <CartItem item={item} />}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }: any) => {
          return (
            <CartSectionHeader
              numberOfProducts={section.data.length}
              title={section.title}
              subTitle={section?.subTitle}
              isSpecial={section.title === "Special orders"}
              isInfoTag={section.title === "Pay on Callback"}
            />
          );
        }}
        ListHeaderComponent={
          <View>
            {showSpecialOrderMsg && (
              <CartLearnMoreTab
                title={
                  <>
                    <BoldText>{SPECIAL_ORDER}</BoldText>
                    <Text>{" (" + PAYON_CALLBACK + ")"}</Text>
                  </>
                }
                subtitle={
                  <>
                    <Text>{SO1_DESCRIPTION_LINK_MSG}</Text>
                    <BoldText>{" " + SO1_DESCRIPTION_LINK_MSG1 + " "}</BoldText>
                  </>
                }
                iconColor={Colors.lightGreen}
                iconName={"info"}
                linkUrlTitle={LEARN_MORE}
                linkUrlTitleStyle={{ color: Colors.lightGreen }}
                onClickLinkUrl={() => navigation.navigate("SpecialOrderInfoScreenContainer")}
              />
            )}
            {cartDetails?.constrainedProductExist && (
              <View style={styles.headerRowInstructionsConstrained}>
                <CustomIcon style={styles.infoIconConstrained} name={"info"} />
                <Text style={styles.disclosureText}>{DISCLOSURE_TEXT_CART_CONSTRAINED}</Text>
              </View>
            )}
            {cartDetails.estimatesIncluded && (
              <View style={styles.headerRowInstructions}>
                <CustomIcon style={styles.infoIcon} name={"info"} />
                <Text style={styles.disclosureText}>{DISCLOSURE_TEXT_CART}</Text>
              </View>
            )}
          </View>
        }
        renderSectionFooter={({ section }: any) => (
          <View>
            <View style={styles.separator} />
            {section.title === lastSection.title && (
              <>
                <RequestAnItem />
                {!isPayLater && (
                  <>
                    <PromoCodeSwitch
                      onDeleteOrApplyVoucher={() => {
                        ref.current?.scrollToEnd();
                      }}
                    />
                    <View style={styles.separator} />
                  </>
                )}
              </>
            )}
          </View>
        )}
        ListFooterComponent={() =>
          !isCashCustomer ? <CartFooterComponent /> : <GetCashCustomerLayout cashCustomerData={cashCustomerData} excludedItemsTotal={excludedItemsTotal} />
        }
      />
    </SwapContext.Provider>
  );
});

export default CartList;
