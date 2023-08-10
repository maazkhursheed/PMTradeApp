import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Platform } from "react-native";
import { convertToString } from "~root/Lib/StringHelper";
import { renameStockKeys, sanitizeImageUrl } from "../DataHelper";

/**
 * This helper function returns true if order type Courier is selected for order journey
 */
export const isExpressJourney = R.always(true); //R.pathSatisfies(R.equals(OrderTypes.EXPRESS), ["value", "branchList", "selectedOrderType"]);

/**
 * This helper function returns query param for solar search to get the products for courier order type.
 */
export const getExpressParam = R.curry((state$, payload) => {
  return R.ifElse(
    R.always(isExpressJourney(state$)),
    R.ifElse(
      RA.isNilOrEmpty,
      R.always({
        query: ":relevance:expressOrder:true",
      }),
      R.evolve({
        query: R.ifElse(RA.isNilOrEmpty, R.always(":relevance:expressOrder:true"), R.compose(R.join(""), R.append(":relevance:expressOrder:true"))),
      }),
    ),
    R.identity,
  )(payload);
});

/**
 * This helper functions true if there is courier order type is selected
 */
export const hasNotExpressOrderFlag = R.either(R.propEq("ExpressOrder", "N"), R.propEq("expressOrder", false));
// TA-194 Check Magesh comments for this logic
// R.propSatisfies(R.compose(R.complement(R.equals(3)), parseFloat), "StatusCode"),
export const isPOAProduct = (entryItem: any): boolean => {
  return R.compose(R.gte(0.01), R.path(["product", "price", "value"]))(entryItem);
};

// pay on callBack logic
export const getSpecialProducts = R.anyPass([
  R.pathEq(["product", "specialProdWithAlphaSkuFlag"], true),
  R.pathEq(["product", "display"], "SPECIAL"),
  R.pathEq(["product", "specialProduct"], true),
  isPOAProduct,
]);

export const getSpecialFromCartResponse = R.either(R.pathEq(["product", "specialProdWithAlphaSkuFlag"], true), R.pathEq(["product", "display"], "SPECIAL"));

export const getStock = (data: any) => {
  const stock = R.cond([
    [R.hasPath(["stock"]), R.pathOr({}, ["stock"])],
    [R.hasPath(["product", "stock"]), R.pathOr({}, ["product", "stock"])],
    [R.hasPath(["pmStockData"]), R.pathOr({}, ["pmStockData"])],
  ])(data);
  return renameStockKeys(stock);
};

export const getSpecialFromSanitizeData = R.pathOr(false, ["IsSpecial"]);

export const addAllItemPriceSTC = R.compose(R.reduce(R.add, 0), R.map(parseFloat));
/**
 * @param cart product list
 * @return true if there is no any product with zero price present in cart product list
 */
export const isNotZeroPriceProduct = R.compose(
  R.reduce(R.and, true),
  R.map(R.compose(R.gt(R.__, 0), parseFloat, R.pathOr(0, ["totalPrice", "value"]))),
  R.prop("entries"),
);

/**
 * @param cart product list
 * @return length of the products with zero quantity present in the cart
 */
export const productsQuantityGreaterThanZero = R.compose(
  R.length,
  R.map(R.assoc("Availability", "Available")),
  R.filter(R.compose(R.gt(R.__, 0), R.prop("Quantity"))),
  R.values,
  R.mapObjIndexed((num, key, obj) => R.assoc("index", parseFloat(key), num)),
);

/**
 * @param cart product item
 * @return length od the product with empty quantity present in the cart.
 */
export const productsQuantityEmpty = R.compose(R.length, R.filter(R.propEq("Quantity", "")));

/**
 * This helper function returns the selected quantity of product present in the cart
 */
export const fetchQuantityFromCart = R.curry((item, cart) =>
  R.compose(Number, R.ifElse(R.isNil, R.always(0), R.prop("Quantity")), R.find(R.propEq("SKU", item.SKU)))(cart),
);
R.curry((item, cart) =>
  R.compose(R.ifElse(R.isNil, R.always("1"), R.prop("Quantity")), R.find(R.propEq("UniqueId", item.code + "-" + item.sellOrderMultiple)))(cart),
);

/**
 * This helper function returns number for fraction points of timber product quantity
 */
export const getFractionUOM = (data: any) =>
  R.compose(Number, R.ifElse(R.compose(R.equals(1), R.length), R.always("0"), R.last), R.split("."), convertToString)(data);

export const getDigitsUOM = (data: any) => R.compose(Number, R.head, R.split("."), convertToString)(data);

export const getDigitsNumberLength = value => R.compose(R.length, R.head, R.split("."), convertToString)(value);

export const getFractionNumberLength = value =>
  R.compose(R.ifElse(R.equals(-1), R.always(0), R.subtract(value.toString().length - 1)), R.indexOf("."), convertToString)(value);

export const getSearchParameters = (value: any) =>
  R.compose(
    R.reject(RA.isNilOrEmpty),
    R.applySpec({
      branchId: R.path(["connectTrade", "selectedTradeAccount", "branch", "branchCode"]),
      stocksBranchId: R.path(["branchList", "selectedBranch", "branchCode"]),
      jobAccountId: R.pathOr(R.path(["connectTrade", "selectedTradeAccount", "custId"], value), ["jobAccounts", "selectedJobAccount", "JobNumber"]),
      tradeAccountId: R.path(["connectTrade", "selectedTradeAccount", "custId"]),
    }),
  )(value);

export const getAddToCartLogEventObj = (params: any) => {
  const { location, storeName, title, prodCode, digitalId, selectedAccountId, price, item_brand } = params;

  return {
    location,
    storeName,
    device_type: Platform.OS,
    userId: digitalId,
    accountId: selectedAccountId,
    items: [
      {
        item_name: title,
        item_id: prodCode,
        price: price || 0,
        item_brand,
        item_category: "",
        item_category_2: "",
        item_category_3: "",
        item_category_4: "",
        item_variant: "", // If Variant Exists else left blank
        quantity: parseFloat(params.quantity),
      },
    ],
  };
};

export enum EnumRelatedAndAlternateReferenceType {
  ACCESSORIES = "ACCESSORIES",
  SIMILAR = "SIMILAR",
}

export enum EnumSubtituteProductsButtonType {
  PRODUCT = "Product",
  RELATED = "Related",
  ALTERNATIVES = "Alternatives",
}

export const getLastUpdatedItemInArray = value => R.compose(R.map(R.last), R.values, R.groupBy(R.path(["item", "product", "code"])))(value);

export const getProductImage = value => R.compose(sanitizeImageUrl, R.pathOr("", ["product", "images", "0", "url"]))(value);

export const getCompanyLogo = value => R.compose(sanitizeImageUrl, R.pathOr("", ["companyLogo", "downloadUrl"]))(value);
