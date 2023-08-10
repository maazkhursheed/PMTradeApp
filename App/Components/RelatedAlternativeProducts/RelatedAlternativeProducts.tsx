import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import Alternativeproductsicon from "~root/Images/alternativeProduct/Alternativeproductsicon.svg";
import Chevronrighticon from "~root/Images/chevronRight/Chevronrighticon.svg";
import RelatedProduuctsIcon from "~root/Images/relatedProducts/RelatedProductsIcon.svg";
import { EnumRelatedAndAlternateReferenceType } from "../../Lib/ProductHelper";
import NativeWrapper from "../NativeWrapper";
import styles from "./RelatedAlternativeProductsStyle";

interface Props {
  sku: any;
  searchedProduct?: boolean;
  relatedProductCount?: number;
  alternateProductCount?: number;
  context: any;
}

const RelatedAlternativeProducts = ({ sku, searchedProduct, relatedProductCount, alternateProductCount, context }: Props) => {
  const rCount = relatedProductCount ?? 0;
  const navigation = useNavigation();
  return (
    <NativeWrapper
      onPress={() => {
        context?.setIsApiRefresh(false);
        navigation.navigate("RelatedProductsDetails", {
          data: {
            referenceType: rCount > 0 ? EnumRelatedAndAlternateReferenceType.ACCESSORIES : EnumRelatedAndAlternateReferenceType.SIMILAR,
            productCode: sku,
          },
        });
      }}
      style={rCount > 0 ? styles.relatedContainerView : styles.alternativeContainerView}
    >
      {rCount > 0 ? (
        <View style={styles.innerView}>
          <RelatedProduuctsIcon width="21" height="18" style={[searchedProduct && styles.iconContainer]} />
          <Text style={styles.relatedText}>{`View Related Products (${relatedProductCount})`}</Text>
        </View>
      ) : (
        <View style={styles.innerView}>
          <Alternativeproductsicon width="21" height="18" />
          <Text style={styles.alternativeText}>
            {searchedProduct ? `View Alternative Products (${alternateProductCount})` : `View Alternatives (${alternateProductCount})`}
          </Text>
        </View>
      )}
      <Chevronrighticon width="20" height="20" style={{ marginRight: searchedProduct ? 10 : rCount > 0 ? 3 : 1 }} />
    </NativeWrapper>
  );
};

export default RelatedAlternativeProducts;
