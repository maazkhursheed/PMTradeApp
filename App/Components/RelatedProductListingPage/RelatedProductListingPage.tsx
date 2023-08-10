import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useCallback } from "react";
import { Platform, View } from "react-native";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart, productAddedToQuote, productSwapped, productSwappedFailed } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { accessibility, isTimberFlag } from "../../Lib/DataHelper";
import { EnumRelatedAndAlternateReferenceType, getSpecialFromSanitizeData, getStock } from "../../Lib/ProductHelper";
import { SpecialProductStatus, useCashCustomerStatus } from "../../Lib/QuoteHelper";
import { Images } from "../../Themes";
import { PermissionTypes } from "../../Types/Permissions";
import LargeButton from "../LargeButton";
import NewQuantitySelector from "../NewQuantitySelector";
import PermissionComponent from "../PermissionComponent/PermissionComponent";
import PriceComponent from "../PriceComponent";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductStockStatus from "../ProductStockStatus";
import SpecialOrderStatus from "../SpecialOrderProductStatus/SpecialOrderProductStatus";
import styles from "./RelatedProductListingPageStyle";

interface OwnProps {
  item: any;
  fromQuotes: boolean;
  referenceType: string;
  existingEntryNumber: any;
  existingQuoteId: any;
  fromCart?: boolean;
  existingCartItem?: any;
  onSwapSuccess?: () => void;
}

type Props = OwnProps;

