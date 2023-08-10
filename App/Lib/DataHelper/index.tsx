import moment, { Moment } from "moment";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import * as React from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import RNUxcam from "react-native-ux-cam";
import { UXCamOcclusionType } from "react-native-ux-cam/UXCamOcclusion";
import { StateObservable } from "redux-observable";
import { outOfStockMessage, productAddedToCart } from "~root/Lib/AlertsHelper";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { getFullAddress, isNilOrEmpty, isNotNilOrEmpty, renameKeys } from "~root/Lib/CommonHelper";
import { getDeliveryOptionType, getImage } from "~root/Lib/OrderItemHelper";
import { createMQTTClientPublisher } from "~root/Lib/STCHelper";
import { generateUrlEncoded } from "~root/Lib/StringHelper";
import { OrderStatus } from "~root/Types/OrderItem";
import { PermissionTypes } from "~root/Types/Permissions";
import RelatedAlternativeProducts from "../../Components/RelatedAlternativeProducts";

const md5 = require("md5");

/**
 * Helper function to fetch the prop from db for the first instance of the table
 *
 * @param list Array list or collection
 * @param propName Prop name to select from the list item
 * @return Undefined if the lift is empty otherwise the prop value
 */

export const getPropFromList = R.curry((propName, list) => R.ifElse(isNilOrEmpty, R.always(undefined), R.compose(R.prop(propName), R.head))(list));

/**
 * Helper function to fetch the data from response if Api response is OK
 *
 * @param Api response
 * @return Undefined if the response is empty or null
 */

export const getDataIfResponseIsOK = (data: any) => R.ifElse(R.either(isNilOrEmpty, R.propEq("ok", false)), R.always(undefined), R.prop("data"))(data);

/**
 * Helper function returns network error response from api
 *
 * @return Undefined if the response is empty or null
 */

export const isResponseNetworkError = R.allPass([
  (data: any) => R.complement(isNilOrEmpty)(data),
  R.propEq("ok", false),
  R.compose(R.flip(R.includes)(["NETWORK_ERROR", "CONNECTION_ERROR"]), R.prop("problem")),
]);

/**
 * Helper function to shows to network error response
 *
 * @param Response object
 * @return Undefined if the response is empty or null
 */

export const isResponseOk = R.allPass([R.propEq("ok", true), R.complement(R.hasPath(["data", "error"])), R.complement(R.hasPath(["data", "errorMessage"]))]);

export const isCoreLogicResponseOk = R.allPass([R.propEq("ok", true), R.complement(R.hasPath(["data", "error"]))]);

/**
 * @description This function checks the response from ACE Api
 * @param ACE Api response
 * @return true if the response is ok from ACE Api
 */
export const isAceResponseOk = R.both(R.propEq("ok", true), R.pathEq(["data", "ServiceResult", "Code"], 0));

export const sanitizeImageUrl = R.ifElse(R.startsWith("http"), R.identity, R.always(""));

/**
 * @description This function returns the sanitized solar search object for DB
 * @param solar search response
 * @return sanitized object
 */

export const sanitizeSolrSearchForDb = obj =>
  R.compose(
    R.mergeRight({
      Brand: R.propOr("", "manufacturer")(obj),
      Image: R.compose(sanitizeImageUrl, R.pathOr("", ["images", "0", "url"]))(obj),
      Price: R.compose(R.invoker(0, "toString"), R.invoker(1, "toFixed")(2), Number, R.pathOr("-", ["price", "value"]))(obj),
      Stock: R.compose(
        checkProductAvailability,
        renameKeys({
          pmStockQuantity: "Quantity",
          statusCode: "StatusCode",
        }),
        R.prop("stock"),
      )(obj),
      pmStockData: R.prop("stock")(obj),
      IsTimberProduct: R.propOr(false, "timberProductFlag")(obj),
      sellOrderMultiple: R.propOr(0, "sellOrderMultiple")(obj),
      SelectedMultiple: R.propOr(0, "sellOrderMultiple")(obj),
      uomFormat: R.propOr(0, "uomFormat")(obj),
      barcodesPM: R.propOr("", "barcodesPM")(obj),
      IsSpecial: obj?.specialProdWithAlphaSkuFlag === true || obj?.display === "SPECIAL",
      QuoteName: R.propOr("", "name")(obj),
      QuoteDescription: R.propOr("", "description")(obj),
      appUomFormat: R.propOr(0, "appUomFormat")(obj),
    }),
    renameKeys({
      code: "Sku",
      name: "Description",
      unitCode: "UnitOfMeasure",
    }),
  )(obj);

export const sanitizeEstimateProducts = (obj: any) => {
  if (obj) {
    const t = {
      Brand: R.propOr("", "manufacturer")(obj),
      Image: R.compose(sanitizeImageUrl, R.pathOr("", ["images", "0", "url"]))(obj),
      Price: R.compose(R.invoker(0, "toString"), R.invoker(1, "toFixed")(2), Number, R.replace(/[$,]/g, ""), R.propOr("-", "estimateUnitPrice"))(obj),
      AvailableForPickup: R.propOr(false, "availableForPickup")(obj),
      SKU: R.propOr("", "code", obj),
      ProductDescription: isNotNilOrEmpty(R.propOr("", "estimateCustProdDescription", obj))
        ? R.propOr("", "estimateCustProdDescription", obj)
        : R.propOr("", "estimateDescription", obj),
      estimateDescription: R.propOr("", "estimateDescription", obj),
      estimateProductDesc: R.propOr("", "estimateCustProdDescription", obj),
      IsTimberProduct: R.propOr(false, "timberProductFlag", obj),
      uomFormat: R.propOr(0, "uomFormat", obj),
      sellOrderMultiple: R.propOr(0, "sellOrderMultiple", obj),
      SelectedMultiple: R.propOr(0, "sellOrderMultiple", obj),
      Stock: checkEstimateProductAvailability(obj),
      UOM: isNotNilOrEmpty(R.propOr("", "unitCode", obj)) ? R.propOr("", "unitCode", obj) : R.propOr("", "estimateUnitOfMeasure", obj),
      StockQuantity: R.propOr("", "estimateSoh", obj),
      EstimatedQuantity: R.propOr("", "estimateQtyEstimated", obj),
      IsExpressOrder: R.propOr("", "expressOrder", obj),
      EstimateLineNumber: R.propOr("", "estimateLineNumber", obj),
      IsSpecial: R.anyPass([R.propEq("specialProdWithAlphaSkuFlag", true), R.propEq("specialProduct", true), R.propEq("display", "SPECIAL")])(obj),
      EstimateProductFlag: R.propOr(false, "estimateProductFlag", obj),
      EstimateProductUnit: R.propOr("", "estimate", obj),
      UniqueId: R.propOr("", "code", obj) + "-" + R.compose(R.invoker(0, "toString"), R.propOr(0, "sellOrderMultiple"))(obj),
      stock: {
        IsEstimate: true,
        estimateSoh: R.propOr("", "estimateSoh", obj),
      },
      PmExclusive: R.propOr(false, "pmExclusive", obj),
      hasRelatedProducts: R.propOr(false, "hasRelatedProducts", obj),
      hasAlternateProducts: R.propOr(false, "hasAlternateProducts", obj),
      alternateProductCount: R.propOr(0, "alternateProductCount", obj),
      relatedProductCount: R.propOr(0, "relatedProductCount", obj),
    };
    return t;
  }
  return {};
};

