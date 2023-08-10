import * as R from "ramda";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Text, TextProps, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "rxjs";
import { buffer, debounceTime } from "rxjs/operators";
import NewQuantitySelector from "~root/Components/NewQuantitySelector/NewQuantitySelector";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import QuotesProductTabView from "~root/Components/QuotesProductTabView/QuotesProductTabView";
import TimberLength from "~root/Components/TimberLength";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, isTimberFlag, transformToQuoteProductObject } from "~root/Lib/DataHelper";
import { getLastUpdatedItemInArray, getProductImage } from "~root/Lib/ProductHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import DeleteIcon from "../../Images/deleteIcon/Delete.svg";
import { useSwapContext } from "../MaterialsDetailsListing/MaterilasDetailsListing";
import styles from "./QuotesProductListItemStyle";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  ref?: any;
  onFocus?: () => void;
  productDescriptionProps?: TextProps;
  remove: () => void;
}

type Props = OwnProps;

const update = (items: any) => {
  if (items.length > 0) {
    const first: any = R.head(items);
    const goAhead = () => update(R.takeLast(items.length - 1, items));
    if (first.quantity > 0) {
      first.update(transformToQuoteProductObject(first), {
        onSuccess: goAhead,
        onFailure: () =>
          first.setQuantity(
            isTimberFlag(first.item) ? R.path(["item", "selectedConfiguration", "0", "quantity"], first) + "" : first.item.decimalQty.toString(),
          ),
      });
    } else if (first.quantity === 0) {
      first.remove();
    }
  }
};

const subjectUpdateItem$ = new Subject();
const closingNotifier = subjectUpdateItem$.pipe(debounceTime(1000));

subjectUpdateItem$.pipe(buffer(closingNotifier)).subscribe(val => {
  const lastUpdatedItemInArray = getLastUpdatedItemInArray(val);
  update(lastUpdatedItemInArray);
});

const QuotesProductListItem: React.FC<Props> = forwardRef(({ item, onFocus, remove, productDescriptionProps }: Props, ref) => {
  const getQuantity = React.useCallback(
    () => (isTimberFlag(item) ? R.path(["selectedConfiguration", "0", "quantity"], item) + "" : item.decimalQty.toString()),
    [item.selectedConfiguration, item.decimalQty],
  );

  const imageUrl = getProductImage(item) === "" ? Images.safetyCone : { uri: getProductImage(item) };
  const [quantity, setQuantity] = React.useState(getQuantity());
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  useImperativeHandle(
    ref,
    () => ({
      resetQuantity: () => {
        setQuantity(getQuantity());
      },
    }),
    [item, getQuantity],
  );

  const { quoteId, sobId } = useSelector((state: RootState) => ({
    quoteId: state?.quotes?.quotesListDetails?.code,
    sobId: state?.sectionSOBQuotes?.sobId,
  }));
  const dispatch = useDispatch();
  const isQuoteEditable = useQuoteStatusChecker();
  React.useEffect(() => {
    setQuantity(getQuantity());
  }, [item.decimalQty, item.selectedConfiguration, getQuantity]);

  useEffect(() => {
    if (item.animation) {
      // TODO: Add animation here
    }
  }, [item.animation]);

  const onChange = React.useCallback(
    quantity1 => {
      setQuantity(quantity1.toString());
      if (R.isEmpty(quantity1)) {
        return;
      }
      subjectUpdateItem$.next({
        item,
        quantity: Number(quantity1),
        update: (params: any, callback: IAlertCallbacks) => {
          isQuoteEditable(
            () =>
              dispatch(
                QuotesActions.updateProductQuantity(
                  {
                    urlParams: {
                      entryNumber: item.entryNumber,
                      quoteId,
                      sobId,
                    },
                    bodyParams: params,
                  },
                  callback || {},
                ),
              ),
            () => setQuantity(getQuantity),
          );
        },
        remove,
        setQuantity,
      });
    },
    [item, quoteId, remove],
  );

  const { onSwapSuccess } = useSwapContext();
  return (
    <View {...accessibility("QuotesProductListItem")}>
      {
        <View style={[styles.container]}>
          <QuotesProductTabView
            sku={item.product.code}
            existingEntryNumber={item.entryNumber}
            existingQuoteId={quoteId}
            fromQuotes={true}
            onSwapSuccess={onSwapSuccess}
            alternateProductCount={item?.product?.alternateProductCount ?? 0}
            relatedProductCount={item?.product?.relatedProductCount ?? 0}
          />
          <View style={styles.containerLineItem} {...accessibility("productListItem")}>
            <FastImage source={imageUrl} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.brand} {...accessibility("productBrand")}>
                {R.pathOr("", ["product", "manufacturer"])(item)}
              </Text>
              <View style={styles.productDescriptionContainer}>
                <Text style={styles.productDescription} {...accessibility("productDescription")} {...productDescriptionProps}>
                  {item.product.name}
                </Text>
                {!item?.customProductFlag && (
                  <Text style={styles.productSKU} {...accessibility("productSKU")}>
                    SKU: {item.product.code}
                  </Text>
                )}
              </View>
              <View style={styles.priceContainer}>
                <PermissionComponent
                  style={styles.priceContainer}
                  hideView={true}
                  permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
                >
                  <PriceComponent ignorePermission={true} style={styles.productPrice} value={item.basePrice.value} {...accessibility("productPrice")} />
                  <Text style={styles.priceSlash}> / </Text>
                </PermissionComponent>
                <Text style={[styles.priceUom]} {...accessibility("productUom")}>
                  {item.product.unitCode}
                </Text>
              </View>

              {!item?.customProductFlag && (
                <View style={styles.retailPrice}>
                  <Text style={styles.productSKU} {...accessibility("productSKU")}>
                    RRP:
                  </Text>
                  <PriceComponent
                    ignorePermission={true}
                    ignorePOA={true}
                    style={styles.productSKU}
                    value={item.retailPrice.value}
                    {...accessibility("productPrice")}
                  />
                </View>
              )}
            </View>
          </View>
          {
            // @ts-ignore
            <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
              <View style={styles.buttonsContainer}>
                <View style={styles.quantitySelectorContainer}>
                  <NewQuantitySelector
                    style={styles.quantitySelectorStyle}
                    uom={item.product.appUomFormat}
                    isTimber={isTimberFlag(item)}
                    quantity={quantity}
                    onFocus={onFocus}
                    onChange={onChange}
                    isDisabled={isQuoteWonOrLost}
                    hidePlusMinusIcons={isQuoteWonOrLost}
                  />
                  <TouchableOpacity style={styles.deleteIconStyle} onPress={remove}>
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
                <PriceComponent ignorePermission={true} style={styles.value} value={item.totalPrice.value} {...accessibility("productPrice")} />
              </View>
              <TimberLength
                style={styles.rowView}
                isTimberFlag={isTimberFlag(item)}
                multiple={item.product.sellOrderMultiple}
                uom={item.unit}
                quantity={quantity}
              />
            </PermissionComponent>
          }
        </View>
      }
    </View>
  );
});

export default QuotesProductListItem;