const RelatedProductListingPage: React.FC<Props> = ({
  item,
  fromQuotes,
  referenceType,
  existingEntryNumber,
  existingQuoteId,
  fromCart,
  existingCartItem,
  onSwapSuccess,
}: Props) => {
  const [quantity, setQuantity] = React.useState("1");
  const { sobId, quoteIdSent } = useSelector((state: RootState) => ({
    sobId: state?.sectionSOBQuotes?.sobId,
    quoteIdSent: state?.quotes?.quotesListDetails?.code,
  }));
  const navigation = useNavigation();
  const { CashCustomerStatus } = useCashCustomerStatus();
  const image = item.Image === "" ? Images.safetyCone : { uri: item.Image };
  const renderImage = () => {
    return <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />;
  };

  const dispatch = useDispatch();

  const renderDescription = () => {
    return (
      <View style={styles.descriptionContainer}>
        <ProductInfo
          productBrand={item?.Brand}
          productDescription={item?.ProductDescription}
          SKU={item?.SKU}
          UOM={item?.UOM}
          productPrize={item?.Price}
          isFromQuotes={fromQuotes}
          RRP={item?.RetailPrice}
        />
        {(!fromQuotes || fromCart) &&
          (SpecialProductStatus(item) && CashCustomerStatus ? (
            <SpecialOrderStatus isFromList={false} styleContainer={styles.specialTextStyle} />
          ) : (
            <ProductStockStatus
              stock={getStock(item)}
              isSpecial={getSpecialFromSanitizeData(item)}
              isConstrained={item?.PmExclusive}
              styleContainer={styles.statusContainer}
            />
          ))}
      </View>
    );
  };

  const swapProduct = useCallback(() => {
    const pQuantity = parseInt(quantity, 10);
    if (Number(quantity) === 0) {
      return;
    }

    const ProductParams = {
      quantity: pQuantity,
      decimalQty: pQuantity,
      product: {
        code: item.SKU,
        name: item.QuoteName,
        description: item.QuoteDescription,
        unitCode: item.UOM,
      },
      basePrice: {
        value: item.Price,
      },
      customProductFlag: "false",
    };

    if (isTimberFlag(item)) {
      ProductParams.product.timberProductFlag = item?.timberProductFlag;
      ProductParams.product.length = item?.SelectedMultiple;
    }
    if (item?.RetailPrice) {
      ProductParams.retailPrice = {
        value: item.RetailPrice,
      };
    }

    dispatch(
      QuotesActions.swapProduct(
        {
          existingEntryNumber: existingEntryNumber,
          existingQuoteId: existingQuoteId,
          urlParams: {
            quoteId: quoteIdSent,
            sobId,
          },
          bodyParams: ProductParams,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: "quoteSuccess",
              text1: productSwapped,
              topOffset: Platform.OS === "ios" ? 50 : 20,
              visibilityTime: 3000,
            });
            navigation.goBack();
            onSwapSuccess?.();
          },
          onFailure: () => {
            Toast.show({
              type: "quoteFailure",
              text1: productSwappedFailed,
              topOffset: Platform.OS === "ios" ? 50 : 20,
              visibilityTime: 3000,
            });
          },
        },
      ),
    );
  }, [dispatch, existingEntryNumber, existingQuoteId, item, quantity, quoteIdSent, sobId]);

  const tapAddToQuote = React.useCallback(() => {
    const pQuantity = parseInt(quantity, 10);
    if (Number(quantity) === 0) {
      return;
    }

    const ProductParams = {
      quantity: pQuantity,
      decimalQty: pQuantity,
      product: {
        code: item.SKU,
        name: item.QuoteName,
        description: item.QuoteDescription,
        unitCode: item.UOM,
      },
      basePrice: {
        value: item.Price,
      },
      customProductFlag: "false",
    };

    if (isTimberFlag(item)) {
      ProductParams.product.timberProductFlag = item?.timberProductFlag;
      ProductParams.product.length = item?.SelectedMultiple;
    }
    if (item?.RetailPrice) {
      ProductParams.retailPrice = {
        value: item.RetailPrice,
      };
    }
    // To do api implementation
    dispatch(
      QuotesActions.addOwnProduct(
        {
          urlParams: {
            quoteId: quoteIdSent,
            sobId,
          },
          bodyParams: ProductParams,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: "quoteSuccess",
              text1: productAddedToQuote,
              topOffset: Platform.OS === "ios" ? 50 : 20,
              visibilityTime: 3000,
            });
          },
        },
      ),
    );
  }, [item.SKU, quantity]);

  const callAddToCart = useCallback(() => {
    dispatch(
      ProductActions.cartChange(
        {
          entry: item,
          quantity,
          isUpdate: false,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: "cart",
              text1: productAddedToCart,
              topOffset: Platform.OS === "ios" ? 50 : 20,
              visibilityTime: 3000,
            });
          },
        },
      ),
    );
  }, [quantity, item]);

  const quoteAndCartFunctionality = useCallback(() => {
    if (fromQuotes) {
      if (referenceType === EnumRelatedAndAlternateReferenceType.SIMILAR) {
        swapProduct();
      } else {
        tapAddToQuote();
      }
    } else if (fromCart) {
      if (referenceType === EnumRelatedAndAlternateReferenceType.SIMILAR) {
        swapCartProduct();
      } else {
        callAddToCart();
      }
    }
  }, [fromQuotes, fromCart, referenceType, swapProduct, tapAddToQuote, callAddToCart]);

  const swapCartProduct = useCallback(() => {
    const pQuantity = parseInt(quantity, 10);
    if (Number(quantity) === 0) {
      return;
    }
    dispatch(
      CartActions.swapCartProduct(
        {
          entry: item,
          quantity: pQuantity,
          isUpdate: false,
          existingCartID: existingQuoteId,
          existingCartItem,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: "quoteSuccess",
              text1: productSwapped,
              topOffset: Platform.OS === "ios" ? 50 : 20,
              visibilityTime: 3000,
            });
            navigation.goBack();
            onSwapSuccess?.();
          },
          onFailure: () => {
            Toast.show({
              type: "quoteFailure",
              text1: productSwappedFailed,
              topOffset: Platform.OS === "ios" ? 50 : 20,
              visibilityTime: 3000,
            });
          },
        },
      ),
    );
  }, [quantity, dispatch, item, existingQuoteId, existingCartItem, referenceType, navigation]);

  const buttonTextValidation = useCallback(() => {
    if (fromCart && referenceType === EnumRelatedAndAlternateReferenceType.SIMILAR) {
      return "Swap Product in Cart";
    } else if (fromQuotes) {
      if (referenceType === EnumRelatedAndAlternateReferenceType.SIMILAR) {
        return "Swap Product in Quote";
      } else {
        return "Add to Quote";
      }
    }
    return "Add to Cart";
  }, [fromCart, fromQuotes, referenceType]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerItem} {...accessibility("relatedProductListItem")}>
        {renderImage()}
        {renderDescription()}
      </View>
      <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
        <View style={styles.buttonsContainer}>
          <NewQuantitySelector
            style={styles.quantitySelectorStyle}
            uom={item?.appUomFormat}
            onBlur={() => {
              if (Number(quantity) === 0) {
                setQuantity("1");
              }
            }}
            isTimber={isTimberFlag(item)}
            quantity={quantity}
            onChange={(quantity1, fromIcon) => {
              if (fromIcon && Number(quantity1) === 0) {
                setQuantity(quantity1);
                setTimeout(() => setQuantity("1"), 0);
              } else {
                setQuantity(quantity1);
              }
            }}
          />

          <PriceComponent style={styles.productDescription} value={(quantity * item?.Price || 0).toFixed(2)} {...accessibility("relatedProductDescription")} />
        </View>
      </PermissionComponent>
      <LargeButton
        onPress={() => (fromCart || fromQuotes ? quoteAndCartFunctionality() : callAddToCart())}
        textStyle={styles.largeButtonTextStyle}
        style={styles.largeButtonStyle}
        btnText={buttonTextValidation()}
      />
    </View>
  );
};
export default RelatedProductListingPage;
