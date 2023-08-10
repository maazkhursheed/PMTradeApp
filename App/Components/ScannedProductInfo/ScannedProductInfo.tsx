import { Text } from "native-base";
import * as React from "react";
import { Keyboard, Platform, TextInputProps, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useTimingTransition } from "react-native-redash";
import Toast from "react-native-toast-message";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import TimberLength from "~root/Components/TimberLength";
import { KEY_PARAM_SKU } from "~root/Containers/ProductDetails/ProductDetails";
import { genericError, IAlertCallbacks, productAddedToCart, tryAgain } from "~root/Lib/AlertsHelper";
import { accessibility, isTimberFlag } from "~root/Lib/DataHelper";
import { getSpecialFromSanitizeData, getStock } from "~root/Lib/ProductHelper";
import NavigationService from "~root/Navigation/NavigationService";
import { Images, Metrics } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import { SpecialProductStatus, useCashCustomerStatus } from "../../Lib/QuoteHelper";
import NewListSheetContainer from "../NewListSheetContainer/NewListSheetContainer";
import NewQuantitySelector from "../NewQuantitySelector";
import ProductStockStatus from "../ProductStockStatus";
import SpecialOrderStatus from "../SpecialOrderProductStatus/SpecialOrderProductStatus";
import style from "./ScannedProductInfoStyles";

interface OwnProps {
  isLoading: boolean;
  product: any;
  showCard: boolean;
  error: boolean;
  onTryAgain: () => void;
  updateCart?: (payload: any, meta: IAlertCallbacks) => void;
  onUpdateCart: (quantity: any) => void;
  onQuantityInputFocusChange?: (isFocused: boolean) => void;
  qty: string;
}

type Props = OwnProps & TextInputProps;

function renderFailureMessage(message: string, onTryAgain: () => void) {
  return (
    <View style={style.activityIndicatorContainer}>
      <FastImage source={Images.safetyCone} style={style.cone} resizeMode={FastImage.resizeMode.contain} />
      <Text style={style.msgStyle}>{message}</Text>
      <TouchableOpacity onPress={onTryAgain}>
        <Text style={style.tryAgainStyle}>{tryAgain}</Text>
      </TouchableOpacity>
    </View>
  );
}

const ScannedProductInfo: React.FunctionComponent<Props> = ({
  onTryAgain,
  showCard,
  onQuantityInputFocusChange,
  updateCart,
  isLoading,
  error,
  product,
  onUpdateCart,
  qty,
}) => {
  const [quantity, setQuantity] = React.useState(qty);
  React.useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  const transition = useTimingTransition(showCard, { duration: 400 });
  const translateX = Animated.interpolateNode(transition, { inputRange: [0, 1], outputRange: [-Metrics.screenWidth, 0] });
  const flingGesture = Gesture.Fling().direction(Directions.LEFT).onStart(onTryAgain);
  const { CashCustomerStatus } = useCashCustomerStatus();
  return (
    <Animated.View style={[style.container, { transform: [{ translateX }] }]} {...accessibility("cartList")}>
      <LoadingView isLoading={isLoading} hideViewOnLoading={true}>
        <TouchableOpacity
          onPress={() => {
            if (product && !error) {
              Keyboard.dismiss();
              NavigationService.navigate("ProductDetails", {
                screen: "MainPDP",
                params: { [KEY_PARAM_SKU]: product.SKU },
              });
            }
          }}
          {...accessibility("scannedProductTouchable")}
        >
          <GestureDetector gesture={flingGesture}>
            {!isLoading && (
              <View>
                {!product || error ? (
                  renderFailureMessage(genericError, onTryAgain)
                ) : (
                  <>
                    <View style={style.rowView}>
                      <FastImage source={{ uri: product.Image }} style={style.image} resizeMode={FastImage.resizeMode.contain} />
                      <View style={style.descriptionContainerNew}>
                        <Text style={style.tagStyle}>{product.Brand}</Text>
                        <Text style={[style.productDescription, { height: undefined }]} {...accessibility("productDetailLabel")}>
                          {product.ProductDescription}
                        </Text>
                        <PermissionComponent
                          style={style.priceContainer}
                          hideView={true}
                          permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
                        >
                          <PriceComponent style={style.productPrice} ignorePermission={true} value={product.Price} />
                          <Text style={style.priceSlash}> / </Text>
                          <Text style={style.priceUom}>{product.UOM}</Text>
                        </PermissionComponent>
                        {SpecialProductStatus(product) && CashCustomerStatus ? (
                          <SpecialOrderStatus isFromList={false} />
                        ) : (
                          <ProductStockStatus stock={getStock(product)} isSpecial={getSpecialFromSanitizeData(product)} isConstrained={product?.PmExclusive} />
                        )}
                      </View>
                    </View>

                    <View style={style.buttonsContainer}>
                      <NewQuantitySelector
                        uom={product.uomFormat}
                        style={style.quantitySelectorStyle}
                        quantity={quantity}
                        isTimber={isTimberFlag(product)}
                        onBlur={e => {
                          onQuantityInputFocusChange?.(false);
                          if (Number(quantity) === 0) {
                            setQuantity("1");
                          }
                        }}
                        onFocus={e => {
                          onQuantityInputFocusChange?.(true);
                        }}
                        onChange={(quantity1, fromIcon) => {
                          if (fromIcon && Number(quantity1) === 0) {
                            setQuantity(quantity1);
                            setTimeout(() => setQuantity("1"), 0);
                          } else {
                            setQuantity(quantity1);
                          }
                          onUpdateCart(quantity1);
                        }}
                      />
                      <NewListSheetContainer item={product}>
                        <View style={style.iconView}>
                          <CustomIcon name={"add-to-my-list"} style={style.iconStyle} {...accessibility("productAddToList")} />
                        </View>
                      </NewListSheetContainer>
                      <TouchableOpacity
                        style={[style.iconView]}
                        onPress={() => {
                          updateCart?.(
                            {
                              entry: product,
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
                          );
                        }}
                      >
                        <CustomIcon name={"add-to-cart"} style={style.iconStyle} {...accessibility("productAddToCart")} />
                      </TouchableOpacity>
                    </View>
                    <TimberLength
                      style={style.timberView}
                      isTimberFlag={isTimberFlag(product)}
                      multiple={product.SelectedMultiple}
                      uom={product.UOM}
                      quantity={quantity}
                    />
                  </>
                )}
              </View>
            )}
          </GestureDetector>
        </TouchableOpacity>
      </LoadingView>
    </Animated.View>
  );
};

export default ScannedProductInfo;