export const getInventoryItemBySKU = R.curry((sku, response) =>
  R.compose(R.find(R.propEq("Sku", sku)), R.pathOr([], ["data", "Branch", "Products"]))(response),
);

/**
 * @description This function returns boolean indicating product availability status.
 * @param product response
 * @return product availability (true / false)
 */

export const isProductStockAvailable = stock => {
  return R.ifElse(
    R.anyPass([
      RA.isNilOrEmpty,
      R.propSatisfies(R.complement(R.includes(R.__, ["1", "2"])), "StatusCode"),
      R.compose(R.lte(R.__, 1), parseFloat, R.prop("Quantity")),
    ]),
    R.always(false),
    R.always(true),
  )(renameStockKeys(stock));
};

/**
 * @description This function returns the product availability in the stock. if product is not available in stock then return Available in 2-5 days
 * @param product response
 * @return product availability (in stock / Available in 2-5 days)test
 */

export const checkProductAvailability = stock => {
  const sanitizedStock = renameStockKeys(stock);
  if (isProductStockAvailable(sanitizedStock)) {
    return R.compose(R.concat(R.__, " in stock"), R.invoker(0, "toString"), R.prop("Quantity"))(sanitizedStock);
  }
  return outOfStockMessage;
};

export const isEstimateStockAvailable = R.ifElse(
  R.anyPass([RA.isNilOrEmpty, R.compose(R.lte(R.__, 1), parseFloat, R.prop("estimateSoh"))]),
  R.always(false),
  R.always(true),
);

export const checkEstimateProductAvailability = estimateStock => {
  if (isEstimateStockAvailable(estimateStock)) {
    return R.compose(R.concat(R.__, " in stock"), R.invoker(0, "toString"), R.prop("estimateSoh"))(estimateStock);
  }
  return outOfStockMessage;
};

export const renameStockKeys = (stock: any) =>
  renameKeys({
    pmStockQuantity: "Quantity",
    statusCode: "StatusCode",
  })(stock);

export const fetchMyListImages = R.compose(
  R.map(products =>
    R.flatten(R.map(images => R.filter(R.propEq("format", "thumbnail"), R.propOr([], "images", images)), R.propOr([], "productList", products))),
  ),
);

export const mapIndexed = R.addIndex(R.map);

export const consolidateMyListImages = (images: any, list: any) =>
  mapIndexed((obj, index) => {
    return R.assoc("images", images[index], obj);
  })(list);

export const findStockStatus = (sku, response) => R.compose(checkProductAvailability, getInventoryItemBySKU(sku))(response);

const transformPrices = R.curry((prop, object) => R.compose(R.invoker(1, "toFixed")(2), parseFloat, R.prop(prop))(object));

export const findStockAvailabilityForSku = (sku, response) =>
  R.compose(R.prop("stockMessage"), R.find(R.propEq("sku", sku)), R.pathOr([], ["data", "customer", "products"]))(response);

export const findStockQuantityForHybris = (sku, response) =>
  R.compose(
    R.invoker(0, "toString"),
    R.ifElse(RA.isNilOrEmpty, R.always("-"), R.prop("quantity")),
    R.find(R.propEq("sku", sku)),
    R.pathOr([], ["data", "customer", "products"]),
  )(response);

export const findPricesForHybris = (sku, response) =>
  R.compose(
    R.invoker(0, "toString"),
    R.ifElse(
      RA.isNilOrEmpty,
      R.always("-"),
      R.cond([
        [R.propSatisfies(RA.isNotNilOrEmpty, "customerPriceGstExcl"), transformPrices("customerPriceGstExcl")],
        [R.propSatisfies(RA.isNotNilOrEmpty, "retailGstExclusive"), transformPrices("retailGstExclusive")],
        [R.T, R.always("-")],
      ]),
    ),
    R.find(R.propEq("sku", sku)),
    R.pathOr([], ["data", "customer", "products"]),
  )(response);

export const findPrices = (sku, response) =>
  R.compose(
    R.invoker(0, "toString"),
    R.ifElse(
      RA.isNilOrEmpty,
      R.always("-"),
      R.cond([
        [R.propSatisfies(RA.isNotNilOrEmpty, "CustomerPriceGstExcl"), transformPrices("CustomerPriceGstExcl")],
        [R.propSatisfies(RA.isNotNilOrEmpty, "RetailGstExclusive"), transformPrices("RetailGstExclusive")],
        [R.T, R.always("-")],
      ]),
    ),
    R.find(R.propEq("Sku", sku)),
    R.pathOr([], ["data", "Customer", "Products"]),
  )(response);

