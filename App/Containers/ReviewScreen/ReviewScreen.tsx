import firebase from "@react-native-firebase/app";
import moment from "moment";
import * as R from "ramda";
import * as React from "react";
import { ActivityIndicator, Animated, Linking, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import UXCam from "react-native-ux-cam";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { interval, Subject } from "rxjs";
import { throttle } from "rxjs/operators";
import { Card } from "~root/Components/Card";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import { DateTimeSelector } from "~root/Components/DateTimeSelector";
import EstimateProductDisclosure from "~root/Components/EstimateProductDisclosure";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import CustomModalView from "~root/Components/ModalView/CustomModalView";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import RequestAnItem from "~root/Components/RequestAnItem/RequestAnItem";
import ReviewCartItem from "~root/Components/ReviewCartItem/ReviewCartItem";
import ReviewDeliveryOptionalRequirementItem from "~root/Components/ReviewDeliveryOptionalRequirementItem";
import SmallHeader from "~root/Components/SmallHeader";
import AppConfig from "~root/Config/AppConfig";
import {
  branchEmailError,
  CONTINUE_PAYMENT,
  creditLimitError,
  DISCLOSURE_TEXT_REVIEW,
  FIND_DELIVERY_OPTIONS,
  IAlertCallbacks,
  OKButton,
  PLACE_ORDER,
  titleErr,
  TOTAL_PRICE_GST,
} from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, navigationalScreens, OrderTypes, SiteRequirements } from "~root/Lib/BranchHelper";
import { isVoucherApplied } from "~root/Lib/CartHelper";
import { getTrimmedUserName } from "~root/Lib/CommonHelper";
import { accessibility, getFulfilmentpageAnalyticsObj, getSelectedAccountId, occludeSensitiveView } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { isNotificationOn } from "~root/Lib/NotificationsHelper";
import { formatAddress, getFulfillmentHeaderTitle, getImage, getTitle } from "~root/Lib/OrderItemHelper";
import { checkOrderCreditLimit } from "~root/Lib/OrderSummaryHelper";
import { getSpecialFromCartResponse, getSpecialProducts } from "~root/Lib/ProductHelper";
import { getInitials } from "~root/Lib/StringHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ApplicationStyles, Colors, Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import ReviewCartItemMenu from "../../Components/ReviewCartItemMenu/ReviewCartItemMenu";
import AdditionalChargesInfo from "./AdditionalChargesInfo";
import DeliveryCharges from "./DeliveryCharges";
import DistanceTime from "./DistanceTime";
import PayLaterPriceInfo from "./PayLaterPriceInfo";
import PayNowPriceInfo from "./PayNowPriceInfo";
import styles from "./ReviewScreenStyle";
import TotalDelivery from "./TotalDelivery";
import TotalProducts from "./TotalProducts";
/**
 * The properties mapped from the global state
 */
export interface StateProps {
  selectedBranch: any;
  selectedTradeAccount: any;
  selectedJobAccount: any;
  cartDetailData: any;
  entries: any;
  totalPrice: number;
  subTotal: number;
  discountPrice: number;
  userData: any;
  orderType: OrderTypes;
  cartData: any;
  placeOrderLoading: boolean;
  creditLimit: number;
  isPromoApplied: boolean;
  digitalId: any;
  cartDetail: any;
  selectedAccountId: string;
  selectedAddress: string | undefined;
  totalPriceWithGST: number;
  totalGST: number;
  payOnCallBackTotalPrice: number;
}

export interface DispatchProps {
  createCart: () => void;
  callPlaceOrderApi: (payload: any, meta: IAlertCallbacks) => void;
  updateRequestDateTime: (payload: any) => void;
  updateOptionalRequirements: (payload: any) => void;
}

/**
 * The local state
 */
export interface State {
  scrollY: Animated.Value;
  isScrolledToBottom: boolean;
  showLoaderAlert: boolean;
  buttonText: string;
  isFromAddToExisting: boolean;
  previousOrder: any;
  customModelData: any;
}

type Props = StateProps & DispatchProps & NavigationScreenProps;
class ReviewScreen extends React.Component<Props, State> {
  private placeOrderClickSubject$ = new Subject<undefined>();

