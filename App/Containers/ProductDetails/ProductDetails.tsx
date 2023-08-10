import "@react-native-firebase/analytics";
import firebase from "@react-native-firebase/app";
import * as R from "ramda";
import * as React from "react";
import { Keyboard, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import * as Redux from "redux";
import AddToCartBar from "~root/Components/AddToCartBar";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import BranchSelectSheetContainer from "~root/Components/BranchSelectSheetContainer/BranchSelectSheetContainer";
import ChangeBranchPDP from "~root/Components/ChangeBranchPDP";
import ChangeBranchPDPBottom from "~root/Components/ChangeBranchPDPBottom";
import ImageCarousel from "~root/Components/ImageCarousel";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import NewQuantitySelector from "~root/Components/NewQuantitySelector";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import ProductFeatureHeader from "~root/Components/ProductFeatureHeader/ProductFeatureHeader";
import ProductFeaturesListItem from "~root/Components/ProductFeaturesListItem";
import ProductStockStatus from "~root/Components/ProductStockStatus";
import RelatedProductsCarousal from "~root/Components/RelatedProductsCarousal/RelatedProductsCarousal";
import SellOrderComponent from "~root/Components/SellOrderComponent";
import style from "~root/Containers/OrderProductContainer/OrderProductStyles";
import AlternativeProductsIcon from "~root/Images/alternativeProduct/Alternativeproductsicon.svg";
import RelatedProductsIcon from "~root/Images/relatedProducts/RelatedProductsIcon.svg";
import { IAlertCallbacks, SPECIAL_ORDER_DESCRIPTION, SPECIAL_ORDER_SCREEN } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, navigationalScreens, TradeAccounts } from "~root/Lib/BranchHelper";
import { calculatePrice, isVoucherApplied } from "~root/Lib/CartHelper";
import { setDoubleState } from "~root/Lib/CommonHelper";
import {
  accessibility,
  getBranchAvailabilityAnalyticsObj,
  getProductDetailViewObject,
  getSelectedAccountId,
  getSellOrderMultipleValue,
  isTimberFlag,
  mapSanitizedItems,
  sanitizeImageUrl,
  sanitizeSolrSearchForDb,
  showRelatedToast,
} from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { EnumRelatedAndAlternateReferenceType, EnumSubtituteProductsButtonType, getSpecialFromSanitizeData, getStock } from "~root/Lib/ProductHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { CartActions } from "~root/Reducers/CartReducer";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { ProductDetailsActions } from "~root/Reducers/ProductDetailsReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { ModalButtons } from "~root/Types/ComponentTypes/ModalView";
import { PermissionTypes } from "~root/Types/Permissions";
import { IItemListRequestParam } from "~root/Types/SearchAPITypes";
import SpecialOrderDetails from "../../Components/SpecialOrderDetails";
import { SpecialProductStatusCart } from "../../Lib/QuoteHelper";
import { RootState } from "../../Reducers";
import SpecialOrdertext from "../SpecialOrderInfoContanier/SpecialOrderText";
// Styles
import styles from "./ProductDetailsStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {
  route: any;
  navigation: any;
}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {
  resetProductDetails: () => void;
  clearNewList: () => void;
  requestProductDetails: (sku: string, callbacks: IAlertCallbacks) => void;
  updateCart: (payload: any, meta: IAlertCallbacks) => void;
  addToCart: (payload: any, meta: IAlertCallbacks) => void;
  requestList: (callback: IAlertCallbacks) => void;
  requestAddItemNewList: (param: IItemListRequestParam, callback: IAlertCallbacks) => void;
  addNewList: (listName: string, callback: IAlertCallbacks) => void;
  removeList: (listName: string, callback: IAlertCallbacks) => void;
  clearNewItemsInList: () => void;
  logPixelEvent: (event: string, params: any) => void;
}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  digitalId: any;
  data: any;
  sanitizedData: any;
  loading: boolean;
  cartCount: number;
  selectedAccountId: string;
  isPromoApplied: boolean;
  selectedBranch: any;
  selectedTradeAccount: any;
}

/**
 * The local state
 */
