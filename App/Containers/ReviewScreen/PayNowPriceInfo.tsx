import * as React from "react";
import { Text, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import { PAYNOW_TEXT, PRODUCTS, TOTAL_GST, TOTAL_PRICE_INC_GST } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { PermissionTypes } from "~root/Types/Permissions";
import DeliveryCharges from "./DeliveryCharges";
import styles from "./ReviewScreenStyle";

interface OwnProps {
  productPrice?: number;
  totalPrice?: number;
  GST?: number;
  subTotal?: number;
  isPayNowPayCallBack?: boolean;
  discountPrice?: number;
  isPromoApplied?: boolean;
}

const PayNowPriceInfo = ({ subTotal, totalPrice, GST, productPrice, isPayNowPayCallBack, discountPrice, isPromoApplied }: OwnProps) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.separator} />
      <PermissionComponent
        style={styles.permissionComponentStyle}
        hideView={true}
        permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
      >
        <View style={styles.priceView}>
          <Text style={styles.totalText}>{PAYNOW_TEXT}</Text>
        </View>
        <View style={styles.lineSeparator} />

        <View style={styles.priceView}>
          <Text style={styles.dspText}>{PRODUCTS}</Text>
          <PriceComponent style={styles.dspText} value={productPrice} {...accessibility("productPrice")} />
        </View>
        {isPromoApplied && (
          <View>
            <View style={styles.priceView}>
              <Text style={styles.dspText}>{"Total Discount"}</Text>
              <View style={styles.priceComponentStyle}>
                <CustomIcon name={"Tag-icon"} style={[styles.iconStyle, styles.tagIconStyle, { fontSize: 15 }]} />
                <View>
                  <PriceComponent style={[styles.dspText]} value={`${discountPrice}`} {...accessibility("discountPrice")} prefix={"-$"} />
                </View>
              </View>
            </View>
          </View>
        )}
        <DeliveryCharges isPayNow={true} />
        <View style={styles.lineSeparator} />
        <View style={styles.gstPriceView}>
          <Text style={styles.dspText}>{TOTAL_GST}</Text>
          <PriceComponent style={styles.dspText} value={GST} {...accessibility("gstPrice")} />
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.lineSeparator} />
        <View style={styles.priceView}>
          <Text style={styles.totalText}>{TOTAL_PRICE_INC_GST}</Text>
          <PriceComponent style={styles.totalText} value={totalPrice} prefix={"$"} {...accessibility("totalPrice")} />
        </View>
        <View style={styles.lineSeparator} />
      </PermissionComponent>
    </View>
  );
};
export default PayNowPriceInfo;
