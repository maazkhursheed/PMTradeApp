import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FbIcon from "~root/Components/FbIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { EnumSubtituteProductsButtonType } from "~root/Lib/ProductHelper";
import styles from "./ProductFeatureHeaderStyle";

interface OwnProps {
  title: string;
  onPress?: any;
  children?: any;
  style?: any;
  onPressAlternatives?: any;
  productCode?: string;
  onPressRelatedProduct?: any;
  onPressProductDetails?: any;
  selectedHeaderButton?: string;
  onPressAlternateProduct?: any;
  alternateProductsCount: number;
  relatedProductsCount: number;
}

type Props = OwnProps;

const ProductFeatureHeader: React.SFC<Props> = ({
  title,
  style,
  onPressRelatedProduct,
  onPressAlternateProduct,
  onPressProductDetails,
  selectedHeaderButton,
  alternateProductsCount,
  relatedProductsCount,
}: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={[styles.container, style]}>
        <View style={[styles.titleIconContainer]}>
          <Button
            transparent={true}
            onPress={() => {
              navigation.goBack();
            }}
            {...accessibility("backIcon")}
          >
            <View {...accessibility("backIcon")}>
              <FbIcon name={"ic_back"} style={styles.backBtnStyle} {...accessibility("backIcon")} />
            </View>
          </Button>

          <Text numberOfLines={1} style={[styles.headerTitleText]} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <View style={styles.headerTabButton}>
          <TouchableOpacity
            onPress={onPressProductDetails}
            style={selectedHeaderButton === EnumSubtituteProductsButtonType.PRODUCT ? styles.selectedButton : styles.unselectedButtonProduct}
          >
            <Text style={selectedHeaderButton === EnumSubtituteProductsButtonType.PRODUCT ? styles.buttonText : styles.buttonDisableText}>
              {EnumSubtituteProductsButtonType.PRODUCT}
            </Text>
          </TouchableOpacity>
          {relatedProductsCount > 0 && (
            <TouchableOpacity
              onPress={onPressRelatedProduct}
              style={selectedHeaderButton === EnumSubtituteProductsButtonType.RELATED ? styles.selectedButtonOthers : styles.unSelectedButton}
            >
              <Text style={selectedHeaderButton === EnumSubtituteProductsButtonType.RELATED ? styles.buttonText : styles.buttonDisableText}>
                {`${EnumSubtituteProductsButtonType.RELATED} (${relatedProductsCount})`}
              </Text>
            </TouchableOpacity>
          )}
          {alternateProductsCount > 0 && (
            <TouchableOpacity
              onPress={onPressAlternateProduct}
              style={selectedHeaderButton === EnumSubtituteProductsButtonType.ALTERNATIVES ? styles.selectedButtonOthers : styles.unSelectedButton}
            >
              <Text style={selectedHeaderButton === EnumSubtituteProductsButtonType.ALTERNATIVES ? styles.buttonText : styles.buttonDisableText}>
                {`${EnumSubtituteProductsButtonType.ALTERNATIVES} (${alternateProductsCount})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default ProductFeatureHeader;