export interface State {
  quantity: string;
  selectedMultiple: number;
  listText: string;
  bottomSheet?: React.ReactElement;
  bottomSheetFooter?: React.ReactElement;
  modalVisible: boolean;
  modalLabel: string;
  modalContent: React.ReactElement | undefined;
  modalButton: ModalButtons[];
  sheetState: SheetState;
  newListSheetState: SheetState;
  scrollEnd: boolean;
  selectedHeaderButton: string;
  relatedButtonClick: boolean;
  setHeight: any;
  cashCustomerStatus: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

export const KEY_PARAM_SKU = "keyParamSKU";
class ProductDetails extends React.Component<Props, State> {
  public scrollViewRef = React.createRef();

  private _unsubscribeFocusListener: any;

  public constructor(props: Props) {
    super(props);
    this.state = {
      quantity: "1",
      selectedMultiple: 0,
      listText: "",
      modalVisible: false,
      modalButton: [],
      modalContent: undefined,
      modalLabel: "",
      newListSheetState: SheetState.CLOSED,
      sheetState: SheetState.CLOSED,
      scrollEnd: false,
      selectedHeaderButton: "Product",
      relatedButtonClick: false,
      setHeight: {
        productDiv: 0,
        overViewDiv: 0,
      },
      cashCustomerStatus: props.selectedTradeAccount?.accountTypeEnum === TradeAccounts.CASH ? true : false,
    };
  }

  public callPixel = () => {
    setTimeout(() => {
      const title = R.propOr("Product detail", "name", this.props.data);
      const prodCode = R.propOr("0", "code", this.props.data);
      this.props.logPixelEvent("pageview", {
        title,
        ptype: "product",
        prod_id: prodCode,
        prod_name: title,
        sku: prodCode,
      });
    }, 2000);
  };

  public componentDidMount(): void {
    Keyboard.dismiss();
    this._unsubscribeFocusListener = this.props.navigation.addListener("focus", () => {
      this.callPixel();
      this.setState({ relatedButtonClick: false });
    });
    this.callProductDetailsApi();
  }

  callProductDetailsApi = () => {
    this.props.resetProductDetails();
    this.props.requestProductDetails(this.props.route.params?.keyParamSKU ?? "", {
      onSuccess: () => {
        this.setState({
          selectedMultiple: !isTimberFlag(this.props.data) ? 0 : getSellOrderMultipleValue(this.props.data),
        });
        this.logProductDetailViewEvents("view_item");
        this.logBranchAvailabilityEvents("branch_availability");
      },
      onFailure: () => {
        this.props.navigation.goBack();
      },
    });
  };

  public componentWillUnmount(): void {
    this._unsubscribeFocusListener();
  }

  public logBranchAvailabilityEvents(event: any) {
    const eventLogObject = getBranchAvailabilityAnalyticsObj({
      event,
      userId: this.props.digitalId,
      accountId: this.props.selectedAccountId,
      uniqueId: this.props.sanitizedData.SKU,
      branch: this.props.selectedBranch.name,
      branchId: this.props.selectedBranch.branchID,
      location: getBranchTownRegion(this.props.selectedBranch),
      availability: this.props?.selectedBranch?.branchID + " : " + this.props?.sanitizedData?.stock?.stockLevelStatus,
    });
    firebase.analytics().logEvent(event, eventLogObject);
  }

  public onUpdateCart = () => {
    this.props.updateCart(
      {
        entry: {
          ...this.props.sanitizedData,
          UniqueId: this.props.sanitizedData.SKU + "-" + this.state.selectedMultiple,
          SelectedMultiple: this.state.selectedMultiple.toString(),
          Quantity: this.state.quantity,
        },
        quantity: this.state.quantity,
        isUpgrade: false,
      },
      {
        onSuccess: () => showRelatedToast(this.props.sanitizedData?.relatedProductCount ?? 0, this.props.sanitizedData?.SKU),
      },
    );
  };

  public navigateToRelatedAlternateProduct(referenceType: string) {
    this.props.navigation.navigate("RelatedProductsDetails", {
      data: {
        referenceType,
        productCode: this.props.route.params?.keyParamSKU ?? "",
      },
    });
  }

  public logProductDetailViewEvents(event: any) {
    const eventLogObject = getProductDetailViewObject({
      event,
      digitalId: this.props.digitalId,
      selectedAccountId: this.props.selectedAccountId,
      sanitizedData: this.props.sanitizedData,
      location: getBranchTownRegion(this.props.selectedBranch),
      storeName: this.props.selectedBranch?.name,
    });
    if (!__DEV__) {
      firebase.analytics().logEvent(event, eventLogObject);
    }
  }

