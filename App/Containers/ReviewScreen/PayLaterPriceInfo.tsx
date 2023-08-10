import * as React from "react";
import { Text, View } from "react-native";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import { CARTAGE, NOT_CHARGED_TODAY, PAYON_CALLBACK, PRODUCTS, TO_BE_CONFIRMED } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { PermissionTypes } from "~root/Types/Permissions";
import { OrderTypes } from "../../Lib/BranchHelper";
import styles from "./ReviewScreenStyle";

interface OwnProps {
  subTotal?: string;
  orderType?: string;
}

const PayLaterPriceInfo = ({ subTotal, orderType }: OwnProps) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.separator} />
      <PermissionComponent
        style={styles.permissionComponentStyle}
        hideView={true}
        permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
      >
        <View style={styles.priceView}>
          <Text style={styles.totalText}>{PAYON_CALLBACK}</Text>
        </View>
        <View style={styles.lineSeparator} />

        <View style={styles.priceView}>
          <Text style={styles.subTotalTextCash}>
            {PRODUCTS} <Text style={styles.subTotalTextCashItalic}>{NOT_CHARGED_TODAY}</Text>
          </Text>
          <PriceComponent style={[styles.subTotalText, styles.colorStyle]} value={subTotal} {...accessibility("subTotalPrice")} />
        </View>
        {!(orderType === OrderTypes.PICKUP) && (
          <View style={styles.priceView}>
            <Text style={styles.subTotalTextCash}>{CARTAGE}</Text>
            <Text style={styles.cartageItalic}>{TO_BE_CONFIRMED}</Text>
          </View>
        )}
      </PermissionComponent>
    </View>
  );
};
export default PayLaterPriceInfo;
