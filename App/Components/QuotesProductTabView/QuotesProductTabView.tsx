import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import AlternativeProductsIcon from "~root/Images/alternativeProduct/Alternativeproductsicon.svg";
import RelatedProductsIcon from "~root/Images/relatedProducts/RelatedProductsIcon.svg";
import { EnumRelatedAndAlternateReferenceType } from "~root/Lib/ProductHelper";
import styles from "./QuotesProductTabViewStyle";

interface Props extends ViewProps {
  sku?: string;
  existingEntryNumber?: any;
  existingQuoteId?: any;
  fromQuotes?: boolean;
  fromCart?: boolean;
  existingCartItem?: any;
  onSwapSuccess?: () => void;
  alternateProductCount?: number;
  relatedProductCount?: number;
}

const QuotesProductTabView: React.FunctionComponent<Props> = ({
  sku,
  style,
  existingEntryNumber,
  existingQuoteId,
  fromQuotes,
  fromCart,
  existingCartItem,
  onSwapSuccess,
  alternateProductCount,
  relatedProductCount,
  ...props
}: Props) => {
  const navigation = useNavigation();
  const aCount = alternateProductCount ?? 0;
  const rCount = relatedProductCount ?? 0;
  const showBorder = rCount > 0 && aCount > 0;
  const navigateToRelatedAlternateProduct = (referenceType: string) => {
    navigation.navigate("RelatedProductsDetails", {
      data: {
        referenceType,
        fromQuotes,
        productCode: sku ?? "",
        existingEntryNumber: existingEntryNumber ?? "",
        existingQuoteId: existingQuoteId ?? "",
        fromCart,
        existingCartItem,
        onSwapSuccess,
      },
    });
  };

  return (
    <View style={[styles.quoteProductsView, style]} {...props}>
      <View style={[styles.productView, { borderRightWidth: 0.5 }]}>
        <Text style={styles.productTextView}>Product</Text>
      </View>
      <View style={[styles.alternativeViewParent, { borderBottomWidth: 0.5 }]}>
        {rCount > 0 && (
          <TouchableOpacity style={styles.relatedView} onPress={() => navigateToRelatedAlternateProduct(EnumRelatedAndAlternateReferenceType.ACCESSORIES)}>
            <RelatedProductsIcon width="21" height="18" />
            <Text style={styles.relatedTextView}>{`Related (${rCount})`}</Text>
          </TouchableOpacity>
        )}
        {showBorder && <View style={styles.borderView} />}

        {aCount > 0 && (
          <TouchableOpacity style={[styles.alternativeView]} onPress={() => navigateToRelatedAlternateProduct(EnumRelatedAndAlternateReferenceType.SIMILAR)}>
            <AlternativeProductsIcon width="21" height="18" />
            <Text style={styles.alternativeTextView}>{`Alternative (${aCount})`}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuotesProductTabView;
