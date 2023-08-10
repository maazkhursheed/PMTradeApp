import * as React from "react";
import { Platform, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import { connect, useSelector } from "react-redux";
import NativeWrapper from "~root/Components/NativeWrapper";
import NewQuantitySelector from "~root/Components/NewQuantitySelector/NewQuantitySelector";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import TimberLength from "~root/Components/TimberLength";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, isTimberFlag } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import styles from "./QuoteSearchProductListItemStyle";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  onFocus?: () => void;
}

interface DispatchProps {
  addOwnProduct: (param: any, callback?: IAlertCallbacks) => void;
}

interface StateProps {
  quoteIdSent: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const QuoteSearchProductListItem: React.SFC<Props> = ({ item, onFocus, addOwnProduct, quoteIdSent }: Props) => {
  const [quantity, setQuantity] = React.useState("1");
  const { sobId } = useSelector((state: RootState) => ({
    sobId: state?.sectionSOBQuotes?.sobId,
  }));
  const image = item.Image === "" ? Images.safetyCone : { uri: item.Image };

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
      ProductParams.product.timberProductFlag = item.timberProductFlag;
      ProductParams.product.length = item.SelectedMultiple;
    }
    if (item?.RetailPrice) {
      ProductParams.retailPrice = {
        value: item.RetailPrice,
      };
    }
    // To do api implementation
    addOwnProduct(
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
            type: "success",
            text1: "Product added to quote",
            topOffset: Platform.OS === "ios" ? 50 : 30,
            visibilityTime: 3000,
          });
        },
      },
    );
  }, [item.SKU, quantity, quoteIdSent]);
  return (
    <NativeWrapper {...accessibility("QuotesProductListItem")}>
      {
        <View style={styles.container}>
          <View style={styles.containerLineItem} {...accessibility("productListItem")}>
            <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.brand} {...accessibility("productBrand")}>
                {item.Brand}
              </Text>
              <View style={styles.productDescriptionContainer}>
                <Text style={styles.productDescription} {...accessibility("productDescription")}>
                  {item.ProductDescription}
                </Text>
                <Text style={styles.productSKU} {...accessibility("productSKU")}>
                  SKU: {item.SKU}
                </Text>
              </View>
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

              <View style={styles.retailPrice}>
                <Text style={styles.productSKU} {...accessibility("productSKU")}>
                  RRP:
                </Text>
                <PriceComponent
                  ignorePermission={true}
                  ignorePOA={true}
                  style={styles.productSKU}
                  value={item.RetailPrice}
                  {...accessibility("productPrice")}
                />
              </View>
            </View>
          </View>
          {
            // @ts-ignore
            <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
              <View style={styles.buttonsContainer}>
                <NewQuantitySelector
                  style={styles.quantitySelectorStyle}
                  uom={item.uomFormat}
                  isTimber={isTimberFlag(item)}
                  quantity={quantity}
                  onFocus={onFocus}
                  onChange={text => {
                    setQuantity(text);
                  }}
                />
                <TouchableOpacity style={styles.buttonStyle} onPress={tapAddToQuote}>
                  <Text style={styles.buttonText} {...accessibility("Add to quote")}>
                    Add to quote
                  </Text>
                </TouchableOpacity>
              </View>
              <TimberLength style={styles.rowView} isTimberFlag={isTimberFlag(item)} multiple={item.SelectedMultiple} uom={item.UOM} quantity={quantity} />
            </PermissionComponent>
          }
        </View>
      }
    </NativeWrapper>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  quoteIdSent: state.quotes.quotesListDetails.code,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  addOwnProduct: (payload: any, callback: any) => dispatch(QuotesActions.addOwnProduct(payload, callback || {})),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(QuoteSearchProductListItem);