export const convertToPlaneJS = R.compose(JSON.parse, JSON.stringify);

/**
 * @param product item
 * @return current date if product is available in the stock else it return the date after 5 days
 */

export const getOrderDeliverDate = (item: any) => {
  const productStatus = R.path(["stock", "stockLevelStatus"])(item);

  if (productStatus === "outOfStock") {
    return moment().add(5, "days").format("ddd DD-MM-YYYY").toString();
  } else {
    return moment().format("ddd DD-MM-YYYY").toString();
  }
};

/**
 * @param item itemProduct
 * @return boolean value of the field timberProductFlag from product item object
 */

export const isTimberFlag = (item: any) => {
  if (R.hasPath(["product", "timberProductFlag"], item)) {
    return R.pathOr(false, ["product", "timberProductFlag"])(item) && R.pathOr(0, ["product", "sellOrderMultiple"], item) > 0;
  } else if (R.has("timberProductFlag", item)) {
    return R.pathOr(false, ["timberProductFlag"])(item) && getSellOrderMultipleValue(item) > 0;
  } else {
    return item?.IsTimberProduct && item?.sellOrderMultiple > 0;
  }
};

/**
 * @param item product
 * @return value of the field sellOrderMultiple is present else return 0 for product item
 */
export const getSellOrderMultipleValue = (item: any) => {
  return R.pathOr(0, ["sellOrderMultiple"])(item);
};

/**
 * @param searchItem and Search list data
 * @return filtered search myList according to the searchItem
 */
export const getFilteredMyList = R.curry((searchItem: string, data: any) =>
  R.filter(R.compose(R.test(new RegExp(searchItem, "i")), R.propOr("", "ProductDescription")))(data),
);

export const isWeekend = (date: Moment) => {
  const weekday = moment.weekdays(date.day());
  return weekday === "Sunday" || weekday === "Saturday";
};

/**
 * @description This function returns the sanitized product Items
 * @param product list
 * @return sanitized product object
 */

export const sanitizeProductItems = (state, props) => {
  if (props.data) {
    return {
      SKU: props.data.code,
      Brand: R.propOr("", "manufacturer", props.data),
      Image: R.compose(sanitizeImageUrl, R.pathOr("", ["images", "0", "url"]))(props.data),
      ProductDescription: R.propOr("", "name", props.data),
      Quantity: state.quantity.toString(),
      Price: R.pathOr("0", ["price", "value"], props.data).toString(),
      UOM: R.propOr("", "unitCode", props.data),
      IsTimberProduct: R.propOr(false, "timberProductFlag", props.data),
      SellOrderMultiple: R.propOr(0, "sellOrderMultiple", props.data),
      SelectedMultiple: state.selectedMultiple.toString(),
      UniqueId: props.data.code + "-" + state.selectedMultiple.toString(),
      uomFormat: R.propOr(0, "uomFormat", props.data).toString(),
      sellOrderMultiple: state.selectedMultiple.toString(),
      timberProductFlag: R.propOr(false, "timberProductFlag", props.data),
      IsExpressOrder: props.data?.expressOrder || false,
      StockQuantity: props.data.stock?.pmStockQuantity || "0",
    };
  }
};

export const mapSanitizedItems = R.curry((state, value) => {
  const selectedMultiple = isTimberFlag(value) ? value.sellOrderMultiple.toString() : "0";
  const uniqueId = value.Sku + "-" + selectedMultiple;
  return {
    BranchId: state?.branchList?.selectedBranch?.branchCode,
    AccountCustomerId: state?.connectTrade?.selectedTradeAccount?.custId,
    JobAccountId: state?.jobAccounts?.selectedJobAccount?.JobNumber || state?.connectTrade?.selectedTradeAccount?.custId,
    SKU: value?.Sku,
    ProductDescription: value?.Description,
    UOM: value?.UnitOfMeasure || "",
    Availability: value?.Stock,
    Price: value?.Price,
    Image: value?.Image,
    Brand: value?.Brand,
    IsTimberProduct: value?.IsTimberProduct,
    SelectedMultiple: selectedMultiple,
    UniqueId: uniqueId,
    uomFormat: value?.uomFormat?.toString(),
    appUomFormat: value?.appUomFormat?.toString() || "",
    sellOrderMultiple: value?.sellOrderMultiple?.toString(),
    timberProductFlag: value?.IsTimberProduct,
    IsExpressOrder: value?.expressOrder || false,
    StockQuantity: value?.stock?.pmStockQuantity || "0",
    IsSpecial: value?.IsSpecial,
    PmExclusive: value?.pmExclusive,
    stock: value?.stock,
    RetailPrice: value?.retailPriceGstInclusive?.value,
    QuoteName: value?.QuoteName,
    QuoteDescription: value?.QuoteDescription,
    hasAlternateProducts: value?.hasAlternateProducts,
    hasRelatedProducts: value?.hasRelatedProducts,
    alternateProductCount: value?.alternateProductCount,
    relatedProductCount: value?.relatedProductCount,
    display: value?.display,
  };
});

