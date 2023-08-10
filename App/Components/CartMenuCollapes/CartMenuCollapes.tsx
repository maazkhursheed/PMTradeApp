import { StackActions, useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Animated, { EasingNode, Transition, Transitioning } from "react-native-reanimated";
import { useSelector } from "react-redux";
import CartCollapseHeaderSegment from "~root/Components/CartCollapseHeaderSegment/CartCollapseHeaderSegment";
import CartMenuCollapesHeader from "~root/Components/CartMenuCollapesHeader";
import CartPayOnCallBack from "~root/Components/CartPayOnCallBack/CartPayOnCallBack";
import NativeWrapper from "~root/Components/NativeWrapper";
import { RootState } from "~root/Reducers";
import styles from "./CartMenuCollapesStyle";

interface Props {
  showCollapaseHeader?: boolean;
  showEditButton?: boolean;
}
const CartMenuCollapes: React.FunctionComponent = ({ showCollapaseHeader = true, showEditButton = true }: Props) => {
  const navigation = useNavigation();
  const { entries, payNowDetails, payCallBackDetails, excludedItemsSubtotal, totalPrice, subTotalPrice } = useSelector((state: RootState) => ({
    entries: R.pathOr([], ["entries"])(state?.cart?.userCartDetail),
    payNowDetails: state?.cart?.payNowDetails,
    payCallBackDetails: state?.cart?.payCallBackDetails,
    excludedItemsSubtotal: R.pathOr(0, ["excludedItemsSubtotal", "formattedValue"])(state?.cart?.userCartDetail) as number,
    totalPrice: R.pathOr(0, ["subTotal", "value"])(state?.cart?.userCartDetail) as number,
    subTotalPrice: ((R.pathOr(0, ["subTotal", "value"])(state?.cart?.userCartDetail) as number) +
      R.pathOr(0, ["totalDiscounts", "value"])(state?.cart?.userCartDetail)) as number,
  }));
  let headerLocalOptions = useRef([
    {
      title: "Pay Now",
      count: 0,
    },
    {
      title: "Pay on Callback",
      count: 0,
    },
  ]);

  const [headerOptions, setHeaderOptions] = React.useState(headerLocalOptions?.current);
  const [segmentValue, setSegmentValue] = React.useState(headerLocalOptions?.current?.[0]?.title);
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  let animationHeight = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    inputInitialValue();
  }, []);

  React.useEffect(() => {
    animationHeight.setValue(0);
    if (!isCollapsed) {
      Animated.timing(animationHeight, {
        duration: 500,
        toValue: 500,
        easing: EasingNode.linear,
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 500,
        toValue: 0,
        easing: EasingNode.linear,
      }).start();
    }
  }, [isCollapsed]);

  const trans = useRef();
  const transation = (
    <Transition.Together>
      <Transition.Change />
    </Transition.Together>
  );

  const inputInitialValue = useCallback(() => {
    const data = headerOptions;
    if (payNowDetails?.length > 0) {
      data[0].count = payNowDetails?.length;
      setSegmentValue(headerLocalOptions?.current?.[0]?.title);
    } else {
      data[0].count = 0;
      setSegmentValue(headerLocalOptions?.current?.[1]?.title);
    }
    data[1].count = payCallBackDetails?.length > 0 ? payCallBackDetails?.length : 0;
    setHeaderOptions(data);
  }, [payNowDetails, payCallBackDetails]);

  useEffect(() => {
    if (!showCollapaseHeader) {
      setIsCollapsed(false);
    }
  }, [showCollapaseHeader]);

  const onClickCartHeader = (value, trans) => {
    setSegmentValue(value);
    trans.current.animateNextTransition();
  };

  return (
    <View style={[styles.mainContainer]}>
      {showCollapaseHeader && (
        <CartMenuCollapesHeader
          collapsed={isCollapsed}
          onPressed={() => {
            setIsCollapsed(!isCollapsed);
          }}
          headerText={`Cart (${entries?.length})`}
          total={payNowDetails?.length > 0 ? totalPrice : excludedItemsSubtotal}
        />
      )}
      {!isCollapsed && (
        <Animated.View style={[!showCollapaseHeader && styles.cartContainer, { maxHeight: animationHeight }]}>
          <Transitioning.View transition={transation} ref={trans}>
            <CartCollapseHeaderSegment selected={segmentValue} onSelected={value => onClickCartHeader(value, trans)} values={headerOptions} />
            <Animated.View style={styles.cartContentWrapper}>
              <CartPayOnCallBack
                values={segmentValue === headerLocalOptions?.current?.[0]?.title ? payNowDetails : payCallBackDetails}
                entries={entries}
                direction={segmentValue === headerLocalOptions?.current?.[0]?.title ? "payNowDetails" : "CartPayOnCallBack"}
                showCollapaseHeader={showCollapaseHeader}
              />
            </Animated.View>
            {showEditButton && (
              <NativeWrapper
                onPress={() => {
                  navigation.dispatch(StackActions.popToTop());
                }}
                style={styles.editCartWrapper}
              >
                <Text style={[styles.editCartText]}>Edit Cart</Text>
              </NativeWrapper>
            )}
          </Transitioning.View>
        </Animated.View>
      )}
      <View style={styles.separator} />
    </View>
  );
};

export default CartMenuCollapes;
