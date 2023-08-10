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

const TotalDelivery: React.FC = () => {
  const { orderType, totalDeliveryCost, hasFreightCalculated } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    totalDeliveryCost: state.cart?.userCartDetail?.deliveryCost?.value || 0,
    hasFreightCalculated: state.cart?.userCartDetail?.freightCalculated,
  }));

  return orderType === OrderTypes.STANDARD && !!hasFreightCalculated ? (
    <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
      <View style={styles.priceView}>
        <Text style={styles.totalText}>{"Total Cartage"}</Text>
        <PriceComponent
          style={[styles.totalText, styles.colorStyle]}
          value={totalDeliveryCost}
          prefix={"$"}
          {...accessibility("totalPrice")}
          ignorePOA={true}
        />
      </View>
      <View style={styles.lineSeparator} />
    </PermissionComponent>
  ) : null;
};

export default TotalDelivery;
