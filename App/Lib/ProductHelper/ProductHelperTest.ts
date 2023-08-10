import * as R from "ramda";
import { Platform } from "react-native";
import {
  addAllItemPriceSTC,
  fetchQuantityFromCart,
  getAddToCartLogEventObj,
  getDigitsNumberLength,
  getDigitsUOM,
  getExpressParam,
  getFractionNumberLength,
  getFractionUOM,
  getProductImage,
  getSpecialProducts,
  hasNotExpressOrderFlag,
  isExpressJourney,
  isNotZeroPriceProduct,
  isPOAProduct,
  productsQuantityEmpty,
  productsQuantityGreaterThanZero,
} from "~root/Lib/ProductHelper/index";
import { DeliveryDetails, PricingDetails, SampleOrder } from "~root/Lib/SampleResponses";
import { cartInputEntries, cartOutputEntries, isPOAProductInput } from "./cartEntriesData";

const value = {
  expressOrder: "true",
  Sku: "3532359",
};

const payload = {
  query: "",
  currentPage: "0",
};

test("hasNotExpressOrderFlag function should work as expected", () => {
  // expect(expressOrderFalseAndHasQuantity(value, InventoryResponse)).toBeTruthy();
  expect(hasNotExpressOrderFlag({ ExpressOrder: "Y" })).toBeFalsy();
  expect(hasNotExpressOrderFlag({ ExpressOrder: "N" })).toBeTruthy();
  expect(hasNotExpressOrderFlag({ expressOrder: false })).toBeTruthy();
  expect(hasNotExpressOrderFlag({ expressOrder: true })).toBeFalsy();
});

test("Should comes true", () => {
  expect(isNotZeroPriceProduct(PricingDetails)).toBeTruthy();
  expect(
    isNotZeroPriceProduct({
      entries: [
        {
          totalPrice: {
            value: 1,
          },
        },
        {
          totalPrice: {
            value: 0,
          },
        },
      ],
    }),
  ).toBeFalsy();
});

test("Should return true for express deliveries", () => {
  expect(isExpressJourney(DeliveryDetails)).toBeTruthy();
  expect(isExpressJourney(R.assocPath(["value", "branchList", "selectedOrderType"], "courier-delivery", DeliveryDetails))).toBeTruthy();
});

test("should return appropriate query for express orders", () => {
  expect(getExpressParam(DeliveryDetails)(payload)).toStrictEqual(getExpressParam(DeliveryDetails)(payload));
  expect(getExpressParam(DeliveryDetails)({})).toStrictEqual(getExpressParam(DeliveryDetails)({}));
  expect(getExpressParam(DeliveryDetails)(null)).toStrictEqual(getExpressParam(DeliveryDetails)(null));
  expect(getExpressParam(R.assocPath(["value", "branchList", "selectedOrderType"], "courier-delivery", DeliveryDetails))(payload)).toStrictEqual(
    R.assoc("query", ":relevance:expressOrder:true", payload),
  );
  expect(getExpressParam(R.assocPath(["value", "branchList", "selectedOrderType"], "courier-delivery", DeliveryDetails))({})).toStrictEqual({
    query: ":relevance:expressOrder:true",
  });
  expect(getExpressParam(R.assocPath(["value", "branchList", "selectedOrderType"], "courier-delivery", DeliveryDetails))(null)).toStrictEqual({
    query: ":relevance:expressOrder:true",
  });
});

test("UOM precision should work", () => {
  expect(getFractionUOM("9.2")).toEqual(2);
  expect(getFractionUOM("8.3")).toEqual(3);
  expect(getFractionUOM("11.0")).toEqual(0);
  expect(getFractionUOM("10.10")).toEqual(10);
  expect(getFractionUOM("10")).toEqual(0);

  expect(getDigitsUOM("9.2")).toEqual(9);
  expect(getDigitsUOM("0.3")).toEqual(0);
  expect(getDigitsUOM("11.0")).toEqual(11);
  expect(getDigitsUOM("10.10")).toEqual(10);

  expect(getFractionNumberLength(2.112)).toEqual(3);
  expect(getFractionNumberLength(2.12)).toEqual(2);
  expect(getFractionNumberLength(2.2)).toEqual(1);
  expect(getFractionNumberLength(2112)).toEqual(0);
  expect(getFractionNumberLength(0)).toEqual(0);

  expect(getDigitsNumberLength(2.112)).toEqual(1);
  expect(getDigitsNumberLength(122.12)).toEqual(3);
  expect(getDigitsNumberLength(22.2)).toEqual(2);
  expect(getDigitsNumberLength(2112)).toEqual(4);
  expect(getDigitsNumberLength(0)).toEqual(1);
  expect(getDigitsNumberLength(0.123)).toEqual(1);
});

