import { ListItem } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, checkProductAvailability } from "~root/Lib/DataHelper";
import { Images } from "~root/Themes";
import styles from "./ProductAvailabilityItemStyles";

interface OwnProps {
  item: any;
}

interface IStateProps {}

interface IDispatchProps {}

type Props = OwnProps & IDispatchProps & IStateProps;
const ProductAvailabilityItem: React.FunctionComponent<Props> = ({ item }: Props) => {
  const itemImage = R.path(["product", "images"])(item) as any[];

  const image = !itemImage || isNilOrEmpty(R.path(["0", "url"], itemImage)) ? Images.safetyCone : { uri: itemImage[0].url };

  return (
    <View>
      <ListItem style={styles.listView} {...accessibility("cartList")}>
        <View style={styles.rowView}>
          <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          <View style={styles.descriptionContainerNew}>
            <Text style={styles.brand} {...accessibility("productBrand")}>
              {item?.product?.manufacturer}
            </Text>
            <Text style={[styles.productDescription]} {...accessibility("productDetailsLabel")}>
              {item?.product?.name}
            </Text>
            <Text style={styles.productAvailability} {...accessibility("productAvailability")}>
              {checkProductAvailability(item?.product?.stock)}
            </Text>
          </View>
        </View>
      </ListItem>
    </View>
  );
};

export default ProductAvailabilityItem;
