import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Platform, Text, TextProps, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import NativeWrapper from "~root/Components/NativeWrapper";
import NewQuantitySelector from "~root/Components/NewQuantitySelector/NewQuantitySelector";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import TimberLength from "~root/Components/TimberLength";
import { OrderProductContext } from "~root/Containers/OrderProductContainer/OrderProduct";
import { KEY_PARAM_SKU } from "~root/Containers/ProductDetails/ProductDetails";
import { IAlertCallbacks, productAddedToCart } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getProductDetailViewObject, getSelectedAccountId, isTimberFlag, showRelatedToast } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getSpecialFromSanitizeData, getStock } from "~root/Lib/ProductHelper";
import { RootState } from "~root/Reducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { Colors, Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import DeleteIcon from "../../Images/deleteIcon/Delete.svg";
import { SpecialProductStatus, useCashCustomerStatus } from "../../Lib/QuoteHelper";
import NewListSheetContainer from "../NewListSheetContainer/NewListSheetContainer";
import ProductStockStatus from "../ProductStockStatus";
import RelatedAlternativeProducts from "../RelatedAlternativeProducts";
import SpecialOrderStatus from "../SpecialOrderProductStatus/SpecialOrderProductStatus";
import styles from "./OrderProductListItemStyle";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  isGridView: boolean;
  isMyList?: boolean;
  onFocus?: () => void;
  isFrequentlyOrderedItem?: boolean;
  isLoading?: boolean;
  index: number;
  productDescriptionProps?: TextProps;
  onNewListSuccess?: (name: string) => void;
  setIsApiRefresh?: (isApiRefresh: any) => void;
  removeItem?: () => void;
}

interface DispatchProps {
  updateCart?: (payload: any, meta: IAlertCallbacks) => void;
  logPixelEvent: (event: string, params: any) => void;
  requestList: (callback: IAlertCallbacks) => void;
  clearNewList: () => void;
}