test("sum of values", () => {
  expect(addAllItemPriceSTC([3, 8, 6])).toEqual(17);
});

test("products quantity should grater than zero", () => {
  expect(productsQuantityGreaterThanZero(SampleOrder)).toBeGreaterThan(0);
});

test("products quantity should be zero", () => {
  expect(productsQuantityEmpty(SampleOrder)).toEqual(0);
});

const product1 = {
  Quantity: "2",
  SKU: "3272432",
  ProductDescription: "FREO BAR CHAIR 50/65 LOOSE 81045",
  UOM: "EA",
  Price: "0.46",
  index: 0,
  Availability: "Available",
};

test("fetch quantity item from cart", () => {
  expect(fetchQuantityFromCart(product1, SampleOrder)).toEqual(2);
});

const params = {
  location: "24.905975, 67.112667984654",
  storeName: "Thames",
  digitalId: "auth0|5eaba1a211555f0baff802fd",
  item_brand: "BREMICK",
  props: {
    isPromoApplied: false,
    data: {
      type: "pmProductWsDTO",
      availableForPickup: false,
      barcodesPM: "9337357025792",
      baseOptions: [],
      categories: [],
      classifications: [
        {
          code: "Specification",
          features: [
            {
              code: "Weight",
              comparable: false,
              featureUnit: {
                name: "Kilogram",
                symbol: "KGM",
                unitType: "KGM",
              },
              featureValues: [
                {
                  value: "0.05188",
                },
              ],
              name: "Weight",
              range: false,
            },
          ],
          name: "Specifications",
        },
      ],
      item_id: "4508305",
      configurable: false,
      description:
        "The Bremick M12 Square Washer is designed for use in applications with any nuts, bolts and screw products. It measures 50 mm x 3 mm. This washer helps to prevent a nut or bolt head from pulling through the material. Washer with a hole in the centre can be used as a spacer.It features galvanised steel construction for long lasting durability and superior corrosion resistance. This washer is suitable for use in exterior applications including coastal zones. It helps to minimise the surface damage of the work material.",
      expressOrder: true,
      hasNoQuantity: 0,
      kitProductFlag: false,
      numberOfReviews: 0,
      perpetualFlag: false,
      price: {
        currencyIso: "NZD",
        formattedValue: "$0.77",
        priceType: "BUY",
      },
      priceRange: {},
      productTypeCodeEnum: "N",
      purchasable: true,
      sellOrderMultiple: 0,
      stock: {
        pmStockQuantity: "548",
        statusCode: "1",
        stockLevelStatus: "inStock",
      },
      summary: "",
      timberProductFlag: false,
      unitCode: "EA",
      uomFormat: "11",
    },
  },
  price: 0.77,
  title: "Bremick Flat Square Washer M12 x 50 x 3mm Galvanised WSQMG125036",
  prodCode: "4508305",
  selectedAccountId: "362HADAA",
  quantity: "1",
};
const compareObj = {
  location: "24.905975, 67.112667984654",
  storeName: "Thames",
  device_type: Platform.OS,
  userId: "auth0|5eaba1a211555f0baff802fd",
  accountId: "362HADAA",
  items: [
    {
      item_name: "Bremick Flat Square Washer M12 x 50 x 3mm Galvanised WSQMG125036",
      item_id: "4508305",
      price: 0.77,
      item_brand: "BREMICK",
      item_category: "",
      item_category_2: "",
      item_category_3: "",
      item_category_4: "",
      item_variant: "",
      quantity: 1,
    },
  ],
};

test("test object created to be logged in firebase analytics", () => {
  expect(getAddToCartLogEventObj(params)).toEqual(compareObj);
});

