import moment from "moment";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { navigationalScreens, OrderTypes } from "~root/Lib/BranchHelper";
import { curryMomentFormat, isDateNil, isNilOrEmpty, renameKeys } from "~root/Lib/CommonHelper";
import { isTimberFlag } from "~root/Lib/DataHelper";
import { Colors, Images } from "~root/Themes";
import { ISupplierObject, OrderStatus, SiteDetailType, SiteDetailTypePurpose, TruckTypePurpose, TruckTypes } from "~root/Types/OrderItem";

/**
 * Helper class that provides color, light variant of color, icon and status of the given Order object.
 * @class
 */

export default class OrderItemHelper {
  private readonly status: OrderStatus;
  private readonly fulfillmentType: string;

  /**
   *
   * @param status Status of the Order summary object.
   * @param fulfillmentType Fulfillment Type of Order summary object.
   * @constructor
   */
  constructor(status: OrderStatus, fulfillmentType: string) {
    this.status = status;
    this.fulfillmentType = fulfillmentType;
  }

  /**
   * Returns the light color variant of the desired color.
   * @method
   */

  public getLightColor(): string {
    return this.getColor() + "19";
  }

  /**
   * Returns color of the staus text based on the status and fulfillmentType of the order.
   * @method
   */

  public getColor(): string {
    if (this.status === OrderStatus.Missed) {
      return Colors.red;
    } else if (this.fulfillmentType === "Delivery") {
      return Colors.lightBlue;
    } else {
      return Colors.tickGreen;
    }
  }

  /**
   * Returns status of the order
   * @method
   */

  public getName(): string {
    return this.status;
  }

  /**
   * Returns icon of the order, to be placed on header text, based on the status of the order.
   * @method
   */

  public getIcon(): string {
    switch (this.status) {
      case OrderStatus.Picking:
        return "ic_picking";
      case OrderStatus.OnItsWay:
        return "ic_onitsway";
      case OrderStatus.Picked:
      case OrderStatus.AssignedToVehicle:
      case OrderStatus.OnTruck:
        return "ic_ontruck_copy";
      case OrderStatus.Delivered:
      case OrderStatus.ReadyToPickUp:
        return "ic_tick";
      case OrderStatus.Missed:
        return "ic_missed";
      case OrderStatus.Received:
        return "ic_cart";
    }
  }
}

/**
 * @param format Desired date format
 * @description Formats the request date from the order summary object in the provided @param format
 */

// const getEta = (format: string) => R.compose(curryMomentFormat(format), R.prop("requestDate"));
const getEta = R.curry((format: string, data: any) => R.compose(curryMomentFormat(format), R.prop("requestDate"))(data));

/**
 * Returns delivery text to be shown against respective order in order list.
 * It will return different text based on the condition. It will return Delivery Type, in case it is provided with the object.
 * It will return message of the supplier, in case it is provided with the object.
 * It will return "Collect" in case Delivery Type is not provided and the Fulfilment type is "Pickup"
 * It will return empty string in all other cases.
 */

export const getDeliveryText = R.cond([
  [R.propSatisfies(RA.isNotNilOrEmpty, "deliveryType"), R.prop("deliveryType")],
  [R.allPass([R.propEq("fulfilmentType", "Pickup"), R.propSatisfies(RA.isNilOrEmpty, "deliveryType"), R.propEq("directShip", "N")]), R.always("Collect")],
  [R.propSatisfies(RA.isNotNilOrEmpty, "supplierDirectMessage"), R.prop("supplierDirectMessage")],
  [R.T, R.always("")],
]);

export const getHeaderTextForItems = R.cond([
  [R.pathEq(["headerDetails", "isDelivered"], true), getEta("lll")],
  [
    R.pathEq(["headerDetails", "isEstimated"], true),
    data => {
      const date = moment(data.requestDate, "MMM DD, YYYY LT");
      let dsp = R.path(["headerDetails", "DSP"], data);
      dsp = RA.isNilOrEmpty(dsp) ? "" : dsp + " ";

      if (date.get("hours") === 0 && date.get("minutes") === 0) {
        return dsp + getEta("ddd MMM D YYYY")(data);
      } else {
        return dsp + getEta("ddd MMM D YYYY")(data) + " " + getEta("LT")(data);
      }
    },
  ],
  [R.T, R.always("")],
]);

