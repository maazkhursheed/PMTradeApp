import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useCallback } from "react";
import { Platform, Text, TextProps, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import NativeWrapper from "~root/Components/NativeWrapper";
import NewQuantitySelector from "~root/Components/NewQuantitySelector/NewQuantitySelector";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import { KEY_PARAM_SKU } from "~root/Containers/ProductDetails/ProductDetails";
import { productAddedToCart, SPECIAL_ORDER_SCREEN } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getProductDetailViewObject, getSelectedAccountId, getSpecialOrderStatus, isTimberFlag } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getSpecialFromSanitizeData, getStock } from "~root/Lib/ProductHelper";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import SpecialOrdertext from "../../Containers/SpecialOrderInfoContanier/SpecialOrderText";
import { SpecialProductStatus, useCashCustomerStatus } from "../../Lib/QuoteHelper";
import ProductStockStatus from "../ProductStockStatus";
import styles from "./RelatedProductListItemStyle";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  onFocus?: () => void;
  isLoading?: boolean;
  index: number;
  productDescriptionProps?: TextProps;
}

const RelatedProductListItem = ({ item, onFocus, index, productDescriptionProps }: OwnProps) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState("1");
  const image = item.Image === "" ? Images.safetyCone : { uri: item.Image };
  const { CashCustomerStatus } = useCashCustomerStatus();

  const { digitalId, isLoading, selectedAccountId, selectedBranch } = useSelector((state: RootState) => ({
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state?.login?.tempToken?.idToken)) as string,
    isLoading: state?.quotes?.fetching,
    selectedAccountId: getSelectedAccountId(state),
    selectedBranch: state.branchList?.selectedBranch,
  }));

  const callAddtoCart = useCallback(() => {
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
              topOffset: Platform.OS === "ios" ? 50 : 30,
              visibilityTime: 3000,
            });
          },
        },
      ),
    );
  }, [quantity, item]);

  const renderImage = () => {
    return <FastImage source={image} style={styles.imageStyle} resizeMode={FastImage.resizeMode.contain} />;
  };

  const renderBrand = () => {
    return (
      <Text style={styles.brand} {...accessibility("productBrand")}>
        {item.Brand}
      </Text>
    );
  };

  const renderDescription = () => {
    return (
      <View style={[styles.descriptionContainer]}>
        {renderBrand()}
        {
          <View style={styles.productDescriptionContainer}>
            <Text style={styles.productDescription} {...accessibility("productDescription")} {...productDescriptionProps}>
              {item.ProductDescription}
            </Text>
          </View>
        }
        <View style={styles.priceContainer}>
          <PermissionComponent
            style={styles.priceContainer}
            hideView={true}
            permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
          >
            <PriceComponent ignorePermission={true} style={styles.productPrice} value={item.Price} {...accessibility("productPrice")} />
            <Text style={styles.priceSlash}> / </Text>
          </PermissionComponent>
          <Text style={[styles.priceUom]} {...accessibility("productUom")}>
            {item.UOM}
          </Text>
        </View>
        <NewQuantitySelector
          styleQuantityIcon={styles.quantityIcon}
          style={styles.quantitySelectorStyleNew}
          quantityFontSize={16}
          containerStyle={styles.quantitySelectorContainerStyle}
          uom={item?.appUomFormat ?? ""}
          isTimber={isTimberFlag(item)}
          quantity={quantity}
          onFocus={onFocus}
          isDisabled={false}
          hidePlusMinusIcons={false}
          onChange={setQuantity}
        />
        <TouchableOpacity style={styles.iconViewAddToCart} onPress={callAddtoCart} {...accessibility("productAddToCart")}>
          <Text style={styles.addToCartStyle}>Add to Cart</Text>
        </TouchableOpacity>
        {SpecialProductStatus(item) && CashCustomerStatus ? (
          <View style={styles.stockStyle}>
            <SpecialOrdertext
              onPress={() => {
                navigation.navigate(SPECIAL_ORDER_SCREEN);
              }}
              infoSource={false}
            />
          </View>
        ) : (
          <ProductStockStatus
            stock={getStock(item)}
            isSpecial={getSpecialFromSanitizeData(item)}
            isConstrained={item?.PmExclusive}
            styleContainer={styles.stockStyle}
          />
        )}
      </View>
    );
  };
  const renderItem = () => {
    return (
      <View style={styles.itemView}>
        {renderImage()}
        {renderDescription()}
      </View>
    );
  };
  const renderLoadingState = () => {
    return (
      <LoadingView isLoading={true}>
        <View style={styles.loadingContainer} />
      </LoadingView>
    );
  };
  const logProductDetailViewEvents = (event: any) => {
    const eventLogObject = getProductDetailViewObject({
      index,
      event,
      digitalId,
      selectedAccountId,
      sanitizedData: item,
      location: getBranchTownRegion(selectedBranch),
      storeName: selectedBranch?.name,
    });
    if (!__DEV__) {
      firebase.analytics().logEvent(event, eventLogObject);
    }
  };

  const navigation = useNavigation();

  return (
    <NativeWrapper
      onPress={() => {
        navigation.navigate("ProductDetails", {
          screen: "MainPDP",
          params: { [KEY_PARAM_SKU]: item.SKU },
        });
        logProductDetailViewEvents("select_item");
      }}
      {...accessibility("orderProductListItem")}
    >
      <View style={styles.containerGridView} {...accessibility("productGridItem")}>
        {isLoading ? renderLoadingState() : renderItem()}
      </View>
    </NativeWrapper>
  );
};

export default RelatedProductListItem;
