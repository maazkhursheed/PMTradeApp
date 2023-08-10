import { ListItem } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { Subject } from "rxjs";
import { buffer, debounceTime } from "rxjs/operators";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import ProductStockStatus from "~root/Components/ProductStockStatus";
import QuotesProductTabView from "~root/Components/QuotesProductTabView/QuotesProductTabView";
import SwiperComponent from "~root/Components/SwiperComponent";
import TimberLength from "~root/Components/TimberLength";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { addIfEstimatedParams, removeCartItem } from "~root/Lib/CartHelper";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility, getSelectedAccountId, isTimberFlag } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getSpecialFromCartResponse, getStock } from "~root/Lib/ProductHelper";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import DeleteIcon from "../../Images/deleteIcon/Delete.svg";
import { SpecialProductStatusCart, useCashCustomerStatus } from "../../Lib/QuoteHelper";
import { useSwapContext } from "../MaterialsDetailsListing/MaterilasDetailsListing";
import NewQuantitySelector from "../NewQuantitySelector";
import SpecialOrderStatus from "../SpecialOrderProductStatus/SpecialOrderProductStatus";
import RemoveButton from "../SwiperComponent/RemoveButton";
import styles from "./CartItemStyle";

interface OwnProps {
  item: any;
}

interface IStateProps {
  itemUpdateMap: any;
  digitalId: any;
  selectedAccountId: any;
  selectedBranch: any;
}

interface IDispatchProps {
  updateCart: (param: any, callback?: IAlertCallbacks) => void;
}

let isAlertDisplayed = false;

const update = (items: any, dispatchAlert: any) => {
  if (items.length > 0) {
    const first: any = R.head(items);
    const goAhead = () => update(R.takeLast(items.length - 1, items));
    if (first.quantity > 0) {
      first.update(
        addIfEstimatedParams(
          {
            entry: transformToCartObject(first.item),
            quantity: first.quantity,
            isUpdate: true,
          },
          first.item,
        ),
        {
          onSuccess: goAhead,
          onFailure: goAhead,
        },
      );
    } else if (first.quantity === 0) {
      removeCartItem(
        transformToCartObject(first.item),
        params => {
          first.update(params, {
            onSuccess: goAhead,
            onFailure: goAhead,
          });
        },
        dispatchAlert,
      ).catch(reason => {
        first.setQuantity(first.item.decimalQty.toString());
      });
    }
  }
};

const subjectUpdateItem$ = new Subject();
const closingNotifier = subjectUpdateItem$.pipe(debounceTime(1000));

subjectUpdateItem$.pipe(buffer(closingNotifier)).subscribe(val => {
  const items = R.compose(R.map(R.last), R.values, R.groupBy(R.path(["item", "product", "code"])))(val);
  update(items, val[0]?.dispatchAlert);
});

const transformToCartObject = item => {
  return {
    product: {
      code: item.product.code,
      productPrice: item.basePrice.value,
      name: item.product.name,
      timberProductFlag: isTimberFlag(item),
      length: item.product.sellOrderMultiple,
      sellOrderMultiple: item.product.sellOrderMultiple,
    },
    entryNumber: item.entryNumber,
    decimalQty: item.decimalQty,
  };
};

