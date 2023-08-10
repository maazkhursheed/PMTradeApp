import * as R from "ramda";
import * as React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "~root/Containers/CartView/CartViewStyle";
import { CARTAGE, EXCLUDING_GST, ITEMS, PAYON_CALLBACK, TO_BE_CONFIRMED } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { Colors } from "~root/Themes";
import CardPayLaterInfo from "./CardPayLaterInfo";

const CartFooterComponentCash = () => {
  const { entries, total, cart }: any = useSelector<RootState>(state => {
    return {
      entries: R.pathOr([], ["entries"])(state.cart.userCartDetail),
      total: R.pathOr(0, ["excludedItemsSubtotal", "formattedValue"])(state?.cart?.userCartDetail) as number,
    };
  });

  if (entries.length > 0) {
    return (
      <View style={{ backgroundColor: Colors.wildSandColor }}>
        <View style={styles.footerContainerCash}>
          <View style={styles.priceViewCash}>
            <Text style={styles.subTotalText}>{CARTAGE}</Text>
            <Text style={styles.deliveryValueCash}>{TO_BE_CONFIRMED}</Text>
          </View>
          <View style={styles.lineSeparatorCash} />
        </View>
        <CardPayLaterInfo title={`${PAYON_CALLBACK} (${entries?.length} ${ITEMS})`} description={EXCLUDING_GST} amount={total} />
      </View>
    );
  }
  return null;
};

export default CartFooterComponentCash;
