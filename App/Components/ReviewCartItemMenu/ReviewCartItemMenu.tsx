import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { useCallback, useRef } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import CartCollapseHeaderSegment from "~root/Components/CartCollapseHeaderSegment/CartCollapseHeaderSegment";
import { RootState } from "~root/Reducers";
import { BoldText, LEARN_MORE, PAYON_CALLBACK, SO1_DESCRIPTION_LINK_MSG, SO1_DESCRIPTION_LINK_MSG1, SPECIAL_ORDER } from "../../Lib/AlertsHelper";
import { Colors } from "../../Themes";
import CartLearnMoreTab from "../CartLearnMoreTab";
import ReviewCartItem from "../ReviewCartItem";
import styles from "./ReviewCartItemMenuStyle";

interface Props {}
const ReviewCartItemMenu: React.FunctionComponent = ({}: Props) => {
  const navigation = useNavigation();
  const { entries, payNowDetails, payCallBackDetails } = useSelector((state: RootState) => ({
    entries: R.pathOr([], ["entries"])(state?.cart?.userCartDetail),
    payNowDetails: state?.cart?.payNowDetails,
    payCallBackDetails: state?.cart?.payCallBackDetails,
    excludedItemsSubtotal: R.pathOr(0, ["excludedItemsSubtotal", "formattedValue"])(state?.cart?.userCartDetail) as number,
    totalPrice: R.pathOr(0, ["subTotal", "value"])(state?.cart?.userCartDetail) as number,
    subTotalPrice: ((R.pathOr(0, ["subTotal", "value"])(state?.cart?.userCartDetail) as number) +
      R.pathOr(0, ["totalDiscounts", "value"])(state?.cart?.userCartDetail)) as number,
  }));

  const headerLocalOptions = useRef([
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

  React.useEffect(() => {
    inputInitialValue();
  }, []);

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

  const renderItems = (Items: any) => {
    return (
      <View>
        {Items.length > 0 ? (
          Items.map((item: any, index: any) => (
            <ReviewCartItem
              key={index}
              item={item}
              containerStyle={styles.reviewItemWrap}
              getItemBySKU={sku => {
                let cartItem = item;
                entries.forEach((entry: any) => {
                  if (entry.product.code === sku) {
                    cartItem = entry;
                  }
                });
                return cartItem;
              }}
            />
          ))
        ) : (
          <View />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer]}>
      <CartCollapseHeaderSegment selected={segmentValue} onSelected={setSegmentValue} values={headerOptions} />
      {segmentValue === headerLocalOptions?.current?.[1]?.title && (
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
          containerStyle={styles.cartLearnMoreContainer}
        />
      )}
      {renderItems(segmentValue === headerLocalOptions?.current?.[0]?.title ? payNowDetails : payCallBackDetails)}
      <View style={styles.separator} />
    </View>
  );
};

export default ReviewCartItemMenu;