type Props = OwnProps & IDispatchProps & IStateProps;
const CartItem: React.FunctionComponent<Props> = ({ item, updateCart, itemUpdateMap, digitalId, selectedAccountId, selectedBranch }: Props) => {
  const { dispatchAlert } = useCustomAlert();

  const itemQuantity = item.decimalQty.toString();
  const itemImage = R.path(["product", "images"])(item) as any[];
  const [quantity, setQuantity] = React.useState(itemQuantity);
  const { CashCustomerStatus } = useCashCustomerStatus();
  React.useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  const swipe = React.useRef(null);

  const removeFunctionality = React.useCallback(() => {
    if (!isAlertDisplayed) {
      isAlertDisplayed = true;
      removeCartItem(transformToCartObject(item), updateCart, dispatchAlert)
        .then(act => {
          isAlertDisplayed = false;
          swipe?.current?.swipe();
        })
        .catch(() => {
          isAlertDisplayed = false;
          swipe?.current?.swipe();
        });
    }
  }, [item?.product?.code + item?.entryNumber]);

  const image = !itemImage || isNilOrEmpty(R.path(["0", "url"], itemImage)) ? Images.safetyCone : { uri: itemImage[0].url };
  const { onSwapSuccess } = useSwapContext();
  return (
    <SwiperComponent ref={swipe} onFullSwipe={removeFunctionality} backView={<RemoveButton onPress={removeFunctionality} />}>
      <QuotesProductTabView
        sku={item.product.code}
        existingEntryNumber={item.entryNumber}
        fromCart={true}
        existingQuoteId={item?.product?.code}
        existingCartItem={item}
        onSwapSuccess={onSwapSuccess}
        alternateProductCount={item?.product?.alternateProductCount ?? 0}
        relatedProductCount={item?.product?.relatedProductCount ?? 0}
      />
      <ListItem style={styles.listView} {...accessibility("cartList")}>
        <View style={styles.rowView}>
          <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          <View style={styles.descriptionContainerNew}>
            <Text style={styles.brand} {...accessibility("productBrand")}>
              {item.product.manufacturer}
            </Text>
            <Text style={[styles.productDescription]} {...accessibility("productDetailsLabel")}>
              {item.product.name}
            </Text>
            <Text style={styles.tagText} {...accessibility("productSKU")}>
              {" "}
              {"SKU: " + item.product.code}
            </Text>
            <PermissionComponent
              style={styles.priceContainer}
              hideView={true}
              permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
            >
              <PriceComponent style={styles.productPrice} ignorePermission={true} value={item.basePrice.value} />
              <Text style={styles.priceSlash}> / </Text>
              <Text style={styles.priceUom} {...accessibility("productUOM")}>
                {item.unit}
              </Text>
            </PermissionComponent>
            {SpecialProductStatusCart(item?.product, item.basePrice.value) && CashCustomerStatus ? (
              <SpecialOrderStatus isFromList={true} styleContainer={styles.specialOrderStatus} />
            ) : (
              <ProductStockStatus
                styleContainer={styles.stockStatus}
                stock={getStock(item)}
                isSpecial={getSpecialFromCartResponse(item)}
                isConstrained={item.product?.pmExclusive}
              />
            )}
          </View>
        </View>

        <View style={[styles.rowView, styles.quantitySelectorStyle]}>
          <NewQuantitySelector
            uom={item.product.uomFormat || ""}
            isTimber={isTimberFlag(item)}
            quantity={quantity}
            onBlur={e => {
              if (!quantity) {
                removeCartItem(transformToCartObject(item), updateCart, dispatchAlert).catch(reason => {
                  setQuantity(item.decimalQty.toString());
                });
              }
            }}
            onChange={quantity1 => {
              setQuantity(quantity1.toString());
              if (R.isEmpty(quantity1)) {
                return;
              }
              subjectUpdateItem$.next({
                item,
                quantity: Number(quantity1),
                update: updateCart,
                setQuantity,
                digitalId,
                selectedAccountId,
                selectedBranch,
                dispatchAlert,
              });
            }}
            isDisabled={itemUpdateMap[item.product.code]}
          />
          <TouchableOpacity style={styles.deleteIconStyle} onPress={removeFunctionality}>
            <DeleteIcon />
          </TouchableOpacity>
          <View style={styles.totalPriceView}>
            <PermissionComponent
              hideView={true}
              permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
              style={styles.permissionComponentStyle}
            >
              <LoadingView style={styles.loadingView} isLoading={itemUpdateMap[item.product.code]} hideViewOnLoading={true}>
                <PriceComponent style={styles.textHeadingView} value={item.totalPrice.value} />
              </LoadingView>
            </PermissionComponent>
          </View>
        </View>
        <TimberLength
          style={styles.trimLengthView}
          fraction={2}
          isTimberFlag={isTimberFlag(item)}
          multiple={item.product.sellOrderMultiple || 1}
          uom={item.product.unitCode}
          quantity={item.decimalQty}
        />
      </ListItem>
    </SwiperComponent>
  );
};

const mapStateToProps = (state: RootState): IStateProps => ({
  itemUpdateMap: state.cart.itemUpdateMap,
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
  selectedAccountId: getSelectedAccountId(state),
  selectedBranch: state.branchList.selectedBranch,
  entries: state.cart.userCartDetail?.entries,
});

const mapDispatchProps = (dispatch: any): IDispatchProps => ({
  updateCart: (payload: any, callback) => dispatch(ProductActions.cartChange(payload, callback || {})),
});

export default connect(mapStateToProps, mapDispatchProps)(CartItem);
