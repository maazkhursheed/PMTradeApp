import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CartLearnMoreTab from "~root/Components/CartLearnMoreTab";
import ReviewCartItem from "~root/Components/ReviewCartItem/ReviewCartItem";
import { BoldText, LEARN_MORE, PAYON_CALLBACK, SO1_DESCRIPTION_LINK_MSG, SO1_DESCRIPTION_LINK_MSG1, SPECIAL_ORDER } from "~root/Lib/AlertsHelper";
import { Colors } from "~root/Themes";
import styles from "./CartPayOnCallBackStyle";

interface Props {
  values?: any;
  entries?: any;
  containerStyle?: ViewProps;
  direction?: string;
  showCollapaseHeader: boolean;
}

const CartPayOnCallBack: React.FunctionComponent = ({ values, containerStyle, entries, direction, showCollapaseHeader }: Props) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={[styles.container, containerStyle]}>
      {direction === "CartPayOnCallBack" ? (
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
      ) : showCollapaseHeader ? (
        <Text style={styles.payingNowText}>Paying Today</Text>
      ) : (
        <></>
      )}

      {values?.length > 0 ? (
        values.map((item: any) => (
          <ReviewCartItem
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
        <></>
      )}
    </ScrollView>
  );
};

export default CartPayOnCallBack;