interface StateProps {
  digitalId: any;
  selectedAccountId: any;
  selectedBranch: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const OrderProductListItem: React.FC<Props> = ({
  item,
  isMyList,
  isGridView,
  isFrequentlyOrderedItem,
  onNewListSuccess,
  onFocus,
  updateCart,
  isLoading,
  digitalId,
  selectedAccountId,
  selectedBranch,
  index,
  productDescriptionProps,
  removeItem,
}: Props) => {
  const [quantity, setQuantity] = React.useState("1");
  const image = item.Image === "" ? Images.safetyCone : { uri: item.Image };
  const context = useContext(OrderProductContext);
  const { CashCustomerStatus } = useCashCustomerStatus();
  const renderAddToCartButton = () => {
    return (
      <View>
        {!isMyList && (
          <TouchableOpacity
            style={[styles.iconView, { marginLeft: 4 }]}
            onPress={() => {
              updateCart?.(
                {
                  entry: item,
                  pixelTitle: isFrequentlyOrderedItem ? "Shop" : "Other",
                  quantity: 1,
                  isUpdate: false,
                },
                {
                  onSuccess: () => showRelatedToast(item?.relatedProductCount ?? 0, item?.SKU),
                },
              );
            }}
          >
            <View {...accessibility("productAddToCart")}>
              <CustomIcon name={"add-to-cart"} style={styles.iconStyle} {...accessibility("productAddToCart")} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderAddToListButton = () => {
    return (
      <View>
        {!isMyList && (
          <TouchableOpacity style={[styles.iconView]}>
            <NewListSheetContainer onNewListSuccess={onNewListSuccess} item={item}>
              <View {...accessibility("productAddToList")}>
                <CustomIcon name={"add-to-my-list"} style={styles.iconStyle} {...accessibility("productAddToList")} />
              </View>
            </NewListSheetContainer>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={[styles.brandNButtons, isGridView ? styles.addToCartView : undefined]}>
        {renderAddToListButton()}
        {renderAddToCartButton()}
      </View>
    );
  };

  const renderImage = () => {
    const imageStyle = isGridView ? styles.imageStyle : styles.image;
    return (
      <View>
        <FastImage
          source={image}
          style={[imageStyle, isFrequentlyOrderedItem ? styles.frequentOrderImageStyle : undefined]}
          resizeMode={FastImage.resizeMode.contain}
        />
        {isGridView && renderButtons()}
      </View>
    );
  };

  const renderBrand = () => {
    return (
      <Text style={[styles.brand, !isGridView ? { flex: 1 } : undefined]} {...accessibility("productBrand")}>
        {item.Brand}
      </Text>
    );
  };

  const renderAlternativeTab = (searchedProduct: boolean) => {
    return item?.hasAlternateProducts ? (
      <RelatedAlternativeProducts
        sku={item?.SKU}
        context={context}
        searchedProduct={searchedProduct}
        relatedProductCount={item?.relatedProductCount ?? 0}
        alternateProductCount={item?.alternateProductCount ?? 0}
      />
    ) : null;
  };

  const renderBrandAndButtons = () => {
    return (
      <View style={styles.brandNButtons}>
        <Text style={[styles.brand, { flex: 1 }]} {...accessibility("productBrand")}>
          {item.Brand}
        </Text>
        {renderButtons()}
      </View>
    );
  };
  const renderDescription = () => {
    return (
      <View style={[styles.descriptionContainer, isGridView ? { margin: 24, marginBottom: 13 } : undefined]}>
        {isGridView ? renderBrand() : renderBrandAndButtons()}
        {
          <View style={styles.productDescriptionContainer}>
            <Text
              style={[styles.productDescription, !isGridView ? { height: undefined } : undefined]}
              {...accessibility("productDescription")}
              {...productDescriptionProps}
            >
              {item.ProductDescription}
            </Text>
            <Text style={styles.productSKU} {...accessibility("productSKU")}>
              SKU: {item.SKU}
            </Text>
          </View>
        }
        <View style={[styles.priceContainer, isFrequentlyOrderedItem ? { marginTop: 8 } : undefined]}>
          <PermissionComponent
            style={[styles.priceContainer, isFrequentlyOrderedItem ? { marginTop: 8 } : undefined]}
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
        {SpecialProductStatus(item) && CashCustomerStatus ? (
          <SpecialOrderStatus isFromList={!isGridView} context={context} />
        ) : (
          <ProductStockStatus stock={getStock(item)} isSpecial={getSpecialFromSanitizeData(item)} isConstrained={item?.PmExclusive} />
        )}
      </View>
    );
  };
  const renderItem = () => {
    return (
      <View style={styles.itemView}>
        {renderImage()}
        {renderDescription()}
        {renderAlternativeTab(false)}
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
        context?.setIsApiRefresh(false);
        navigation.navigate("ProductDetails", {
          screen: "MainPDP",
          params: { [KEY_PARAM_SKU]: item.SKU },
        });
        logProductDetailViewEvents("select_item");
      }}
      {...accessibility("orderProductListItem")}
    >
      {isGridView ? (
        <View style={[styles.containerGridView, isFrequentlyOrderedItem ? styles.frequentlyOrderedItem : undefined]} {...accessibility("productGridItem")}>
          {isLoading ? renderLoadingState() : renderItem()}
        </View>
      ) : (
        <View
          style={[
            styles.containerLineItemMyList,
            { borderTopWidth: isMyList ? 0.5 : 0, borderTopColor: Colors.lightGrey, borderBottomColor: isMyList ? Colors.white : Colors.darkGrey },
          ]}
        >
          <View style={[styles.containerLineItem, { borderBottomColor: Colors.white }]} {...accessibility("productListItem")}>
            {renderImage()}
            {renderDescription()}
          </View>
          {isMyList && (
            <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
              <View style={styles.buttonsContainer}>
                <View style={styles.quantitySelectorContainer}>
                  <NewQuantitySelector
                    containerStyle={styles.container}
                    styleQuantityIcon={styles.quantitySelectorStyle}
                    uom={item.uomFormat}
                    onBlur={e => {
                      if (Number(quantity) === 0) {
                        setQuantity("1");
                      }
                    }}
                    isFromMyList={true}
                    quantityFontSize={20}
                    isTimber={isTimberFlag(item)}
                    quantity={quantity}
                    onFocus={onFocus}
                    onChange={(quantity1, fromIcon) => {
                      if (fromIcon && Number(quantity1) === 0) {
                        setQuantity(quantity1);
                        setTimeout(() => setQuantity("1"), 0);
                      } else {
                        setQuantity(quantity1);
                      }
                    }}
                  />
                  <TouchableOpacity style={styles.deleteIconStyle} onPress={removeItem}>
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.iconViewAddToCart}
                  onPress={() => {
                    updateCart?.(
                      { entry: item, quantity, isUpdate: false },
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
                    );
                  }}
                >
                  <Text style={styles.addToCartStyle}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </PermissionComponent>
          )}
          <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
            <TimberLength style={{ marginBottom: 14 }} isTimberFlag={isTimberFlag(item)} multiple={item.SelectedMultiple} uom={item.UOM} quantity={quantity} />
          </PermissionComponent>
          {renderAlternativeTab(true)}
        </View>
      )}
    </NativeWrapper>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  // @ts-ignore
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state?.login?.tempToken?.idToken)) as string,
  selectedAccountId: getSelectedAccountId(state),
  selectedBranch: state.branchList?.selectedBranch,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  updateCart: (payload, meta) => dispatch(ProductActions.cartChange(payload, meta)),
  logPixelEvent: (event, params) => dispatch(PixelActions.pixelRequest(event, params)),
  requestList: alertCallbacks => dispatch(MyListActions.getAllList(undefined, alertCallbacks)),
  clearNewList: () => dispatch(MyListActions.clearNewList()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(OrderProductListItem);