  public renderBranchSelectSheetContainer(children: any) {
    return (
      <BranchSelectSheetContainer
        isConstrained={this.props.sanitizedData.PmExclusive}
        product={this.props.sanitizedData}
        onSelectPickupBranch={() => {
          this.callProductDetailsApi();
        }}
      >
        {children}
      </BranchSelectSheetContainer>
    );
  }

  public onPressProductDetails = () => {
    this.setState({ selectedHeaderButton: EnumSubtituteProductsButtonType.PRODUCT });
    this.scrollViewRef?.current?.scrollToPosition(0, 0, true);
    this.setState({ scrollEnd: false });
  };

  public onPressRelated = () => {
    this.setState({ selectedHeaderButton: EnumSubtituteProductsButtonType.RELATED });
    this.scrollViewRef?.current?.scrollToPosition(0, this.state.setHeight?.productDiv, true);
  };

  public onPressAlternateProduct = () => {
    this.navigateToRelatedAlternateProduct(EnumRelatedAndAlternateReferenceType.SIMILAR);
  };

  public isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = this.state.setHeight?.overViewDiv / 2;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  public isCloseToRelative = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= this.state.setHeight?.productDiv * 1.2 && this.props.data?.hasRelatedProducts;
  };

  public onCickViewAll = () => {
    this.setState({ selectedHeaderButton: EnumSubtituteProductsButtonType.RELATED, relatedButtonClick: true });
  };