const prodItem1 = {
  availableForPickup: true,
  basePrice: { currencyIso: "NZD", formattedValue: "$6.60", priceType: "BUY", value: 6.6 },
  configurationInfos: [],
  customProductFlag: false,
  decimalQty: 1,
  deliveryOrder: true,
  entryNumber: 20,
  estimateProductStock: 0,
  product: {
    availableForPickup: true,
    baseOptions: [],
    categories: [],
    code: "1012466",
    configurable: false,
    description: "Premium quality NZ grown Radiata pine decking with minimal defects. Features a smooth face on both sides.",
    expressOrder: false,
    hasNoQuantity: 0,
    images: [],
    name: "Radiata Premium Smooth Decking H3.2 CCA Treated 150 x 40mm (140 x 32mm)",
    purchasable: true,
    sellOrderMultiple: 0,
    specialProdWithAlphaSkuFlag: false,
    specialProduct: false,
    stock: { stockLevel: 0, stockLevelStatus: "outOfStock" },
    timberProductFlag: true,
    unitCode: "LM",
    uomFormat: "z,zzz,zzz.99-",
    url: "/c/radiata-premium-smooth-decking-h32-cca-treated-150-x-40mm-140-x-32mm/p/1012466",
  },
  quantity: 1,
  retailPrice: { currencyIso: "NZD", formattedValue: "$8.95", priceType: "BUY", value: 8.95 },
  selectedConfiguration: [],
  totalPrice: { currencyIso: "NZD", formattedValue: "$6.60", priceType: "BUY", value: 6.6 },
  unit: "LM",
  updateable: true,
};

const prodItem2 = {
  availableForPickup: true,
  basePrice: { currencyIso: "NZD", formattedValue: "$0.00", priceType: "BUY", value: 0 },
  configurationInfos: [],
  customProductFlag: false,
  decimalQty: 1,
  deliveryOrder: true,
  entryNumber: 19,
  estimateProductStock: 0,
  product: {
    availableForPickup: true,
    baseOptions: [],
    categories: [],
    code: "7746229",
    configurable: false,
    description:
      "The Mags low leather CTi anti-static safety shoes in black/blue, features leather upper with hard wearing breathable mesh panels. The fast wicking lining ensures moisture management and comfort. Contour moulded perforated EVA insole provides excellent underfoot cushioning. The i-Shield offers excellent resistance to water, dirt and stains. Anti-slip pentagrip rubber outsole offer excellent durability.",
    expressOrder: true,
    hasNoQuantity: 0,
    images: [
      {
        altText: "Mags Low Leather CTi Anti-Static Safety Shoes Black",
        format: "zoom",
        imageType: "PRIMARY",
        url: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1167080_MML100-BLK.jpg",
      },
      {
        altText: "Mags Low Leather CTi Anti-Static Safety Shoes Black",
        format: "product",
        imageType: "PRIMARY",
        url: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1167080_MML100-BLK.jpg",
      },
      {
        altText: "Mags Low Leather CTi Anti-Static Safety Shoes Black",
        format: "thumbnail",
        imageType: "PRIMARY",
        url: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1167080_MML100-BLK.jpg",
      },
      {
        altText: "Mags Low Leather CTi Anti-Static Safety Shoes Black",
        format: "cartIcon",
        imageType: "PRIMARY",
        url: "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1167080_MML100-BLK.jpg",
      },
    ],
    manufacturer: "Magnum",
    manufacturerId: "MML100-BLK-105",
    name: "Mags Low Leather CTi Anti-Static Safety Shoes Black",
    purchasable: true,
    sellOrderMultiple: 0,
    specialProdWithAlphaSkuFlag: false,
    specialProduct: false,
    stock: { stockLevel: 0, stockLevelStatus: "outOfStock" },
    timberProductFlag: false,
    unitCode: "PR",
    uomFormat: "zz,zzz,zzz,zz9-",
    url: "/c/mags-low-leather-cti-anti-static-safety-shoes-black/p/7746229",
  },
  quantity: 1,
  retailPrice: { currencyIso: "NZD", formattedValue: "$0.00", priceType: "BUY", value: 0 },
  selectedConfiguration: [],
  totalPrice: { currencyIso: "NZD", formattedValue: "$0.00", priceType: "BUY", value: 0 },
  unit: "PR",
  updateable: true,
};
const imageURL = "https://pimstorageauesit.blob.core.windows.net/placemakers/media-assets/1167080_MML100-BLK.jpg";

test("getProductImage should work as expected", () => {
  expect(getProductImage(prodItem1)).toEqual("");
  expect(getProductImage(prodItem2)).toEqual(imageURL);
});

test("find special product", () => {
  expect(R.filter(getSpecialProducts)(cartInputEntries)).toEqual(cartOutputEntries);
});

test("find special empty product", () => {
  expect(R.filter(getSpecialProducts)([])).toEqual([]);
});

test("find isPOAproduct", () => {
  expect(isPOAProduct(isPOAProductInput)).toEqual(true);
});

test("find empty data for isPOAproduct", () => {
  expect(isPOAProduct({})).toEqual(false);
});
