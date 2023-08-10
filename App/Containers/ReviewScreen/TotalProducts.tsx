import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { PermissionTypes } from "~root/Types/Permissions";
import styles from "./ReviewScreenStyle";

const TotalProducts: React.SFC = () => {
  const { orderType, totalPrice } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    totalPrice: state.cart.userCart.subTotal.value,
  }));
  return (
    orderType === OrderTypes.STANDARD && (
      <>
        <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
          <View style={styles.priceView}>
            <Text style={styles.totalText}>{"Total Products"}</Text>
            <PriceComponent style={[styles.totalText, styles.colorStyle]} value={totalPrice} prefix={"$"} {...accessibility("totalPrice")} />
          </View>
          <View style={styles.lineSeparator} />
        </PermissionComponent>
      </>
    )
  );
};

export default TotalProducts;