  public render() {
    const subTotal = calculatePrice(
      isTimberFlag(this.props.data),
      this.props.sanitizedData.Price,
      Number(this.state.quantity),
      this.state.selectedMultiple,
    ).toFixed(2);

    const alternateProductCount = this.props.data?.alternateProductCount ?? 0;
    const relatedProductCount = this.props.data?.relatedProductCount ?? 0;

    return (
      <MainContainer>
        <ProductFeatureHeader
          title={R.propOr("", "name", this.props.data)}
          productCode={this.props.route.params?.keyParamSKU ?? ""}
          onPressRelatedProduct={this.onPressRelated}
          onPressProductDetails={this.onPressProductDetails}
          onPressAlternateProduct={this.onPressAlternateProduct}
          selectedHeaderButton={this.state.selectedHeaderButton}
          alternateProductsCount={alternateProductCount}
          relatedProductsCount={relatedProductCount}
        />
        <LoadingView style={style.productDetailContainer} hideViewOnLoading={true} isLoading={this.props.loading}>
          <KeyboardAwareScrollView
            onScroll={({ nativeEvent }) => {
              if (!this.state.relatedButtonClick) {
                if (this.isCloseToBottom(nativeEvent)) {
                  this.setState({ selectedHeaderButton: EnumSubtituteProductsButtonType.PRODUCT });
                } else if (this.isCloseToRelative(nativeEvent)) {
                  this.setState({ selectedHeaderButton: EnumSubtituteProductsButtonType.RELATED });
                } else {
                  this.setState({ selectedHeaderButton: EnumSubtituteProductsButtonType.PRODUCT });
                }
              }
            }}
            scrollEventThrottle={400}
            ref={this.scrollViewRef}
            style={styles.container}
          >
            <View
              style={styles.containerMeta}
              onLayout={e => this.setState({ setHeight: { ...this.state.setHeight, productDiv: e.nativeEvent.layout.height } })}
            >
              <Text style={styles.brand} {...accessibility("productDetailBrandName")}>
                {R.propOr("", "manufacturer", this.props.data)}
              </Text>
              <Text style={styles.productDescription} {...accessibility("productDetailDescription")}>
                {R.propOr("", "name", this.props.data)}
              </Text>
              <View style={styles.productCodesContainer}>
                <Text {...accessibility("productSKU")} style={styles.productSKU}>
                  {`SKU: ${this.props.data?.code} `}
                </Text>
                {this.props.data?.manufacturerId && (
                  <>
                    <Text style={styles.priceSlash}> | </Text>
                    <Text {...accessibility("productCode")} style={styles.productSKU}>
                      {`Code: ${this.props.data?.manufacturerId} `}
                    </Text>
                  </>
                )}
              </View>
              <View style={styles.priceContainer}>
                <PermissionComponent
                  style={styles.price}
                  hideView={true}
                  permissionTypes={[PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.ViewPricing]}
                >
                  <PriceComponent style={styles.productPrice} value={R.path(["price", "value"], this.props.data)} {...accessibility("productPrice")} />
                  <Text style={styles.priceSlash}> / </Text>
                </PermissionComponent>
                <Text {...accessibility("productUom")} style={styles.priceUom}>
                  {R.propOr("", "unitCode", this.props.data)}
                </Text>
              </View>
              <View style={styles.stockStatusContainer}>
                {SpecialProductStatusCart(this.props.data) && this.state.cashCustomerStatus ? (
                  <SpecialOrdertext
                    style={styles.specialOrderTextMargin}
                    onPress={() => {
                      this.props.navigation.navigate(SPECIAL_ORDER_SCREEN);
                    }}
                    infoSource={true}
                  />
                ) : (
                  <ProductStockStatus
                    stock={getStock(this.props.data)}
                    isSpecial={getSpecialFromSanitizeData(this.props.sanitizedData || {})}
                    isPDP={true}
                    isConstrained={this.props.sanitizedData.PmExclusive}
                  />
                )}
                {this.renderBranchSelectSheetContainer(
                  <ChangeBranchPDP branchName={this.props.selectedBranch?.name} isConstrained={this.props.sanitizedData.PmExclusive} />,
                )}
              </View>
              {SpecialProductStatusCart(this.props.data) && this.state.cashCustomerStatus && (
                <Text style={styles.specialOrderMessage}>{SPECIAL_ORDER_DESCRIPTION}</Text>
              )}

              <ImageCarousel
                images={R.compose(
                  R.map(R.compose(sanitizeImageUrl, R.prop("url"))),
                  R.filter(R.both(R.propEq("format", "product"), R.propEq("imageType", "GALLERY"))),
                  R.propOr([], "images"),
                )(this.props.data)}
              />

              {!!this.props.data && (
                <PermissionComponent
                  style={styles.quantitySelector}
                  hideView={true}
                  permissionTypes={[PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.PlaceOrders]}
                >
                  {isTimberFlag(this.props.data) && (
                    <SellOrderComponent
                      orderMultiple={getSellOrderMultipleValue(this.props.data)}
                      onSelectOrderMultiple={selectedMultiple => this.setState({ selectedMultiple })}
                    />
                  )}
                  <Text style={styles.unitStyleQuantity}>{"Quantity"}</Text>
                  <NewQuantitySelector
                    onBlur={e => {
                      if (Number(this.state.quantity) === 0) {
                        this.setState({ quantity: "1" });
                      }
                    }}
                    isTimber={isTimberFlag(this.props.data)}
                    quantity={this.state.quantity}
                    onChange={(quantity, fromIcon) => {
                      if (fromIcon && Number(quantity) === 0) {
                        setDoubleState(this.setState.bind(this), { quantity }, { quantity: "1" });
                      } else {
                        this.setState({ quantity });
                      }
                    }}
                    containerStyle={styles.quantityContainerStyle}
                    uom={this.props.data.uomFormat}
                  />

                  {isTimberFlag(this.props.data) && (
                    <Text style={[styles.unitStyleNew]}>{"Total length: " + (Number(this.state.quantity) * this.state.selectedMultiple).toFixed(1) + "m"}</Text>
                  )}
                  {/* FIXME: Removing This as per Blake suggestion. This implementation is wrong and need to fix as quickly as possible.*/}
                  {/*
                  <View style={styles.dividerView} />
                  <Text
                    style={styles.unitStyle}
                    testID={"availableDelivery&Pickup"}
                    accessibilityLabel={Platform.select({
                      android: "availableDelivery&Pickup",
                    })}
                  >
                    Available for Delivery & Pickup
                  </Text>
                  <Text
                    testID={"orderTodayText"}
                    accessibilityLabel={Platform.select({
                      android: "orderTodayText",
                    })}
                    style={styles.deliversStyle}
                  >
                    Order today, delivers:{" "}
                  </Text>
                  <Text
                    testID={"orderDeliveryDate"}
                    accessibilityLabel={Platform.select({
                      android: "orderDeliveryDate",
                    })}
                    style={styles.unitStyle}
                  >
                    {getOrderDeliverDate(this.props.data)}
                  </Text>*/}
                </PermissionComponent>
              )}
            </View>
            <View style={styles.containerSpecialOrder}>
              {SpecialProductStatusCart(this.props.data) && this.state.cashCustomerStatus && (
                <SpecialOrderDetails
                  onPress={() => {
                    this.props.navigation.navigate(SPECIAL_ORDER_SCREEN);
                  }}
                />
              )}
            </View>
            <View style={styles.containerFeatures}>{relatedProductCount > 0 && <RelatedProductsCarousal onCickViewAll={this.onCickViewAll} />}</View>
            <View
              style={styles.containerFeatures}
              onLayout={e => this.setState({ setHeight: { ...this.state.setHeight, overViewDiv: e.nativeEvent.layout.height } })}
            >
              <ProductFeaturesListItem
                title={"Overview"}
                onPress={() => {
                  this.props.navigation.navigate("ProductOverview", {
                    item: this.props.data,
                  });
                }}
              />
              <ProductFeaturesListItem
                title={"Specifications"}
                onPress={() => {
                  this.props.navigation.navigate("ProductSpecification", {
                    item: this.props.data,
                  });
                }}
              />
              <ProductFeaturesListItem
                title={"Warranty"}
                onPress={() => {
                  this.props.navigation.navigate("ProductWarranty", {
                    item: this.props.data,
                  });
                }}
              />
              <ProductFeaturesListItem
                title={"Supporting documents"}
                onPress={() => {
                  this.props.navigation.navigate("SupportingDocument", {
                    item: this.props.data,
                  });
                }}
              />
              {alternateProductCount > 0 && (
                <ProductFeaturesListItem
                  title={`Alternative Products (${alternateProductCount})`}
                  onPress={() => this.navigateToRelatedAlternateProduct(EnumRelatedAndAlternateReferenceType.SIMILAR)}
                  relatedIcon={<AlternativeProductsIcon width="23" height="23" />}
                />
              )}
              {relatedProductCount > 0 && (
                <ProductFeaturesListItem
                  title={`Related Products (${relatedProductCount})`}
                  onPress={() => {
                    this.onCickViewAll();
                    this.navigateToRelatedAlternateProduct(EnumRelatedAndAlternateReferenceType.ACCESSORIES);
                  }}
                  alternativeIcon={<RelatedProductsIcon width="23" height="23" />}
                />
              )}
              {this.renderBranchSelectSheetContainer(
                <ChangeBranchPDPBottom branchName={this.props.selectedBranch?.name} isConstrained={this.props.sanitizedData.PmExclusive} />,
              )}
            </View>
          </KeyboardAwareScrollView>
        </LoadingView>
        {!this.props.loading && (
          <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.PlaceOrders]}>
            <AddToCartBar
              item={this.props.sanitizedData}
              quantity={Number(this.state.quantity)}
              onUpdateCart={this.onUpdateCart}
              subTotal={subTotal}
              {...accessibility("addToCartBar")}
            />
          </PermissionComponent>
        )}
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): DispatchProps => ({
  requestProductDetails: (sku: string, callback: IAlertCallbacks) => dispatch(ProductDetailsActions.requestProductDetails(sku, callback)),
  clearNewList: () => dispatch(MyListActions.clearNewList()),
  resetProductDetails: () => dispatch(ProductDetailsActions.resetProductDetails()),
  updateCart: (payload: any, meta: IAlertCallbacks) => dispatch(ProductActions.cartChange(payload, meta)),
  requestList: alertCallbacks => dispatch(MyListActions.getAllList(undefined, alertCallbacks)),
  addNewList: (listName, callback) => dispatch(MyListActions.addList(listName, callback)),
  removeList: (listName, callback) => dispatch(MyListActions.removeList(listName, callback)),
  requestAddItemNewList: (param, callback) => dispatch(MyListActions.addItemToNewList(param, callback)),
  clearNewItemsInList: () => dispatch(MyListActions.clearNewList()),
  logPixelEvent: (event, params) => dispatch(PixelActions.pixelRequest(event, params)),
  addToCart: (payload, meta) => dispatch(CartActions.addProductToCartRequest(payload, meta)),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
    isPromoApplied: isVoucherApplied(state.cart),
    data: state.productDetail.data || {},
    sanitizedData: R.compose(mapSanitizedItems(state), sanitizeSolrSearchForDb)(state.productDetail.data),
    loading: !!state.productDetail.fetching,
    cartCount: state.cart.cartEntriesCount,
    selectedAccountId: getSelectedAccountId(state),
    selectedBranch: state.branchList.selectedBranch,
    selectedTradeAccount: state.connectTrade?.selectedTradeAccount,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(safeRender(ProductDetails, navigationalScreens.ProductDetailsScreen)));