export const publishLogInEvents_Solace = (clientId: string, payload: any) => {
  let client: any;

  return createMQTTClientPublisher(clientId, true)
    .then(value => {
      client = value;

      client.on("connect", () => {
        client.publish(generateUrlEncoded(payload.source), JSON.stringify(payload), 1, false);
        client.disconnect();
      });

      client.connect();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFulfilmentBranchIdOnOrderDetail = (props: any) => {
  return R.pathOr(R.path(["route", "params", "fulfilmentBranchId"], props), ["route", "params", "data", "fulfilmentBranchId"], props);
};
export const marketingTileInfoExtractor = R.compose(
  R.filter(R.propSatisfies(R.either(R.equals("MOBILE"), R.equals("BOTH")), "source")),
  R.pathOr([], ["components", "component"]),
  R.head,
  R.filter(R.propEq("slotId", "PMMarketingTilesSlot")),
  R.pathOr([], ["contentSlots", "contentSlot"]),
);

export const getPMCategoriesTileSlot = R.compose(
  R.pathOr([], ["components", "component"]),
  R.head,
  R.filter(R.propEq("slotId", "PMCategoryTilesSlot1")),
  R.pathOr([], ["contentSlots", "contentSlot"]),
);

export const getPMMoreCategoriesTileSlot = R.compose(
  R.pathOr([], ["components", "component"]),
  R.head,
  R.filter(R.propEq("slotId", "PMCategoryTilesSlot2")),
  R.pathOr([], ["contentSlots", "contentSlot"]),
);

export const getRequestParams = (state$: StateObservable<any>) => {
  return R.compose(
    R.reject(RA.isNilOrEmpty),
    R.applySpec({
      branchId: R.path(["connectTrade", "selectedTradeAccount", "branch", "branchCode"]),
      stocksBranchId: R.path(["branchList", "selectedBranch", "branchCode"]),
      jobAccountId: R.pathOr(R.path(["connectTrade", "selectedTradeAccount", "custId"], state$.value), ["jobAccounts", "selectedJobAccount", "JobNumber"]),
      tradeAccountId: R.path(["connectTrade", "selectedTradeAccount", "custId"]),
    }),
  )(state$.value);
};

export const getSectionNameAndTime = (item: any) => {
  const date = moment(item.sendDateUtc);
  const yesterday = moment().subtract(1, "d");
  let dateStr = moment(date).format("DD MMMM");
  if (date.isSame(moment(), "d")) {
    dateStr = "Today";
  } else if (date.isSame(yesterday, "d")) {
    dateStr = "Yesterday";
  }
  return {
    date: dateStr,
    time: moment(date).format("hh:mm A"),
  };
};

export const parseInboxMessages = (response: any) => {
  return R.compose(
    R.map(R.applySpec({ title: R.head, data: R.last })),
    R.toPairs,
    R.groupBy(R.prop("date")),
    R.map((item: any) => {
      const { date, time } = getSectionNameAndTime(item);
      return R.mergeRight(item, { date, dateAndTime: time });
    }),
  )(response);
};

export const getAddToExistingSections = (item: any, earliestDateStr: string) => {
  const date = moment(item?.requestDate);
  const earliestDate = moment(earliestDateStr);
  const tomorrow = moment().add(1, "d");
  const formattedDate = moment(date).format("DD MMMM YYYY");
  let dateStr = moment(date).format("ddd, DD MMMM YYYY");
  if (date.isSame(moment(), "d")) {
    dateStr = "Today, " + formattedDate;
  } else if (date.isSame(tomorrow, "d")) {
    dateStr = "Tomorrow, " + formattedDate;
  }
  return {
    date: dateStr,
    time: moment(date).format("hh:mm A"),
    isEligible: date >= earliestDate,
    formattedAddress: getFullAddress(item?.address),
  };
};

const getOrdersByDate = (orders: any) => {
  return R.compose(R.map(R.applySpec({ title: R.head, data: R.last })), R.toPairs, R.groupBy(R.prop("date")))(orders);
};

export const parseAddToExisting = (response: any, earliestDate: string) => {
  const fullOrders = R.map((item: any) => {
    const { date, time, isEligible, formattedAddress } = getAddToExistingSections(item, earliestDate);
    return R.mergeRight(item, {
      date,
      dateAndTime: time,
      isEligible,
      formattedAddress,
      DSP: R.replace("Specific Time ", "", item?.DSP),
    });
  })(response);
  const availableOrders = getOrdersByDate(fullOrders?.filter((item: any) => item?.isEligible));
  const unAvailableOrders = getOrdersByDate(fullOrders?.filter((item: any) => !item?.isEligible));
  return {
    unAvailableOrders,
    availableOrders,
  };
};

// export const getSelectedAccountId = (state: any) => {
//   const { selectedJobAccount } = state.jobAccounts;
//   const { selectedTradeAccount } = state.connectTrade;
//   return selectedJobAccount ? selectedJobAccount.JobId : selectedTradeAccount ? selectedTradeAccount.uid : "";
// };

// new for testing
export const getSelectedAccountId = (state: any) => {
  const { selectedJobAccount } = {
    selectedJobAccount: {
      SearchName: "ANDREWS Rename4 testing",
      JobName: "Andrews Rename4",
      JobNumber: "NNDLA004",
      Address1: "Thames",
      Address2: "Thames",
      JobId: "362NNDLA004",
    },
  };
  const { selectedTradeAccount } = { selectedTradeAccount: { uid: null } };
  return selectedJobAccount ? selectedJobAccount.JobId : selectedTradeAccount ? selectedTradeAccount.uid : "";
};
export const isSameTradeAccountOrEmptyCart = (item: any, selectedTradeAccount: any, cartCount: number) => {
  return item.uid === selectedTradeAccount.uid || cartCount === 0;
};

export const getTeamMemberAdditionEditObject = (params: any) => {
  const { data, event, userId, accountId, locationStr, storeName } = params;
  const admin = data.isAdmin.toString();
  const viewOrders = data.permissionList?.includes("viewOrderGroup").toString();
  const viewPricing = data.permissionList?.includes("restrictPriceGroup").toString();
  const placeOrders = data.permissionList?.includes("placeOrderGroup").toString();
  const tempAccess = data.temporaryAccess.toString();
  return {
    event,
    userId,
    accountId,
    admin,
    viewOrders,
    viewPricing,
    placeOrders,
    tempAccess,
    location: locationStr,
    storeName,
    device_type: Platform.OS,
  };
};

export const getRegionFromSelectedAddress = (selectedAddress: string | undefined) => {
  if (!selectedAddress) {
    return "";
  } else {
    const addressArray = selectedAddress.split(",");
    const region = addressArray[addressArray.length - 2];
    return region ? region.trim() : "";
  }
};

export const getPostalCodeFromSelectedAddress = (selectedAddress: string | undefined) => {
  if (!selectedAddress) {
    return "";
  } else {
    const addressArray = selectedAddress.split(",");
    const postalCode = addressArray[addressArray.length - 1];
    return postalCode ? postalCode.trim() : "";
  }
};

export const getFulfilmentpageAnalyticsObj = (params: any) => {
  const { step, orderType, props, location, storeName, deliveryType, onSiteLift, onSiteHazards, restrictedAccess, orderNumber } = params;
  const { digitalId, selectedAccountId, selectedAddress, cartDetail } = props;
  const getItems = () => {
    const items: any[] = [];
    cartDetail?.entries.forEach((entry: any) => {
      const { product, decimalQty } = entry;
      items.push({
        item_name: product?.name,
        item_id: product?.code,
        price: Number(Number(product?.price?.value).toFixed(2)),
        item_brand: R.propOr("", "manufacturer", product),
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "", // If Variant Exists else left blank
        quantity: Number(decimalQty),
      });
    });
    return items;
  };
  const userEmail = R.pathOr("", ["user", "uid"])(cartDetail);
  const name = userEmail.substring(0, userEmail.lastIndexOf("@"));
  const domain = userEmail.substring(userEmail.lastIndexOf("@") + 1);
  const purchaseEventObj = {
    affiliation: "Online Store",
    shipping: 0,
    value: Number(Number(R.pathOr("0", ["totalPrice", "value"])(cartDetail)).toFixed(2)), // Revenue after discount
    coupon: R.pathOr("", ["appliedVouchers", "0", "voucherCode"])(cartDetail),
    tax: Number(Number(R.pathOr("", ["totalTax", "value"])(cartDetail)).toFixed(2)),
    currency: R.pathOr("", ["totalPrice", "currencyIso"])(cartDetail),
    u1: name,
    u2: domain,
    u3: md5(userEmail),
  };

  const eventLogObject = {
    step,
    feature_type: cartDetail?.estimatesIncluded ? "Job" : "checkout flow",
    location,
    storeName,
    device_type: Platform.OS,
    fulfillment: getDeliveryOptionType(orderType) || "", // Delivery, Pickup, Courier, Add to existing
    deliveryRegion:
      orderType === OrderTypes.STANDARD || orderType === OrderTypes.EXPRESS || orderType === OrderTypes.ADD_TO_EXISTING
        ? getRegionFromSelectedAddress(selectedAddress)
        : "", // For Deliveries only else leave blank
    deliveryPostcode:
      orderType === OrderTypes.STANDARD || orderType === OrderTypes.EXPRESS || orderType === OrderTypes.ADD_TO_EXISTING
        ? getPostalCodeFromSelectedAddress(selectedAddress)
        : "", // For Deliveries only else leave blank
    deliveryType: step > 5 && orderType === OrderTypes.STANDARD ? deliveryType : "", // For Standard Delivery only else leave blank
    onSiteLift: step > 5 && orderType === OrderTypes.STANDARD ? onSiteLift : "", // For Standard Delivery only else leave blank
    onSiteHazards: step > 5 && orderType === OrderTypes.STANDARD ? onSiteHazards : "", // For Standard Delivery only else leave blank
    restrictedAccess: step > 5 && orderType === OrderTypes.STANDARD ? restrictedAccess : "", // For Standard Delivery only else leave blank
    orderNumber: step > 5 && orderType === OrderTypes.ADD_TO_EXISTING ? orderNumber : "", // For Add To Existing only else leave blank
    userId: digitalId,
    accountId: selectedAccountId,
    items: getItems(),
  };

  const finalEventLogObject = step === 11 ? { ...eventLogObject, ...purchaseEventObj } : eventLogObject;
  return finalEventLogObject;
};

export const getOrderReviewAnalyticsObj = (params: any) => {
  const { step, props, location, storeName } = params;
  const { userType, digitalId, selectedAccountId, orderType, selectedAddress, email, cartDetailData } = props;
  const getItems = () => {
    const items: any[] = [];
    cartDetailData?.entries.forEach((entry: any) => {
      const { product, decimalQty } = entry;
      items.push({
        item_name: product?.name,
        item_id: product?.code,
        price: Number(Number(product?.price?.value).toFixed(2)),
        item_brand: R.propOr("", "manufacturer", product),
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "", // If Variant Exists else left blank
        quantity: Number(decimalQty),
      });
    });
    return items;
  };

  const emailArr = email.split("@");
  const purchaseEventObj = {
    loginStatus: "login",
    transaction_id: "", // Transaction ID
    affiliation: "Online Store",
    shipping: 0,
    value: Number(Number(R.pathOr("0", ["totalPrice", "value"])(cartDetailData)).toFixed(2)), // Revenue after discount
    coupon: R.pathOr("", ["appliedVouchers", "0", "voucherCode"])(cartDetailData),
    tax: Number(Number(R.pathOr("", ["totalTax", "value"])(cartDetailData)).toFixed(2)),
    currency: R.pathOr("", ["totalPrice", "currencyIso"])(cartDetailData),
    u1: emailArr[0],
    u2: emailArr[1],
    u3: md5(email),
    userType,
  };
  const eventLogObject = {
    step,
    feature_type: "checkout flow",
    location,
    storeName,
    device_type: Platform.OS,
    fulfillment: orderType, // Delivery, Pickup, Courier,
    deliveryRegion: orderType === OrderTypes.STANDARD ? getRegionFromSelectedAddress(selectedAddress) : "", // For Deliveries only else leave blank
    deliveryPostcode: orderType === OrderTypes.STANDARD ? getPostalCodeFromSelectedAddress(selectedAddress) : "", // For Deliveries only else leave blank
    userId: digitalId,
    accountId: selectedAccountId,
    items: getItems(),
  };

  const ret = step === 5 ? { ...eventLogObject, ...purchaseEventObj } : eventLogObject;
  return ret;
};

export const generateHashCode = (val: string) => {
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < val.length; i++) {
    chr = val.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const getSTCSelectedTradeAccount = (state: any) => {
  return state.stc.stcJobAccount
    ? state.stc.stcJobAccount.JobId
    : state.stcConnectTrade.selectedSTCTradeAccount
    ? state.stcConnectTrade.selectedSTCTradeAccount.uid
    : "";
};

export const getProductDetailViewObject = (params: any) => {
  const { index, event, digitalId, selectedAccountId, sanitizedData, location, storeName } = params;
  const getItems = () => {
    const items: any[] = [];
    items.push({
      item_name: sanitizedData.ProductDescription,
      item_id: sanitizedData.SKU,
      price: parseFloat(sanitizedData.Price),
      item_brand: sanitizedData.Brand,
      item_category: "",
      item_category_2: "",
      item_category_3: "",
      item_category_4: "",
      item_variant: "",
    });
    return items;
  };

  const getIndexedItems = () => {
    const items: any[] = [];
    items.push({
      item_name: sanitizedData.ProductDescription,
      item_id: sanitizedData.SKU,
      price: parseFloat(sanitizedData.Price),
      item_brand: sanitizedData.Brand,
      item_category: "",
      item_category_2: "",
      item_category_3: "",
      item_category_4: "",
      item_variant: "",
      item_list_name: "Product List View",
      index,
    });
    return items;
  };

  const eventLogObject = {
    event,
    location,
    storeName,
    device_type: Platform.OS,
    userId: digitalId,
    accountId: selectedAccountId,
    items: event?.includes("view_item") ? getItems() : getIndexedItems(),
  };

  return eventLogObject;
};

export const getProductListCategoryViewObject = (params: any) => {
  const { event, digitalId, selectedAccountId, sanitizedData, location, storeName } = params;

  const getIndexedItems = () => {
    const items: any[] = [];
    for (let i = 0; i < sanitizedData.length; i++) {
      items.push({
        item_name: sanitizedData[i].ProductDescription,
        item_id: sanitizedData[i].SKU,
        price: parseFloat(sanitizedData[i].Price) || 0,
        item_brand: sanitizedData[i].Brand,
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "",
        item_list_name: "Product List View",
        index: i,
      });
    }
    return items;
  };

  return {
    event,
    location,
    storeName,
    device_type: Platform.OS,
    userId: digitalId,
    accountId: selectedAccountId,
    items: getIndexedItems(),
  };
};

export const getProductListSearchObject = (params: any) => {
  const { event, digitalId, selectedAccountId, sanitizedData, location, storeName, searchTerm } = params;

  const getIndexedSearchItems = () => {
    const items: any[] = [];
    for (let i = 0; i < sanitizedData.length; i++) {
      items.push({
        item_name: sanitizedData[i].ProductDescription,
        item_id: sanitizedData[i].SKU,
        price: parseFloat(sanitizedData[i].Price) || 0,
        item_brand: sanitizedData[i].Brand,
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "",
        item_list_name: "Search Results",
        index: i,
      });
    }
    return items;
  };

  return {
    event,
    location,
    storeName,
    device_type: Platform.OS,
    userId: digitalId,
    accountId: selectedAccountId,
    searchTerm,
    searchResults: sanitizedData.length,
    items: getIndexedSearchItems(),
  };
};

export const getMyListViewObject = (params: any) => {
  const { event, listName, digitalId, selectedAccountId, sanitizedData, location, storeName } = params;

  const getIndexedItems = () => {
    const items: any[] = [];
    for (let i = 0; i < sanitizedData.length; i++) {
      items.push({
        item_name: sanitizedData[i].ProductDescription,
        item_id: sanitizedData[i].SKU,
        price: parseFloat(sanitizedData[i].Price),
        item_brand: sanitizedData[i].Brand,
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "",
        item_stock: sanitizedData[i].Availability,
        item_list_name: listName,
        index: i,
      });
    }
    return items;
  };

  const eventLogObject = {
    event,
    location,
    storeName,
    device_type: Platform.OS,
    userId: digitalId,
    accountId: selectedAccountId,
    items: getIndexedItems(),
  };
  return eventLogObject;
};

export const getRemoveFromCartObject = (params: any) => {
  const { event, digitalId, selectedAccountId, location, storeName, item_name, item_id, item_brand, price, quantity } = params;
  /*const productInfo = data.item ? data.item?.product : data.product;
  const productPrice = data.item
    ? data.item?.totalPrice.value
    : data.totalPrice.value;
  const productQuantity = data.item ? data.item?.decimalQty : data.decimalQty;
  const productBrand = productInfo.manufacturer ? productInfo.manufacturer : "";*/

  return {
    event,
    location,
    storeName,
    device_type: Platform.OS,
    userId: digitalId,
    accountId: selectedAccountId,
    items: [
      {
        item_name,
        item_id,
        price: Number(price) || 0,
        item_brand,
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "",
        quantity: Number(quantity),
      },
    ],
  };
};

export const getAllPagesAnalyticsObj = (params: any) => {
  const { userType, digitalId, selectedAccountId, email, cartDetailData, location, storeName, timestamp, page_type } = params;

  const emailArr = email ? email.split("@") : [];
  const eventLogObject = {
    userId: digitalId,
    accountId: selectedAccountId,
    timestamp,
    step: 1,
    location,
    device_type: Platform.OS,
    u1: email ? emailArr[0] : "",
    u2: email ? emailArr[1] : "",
    u3: email ? md5(email) : "",
    userType: email ? userType : "",
    loginStatus: email ? "login" : "",
    storeName,
    currency: R.pathOr("", ["totalPrice", "currencyIso"])(cartDetailData),
    page_type,
  };
  return eventLogObject;
};

export const getFilterImageParams = (deliverType: string) => {
  if (deliverType === "Delivery") {
    return {
      name: "Standard delivery",
      desc: "2-5 days",
      source: getImage(OrderTypes.STANDARD),
    };
  } else if (deliverType === "Courier") {
    return {
      name: "Express courier",
      desc: "60-120 mins",
      source: getImage(OrderTypes.EXPRESS),
    };
  } else if (deliverType === "Pickup") {
    return {
      name: "Pickup",
      desc: "Today or next day",
      source: getImage(OrderTypes.PICKUP),
    };
  } else {
    return {
      name: "",
      desc: "",
      source: undefined,
    };
  }
};

export const getSanitizedListOfAllSuggestions = (data: any) => {
  const suggestions = R.map(obj => R.assoc("name", obj.value, obj))(R.slice(0, 4, R.propOr([], "suggestions")(data)));
  const assocList = (list: [any], assocKey: string, val: any) => list.map(R.assoc(assocKey, val));
  const category = R.propOr([], "category")(data);
  return R.flatten(R.prepend(assocList(suggestions, "isCategory", false), assocList(category, "isCategory", true)));
};

export const getSanitizedListOfSuggestions = (data: any) => {
  return R.map(obj => {
    obj = R.assoc("name", obj.value, obj);
    return R.assoc("isCategory", false, obj);
  })(R.propOr([], "suggestions")(data));
};

export const getWorkingDay = (date: Moment, days: number): Moment => {
  const modifiedDate = moment(date);
  if (days === 0 && !isWeekend(modifiedDate)) {
    // The day shouldn't be a weekend and working days should be 0 before returning a date
    return modifiedDate;
  } else {
    if (isWeekend(modifiedDate)) {
      return getWorkingDay(modifiedDate.add("1", "d"), days); // Keep adding days if the day is weekend
    } else {
      return getWorkingDay(modifiedDate.add("1", "d"), --days); // Keep a count of days that has been counted for working days
    }
  }
};

export const occludeSensitiveView = (val: any) => {
  if (val) {
    RNUxcam.occludeSensitiveView(val);
  }
};

export function isValidURL(url: any | undefined) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return pattern.test(url);
}

export const isTrackingEligible = (orderData: any) => {
  return orderData?.fulfilmentType !== "Pickup" && orderData?.status === OrderStatus.OnItsWay && isValidURL(orderData?.original?.trackingDetails?.trackingURL);
};

export const accessibility = (id?: string) => {
  return Platform.OS === "android" ? { accessible: true, accessibilityLabel: id } : { accessible: false, testID: id };
};

export const transformToQuoteProductObject = (obj: any) => {
  const item = obj.item;
  const quantity = isTimberFlag(item) ? obj.quantity - R.pathOr(0, ["selectedConfiguration", "0", "quantity"], item) : obj.quantity;

  return {
    quantity: 1,
    decimalQty: quantity,
    product: {
      code: item.product.code,
      length: item.product.sellOrderMultiple,
      timberProductFlag: isTimberFlag(item),
    },
  };
};

export const getRegistrationFlowAnalyticsObj = (params: any) => {
  const { event, step, step_label, userId, accountId, location } = params;

  const eventLogObject = {
    event,
    step,
    step_label,
    userId,
    accountId,
    location,
    device_type: Platform.OS,
  };
  return eventLogObject;
};

export const getLoginAnalyticsObj = (params: any) => {
  const { event, userId, accountId, accountIdLinked, location, delegated_member, delegated_permissions } = params;

  const eventLogObject = {
    event,
    timestamp: new Date().getTime().toString(),
    userId,
    accountId,
    accountIdLinked,
    location,
    device_type: Platform.OS,
    delegated_member,
    delegated_permissions,
  };
  return eventLogObject;
};

export const returnMemberType = (params: any) => {
  if (params.accountAdminGroup === true) {
    return "Admin";
  } else if (params.accountOwnerGroup === true) {
    return "Owner";
  } else {
    return "Team Member";
  }
};

export const getShortPermissionsString = (permissions: PermissionTypes) =>
  R.compose(
    R.replace(/,/g, ":"),
    R.join("|"),
    R.toPairs,
    renameKeys({
      [PermissionTypes.AccountOwner]: "owner",
      [PermissionTypes.CreditLimit]: "pLimit",
      [PermissionTypes.PlaceOrders]: "pOrder",
      [PermissionTypes.TemporaryAccess]: "tmpAcces",
      [PermissionTypes.UserAdmin]: "admin",
      [PermissionTypes.ViewEstimatesGroup]: "vJob",
      [PermissionTypes.ViewOrdersAndDeliveries]: "vOrder",
      [PermissionTypes.ViewPricing]: "vPrice",
    }),
  )(permissions);

export const incrementDayForDeliveryOrPickup = (date?: moment, orderType: string) => {
  if (orderType === OrderTypes.PICKUP || orderType === OrderTypes.STANDARD) {
    return getWorkingDay(date, 1);
  } else {
    return date;
  }
};

export const getEarliestDateParam = (earliestDate: string, orderType: string, eligibility): void | Moment => {
  if (orderType === OrderTypes.PICKUP && eligibility) {
    const elilgibilityArr: any = R.filter(R.propEq("deliveryType", "PickUp"))(eligibility);
    if (elilgibilityArr) {
      return moment(elilgibilityArr[0].earliestDate + " " + elilgibilityArr[0].earliestTime, "yyyy-MM-DD hh:mm A");
    }
    return earliestDate;
  } else {
    return earliestDate;
  }
};

export const getTruncatedItem = R.slice(0, 100);

// @ts-ignore
export const getTruncatedListNames = R.compose<string>(getTruncatedItem, R.join("|"), R.map(R.propOr("", "listName")));

// @ts-ignore
export const getTruncatedListItemsByProp = (prop: string, list?: any[]) => R.compose(getTruncatedItem, R.join("|"), R.map(R.prop(prop)))(list || []);

export const getJobAnalyticsObj = (params: any) => {
  const { event, userId, accountId, branch, branchId, jobId, job_date, job_expiry, job_stage, location } = params;

  const eventLogObject = {
    event,
    userId,
    accountId,
    branch,
    branchId,
    jobId,
    job_date,
    job_expiry,
    job_stage,
    location,
    device_type: Platform.OS,
  };
  return eventLogObject;
};

export const getJobItemAnalyticsObj = (params: any) => {
  const { event, feature_type, userId, accountId, branch, branchId, jobId, job_date, job_expiry, job_stage, location, itemList } = params;

  const getItems = () => {
    const items: any[] = [];
    const listItems = itemList?.lines;
    for (let i = 0; i < listItems?.length; i++) {
      items.push({
        item_name: listItems[i]?.estimateCustProdDescription,
        item_id: listItems[i]?.code,
        price: Number(Number(listItems[i]?.estimateExtLineTotalExcl.substring(1)).toFixed(2)) || 0,
        item_brand: listItems[i].manufacturer ? listItems[i].manufacturer : "",
        item_list_name: "Job",
        index: i,
      });
    }
    return items;
  };

  const eventLogObject = {
    event,
    feature_type,
    userId,
    accountId,
    branch,
    branchId,
    jobId,
    job_date,
    job_expiry,
    job_stage,
    location,
    device_type: Platform.OS,
    items: getItems(),
  };
  return eventLogObject;
};

export const getJobItemSanitizedObj = (params: any) => {
  const {
    event,
    feature_type,
    userId,
    accountId,
    accountIdLinked,
    branch,
    branchId,
    jobId,
    job_date,
    job_expiry,
    job_stage,
    location,
    itemList,
    index,
    sectionDescription,
  } = params;

  const items: any[] = [
    {
      item_name: itemList.ProductDescription,
      item_id: itemList.SKU,
      price: Number(Number(itemList?.Price).toFixed(2)) || 0,
      item_brand: itemList.Brand,
      item_list_name: sectionDescription,
      index,
    },
  ];

  const eventLogObject = {
    event,
    feature_type,
    userId,
    accountId,
    branch,
    branchId,
    jobId,
    job_date,
    job_expiry,
    job_stage,
    location,
    device_type: Platform.OS,
    items,
  };
  return eventLogObject;
};

export const getBranchAvailabilityAnalyticsObj = (params: any) => {
  const { event, userId, accountId, uniqueId, branch, branchId, location, availability } = params;

  const eventLogObject = {
    event,
    userId,
    accountId,
    uniqueId,
    branch,
    branchId,
    location,
    availability,
    device_type: Platform.OS,
  };
  return eventLogObject;
};

export const getOrderListAnalyticsObj = (params: any) => {
  const { event, userId, accountId, location, order_reference, order_address, order_eta, order_fulfilment, order_change, item_id } = params;

  const eventLogObject = {
    event,
    userId,
    accountId,
    location,
    device_type: Platform.OS,
    order_reference,
    order_address,
    order_eta,
    order_fulfilment,
    order_change,
    item_id,
  };
  return eventLogObject;
};

export const getOrderDetailsObj = (params: any) => {
  const { event, feature_type, userId, accountId, location, order_reference, order_address, order_eta, order_fulfilment, itemList } = params;

  const getItems = () => {
    const items: any[] = [];
    const listItems = itemList?.orderLines;
    for (let i = 0; i < listItems?.length; i++) {
      items.push({
        item_name: listItems[i]?.description,
        item_id: listItems[i]?.sku,
        price: Number(Number(listItems[i]?.unitPrice.substring(1)).toFixed(2)) || 0,
        item_brand: listItems[i].manufacturer ? listItems[i].manufacturer : "",
        item_list_name: "Open Order",
        index: i,
      });
    }
    return items;
  };

  const eventLogObject = {
    event,
    feature_type,
    userId,
    accountId,
    location,
    device_type: Platform.OS,
    order_reference,
    order_address,
    order_eta,
    order_fulfilment,
    items: getItems(),
  };
  return eventLogObject;
};

export const getCartViewsObj = (params: any) => {
  const { event, userId, accountId, location, itemList } = params;

  const getItems = () => {
    const items: any[] = [];
    const listItems = itemList?.entries;
    for (let i = 0; i < listItems?.length; i++) {
      items.push({
        item_name: listItems[i]?.product.name,
        item_id: listItems[i]?.product.code,
        price: Number(Number(listItems[i]?.totalPrice.value).toFixed(2)) || 0,
        item_brand: listItems[i].product.manufacturer ? listItems[i].product.manufacturer : "",
        quantity: listItems[i].decimalQty,
        index: i,
      });
    }
    return items;
  };

  const eventLogObject = {
    event,
    userId,
    accountId,
    location,
    device_type: Platform.OS,
    items: getItems(),
  };
  return eventLogObject;
};

export const getFileNameWithoutExtension = (fileName: string) => {
  let indexOfDot = fileName.lastIndexOf(".");
  return fileName.substring(0, indexOfDot);
};

export const getAccountLinkAnalyticsObj = (params: any) => {
  const { event, userId, step, accountId, accountIdLinked, location, branch, branchId } = params;

  const eventLogObject = {
    event,
    step,
    userId,
    accountId,
    accountIdLinked,
    branch,
    branchId,
    location,
    device_type: Platform.OS,
  };
  return eventLogObject;
};

export const tagScreenName = (name: string) => {
  const hideTextFields = {
    type: UXCamOcclusionType.OccludeAllTextFields,
  };

  RNUxcam.setAutomaticScreenNameTagging(false);
  RNUxcam.tagScreenName(name);
  RNUxcam.applyOcclusion(hideTextFields);
};

export const addOcclusionForTextFields = () => {
  const hideTextFields = {
    type: UXCamOcclusionType.OccludeAllTextFields,
  };

  RNUxcam.applyOcclusion(hideTextFields);
};

export const removeOcclusionFromTextFields = () => {
  const hideTextFields = {
    type: UXCamOcclusionType.OccludeAllTextFields,
  };

  RNUxcam.removeOcclusion(hideTextFields);
};

export const showRelatedToast = (relatedProductCount: number, sku: any) =>
  Toast.show({
    type: relatedProductCount > 0 ? "cartExtended" : "cart",
    text1: productAddedToCart,
    topOffset: Platform.OS === "ios" ? 50 : 30,
    visibilityTime: 3000,
    props: relatedProductCount > 0 ? { children: <RelatedAlternativeProducts sku={sku} relatedProductCount={relatedProductCount ?? 0} /> } : undefined,
  });
