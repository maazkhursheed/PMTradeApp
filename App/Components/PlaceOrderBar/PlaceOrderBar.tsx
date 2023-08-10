import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import { accessibility } from "~root/Lib/DataHelper";
import { ApplicationStyles } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import styles from "./PlaceOrderBarStyle";

interface Props {
  priceTotal: number;
  onPlaceOrder: () => void;
  productPrice: any;
}

const PlaceOrderBar: React.SFC<Props> = ({ priceTotal, onPlaceOrder, productPrice }: Props) => (
  <View style={[ApplicationStyles.shadow, { marginBottom: 20 }, styles.containerPO]}>
    {productPrice && priceTotal > 0 ? (
      <View style={styles.placeOrderView}>
        <TouchableOpacity
          style={styles.iconViewPOBar}
          onPress={() => {
            onPlaceOrder();
          }}
          {...accessibility("placeOrderButton")}
        >
          <Text style={styles.placeOrderText}>Place order</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.placeOrderView}>
        <TouchableOpacity
          disabled={true}
          style={styles.iconViewPOBarDisable}
          onPress={() => {
            onPlaceOrder();
          }}
          {...accessibility("placeOrderButton")}
        >
          <Text style={styles.placeOrderText}>Place order</Text>
        </TouchableOpacity>
      </View>
    )}
    <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
      <View style={styles.subTotalView}>{<Text style={styles.subTotalText}>Total: NZ$ {!isNaN(priceTotal) ? priceTotal.toFixed(2) : "0.00"}</Text>}</View>
    </PermissionComponent>
  </View>
);

export default PlaceOrderBar;