export const getEstimatedPickupTime = (timeObtained: any) => {
  let pickupTime = timeObtained;
  pickupTime = RA.isNilOrEmpty(pickupTime) ? "" : pickupTime;
  let finalTime = pickupTime.substr(0, 5);

  // Check correct time format and split into components
  finalTime = finalTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [finalTime];

  if (finalTime.length > 1) {
    // If time format correct
    finalTime = finalTime.slice(1); // Remove full string match value
    finalTime[5] = +finalTime[0] < 12 ? "AM" : "PM"; // Set AM/PM
    finalTime[4] = " ";
    finalTime[0] = +finalTime[0] % 12 || 12; // Adjust hours
  }
  if (finalTime[0] < 10 && finalTime[0] !== "") {
    return "0" + finalTime.join("");
  }
  return finalTime.join(""); // return adjusted time or original string
};

/**
 *
 * @param data Order Details object
 * @description Returns estimated delivery date from the given object.
 */

export const getEstimatedDeliveryDate = (data: any) => {
  let dsp = R.path(["headerDetails", "DSP"], data);
  dsp = RA.isNilOrEmpty(dsp) ? "" : dsp + " ";
  const date = moment(data.requestDate);
  if (date.get("hours") === 0 && date.get("minutes") === 0) {
    return dsp + getEta("ddd MMM D YYYY")(data);
  } else {
    return dsp + getEta("ddd MMM D YYYY")(data) + " " + curryMomentFormat("HH:mm", date);
  }
};

/**
 * A helper method to get the header text in the Order Detail Summary Page.
 * It will read through the headerDetails in an object and based on the status, it will return the text accordingly.
 * If the headerDetails contain truthy isEstimated or is Delivered property, it will return requestDate as a text
 * It will return text property of headerDetails otherwise
 */

export const getHeaderText = R.cond([
  [R.pathEq(["headerDetails", "isDelivered"], true), getEta("lll")],
  [
    R.pathEq(["headerDetails", "isEstimated"], true),
    data => {
      return getEstimatedDeliveryDate(data);
    },
  ],
  [R.T, R.path(["headerDetails", "text"])],
]);

/**
 * A helper method that simply extracts supplier message from the given order object and returns true or false accordingly..
 * Returns true if there is some message and false otherwise.
 */
// export const hasDirectSupplyMessage: (order: any) => boolean = R.compose(R.complement(isNilOrEmpty), R.prop("supplierDirectMessage"));
export const hasDirectSupplyMessage: (order: any) => boolean = (data: any) => R.compose(R.complement(isNilOrEmpty), R.prop("supplierDirectMessage"))(data);
/**
 * A helper method that checks whether supplier information is available in the object or not.
 */

export const isSupplierObjectNotNil = (data: any) =>
  R.complement(R.either(R.compose(isDateNil, R.prop("SupplierPODate")), R.compose(isNilOrEmpty, R.prop("SupplierName"))))(data);

/**
 * A helper function that extracts unique supplier names from a list of supplier objects.
 */

export const getSupplierObjects: (OrderItems: any[]) => ISupplierObject[] = R.compose(
  R.uniqBy(R.prop("SupplierName")),
  // @ts-ignore
  R.filter(isSupplierObjectNotNil),
  R.map(R.prop("Supplier")),
  (data: any) => R.ifElse(isNilOrEmpty, R.always([]), R.identity)(data),
);

export const getOrderMessage = (data: any) =>
  R.ifElse(R.compose(isNilOrEmpty, R.prop("supplierDirectMessage")), R.always(undefined), R.prop("supplierDirectMessage"))(data);

/**
 * A helper function that extracts order lines from list of orders.
 */

export const getSupplier = (data: any) => R.compose(R.ifElse(isNilOrEmpty, R.always(undefined), R.identity), getSupplierObjects, R.prop("orderLines"))(data);

/**
 * A helper function that determines whether the order is direct supply or not.
 */

export const isDirectSupplier = R.ifElse(
  RA.isNilOrEmpty,
  R.always(false),
  R.either(R.propEq("directShip", "Y"), R.compose(R.any(R.pathSatisfies(RA.isNotNilOrEmpty, ["supplier", "supplierName"])), R.propOr([], "orderLines"))),
);

/**
 * A helper function that returns branch name and address of branch from where the order is processed for collection of order
 */

export const getCollectionDetials = (data: any) =>
  R.compose(
    R.applySpec({
      branch: R.path(["orderProcessed", "branch"]),
      address: R.compose(R.join(", "), R.reject(isNilOrEmpty), R.values, R.prop("deliveryAddress")),
    }),
    R.path(["data", "tradeAccount", "orders", "0"]),
  )(data);

export const transformCartObjectToOldCart = R.applySpec({
  SKU: R.path(["product", "code"]),
  ProductDescription: R.path(["product", "name"]),
  IsTimberProduct: isTimberFlag,
  sellOrderMultiple: R.path(["product", "sellOrderMultiple"]),
  SelectedMultiple: R.path(["product", "sellOrderMultiple"]),
  UOM: R.path(["unit"]),
  Quantity: R.path(["decimalQty"]),
  Price: R.path(["product", "price", "value"]),
});

