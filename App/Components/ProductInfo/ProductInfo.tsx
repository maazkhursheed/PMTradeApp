import React from "react";
import { Text, View } from "react-native";
import { accessibility } from "../../Lib/DataHelper";
import { PermissionTypes } from "../../Types/Permissions";
import PermissionComponent from "../PermissionComponent/PermissionComponent";
import PriceComponent from "../PriceComponent";
import styles from "./ProductInfoStyle";

export interface OwnProps {
  productBrand: string;
  productDescription: string;
  SKU: any;
  productPrize: any;
  UOM: any;
  isFromQuotes?: boolean;
  RRP?: any;
}

export type Props = OwnProps;

const ProductInfo: React.FC<Props> = ({ productBrand, productDescription, productPrize, SKU, UOM, isFromQuotes, RRP }) => {
  return (
    <View style={styles.descriptionContainer}>
      <View style={styles.productDescriptionContainer}>
        <Text style={[styles.brand]} {...accessibility("relatedProductBrand")}>
          {productBrand}
        </Text>
        <Text style={styles.productDescription} {...accessibility("productDescription")}>
          {productDescription}
        </Text>
        <Text style={styles.productSKU} {...accessibility("productSKU")}>
          SKU: {SKU}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <PermissionComponent
          style={styles.priceContainer}
          hideView={true}
          permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
        >
          <PriceComponent ignorePermission={true} value={productPrize} {...accessibility("productPrice")} />
          <Text style={styles.priceSlash}> / </Text>
        </PermissionComponent>
        <Text style={[styles.priceUom]} {...accessibility("productUom")}>
          {UOM}
        </Text>
      </View>
      {isFromQuotes && (
        <View style={styles.retailPrice}>
          <Text style={styles.productSKU} {...accessibility("productSKU")}>
            RRP{" "}
          </Text>
          <PriceComponent ignorePermission={true} ignorePOA={true} style={styles.productSKU} value={RRP} {...accessibility("productPrice")} />
        </View>
      )}
    </View>
  );
};

export default ProductInfo;
