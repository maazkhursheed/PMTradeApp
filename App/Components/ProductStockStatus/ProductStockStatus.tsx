import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import {
  accessibility,
  checkEstimateProductAvailability,
  checkProductAvailability,
  isEstimateStockAvailable,
  isProductStockAvailable,
} from "~root/Lib/DataHelper";
import { Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";
import styles from "./ProductStockStyles";

export interface OwnProps {
  stock: any;
  isSpecial: boolean;
  styleText?: TextStyle;
  styleContainer?: ViewStyle;
  styleIcon?: ViewStyle;
  isPDP?: boolean;
  showTick?: boolean;
  isConstrained?: boolean;
}

export type Props = OwnProps;

const ProductStockStatus: React.FC<Props> = ({ stock, showTick, isSpecial, styleIcon, styleContainer, styleText, isPDP, isConstrained }) => {
  const [hasStock, setHasStock] = React.useState(stock.IsEstimate ? isEstimateStockAvailable(stock) : isProductStockAvailable(stock));
  React.useEffect(() => setHasStock(stock.IsEstimate ? isEstimateStockAvailable(stock) : isProductStockAvailable(stock)), [stock]);

  return isConstrained ? (
    <View style={[styles.specialOrderTag, styleContainer]}>
      <CustomIcon name={"info"} style={[isPDP ? styles.constrainedProductIconPDP : styles.constrainedProductIcon, styleIcon]} />
      <Text style={[isPDP ? styles.constrainedProductLabelPDP : styles.constrainedProductLabel, styleText]}>Available to order</Text>
    </View>
  ) : !hasStock && isSpecial ? (
    <View style={[styles.specialOrderTag, styleContainer]}>
      <CustomIcon name={"Icon_SpecialOrderProduct_Subtract"} style={[styles.specialOrderIcon, styleIcon]} />
      <Text style={[styles.specialOrderLabel, styleText]}>Special order</Text>
    </View>
  ) : (
    <View style={[styles.stockAvailabilityRow, styleContainer]}>
      {isPDP && (
        <CustomIcon
          name={hasStock ? "success" : "alert-icon"}
          color={hasStock ? colors.greenCheck : colors.ochre}
          style={[styles.stockAvailabilityIcon, styleIcon]}
        />
      )}
      {!isPDP && showTick && hasStock && <CustomIcon name={"success"} color={colors.greenCheck} style={[styles.stockAvailabilityIcon, styleIcon]} />}
      <Text
        style={[
          styles.productAvailability,
          isPDP
            ? {
                ...Fonts.style.openSans14,
                marginRight: 16,
                color: hasStock ? colors.greenCheck : colors.ochre,
              }
            : undefined,
          styleText,
        ]}
        {...accessibility("productAvailability")}
      >
        {stock.IsEstimate ? checkEstimateProductAvailability(stock) : checkProductAvailability(stock)}
      </Text>
    </View>
  );
};

export default ProductStockStatus;