/*
 A helper function that returns the basket value for bloomreach at the time of checkout
 */

const basketItemTransformer = R.compose(
  R.join("'"),
  R.map(R.join("")),
  R.toPairs,
  (data: any) => renameKeys({ SKU: "s", Price: "p", ProductDescription: "n", Quantity: "q" })(data),
  R.pick(["i", "SKU", "ProductDescription", "Quantity", "Price"]),
  val => R.assoc("i", val.SKU, val),
  transformCartObjectToOldCart,
);

export const bloomReachCartBasket = R.compose(
  R.ifElse(R.isEmpty, R.always(""), R.concat("!")),
  R.join("!"),
  R.ifElse(R.isNil, R.always([]), R.map(basketItemTransformer)),
);

export const transformCartToEmail = R.compose(R.map(transformCartObjectToOldCart), R.prop("entries"));

export const convertEligibilityToOrderType = (eligibility: string) => {
  switch (eligibility) {
    case "PickUp":
      return OrderTypes.PICKUP;
    case "Courier":
      return OrderTypes.EXPRESS;
    case "Delivery":
      return OrderTypes.STANDARD;
  }
};

export const getImage = (orderType: OrderTypes | undefined) => {
  switch (orderType) {
    case OrderTypes.STANDARD:
      return Images.fulfillmentDelivery;
    case OrderTypes.EXPRESS:
      return Images.fulfillmentExpress;
    case OrderTypes.PICKUP:
      return Images.fulfillmentPickup;
  }
};

export const getSiteTruckImage = (truckRequirements: string) => {
  switch (truckRequirements) {
    case TruckTypes.noTruckPreference:
      return Images.noTruckPreference;
    case TruckTypes.truckTipper:
      return Images.truckTipper;
    case TruckTypes.truckHiab:
      return Images.truckHiab;
  }
};

export const getSiteTruckSubTitle = (truckRequirements: string) => {
  switch (truckRequirements) {
    case TruckTypes.noTruckPreference:
      return "";
    case TruckTypes.truckTipper:
      return TruckTypePurpose.truckTipper;
    case TruckTypes.truckHiab:
      return TruckTypePurpose.truckHiab;
  }
};

export const getTitle = (orderTypes: OrderTypes | undefined) => {
  switch (orderTypes) {
    case OrderTypes.STANDARD:
      return "Stick it on a truck";
    case OrderTypes.EXPRESS:
      return "Get it to me quick";
    case OrderTypes.PICKUP:
      return "I’ll pick it up";
  }
};

export const getFulfillmentHeaderTitle = (deliveryType: OrderTypes) => {
  switch (deliveryType) {
    case OrderTypes.STANDARD:
      return "Delivery details";
    case OrderTypes.EXPRESS:
      return "Express courier details";
    case OrderTypes.PICKUP:
      return "Pickup details";
  }
};

export const getSiteImage = (siteType: string) => {
  switch (siteType) {
    case SiteDetailType.siteSort:
      return Images.siteSort;
    case SiteDetailType.siteBioHazard:
      return Images.siteBioHazard;
    case SiteDetailType.siteBan:
      return Images.siteBan;
  }
};

export const getSiteContactSubItem = (siteType: string) => {
  switch (siteType) {
    case SiteDetailType.siteSort:
      return SiteDetailTypePurpose.siteSort;
    case SiteDetailType.siteBioHazard:
      return SiteDetailTypePurpose.siteBioHazard;
    case SiteDetailType.siteBan:
      return SiteDetailTypePurpose.siteBan;
  }
};

export const getDeliveryOptionLocationImage = (deliveryType: string) => {
  switch (deliveryType) {
    case "Delivery":
    case "Courier":
      return Images.locationDelivery;
    case "PickUp":
      return Images.placemakerTradeLogo;
  }
};

export const formatAddress: string = R.compose(R.join(", "), R.map(R.trim), R.reject(RA.isNilOrEmpty));

export const getDeliveryOptionType = (deliveryType: string) => {
  switch (deliveryType) {
    case OrderTypes.STANDARD:
      return "Delivery";
    case OrderTypes.EXPRESS:
      return "Courier";
    case OrderTypes.PICKUP:
      return "Pickup";
    case OrderTypes.ADD_TO_EXISTING:
      return "Add to existing";
  }
};

export const checkSpecialProductsAvailability = R.any(R.pathOr(false, ["product", "specialProduct"]));

