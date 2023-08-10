import * as R from "ramda";
import * as React from "react";
import { forwardRef } from "react";
import { Text, TextProps, TouchableOpacityProps, View } from "react-native";
import FastImage from "react-native-fast-image";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { getProductImage } from "~root/Lib/ProductHelper";
import { Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import styles from "./QuoteMaterialsListItemStyle";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  productDescriptionProps?: TextProps;
}

type Props = OwnProps;

const QuoteMaterialsListItem: React.SFC<Props> = forwardRef(({ item, productDescriptionProps }: Props, ref) => {
  const imageUrl = getProductImage(item) === "" ? Images.safetyCone : { uri: getProductImage(item) };
  const [quantity, setQuantity] = React.useState(item?.decimalQty?.toString());
  const brand = R.pathOr("", ["product", "manufacturer"])(item);

  React.useEffect(() => {
    setQuantity(item.decimalQty.toString());
  }, [item.decimalQty]);

  return (
    <View {...accessibility("QuotesMaterialListItem")} style={[styles.container]}>
      <FastImage source={imageUrl} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
      <View style={styles.descriptionContainer}>
        {isNotNilOrEmpty(brand) && (
          <Text style={styles.brand} {...accessibility("materialItemBrand")}>
            {brand}
          </Text>
        )}
        <View style={styles.productDescriptionContainer}>
          <Text style={styles.productDescription} {...accessibility("materialItemDescription")} {...productDescriptionProps}>
            {item?.product?.name}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <PermissionComponent
            style={styles.priceContainer}
            hideView={true}
            permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
          >
            <PriceComponent
              ignorePermission={true}
              ignorePOA={true}
              style={styles.productPrice}
              value={item?.basePrice?.value}
              {...accessibility("materialItemPrice")}
            />
            <Text style={styles.priceSlash}> / </Text>
          </PermissionComponent>
          <Text style={[styles.priceUom]} {...accessibility("materialItemUom")}>
            {item.unit}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.productSKU} {...accessibility("materialItemSKU")}>
              Qty:
            </Text>
            <Text style={styles.productPrice} {...accessibility("materialItemSKU")}>
              {" " + quantity}
            </Text>
          </View>
          <PriceComponent
            ignorePermission={true}
            ignorePOA={true}
            style={styles.value}
            value={item?.totalPrice?.value}
            {...accessibility("materialItemPrice")}
          />
        </View>
      </View>
    </View>
  );
});

export default QuoteMaterialsListItem;
