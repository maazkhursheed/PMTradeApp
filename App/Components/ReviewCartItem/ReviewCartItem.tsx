import * as R from "ramda";
import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import PriceComponent from "~root/Components/PriceComponent";
import TimberLength from "~root/Components/TimberLength";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, isTimberFlag } from "~root/Lib/DataHelper";
import { Images } from "~root/Themes";
import styles from "./ReviewCartItemStyle";

interface OwnProps {
  item: any;
  containerStyle?: ViewProps;
  getItemBySKU: (sku: any) => any;
}

type Props = OwnProps;
const ReviewCartItem: React.FunctionComponent<Props> = ({ item, containerStyle }: Props) => {
  const itemQuantity = item?.decimalQty?.toString();
  const itemImage = R.path(["product", "images"])(item) as any[];

  const image = !itemImage || isNilOrEmpty(R.path(["0", "url"], itemImage)) ? Images.safetyCone : { uri: itemImage[0].url };

  return (
    <View style={[styles.listView, containerStyle]} {...accessibility("cartList")}>
      <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
      <View style={styles.rowView}>
        <Text style={styles.brand} {...accessibility("productBrand")}>
          {item?.product?.manufacturer}
        </Text>
        <Text numberOfLines={3} style={[styles.productDescription, { height: undefined }]} {...accessibility("productDetailsLabel")}>
          {item?.product?.name}
        </Text>

        <View style={[styles.qtyView]}>
          <Text style={styles.qtyText}>
            Qty <Text style={styles.viewQtyValue}>{itemQuantity}</Text>
          </Text>
          <PriceComponent style={styles.viewQtyValue} value={item?.totalPrice?.value} />
        </View>
        <TimberLength
          style={styles.trimLengthView}
          bottomViewStyle={styles.trimLengthBottomView}
          fraction={2}
          isTimberFlag={isTimberFlag(item)}
          multiple={item?.product?.sellOrderMultiple}
          uom={item?.product?.unitCode}
          quantity={item?.decimalQty}
        />
      </View>
    </View>
  );
};

export default ReviewCartItem;