export const getScreenNames = (screenNav: string) => {
  switch (screenNav) {
    case "LandingPage":
      return navigationalScreens.ShopScreen;
    case "MyLists":
      return navigationalScreens.MyListsScreen;
    case "MyListDetail":
      return navigationalScreens.MyListDetailsScreen;
    case "MainOrderList":
      return navigationalScreens.MyOrdersScreen;
    case "OrderDetails":
      return navigationalScreens.MyOrderDetailsScreen;
    case "Jobs":
      return navigationalScreens.JobsScreen;
    case "MainTeams":
      return navigationalScreens.TeamScreen;
    case "SelectContact":
      return navigationalScreens.SelectContactScreen;
    case "EditMember":
      return navigationalScreens.TeamMemberAdd_EditScreen;
    case "MainCartView":
      return navigationalScreens.CartScreen;
    case "DeliveryOptions":
      return navigationalScreens.DeliveryOptionsScreen;
    case "FulfilmentDetails":
      return navigationalScreens.DeliveryOptionDetailsScreen;
    case "OptionalRequirements":
      return navigationalScreens.OptionalRequirementsScreen;
    case "AccountDetails":
      return navigationalScreens.AccountDetailsScreen;
    case "OrderReview":
      return navigationalScreens.OrderReviewScreen;
    case "MyProfileSelection":
      return navigationalScreens.UserMenuScreen;
    case "UserDetails":
      return navigationalScreens.UserDetailsScreen;
    case "MyProfileTradeAccountSelection":
      return navigationalScreens.AccountsScreen;
    case "MyProfileJobAccountSelection":
      return navigationalScreens.JobAccountsScreen;
    case "MyProfileBranchSelection":
      return navigationalScreens.BranchesScreen;
    case "BranchDetail":
      return navigationalScreens.BranchDetailsScreen;
    case "MyProfileSolutionsContainer":
      return navigationalScreens.PlaceMakersSolutionScreen;
    case "MyProfileSolutionDetailContainer":
      return navigationalScreens.PlaceMakersSolutionDetailsScreen;
    case "GetInTouch":
      return navigationalScreens.GetInTouchScreen;
    case "Main":
      return navigationalScreens.Launch_Screen;
    case "MainNotifications":
      return navigationalScreens.NotificationsScreen;
    case "MainSearch":
      return navigationalScreens.SearchScreen;
    case "SearchResults":
      return navigationalScreens.SearchResultsScreen;
    case "MainPLP":
      return navigationalScreens.ProductListingScreen;
    case "MainPDP":
      return navigationalScreens.ProductDetailsScreen;
    case "ProductOverview":
      return navigationalScreens.ProductOverviewScreen;
    case "ProductSpecification":
      return navigationalScreens.ProductSpecificationScreen;
    case "ProductWarranty":
      return navigationalScreens.ProductWarrantyScreen;
    case "SupportingDocument":
      return navigationalScreens.ProductDocumentScreen;
    case "ConnectedTradeAccount":
      return navigationalScreens.ConnectedTradeAccountScreen;
    case "MainSTC":
      return navigationalScreens.STCEnterDetailsScreen;
    case "QrCodeContainer":
      return navigationalScreens.STCQRCodeScreen;
    case "STCOrderInProgress":
      return navigationalScreens.STCOrderInProgressScreen;
    case "STCReviewOrders":
      return navigationalScreens.STCReviewOrdersScreen;
    case "STCConfirmOrderPurchaseProof":
      return navigationalScreens.STCConfirmOrderPurchaseProofScreen;
    case "STCGatePass":
      return navigationalScreens.STCGatePassScreen;
    case "MainBarCode":
      return navigationalScreens.BarCodeScanningScreen;
    case "SuperCategory":
      return navigationalScreens.ProductCategoryScreen;
    default:
      return "";
  }
};

export const getOrdersAddress = (orderData: any) => {
  const items: any[] = [];
  for (let i = 0; i < orderData.length; i++) {
    items.push({
      order_address: orderData[i]?.original?.deliveryAddress?.address1 + "," + orderData[i]?.original?.deliveryAddress?.city,
    });
  }
  return items;
};

export const getOrdersRequestDate = (orderData: any) => {
  const items: any[] = [];
  if (orderData.length > 0) {
    for (let i = 0; i < orderData.length; i++) {
      items.push({
        requestDate: moment(orderData[i]?.original?.requestDate).format("DD/MM/YYYY"),
      });
    }
  }
  return items;
};

export const getEstimateCreateAndExpireDate = (orderData: any) => {
  const items: any[] = [];
  if (orderData.length > 0) {
    for (let i = 0; i < orderData.length; i++) {
      if (orderData[i]?.estimateDate) {
        items.push({
          estimateDate: moment(orderData[i]?.estimateDate).format("DD/MM/YYYY"),
        });
      }
      if (orderData[i]?.estimateExpire) {
        items.push({
          estimateExpire: moment(orderData[i]?.estimateExpire).format("DD/MM/YYYY"),
        });
      }
    }
  }
  return items;
};