  constructor(props: Props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      isScrolledToBottom: false,
      showLoaderAlert: false,
      buttonText: "",
      isFromAddToExisting: props.route?.params?.isFromAddToExisting ?? false,
      previousOrder: props.route?.params?.previousOrder ?? "",
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    };
    this.placeOrderClickSubject$.pipe(throttle(val => interval(1000))).subscribe(this.placeOrder);
  }

  public componentDidMount() {
    this.logFirebaseEvent(9, this.props.orderType);
  }

  public disableCustomModel = () => {
    this.setState({
      customModelData: {
        visible: false,
        heading: "",
        message: "",
        onClose: undefined,
        button1Text: "",
        onButton1Press: undefined,
      },
    });
  };

  public logFirebaseEvent(step: number, orderType: string) {
    const digitalId = this.props.digitalId;
    const cartDetail = this.props.cartDetail;
    const selectedAccountId = this.props.selectedAccountId;
    const selectedAddress = this.props.selectedAddress;
    const previousOrder = this.state.previousOrder;
    const eventLogObject = getFulfilmentpageAnalyticsObj({
      step,
      orderType: this.state.isFromAddToExisting ? OrderTypes.ADD_TO_EXISTING : orderType,
      props: {
        digitalId,
        cartDetail,
        selectedAccountId,
        selectedAddress: previousOrder?.formattedAddress || selectedAddress || "",
      },
      location: getBranchTownRegion(this.props.selectedBranch),
      storeName: this.props.selectedBranch?.name,
      deliveryType: this.props.cartData.truckRequirements,
      onSiteLift: this.props.cartData.siteRequirements.includes(SiteRequirements.OnSiteLift).toString(),
      onSiteHazards: this.props.cartData.siteRequirements.includes(SiteRequirements.OnSiteHazards).toString(),
      restrictedAccess: this.props.cartData.siteRequirements.includes(SiteRequirements.RestrictedAccess).toString(),
      orderNumber: this.state.previousOrder ? this.state.previousOrder?.orderNumber : "",
    });
    if (!__DEV__) {
      step === 11 ? firebase.analytics().logEvent("purchase", eventLogObject) : firebase.analytics().logEvent("begin_checkout", eventLogObject);
    }
  }

  public renderLoaderComponent = () => {
    UXCam.setAutomaticScreenNameTagging(false);
    return (
      <View style={styles.modelAlert}>
        <ActivityIndicator color={Colors.black} size={"large"} />
        <Text style={styles.poCodeTxt}>Placing order…</Text>
      </View>
    );
  };

  public showAlert = (heading: string, message: string, buttonText: string) => {
    this.setState({
      customModelData: {
        visible: true,
        heading: heading,
        message: message,
        onClose: () => {
          this.disableCustomModel();
        },
        button1Text: buttonText,
        onButton1Press: () => {
          this.disableCustomModel();
          if (buttonText.includes("Done")) {
            this.props.updateRequestDateTime({
              requestDate: "",
              requestTime: "",
            });
            this.props.updateOptionalRequirements({
              siteRequirements: [],
              truckRequirements: "",
              additionalInfo: "",
            });
            this.props.createCart();
            this.props.navigation.reset({
              routes: [{ name: "Express" }],
            });
          }
        },
      },
    });
  };

  public placeOrder = () => {
    this.logFirebaseEvent(10, this.props.orderType);
    const branchEmail = this.props.selectedBranch.address.email;
    if (checkOrderCreditLimit(this.props)) {
      this.showAlert("", creditLimitError, OKButton);
    } else if (AppConfig.IS_PRODUCTION && !branchEmail) {
      this.showAlert(titleErr, branchEmailError, OKButton);
    } else {
      this.setState({ showLoaderAlert: true });
      this.props.callPlaceOrderApi(undefined, {
        onSuccess: () => {
          this.logFirebaseEvent(11, this.props.orderType);
          this.setState({ showLoaderAlert: false });
          this.props.navigation.reset({
            routes: [{ name: "OrderConfirmation" }],
          });
        },
        onFailure: () => {
          this.setState({ showLoaderAlert: false });
          this.showAlert("Something went wrong", "An error occurred while loading this screen. Please try again.", OKButton);
        },
      });
    }
  };

  public renderFooterComponent = () => {
    const { entries, cartDetail } = this.props;
    if (entries.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <View style={styles.separator} />
          {cartDetail?.requestItem && <RequestAnItem reviewMode />}
          <PermissionComponent
            style={styles.permissionComponentStyle}
            hideView={true}
            permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
          >
            <View style={styles.priceView}>
              <Text style={styles.summaryText}>{"Summary"}</Text>
            </View>
            {this.props.orderType !== OrderTypes.STANDARD && <View style={styles.lineSeparator} />}
            {this.props.orderType !== OrderTypes.STANDARD && (
              <View style={styles.priceView}>
                <Text style={styles.subTotalText}>{"Subtotal"}</Text>
                <PriceComponent style={[styles.subTotalText, styles.colorStyle]} value={this.props.subTotal} {...accessibility("subTotalPrice")} />
              </View>
            )}

            {!this.state.isFromAddToExisting && <DeliveryCharges />}

            <View style={styles.lineSeparator} />
            {this.props.isPromoApplied && (
              <View>
                <View style={styles.priceView}>
                  <Text style={styles.subTotalText}>{"Total Discount"}</Text>
                  <View style={styles.priceComponentStyle}>
                    <CustomIcon name={"Tag-icon"} style={[styles.iconStyle, styles.tagIconStyle]} />
                    <View>
                      <PriceComponent
                        style={[styles.subTotalText, styles.colorStyle]}
                        value={`${this.props.discountPrice}`}
                        {...accessibility("discountPrice")}
                        prefix={"-$"}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.lineSeparator} />
              </View>
            )}
            {!this.state.isFromAddToExisting && <TotalDelivery />}
            <TotalProducts />
            <View style={styles.priceView}>
              <Text style={styles.totalText}>{TOTAL_PRICE_GST}</Text>
              <PriceComponent style={[styles.totalText, styles.colorStyle]} value={this.props.totalPrice} prefix={"$"} {...accessibility("totalPrice")} />
            </View>
            <View style={styles.lineSeparator} />
            <EstimateProductDisclosure style={styles.disclosureContainer} disClosureText={DISCLOSURE_TEXT_REVIEW} />
          </PermissionComponent>
          {this.state.isFromAddToExisting && <AdditionalChargesInfo />}
        </View>
      );
    }
    return <View />;
  };
  public handleScrollToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    const pixelsFromBottom = 60;
    const is50pxFromBottom = layoutMeasurement.height + contentOffset.y <= contentSize.height - pixelsFromBottom;
    if (isBottom && !this.state.isScrolledToBottom) {
      this.setState({
        isScrolledToBottom: true,
      });
    } else if (is50pxFromBottom && this.state.isScrolledToBottom) {
      this.setState({
        isScrolledToBottom: false,
      });
    }
  };

  public renderContactItem = (contact: any) => {
    const fullName = getTrimmedUserName(contact?.firstName || "", contact?.lastName || "");
    return (
      <View ref={occludeSensitiveView} style={styles.mainContactView}>
        <View style={styles.profileBtn}>
          <Text ref={occludeSensitiveView} style={styles.profileBtnTxt}>
            {getInitials(fullName)}
          </Text>
        </View>
        <View style={styles.contactNotificationView}>
          <Text ref={occludeSensitiveView} style={styles.user}>
            {fullName}
          </Text>
          <Text ref={occludeSensitiveView} style={styles.subUser}>
            {contact.mail}
          </Text>
          <Text ref={occludeSensitiveView} style={styles.subUser}>
            {contact.mobile}
          </Text>
          {this.props.orderType !== OrderTypes.EXPRESS && (
            <Text style={styles.subUser}>{isNotificationOn(this.props.orderType, contact?.smsFlags) ? "Notifications On" : "Notifications Off"}</Text>
          )}
        </View>
      </View>
    );
  };

  public renderContactView = () => {
    return (
      <Card style={styles.mainSectionView}>
        <CardSectionHeader text={this.props.orderType === OrderTypes.EXPRESS ? "Contact details" : "Contact notifications"} />
        {this.props.cartDetailData.siteContacts?.map((contact: any) => this.renderContactItem(contact))}
      </Card>
    );
  };

  public renderDeliveryOptionDetails = () => {
    const branchAddress = this.props.selectedBranch.address;
    const selectedBranchLines = formatAddress([branchAddress.line1, branchAddress.line2]);
    const selectedBranchTownPost = formatAddress([branchAddress.town, branchAddress.postalCode]);
    const deliveryAddress = this.props.cartDetailData?.deliveryAddress;
    const selectedAddress = formatAddress([deliveryAddress?.line2, deliveryAddress?.town, deliveryAddress?.postalCode]);
    return (
      <Card style={styles.mainSectionView}>
        <CardSectionHeader text={getFulfillmentHeaderTitle(this.props.orderType)} />
        <DateTimeSelector
          selectedDate={moment(this.props.cartData.requestDate, "DD/MM/YYYY")}
          selectedTimeRange={this.props.cartData.requestTime}
          isDisable={true}
          orderType={this.props.orderType}
        />
        <View style={styles.mainDeliveryOptionsDetailView}>
          {this.props.orderType === OrderTypes.PICKUP ? (
            <FastImage
              source={Images.placemakerTradeLogo} // getDeliveryOptionLocationImage(this.props.orderType)}
              style={styles.imagePickUpDetails}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View style={styles.locationIconContainer}>
              <CustomIcon style={styles.locationIconStyle} name={"location"} />
            </View>
          )}
          {this.props.orderType === OrderTypes.PICKUP ? (
            <View style={styles.contactView}>
              <Text style={styles.user}>{this.props.selectedBranch?.name}</Text>
              <Text style={styles.subUser}>{selectedBranchLines || ""}</Text>
              <Text style={styles.subUser}>{selectedBranchTownPost || ""}</Text>
            </View>
          ) : (
            <View style={styles.contactView}>
              <Text style={styles.user}>{deliveryAddress?.line1?.trim() || ""}</Text>
              <Text style={styles.subUser}>{selectedAddress || ""}</Text>
            </View>
          )}
        </View>
        {!this.state.isFromAddToExisting && <DistanceTime />}
      </Card>
    );
  };

  public renderDeliveryOption = () => {
    return (
      <Card style={styles.mainSectionView}>
        <CardSectionHeader text={"Delivery option"} />
        <View style={styles.deliverOptionView}>
          <FastImage source={getImage(this.props.orderType)} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          <Text style={styles.deliverOptionViewText}>{getTitle(this.props.orderType)}</Text>
        </View>
      </Card>
    );
  };

  public renderAccountDetails = () => {
    const accountName = this.props.selectedJobAccount ? this.props.selectedJobAccount.SearchName : this.props.selectedTradeAccount.name;
    return (
      <Card style={styles.mainSectionView}>
        <CardSectionHeader text={"Account details"} />
        <View style={styles.accountView}>
          <FastImage source={Images.building} style={styles.imageAccount} resizeMode={FastImage.resizeMode.contain} />
          <View style={styles.contactView}>
            <Text style={styles.subUser}>Account name</Text>
            <Text ref={occludeSensitiveView} style={styles.user} {...accessibility("accountName")}>
              {accountName}
            </Text>
          </View>
        </View>
        <View style={styles.accountView}>
          <FastImage source={Images.briefcase} style={styles.imageAccount} resizeMode={FastImage.resizeMode.contain} />
          <View style={styles.contactView}>
            <Text style={styles.subUser}>PO number / Client reference</Text>
            <Text style={styles.user} {...accessibility("poNumber")}>
              {this.props.cartDetailData.purchaseOrderNumber}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  public renderOptionalRequirementsView = () => {
    const entriesSite = this.props.cartData.siteRequirements;
    const truckRequirements = this.props.cartData.truckRequirements[0];
    return (
      <>
        {truckRequirements && (
          <>
            <Card style={styles.mainSectionView}>
              <CardSectionHeader text={"Selected delivery truck"} />
              <View style={styles.truckSectionView}>
                <View style={styles.truckIconContainer}>
                  <CustomIcon name={"truck-icon"} style={styles.truckIcon} />
                </View>
                <Text style={styles.titleImageTruck}>{truckRequirements}</Text>
              </View>
            </Card>
            <View style={styles.separator} />
          </>
        )}
        {entriesSite.length > 0 && (
          <Card style={styles.mainSectionView}>
            <CardSectionHeader text={"Site details"} />
            {entriesSite.map((item: any) => (
              <ReviewDeliveryOptionalRequirementItem item={item} />
            ))}
            {this.props.cartData.additionalInfo.length > 0 && <Text style={styles.additionalInfo}>{this.props.cartData.additionalInfo}</Text>}
          </Card>
        )}
      </>
    );
  };

  public renderHeaderComponent = () => {
    return (
      <>
        {this.renderAccountDetails()}
        <View style={styles.separator} />
        {!this.state.isFromAddToExisting && this.renderDeliveryOption()}
        <View style={styles.separator} />
        {this.renderDeliveryOptionDetails()}
        <View style={styles.separator} />
        {!this.state.isFromAddToExisting && this.renderContactView()}
        {this.props.orderType === OrderTypes.STANDARD && !this.state.isFromAddToExisting && (
          <>
            <View style={styles.separator} />
            {this.renderOptionalRequirementsView()}
          </>
        )}
      </>
    );
  };

  public renderCheckoutView = (isPayLater: boolean, isPayNow: boolean) => {
    const txtTotal = this.state.isScrolledToBottom && !isPayNow ? "All prices are exclusive of GST" : "Total: ";

    return (
      <View style={[styles.checkoutButtonContainer, { shadowOpacity: this.state.isScrolledToBottom ? 0 : 0.25 }]}>
        <LargeButton
          textStyle={styles.largeButtonTextStyle}
          style={styles.largeButtonStyle}
          onPress={() => {
            if (!this.props.placeOrderLoading) {
              this.placeOrder();
              // this.placeOrderClickSubject$.next(undefined);
            }
          }}
          btnText={isPayNow ? CONTINUE_PAYMENT : PLACE_ORDER}
        />
        {isPayNow && (
          <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
            <View style={styles.subTotalView}>
              <Text {...accessibility("txtTotal")} style={[styles.txtTotalStyle]}>
                {txtTotal}
              </Text>
              <PriceComponent style={styles.gstText} value={this.props.totalPriceWithGST} {...accessibility("totalProductPrice")} />
              <Text {...accessibility("txtTAX")} style={[styles.txtTotalStyleTax]}>
                {" includes "}
              </Text>
              <PriceComponent style={styles.gstText} value={this.props.totalGST} {...accessibility("totalGSTPrice")} />
              <Text {...accessibility("txtTAX")} style={[styles.txtTotalStyleTax]}>
                {" in taxes"}
              </Text>
            </View>
          </PermissionComponent>
        )}
      </View>
    );
  };

  public render() {
    const entries = this.props.entries;
    const isCashCustomer = this.props.selectedTradeAccount.accountTypeEnum === "CASH";
    const specialProductsEntries = R.filter(isCashCustomer ? getSpecialProducts : getSpecialFromCartResponse)(entries) as any[];
    const standardProductsEntries = R.reject(isCashCustomer ? getSpecialProducts : getSpecialFromCartResponse)(entries) as any[];
    const isPayLater = isCashCustomer && specialProductsEntries.length > 0;
    const isPayNow = isCashCustomer && standardProductsEntries?.length > 0;
    return (
      <MainContainer>
        <SmallHeader style={ApplicationStyles.noShadow} navigation={this.props.navigation} title={"Review"} />
        <Animated.ScrollView
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
            listener: ({ nativeEvent }) => this.handleScrollToBottom(nativeEvent),
          })}
        >
          {this.renderHeaderComponent()}
          <View style={styles.separator} />
          <View style={styles.priceView}>
            <Text style={styles.summaryText}>{"Cart (" + entries.length + ")"}</Text>
          </View>
          {!isCashCustomer ? (
            <>
              <View style={styles.lineSeparatorMain} />
              {entries.map((item: any) => this.renderCartList(item))}
            </>
          ) : (
            entries?.length > 0 && <ReviewCartItemMenu />
          )}
          {isPayLater && isPayNow ? (
            <>
              <PayLaterPriceInfo subTotal={this.props.payOnCallBackTotalPrice} orderType={this.props.orderType} />
              <PayNowPriceInfo
                subTotal={this.props.totalPrice}
                GST={this.props.totalGST}
                totalPrice={this.props.totalPriceWithGST}
                productPrice={this.props.subTotal}
                isPayNowPayCallBack={isPayLater && isPayNow}
                isPromoApplied={this.props.isPromoApplied}
                discountPrice={this.props.discountPrice}
              />
            </>
          ) : isPayLater ? (
            <>
              <PayLaterPriceInfo subTotal={this.props.payOnCallBackTotalPrice} orderType={this.props.orderType} />
              <View style={styles.lineSeparator} />
            </>
          ) : isPayNow ? (
            <PayNowPriceInfo
              subTotal={this.props.totalPrice}
              GST={this.props.totalGST}
              totalPrice={this.props.totalPriceWithGST}
              productPrice={this.props.subTotal}
              isPromoApplied={this.props.isPromoApplied}
              discountPrice={this.props.discountPrice}
            />
          ) : (
            this.renderFooterComponent()
          )}
          <Text style={[styles.linkText]} onPress={() => Linking.openURL(AppConfig.PLACE_MAKER_URL)}>
            {" "}
            {FIND_DELIVERY_OPTIONS}
          </Text>
        </Animated.ScrollView>
        {this.renderCheckoutView(isPayLater, isPayNow)}
        <CustomModalView visible={this.state.showLoaderAlert}>{this.renderLoaderComponent()}</CustomModalView>
        <CustomAlert
          heading={this.state.customModelData?.heading}
          msg={this.state.customModelData?.message}
          visible={this.state.customModelData?.visible}
          onClose={this.state.customModelData?.onClose}
          button1Text={this.state.customModelData?.button1Text}
          onButton1Press={this.state.customModelData?.onButton1Press}
        />
      </MainContainer>
    );
  }

  private renderCartList = (item: any) => {
    return (
      <ReviewCartItem
        item={item}
        getItemBySKU={sku => {
          let cartItem = item;
          this.props.entries.forEach((entry: any) => {
            if (entry.product.code == sku) {
              cartItem = entry;
            }
          });
          return cartItem;
        }}
      />
    );
  };
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  createCart: () => dispatch(CartActions.requestUserCart()),
  callPlaceOrderApi: (payload: any, meta: IAlertCallbacks) => dispatch(AddressActions.requestPlaceOrderApi(payload, meta)),
  updateRequestDateTime: payload => dispatch(CartActions.updateRequestDateTime(payload)),
  updateOptionalRequirements: payload => dispatch(CartActions.updateOptionalRequirements(payload)),
});
const mapStateToProps = (state: RootState): StateProps => {
  const subTotalPrice = R.pathOr(0, ["subTotal", "value"])(state.cart.userCartDetail) as number;
  const total = R.pathOr(0, ["totalPrice", "value"])(state.cart.userCartDetail) as number;
  const discount = R.pathOr(0, ["totalDiscounts", "value"])(state.cart.userCartDetail) as number;
  const subTotal = subTotalPrice + discount;
  const totalGST = R.pathOr(0, ["totalTax", "value"])(state.cart.userCartDetail) as number;
  const totalPriceWithGST = R.pathOr(0, ["totalPriceWithTax", "value"])(state.cart.userCartDetail) as number;
  const payOnCallBackTotalPrice = R.pathOr(0, ["excludedItemsSubtotal", "formattedValue"])(state.cart.userCartDetail) as number;

  return {
    creditLimit: state.permission.availablePermissions[PermissionTypes.CreditLimit],
    selectedBranch: state.branchList.selectedBranch,
    selectedJobAccount: state.jobAccounts.selectedJobAccount,
    selectedTradeAccount: state.connectTrade.selectedTradeAccount,
    cartDetailData: state.cart.userCartDetail,
    entries: R.pathOr([], ["entries"])(state.cart.userCartDetail),
    totalPrice: total,
    subTotal,
    discountPrice: discount,
    userData: state.login.userData,
    orderType: state.branchList.selectedOrderType,
    cartData: state.cart,
    placeOrderLoading: state.address.placeOrderLoading,
    isPromoApplied: isVoucherApplied(state.cart),
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
    selectedAddress: state.address ? state.address.selectedAddress : undefined,
    selectedAccountId: getSelectedAccountId(state),
    cartDetail: state.cart.userCartDetail,
    totalGST,
    totalPriceWithGST,
    payOnCallBackTotalPrice,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withAppender(safeRender(ReviewScreen, navigationalScreens.OrderReviewScreen)));
