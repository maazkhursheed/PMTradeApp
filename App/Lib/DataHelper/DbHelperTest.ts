import moment from "moment";
import { Platform } from "react-native";
import {
  checkProductAvailability,
  consolidateMyListImages,
  fetchMyListImages,
  findPricesForHybris,
  findStockAvailabilityForSku,
  findStockQuantityForHybris,
  getAccountLinkAnalyticsObj,
  getAllPagesAnalyticsObj,
  getDataIfResponseIsOK,
  getFileNameWithoutExtension,
  getFilteredMyList,
  getFilterImageParams,
  getFulfilmentpageAnalyticsObj,
  getInventoryItemBySKU,
  getLoginAnalyticsObj,
  getMyListViewObject,
  getOrderDeliverDate,
  getOrderReviewAnalyticsObj,
  getPMCategoriesTileSlot,
  getPMMoreCategoriesTileSlot,
  getPostalCodeFromSelectedAddress,
  getProductDetailViewObject,
  getProductListCategoryViewObject,
  getProductListSearchObject,
  getPropFromList,
  getRegionFromSelectedAddress,
  getRegistrationFlowAnalyticsObj,
  getRemoveFromCartObject,
  getSanitizedListOfAllSuggestions,
  getSanitizedListOfSuggestions,
  getSectionNameAndTime,
  getSelectedAccountId,
  getShortPermissionsString,
  getSTCSelectedTradeAccount,
  getTeamMemberAdditionEditObject,
  getTruncatedListNames,
  getWorkingDay,
  isCoreLogicResponseOk,
  isProductStockAvailable,
  isResponseNetworkError,
  isResponseOk,
  isTrackingEligible,
  isValidURL,
  isWeekend,
  sanitizeImageUrl,
} from "~root/Lib/DataHelper/index";
import { checkSpecialProductsAvailability } from "~root/Lib/OrderItemHelper";
import {
  cartItemInputParams,
  cartItemInputParams1,
  cartItemReturnedObject,
  ExpectConsolidatedMyListData,
  ExpectedListImagesData,
  ExpectedMyListDetailData,
  InnventoryItem1,
  InStockProduct,
  InventoryItem,
  InventoryResponse,
  MyListDetailsData,
  myListInputParams,
  myListReturnedObject,
  MyListsData,
  OutOfStockProduct,
  productDetailInputParams,
  productDetailReturnedObject,
  productListSearchInputParams,
  productListSearchReturnedObject,
  productListViewInputParams,
  productListViewReturnedObject,
  productSelectInputParams,
  productSelectReturnedObject,
  SampleAccountsData,
  SampleAccountsData1,
  SampleCartData,
  stockQuantityObj,
  teamMemberInputParams,
  teamMemberReturnedObject,
} from "~root/Lib/SampleResponses";
import { SpecialProductStatus } from "../QuoteHelper";

test("Prop from listing should return correct value", () => {
  const list = [{ User: "MVP" }, { Usr: "Pilot" }];
  expect(getPropFromList("User", list)).toBe("MVP");
  expect(getPropFromList("User", undefined)).toBeUndefined();
  expect(getPropFromList(undefined, list)).toBeUndefined();
});

test("isResponseNetworkError function should work properly", () => {
  expect(
    isResponseNetworkError({
      ok: false,
      problem: "NETWORK_ERROR",
    }),
  ).toBeTruthy();

  expect(isResponseNetworkError(undefined)).toBeFalsy();
});

test("getDataIfResponseIsOK function should work properly", () => {
  expect(
    getDataIfResponseIsOK({
      ok: true,
      data: "ABC",
    }),
  ).toBe("ABC");
  expect(getDataIfResponseIsOK(undefined)).toBeUndefined();
  expect(
    getDataIfResponseIsOK({
      ok: false,
      data: "ABC",
    }),
  ).toBeUndefined();
});

test("isOkResponse function should work as expected", () => {
  expect(isResponseOk({ ok: true, data: {} })).toBeTruthy();
  expect(isResponseOk({ ok: true, data: { error: "An error occured" } })).toBeFalsy();
  expect(isResponseOk({ ok: false, data: {} })).toBeFalsy();
});

test("isCoreLogicOkResponse function should work as expected", () => {
  const failuredata = {
    ok: true,
    data: {
      error: {
        code: 400,
        message: "Invalid or missing input parameters.",
        details: [],
      },
    },
  };

  const successData = {
    ok: true,
    data: {
      suggestions: [
        {
          text: "123/1 Hill Street North, Richmond, Nelson City, 7020",
          magicKey: "GST7YMc0AM9UOsKtGTyVGST7YMc0AM9UOsEmObpaOhcAAbTtHhpnYUTqYMktGMytaikZMsbEMsbH",
          isCollection: false,
        },
        {
          text: "123/1 Lady Isaac Way, Mairehau, Christchurch City, 8052",
          magicKey: "GST7YMc0AM9UOsKtGTyVGST7YMc0AM9UOsEmObpaOhcAAbTtHhpnYUTqYMktGMytaikZQswEU5gaQoFF",
          isCollection: false,
        },
      ],
    },
  };
  const failureData2 = {
    ok: false,
    data: {},
  };
  expect(isCoreLogicResponseOk(failuredata)).toBeFalsy();
  expect(isCoreLogicResponseOk(successData)).toBeTruthy();
  expect(isCoreLogicResponseOk(failureData2)).toBeFalsy();
});

test("checkout delivery time calculation should be calculated as expected", () => {
  expect(getWorkingDay(moment("2020-11-02"), 1).format("YYYY-MM-DD")).toEqual(moment("2020-11-03").format("YYYY-MM-DD"));
});

test("sanitze image url, it should start with http", () => {
  expect(sanitizeImageUrl("http://www.fbu.com")).toEqual("http://www.fbu.com");
  expect(sanitizeImageUrl("www.fbu.com")).toEqual("");
});

test("get inventory by sku id", () => {
  expect(getInventoryItemBySKU("3532359", InventoryResponse)).toStrictEqual(InventoryItem);
  expect(getInventoryItemBySKU("3532358", InventoryResponse)).toBe(undefined);
});

const saturday = moment("2020-12-12T10:00:00");
const sunday = moment("2020-12-13T10:00:00");
const monday = moment("2020-12-14T10:00:00");

test("test given date is weekend or not", () => {
  expect(isWeekend(saturday)).toBeTruthy();
  expect(isWeekend(sunday)).toBeTruthy();
  expect(isWeekend(monday)).toBeFalsy();
});

test("check the product is available or not", () => {
  expect(checkProductAvailability(InnventoryItem1)).toEqual("Available in 5+ days");
  expect(checkProductAvailability(InventoryItem)).toEqual("7 in stock");
});

test("check is product stock available", () => {
  expect(isProductStockAvailable(InnventoryItem1)).toBeFalsy();
  expect(isProductStockAvailable(InventoryItem)).toBeTruthy();
});

test("test fetch list images", () => {
  expect(fetchMyListImages(MyListsData)).toStrictEqual(ExpectedListImagesData);
});

test("filter list data based on search string", () => {
  expect(getFilteredMyList("Value", MyListDetailsData)).toStrictEqual(ExpectedMyListDetailData);
});

test("test consolidate images list of my lists array", () => {
  expect(consolidateMyListImages(fetchMyListImages(MyListsData), MyListsData)).toStrictEqual(ExpectConsolidatedMyListData);
});

test("get order delivery date of given product", () => {
  const todayStr = moment().format("ddd DD-MM-YYYY").toString();
  const dayAfter5Days = moment().add(5, "days").format("ddd DD-MM-YYYY").toString();
  expect(getOrderDeliverDate(InStockProduct)).toEqual(todayStr);
  expect(getOrderDeliverDate(OutOfStockProduct)).toEqual(dayAfter5Days);
});

test("test stock quantity of product", () => {
  expect(findStockQuantityForHybris("3537578", SampleCartData)).toEqual("5");
});

test("test stock price of product", () => {
  expect(findPricesForHybris("3537578", SampleCartData)).toEqual("78.24");
});

test("test section name and time", () => {
  expect(getSectionNameAndTime({ sendDateUtc: "2021-09-10T10:05:00+0500" })).toEqual({
    date: "10 September",
    time: moment(moment("2021-09-10T10:05:00+0500")).format("hh:mm A"),
  });
});

// test("test parsing notification Object", () => {
//   expect(parseInboxMessages(NotitficationsArr)).toEqual(SampleNotificationExpectObject);
// });

test("test selected stc account id", () => {
  const selAccount = getSTCSelectedTradeAccount({
    stc: {},
    stcConnectTrade: {},
  });
  expect(selAccount).toEqual("");
});

test("test stock quantity for sku", () => {
  const selAccount = findStockAvailabilityForSku(2800027, stockQuantityObj);
  expect(selAccount).toEqual("Stock Available");
});

test("test get filter image params", () => {
  const { name, desc } = getFilterImageParams("Delivery");
  expect(name).toEqual("Standard delivery");
  expect(desc).toEqual("2-5 days");
});

const fulfilmentPageParams = {
  step: 3,
  orderType: "standard-delivery",
  props: {
    digitalId: "auth0|5eaba1a211555f0baff802fd",
    selectedAccountId: "362HADAA",
    deliveryRegion: "",
    deliveryPostcode: "",
    cartDetail: {
      appliedOrderPromotions: [],
      appliedProductPromotions: [],
      appliedVouchers: [],
      calculated: true,
      entries: [
        {
          availableForPickup: true,
          basePrice: {
            currencyIso: "NZD",
            formattedValue: "$0.77",
            priceType: "BUY",
            value: 0.77,
          },
          configurationInfos: [],
          decimalQty: 7,
          deliveryOrder: true,
          entryNumber: 0,
          product: {
            availableForPickup: true,
            baseOptions: [],
            categories: [],
            code: "4508305",
            configurable: false,
            description:
              "The Bremick M12 Square Washer is designed for use in applications with any nuts, bolts and screw products. It measures 50 mm x 3 mm. This washer helps to prevent a nut or bolt head from pulling through the material. Washer with a hole in the centre can be used as a spacer.It features galvanised steel construction for long lasting durability and superior corrosion resistance. This washer is suitable for use in exterior applications including coastal zones. It helps to minimise the surface damage of the work material.",
            expressOrder: true,
            hasNoQuantity: 0,
            manufacturer: "BREMICK",
            name: "Bremick Flat Square Washer M12 x 50 x 3mm Galvanised WSQMG125036",
            price: {
              currencyIso: "NZD",
              formattedValue: "$0.77",
              priceType: "BUY",
              value: 0.77,
            },
            purchasable: true,
            sellOrderMultiple: 0,
            stock: {
              pmStockQuantity: "548",
              statusCode: "1",
              stockLevelStatus: "inStock",
            },
            timberProductFlag: false,
            unitCode: "EA",
            uomFormat: "11",
            url: "/c/Bremick-Flat-Square-Washer-M12-x-50-x-3mm-Galvanised-WSQMG125036/p/4508305",
          },
          quantity: 1,
          totalPrice: {
            currencyIso: "NZD",
            formattedValue: "$5.39",
            priceType: "BUY",
            value: 5.39,
          },
          unit: "EA",
          updateable: true,
        },
      ],
      orderDiscounts: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
      pickupItemsQuantity: 0,
      pickupOrderGroups: [],
      productDiscounts: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
      subTotal: {
        currencyIso: "NZD",
        formattedValue: "$5.39",
        priceType: "BUY",
        value: 5.39,
      },
      totalDiscounts: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
      totalItems: 1,
      totalPrice: {
        currencyIso: "NZD",
        formattedValue: "$5.39",
        priceType: "BUY",
        value: 5.39,
      },
      totalPriceWithTax: {
        currencyIso: "NZD",
        formattedValue: "$5.39",
        priceType: "BUY",
        value: 5.39,
      },
      totalTax: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
    },
  },
  location: "Waikato and BOP, Bay of Plenty",
  storeName: "Thames",
};

const fulfilmentpageAnalyticsObj = {
  step: 3,
  feature_type: "checkout flow",
  location: "Waikato and BOP, Bay of Plenty",
  storeName: "Thames",
  device_type: Platform.OS,
  fulfillment: "Delivery",
  deliveryRegion: "",
  deliveryPostcode: "",
  deliveryType: "",
  onSiteLift: "",
  onSiteHazards: "",
  restrictedAccess: "",
  orderNumber: "",
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
      quantity: 7,
    },
  ],
};

test("test object created to be logged in firebase analytics on fulfilment page", () => {
  expect(getFulfilmentpageAnalyticsObj(fulfilmentPageParams)).toEqual(fulfilmentpageAnalyticsObj);
});

const orderReviewSampleParams = {
  step: 4,
  props: {
    isPromoApplied: false,
    digitalId: "auth0|5eaba1a211555f0baff802fd",
    selectedAccountId: "362HADAA",
    selectedAddress: "Auckland Road, St Heliers, Auckland, 1071",
    email: "srilatha.thatikonda@fbu.com",
    orderType: "Delivery",
    phone: "642108624454",
    cartDetailData: {
      type: "cartWsDTO",
      appliedOrderPromotions: [],
      appliedProductPromotions: [],
      appliedVouchers: [],
      calculated: true,
      code: "01120025",
      deliveryItemsQuantity: 1,
      deliveryOrderGroups: [
        {
          entries: [
            {
              availableForPickup: true,
              basePrice: {
                currencyIso: "NZD",
                formattedValue: "$0.77",
                priceType: "BUY",
                value: 0.77,
              },
              configurationInfos: [],
              decimalQty: 7,
              deliveryOrder: true,
              entryNumber: 0,
              product: {
                availableForPickup: true,
                baseOptions: [],
                categories: [],
                code: "4508305",
                configurable: false,
                description:
                  "The Bremick M12 Square Washer is designed for use in applications with any nuts, bolts and screw products. It measures 50 mm x 3 mm. This washer helps to prevent a nut or bolt head from pulling through the material. Washer with a hole in the centre can be used as a spacer.It features galvanised steel construction for long lasting durability and superior corrosion resistance. This washer is suitable for use in exterior applications including coastal zones. It helps to minimise the surface damage of the work material.",
                expressOrder: true,
                hasNoQuantity: 0,
                manufacturer: "BREMICK",
                name: "Bremick Flat Square Washer M12 x 50 x 3mm Galvanised WSQMG125036",
                price: {
                  currencyIso: "NZD",
                  formattedValue: "$0.77",
                  priceType: "BUY",
                  value: 0.77,
                },
                purchasable: true,
                sellOrderMultiple: 0,
                stock: {
                  pmStockQuantity: "548",
                  statusCode: "1",
                  stockLevelStatus: "inStock",
                },
                timberProductFlag: false,
                unitCode: "EA",
                uomFormat: "11",
                url: "/c/Bremick-Flat-Square-Washer-M12-x-50-x-3mm-Galvanised-WSQMG125036/p/4508305",
              },
              quantity: 1,
              totalPrice: {
                currencyIso: "NZD",
                formattedValue: "$5.39",
                priceType: "BUY",
                value: 5.39,
              },
              unit: "EA",
              updateable: true,
            },
          ],
          totalPriceWithTax: {
            currencyIso: "NZD",
            formattedValue: "$5.39",
            priceType: "BUY",
            value: 5.39,
          },
        },
      ],
      entries: [
        {
          availableForPickup: true,
          basePrice: {
            currencyIso: "NZD",
            formattedValue: "$0.77",
            priceType: "BUY",
            value: 0.77,
          },
          configurationInfos: [],
          decimalQty: 7,
          deliveryOrder: true,
          entryNumber: 0,
          product: {
            availableForPickup: true,
            baseOptions: [],
            categories: [],
            code: "4508305",
            configurable: false,
            description:
              "The Bremick M12 Square Washer is designed for use in applications with any nuts, bolts and screw products. It measures 50 mm x 3 mm. This washer helps to prevent a nut or bolt head from pulling through the material. Washer with a hole in the centre can be used as a spacer.It features galvanised steel construction for long lasting durability and superior corrosion resistance. This washer is suitable for use in exterior applications including coastal zones. It helps to minimise the surface damage of the work material.",
            expressOrder: true,
            hasNoQuantity: 0,
            manufacturer: "BREMICK",
            name: "Bremick Flat Square Washer M12 x 50 x 3mm Galvanised WSQMG125036",
            price: {
              currencyIso: "NZD",
              formattedValue: "$0.77",
              priceType: "BUY",
              value: 0.77,
            },
            purchasable: true,
            sellOrderMultiple: 0,
            stock: {
              pmStockQuantity: "548",
              statusCode: "1",
              stockLevelStatus: "inStock",
            },
            timberProductFlag: false,
            unitCode: "EA",
            uomFormat: "11",
            url: "/c/Bremick-Flat-Square-Washer-M12-x-50-x-3mm-Galvanised-WSQMG125036/p/4508305",
          },
          quantity: 1,
          totalPrice: {
            currencyIso: "NZD",
            formattedValue: "$5.39",
            priceType: "BUY",
            value: 5.39,
          },
          unit: "EA",
          updateable: true,
        },
      ],
      orderDiscounts: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
      pickupItemsQuantity: 0,
      productDiscounts: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
      site: "placemakers",
      store: "placemakers",
      subTotal: {
        currencyIso: "NZD",
        formattedValue: "$5.39",
        priceType: "BUY",
        value: 5.39,
      },
      totalDiscounts: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
      totalItems: 1,
      totalPrice: {
        currencyIso: "NZD",
        formattedValue: "$5.39",
        priceType: "BUY",
        value: 5.39,
      },
      totalPriceWithTax: {
        currencyIso: "NZD",
        formattedValue: "$5.39",
        priceType: "BUY",
        value: 5.39,
      },
      totalTax: {
        currencyIso: "NZD",
        formattedValue: "$0.00",
        priceType: "BUY",
        value: 0,
      },
    },
  },
  location: "24.905975, 67.112667984654",
  storeName: "Thames",
};

const orderReviewAnalyticsObj = {
  step: 4,
  feature_type: "checkout flow",
  location: "24.905975, 67.112667984654",
  storeName: "Thames",
  device_type: Platform.OS,
  fulfillment: "Delivery",
  deliveryRegion: "",
  deliveryPostcode: "",
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
      quantity: 7,
    },
  ],
};

//
test("test object created to be logged in firebase analytics on order review page", () => {
  expect(getOrderReviewAnalyticsObj(orderReviewSampleParams)).toEqual(orderReviewAnalyticsObj);
});

test("test function getRegionFromSelectedAddress", () => {
  expect(getRegionFromSelectedAddress("Auckland Road, St Heliers, Auckland, 1071")).toEqual("Auckland");
});

test("test function getPostalCodeFromSelectedAddress", () => {
  expect(getPostalCodeFromSelectedAddress("Auckland Road, St Heliers, Auckland, 1071")).toEqual("1071");
});

test("get selected Account id", () => {
  expect(getSelectedAccountId(SampleAccountsData)).toBe("362NNDLA004");
  expect(getSelectedAccountId(SampleAccountsData1)).toBe("362NNDLA004");
});

test("get Team Management analytics object for firebase", () => {
  expect(getTeamMemberAdditionEditObject(teamMemberInputParams)).toEqual(teamMemberReturnedObject);
});

test("get Product Detail analytics object for firebase", () => {
  expect(getProductDetailViewObject(productDetailInputParams)).toEqual(productDetailReturnedObject);
});

test("get Product select analytics object for firebase", () => {
  expect(getProductDetailViewObject(productSelectInputParams)).toEqual(productSelectReturnedObject);
});

test("get Product list view analytics object for firebase", () => {
  expect(getProductListCategoryViewObject(productListViewInputParams)).toEqual(productListViewReturnedObject);
});

test("get Product list Search analytics object for firebase", () => {
  expect(getProductListSearchObject(productListSearchInputParams)).toEqual(productListSearchReturnedObject);
});

test("get My List analytics object for firebase", () => {
  expect(getMyListViewObject(myListInputParams)).toEqual(myListReturnedObject);
});

test("get Remove Item from Cart analytics object for firebase", () => {
  expect(getRemoveFromCartObject(cartItemInputParams)).toEqual(cartItemReturnedObject);
  expect(getRemoveFromCartObject(cartItemInputParams1)).toEqual(cartItemReturnedObject);
});

const allPageEventParam = {
  userType: "Returning",
  digitalId: "auth0|5fb1b8465088f80075cd2192",
  selectedAccountId: "362ANTGA",
  email: "shashika.abeysuriya@fbu.com",
  cartDetailData: {
    totalPrice: {
      currencyIso: "NZD",
      formattedValue: "$1.54",
      priceType: "BUY",
      value: 1.54,
    },
  },
  storeName: "Thames",
  location: "Waikato and BOP, Bay of Plenty",
  timestamp: 1620112309282,
};

const allPageEventReturnedObject = {
  userId: "auth0|5fb1b8465088f80075cd2192",
  accountId: "362ANTGA",
  timestamp: 1620112309282,
  step: 1,
  location: "Waikato and BOP, Bay of Plenty",
  device_type: "ios",
  u1: "shashika.abeysuriya",
  u2: "fbu.com",
  u3: "08ad3389d5978ef528dfdf2bf08bbc8d",
  userType: "Returning",
  loginStatus: "login",
  storeName: "Thames",
  currency: "NZD",
};

test("test object created to be logged in firebase analytics on allPageEvent (all screen transition events)", () => {
  expect(getAllPagesAnalyticsObj(allPageEventParam)).toEqual(allPageEventReturnedObject);
});

const testData = {
  uid: "mobileLandingPage",
  uuid: "eyJpdGVtSWQiOiJtb2JpbGVMYW5kaW5nUGFnZSIsImNhdGFsb2dJZCI6InBsYWNlbWFrZXJzQ29udGVudENhdGFsb2ciLCJjYXRhbG9nVmVyc2lvbiI6Ik9ubGluZSJ9",
  title: "TradeApp Landing Page",
  template: "TradeAppLandingPageTemplate",
  typeCode: "ContentPage",
  name: "Mobile Landing Page",
  contentSlots: {
    contentSlot: [
      {
        slotId: "PMCategoryTilesSlot1",
        slotUuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZXNTbG90MSIsImNhdGFsb2dJZCI6InBsYWNlbWFrZXJzQ29udGVudENhdGFsb2ciLCJjYXRhbG9nVmVyc2lvbiI6Ik9ubGluZSJ9",
        position: "PMCategoryTiles1",
        name: "PMCategory Tiles Slot1",
        slotShared: false,
        components: {
          component: [
            {
              uid: "PMCategoryTile1",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTEiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.882+12:00",
              name: "PM Category Tile 1",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile1.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
                },
              },
              categoryName: "Kitchen",
              urlLink: "c/",
              categoryDescription: "Kitchen",
            },
            {
              uid: "PMCategoryTile2",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTIiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.591+12:00",
              name: "PM Category Tile 2",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile2.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
                },
              },
              categoryName: "Bathrooms",
              urlLink: "c/",
              categoryDescription: "Bathrooms",
            },
            {
              uid: "PMCategoryTile3",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTMiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.864+12:00",
              name: "PM Category Tile 3",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile1.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
                },
              },
              categoryName: "Kitchen",
              urlLink: "c/",
              categoryDescription: "Kitchen",
            },
            {
              uid: "PMCategoryTile4",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTQiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.436+12:00",
              name: "PM Category Tile 4",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile2.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
                },
              },
              categoryName: "Bathrooms",
              urlLink: "c/",
              categoryDescription: "Bathrooms",
            },
            {
              uid: "PMCategoryTile5",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTUiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.894+12:00",
              name: "PM Category Tile 5",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile1.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
                },
              },
              categoryName: "Kitchen",
              urlLink: "c/",
              categoryDescription: "Kitchen",
            },
            {
              uid: "PMCategoryTile6",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTYiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.592+12:00",
              name: "PM Category Tile 6",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile2.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
                },
              },
              categoryName: "Bathrooms",
              urlLink: "c/",
              categoryDescription: "Bathrooms",
            },
            {
              uid: "PMCategoryTile7",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTciLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.865+12:00",
              name: "PM Category Tile 7",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile1.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
                },
              },
              categoryName: "Kitchen",
              urlLink: "c/",
              categoryDescription: "Kitchen",
            },
            {
              uid: "PMCategoryTile8",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTgiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-06-17T20:26:32.512+12:00",
              name: "PM Category Tile 8",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile2.jpg",
                  mime: "image/jpeg",
                  url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
                },
              },
              categoryName: "Bathrooms",
              urlLink: "c/",
              categoryDescription: "Bathrooms",
            },
          ],
        },
      },
      {
        slotId: "PMCategoryTilesSlot2",
        slotUuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZXNTbG90MiIsImNhdGFsb2dJZCI6InBsYWNlbWFrZXJzQ29udGVudENhdGFsb2ciLCJjYXRhbG9nVmVyc2lvbiI6Ik9ubGluZSJ9",
        position: "PMCategoryTiles2",
        name: "PMCategory Tiles Slot2",
        slotShared: false,
        components: {
          component: [
            {
              uid: "PMCategoryTile9",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTkiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-07-07T18:10:23.345+12:00",
              name: "PM Category Tile 9",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile1.jpg",
                  mime: "image/jpeg",
                  url: "/medias/sys_master/images/h81/hca/8968420163614/PMCategoryTile1/PMCategoryTile1.jpg",
                },
              },
              categoryName: "Kitchen",
              urlLink: "c/",
              categoryDescription: "Kitchen",
            },
            {
              uid: "PMCategoryTile10",
              uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTEwIiwiY2F0YWxvZ0lkIjoicGxhY2VtYWtlcnNDb250ZW50Q2F0YWxvZyIsImNhdGFsb2dWZXJzaW9uIjoiT25saW5lIn0=",
              typeCode: "PMCategoryComponent",
              modifiedTime: "2021-07-07T18:10:23.343+12:00",
              name: "PM Category Tile 10",
              container: "false",
              media: {
                widescreen: {
                  code: "PMCategoryTile2.jpg",
                  mime: "image/jpeg",
                  url: "/medias/sys_master/images/hd8/hca/8968420196382/PMCategoryTile2/PMCategoryTile2.jpg",
                },
              },
              categoryName: "Bathrooms",
              urlLink: "c/",
              categoryDescription: "Bathrooms",
            },
          ],
        },
      },
    ],
  },
  label: "mobileLandingPage",
};

const rootCategories = [
  {
    uid: "PMCategoryTile1",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTEiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.882+12:00",
    name: "PM Category Tile 1",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile1.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
      },
    },
    categoryName: "Kitchen",
    urlLink: "c/",
    categoryDescription: "Kitchen",
  },
  {
    uid: "PMCategoryTile2",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTIiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.591+12:00",
    name: "PM Category Tile 2",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile2.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
      },
    },
    categoryName: "Bathrooms",
    urlLink: "c/",
    categoryDescription: "Bathrooms",
  },
  {
    uid: "PMCategoryTile3",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTMiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.864+12:00",
    name: "PM Category Tile 3",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile1.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
      },
    },
    categoryName: "Kitchen",
    urlLink: "c/",
    categoryDescription: "Kitchen",
  },
  {
    uid: "PMCategoryTile4",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTQiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.436+12:00",
    name: "PM Category Tile 4",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile2.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
      },
    },
    categoryName: "Bathrooms",
    urlLink: "c/",
    categoryDescription: "Bathrooms",
  },
  {
    uid: "PMCategoryTile5",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTUiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.894+12:00",
    name: "PM Category Tile 5",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile1.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
      },
    },
    categoryName: "Kitchen",
    urlLink: "c/",
    categoryDescription: "Kitchen",
  },
  {
    uid: "PMCategoryTile6",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTYiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.592+12:00",
    name: "PM Category Tile 6",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile2.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
      },
    },
    categoryName: "Bathrooms",
    urlLink: "c/",
    categoryDescription: "Bathrooms",
  },
  {
    uid: "PMCategoryTile7",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTciLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.865+12:00",
    name: "PM Category Tile 7",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile1.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile1.jpg?context=bWFzdGVyfGltYWdlc3wzNzMzMXxpbWFnZS9qcGVnfGg4MS9oY2EvODk2ODQyMDE2MzYxNC9QTUNhdGVnb3J5VGlsZTEuanBnfGNhZThlM2E1MDYzNGM4MmVhNjk2ODAxZTkxMmRhOGUwZDg5MDAwYWZmOTExOTc3NmU0ZjEyNGU5YmM2OWMxYmI",
      },
    },
    categoryName: "Kitchen",
    urlLink: "c/",
    categoryDescription: "Kitchen",
  },
  {
    uid: "PMCategoryTile8",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTgiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-06-17T20:26:32.512+12:00",
    name: "PM Category Tile 8",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile2.jpg",
        mime: "image/jpeg",
        url: "/medias/PMCategoryTile2.jpg?context=bWFzdGVyfGltYWdlc3wxMjAyNzh8aW1hZ2UvanBlZ3xoZDgvaGNhLzg5Njg0MjAxOTYzODIvUE1DYXRlZ29yeVRpbGUyLmpwZ3wwYmFkMGQ3N2JkOWQ3ZWYxNjJiMDY2MmY5OTJkMTQ5MmViNzg5NzM2NTI0OTNiYmJlMzcyMmQ2MmE3YjYwMjBm",
      },
    },
    categoryName: "Bathrooms",
    urlLink: "c/",
    categoryDescription: "Bathrooms",
  },
];

test("getPMCategoriesTileSlot function should work as expected.", () => {
  expect(getPMCategoriesTileSlot(testData)).toEqual(rootCategories);
});

const moreRootCategories = [
  {
    uid: "PMCategoryTile9",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTkiLCJjYXRhbG9nSWQiOiJwbGFjZW1ha2Vyc0NvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-07-07T18:10:23.345+12:00",
    name: "PM Category Tile 9",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile1.jpg",
        mime: "image/jpeg",
        url: "/medias/sys_master/images/h81/hca/8968420163614/PMCategoryTile1/PMCategoryTile1.jpg",
      },
    },
    categoryName: "Kitchen",
    urlLink: "c/",
    categoryDescription: "Kitchen",
  },
  {
    uid: "PMCategoryTile10",
    uuid: "eyJpdGVtSWQiOiJQTUNhdGVnb3J5VGlsZTEwIiwiY2F0YWxvZ0lkIjoicGxhY2VtYWtlcnNDb250ZW50Q2F0YWxvZyIsImNhdGFsb2dWZXJzaW9uIjoiT25saW5lIn0=",
    typeCode: "PMCategoryComponent",
    modifiedTime: "2021-07-07T18:10:23.343+12:00",
    name: "PM Category Tile 10",
    container: "false",
    media: {
      widescreen: {
        code: "PMCategoryTile2.jpg",
        mime: "image/jpeg",
        url: "/medias/sys_master/images/hd8/hca/8968420196382/PMCategoryTile2/PMCategoryTile2.jpg",
      },
    },
    categoryName: "Bathrooms",
    urlLink: "c/",
    categoryDescription: "Bathrooms",
  },
];

test("getPMMoreCategoriesTileSlot function should work as expected.", () => {
  expect(getPMMoreCategoriesTileSlot(testData)).toEqual(moreRootCategories);
});

const suggestionsData = {
  category: [
    {
      name: "Specialist Board",
      value: "WBC11P1",
    },
    {
      name: "Standard Board",
      value: "WBC11Q1",
    },
  ],
  suggestions: [
    {
      value: "gib standard",
    },
    {
      value: "gib aqualine",
    },
    {
      value: "gib glue",
    },
    {
      value: "gib screws",
    },
    {
      value: "gib cove",
    },
    {
      value: "gib braceline",
    },
    {
      value: "gib wideline",
    },
    {
      value: "gib screws collated",
    },
    {
      value: "10 mm gib",
    },
    {
      value: "13 mm gib",
    },
  ],
};

const expectedAllSuggestions = [
  {
    isCategory: false,
    name: "gib standard",
    value: "gib standard",
  },
  {
    isCategory: false,
    name: "gib aqualine",
    value: "gib aqualine",
  },
  {
    isCategory: false,
    name: "gib glue",
    value: "gib glue",
  },
  {
    isCategory: false,
    name: "gib screws",
    value: "gib screws",
  },
  {
    isCategory: true,
    name: "Specialist Board",
    value: "WBC11P1",
  },
  {
    isCategory: true,
    name: "Standard Board",
    value: "WBC11Q1",
  },
];

const expectedSuggestions = [
  {
    isCategory: false,
    name: "gib standard",
    value: "gib standard",
  },
  {
    isCategory: false,
    name: "gib aqualine",
    value: "gib aqualine",
  },
  {
    isCategory: false,
    name: "gib glue",
    value: "gib glue",
  },
  {
    isCategory: false,
    name: "gib screws",
    value: "gib screws",
  },
  {
    isCategory: false,
    name: "gib cove",
    value: "gib cove",
  },
  {
    isCategory: false,
    name: "gib braceline",
    value: "gib braceline",
  },
  {
    isCategory: false,
    name: "gib wideline",
    value: "gib wideline",
  },
  {
    isCategory: false,
    name: "gib screws collated",
    value: "gib screws collated",
  },
  {
    isCategory: false,
    name: "10 mm gib",
    value: "10 mm gib",
  },
  {
    isCategory: false,
    name: "13 mm gib",
    value: "13 mm gib",
  },
];
test("getSanitizedListOfAllSuggestions function should work as expected.", () => {
  expect(getSanitizedListOfAllSuggestions(suggestionsData)).toEqual(expectedAllSuggestions);
});

test("getSanitizedListOfSuggestions function should work as expected.", () => {
  expect(getSanitizedListOfSuggestions(suggestionsData)).toEqual(expectedSuggestions);
});

const cartDetailEntryFalse = {
  entries: [
    {
      product: {
        specialProduct: false,
      },
    },
  ],
};
const cartDetailEntryTrue = {
  entries: [
    {
      product: {
        specialProduct: true,
      },
    },
  ],
};

test("check the availability of special products.", () => {
  expect(checkSpecialProductsAvailability(cartDetailEntryFalse.entries)).toBeFalsy();
  expect(checkSpecialProductsAvailability(cartDetailEntryTrue.entries)).toBeTruthy();
});

test("check for valid url of glympseURL", () => {
  expect(isValidURL("https://glympse.com/0PB3-WR2W")).toBeTruthy();
  expect(isValidURL("http://glympse.com/0PB3-WR2W")).toBeTruthy();
  expect(isValidURL("www.glympse.com/0PB3WR2W")).toBeTruthy();
  expect(isValidURL("")).toBeFalsy();
  expect(isValidURL(undefined)).toBeFalsy();
});

const orderDataTest1 = {
  fulfilmentType: "Delivery",
  status: "ON IT'S WAY",
  original: {
    trackingDetails: {
      trackingURL: "https://glympse.com/0PB3-WR2W",
    },
  },
};

const orderDataTest2 = {
  fulfilmentType: "Pickup",
  status: "ON IT'S WAY",
  original: {
    trackingDetails: {
      trackingURL: "https://glympse.com/0PB3-WR2W",
    },
  },
};

const orderDataTest3 = {
  fulfilmentType: "Delivery",
  status: "ORDER CONFIRMED",
  original: {
    trackingDetails: {
      trackingURL: "https://glympse.com/0PB3-WR2W",
    },
  },
};

const orderDataTest4 = {
  fulfilmentType: "Delivery",
  status: "ON IT'S WAY",
  original: {
    trackingDetails: {
      trackingURL: "",
    },
  },
};

const orderDataTest5 = {
  fulfilmentType: "Delivery",
  status: "ON IT'S WAY",
  original: {
    trackingDetails: {},
  },
};
const orderDataTest6 = {
  fulfilmentType: "Delivery",
  status: "ON IT'S WAY",
  original: {},
};
const regestrationDataObject1 = {
  step: 8,
  step_label: "Trade Account Connect Page Load",
  userId: "",
  accountId: "",
  location: "",
};
const regestrationDataObject2 = {
  step: 9,
  step_label: "Trade Account Connect Submit",
  userId: "",
  accountId: "",
  location: "",
};
const regestrationDataObject3 = {
  step: 9,
  step_label: "Trade Account Connect Submit",
  userId: "",
  accountId: "234432",
  location: "Dunedin",
};
const userLoginDataObject = {
  userId: "auth0|614d0422d15d710070782445",
  accountId: "150JENCA",
  accountIdLinked: "150JENCA",
  location: "Waikato and BOP, Bay of Plenty",
  device_type: "ios",
  delegated_member: "Admin",
  delegated_permissions: {
    viewOrderGroup: false,
    placeOrderGroup: false,
    restrictPriceGroup: false,
    accountAdminGroup: true,
    accountOwnerGroup: false,
    viewEstimatesGroup: false,
    tempAccess: {
      endDate: "2031-08-04T13:47:07+0000",
      startDate: "2021-08-04T13:47:07+0000",
    },
    creditLimit: false,
  },
};
const shortPermissionKeys = {
  viewOrderGroup: true,
  placeOrderGroup: true,
  restrictPriceGroup: false,
  accountAdminGroup: false,
  accountOwnerGroup: false,
  viewEstimatesGroup: true,
  tempAccess: false,
  creditLimit: false,
};
test("check for glymseURL is eligible based on order type", () => {
  expect(isTrackingEligible(orderDataTest1)).toBeTruthy();
  expect(isTrackingEligible(orderDataTest2)).toBeFalsy();
  expect(isTrackingEligible(orderDataTest3)).toBeFalsy();
  expect(isTrackingEligible(orderDataTest4)).toBeFalsy();
  expect(isTrackingEligible(orderDataTest5)).toBeFalsy();
  expect(isTrackingEligible(orderDataTest6)).toBeFalsy();
  expect(isTrackingEligible(undefined)).toBeFalsy();
});
test("check for registration analytics", () => {
  expect(getRegistrationFlowAnalyticsObj(regestrationDataObject1)).toBeTruthy();
  expect(getRegistrationFlowAnalyticsObj(regestrationDataObject2)).toBeTruthy();
  expect(getRegistrationFlowAnalyticsObj(regestrationDataObject3)).toBeTruthy();
});
test("check for user login analytics", () => {
  expect(getLoginAnalyticsObj(userLoginDataObject)).toBeTruthy();
});
test("check for permissions short keys", () => {
  expect(getShortPermissionsString(shortPermissionKeys)).toBe(
    "vOrder:true|pOrder:true|vPrice:false|admin:false|owner:false|vJob:true|tmpAcces:false|pLimit:false",
  );
});

test("getTruncatedListNames function should work as expected", () => {
  expect(getTruncatedListNames(require("../../Fixtures/MyLists.json"))).toBe(
    "!New|&&&|&&&&|...|0. Deepak Upload no loads SKUs ssss|000|00000|0abc|123|Crash23567|Ddd|ddddddddddd2",
  );
});

test("getFileNameWithoutExtension function should work as expected", () => {
  expect(getFileNameWithoutExtension("Image.png")).toBe("Image");
  expect(getFileNameWithoutExtension("Image.test.jpg")).toBe("Image.test");
  expect(getFileNameWithoutExtension("PDFFile.pdf")).toBe("PDFFile");
  expect(getFileNameWithoutExtension("presentation.pptx")).toBe("presentation");
  expect(getFileNameWithoutExtension("")).toBe("");
});

const userAccountLinkDataObject1 = {
  event: "account_link",
  step: 1,
  userId: "auth0|5eaba06711555f0baff7fc90",
  accountId: "362ADITA",
  accountIdLinked: "362ADITA",
  branch: "Thames",
  branchId: "P362",
  location: "Waikato and BOP, Bay of Plenty",
  device_type: "ios",
};
const userAccountLinkDataObject2 = {
  event: "account_link",
  step: 2,
  userId: "auth0|5eaba06711555f0baff7fc90",
  accountId: "362ADITA",
  accountIdLinked: "362ADITA",
  branch: "Thames",
  branchId: "P362",
  location: "",
  device_type: "ios",
};

test("check for account link analytics", () => {
  expect(getAccountLinkAnalyticsObj(userAccountLinkDataObject1)).toBeTruthy();
  expect(getAccountLinkAnalyticsObj(userAccountLinkDataObject2)).toBeTruthy();
});

const specialOrderObject = {
  code: "1015262",
  configurable: true,
  display: "SPECIAL",
  expressOrder: false,
  hasAlternateProducts: false,
  hasNoQuantity: 0,
  hasRelatedProducts: true,
  images: [],
  kitProductFlag: false,
  multidimensional: false,
  name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
  numberOfReviews: 0,
  perpetualFlag: false,
  pmExclusive: true,
  specialProdWithAlphaSkuFlag: true,
};

const specialOrderObject1 = {
  code: "1015262",
  configurable: true,
  display: "",
  expressOrder: false,
  hasAlternateProducts: false,
  hasNoQuantity: 0,
  hasRelatedProducts: true,
  images: [],
  kitProductFlag: false,
  multidimensional: false,
  name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
  numberOfReviews: 0,
  perpetualFlag: false,
  pmExclusive: true,
  specialProdWithAlphaSkuFlag: false,
};

const specialOrderObject2 = {
  code: "1015262",
  configurable: true,
  display: "",
  expressOrder: false,
  hasAlternateProducts: false,
  hasNoQuantity: 0,
  hasRelatedProducts: true,
  images: [],
  kitProductFlag: false,
  multidimensional: false,
  name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
  numberOfReviews: 0,
  perpetualFlag: false,
  pmExclusive: true,
  specialProdWithAlphaSkuFlag: true,
};

const specialOrderObject3 = {
  code: "1015262",
  configurable: true,
  display: "SPECIAL",
  expressOrder: false,
  hasAlternateProducts: false,
  hasNoQuantity: 0,
  hasRelatedProducts: true,
  images: [],
  kitProductFlag: false,
  multidimensional: false,
  name: "100 X 50 (90X45) RAD SG8 H1.2 PLANER GAUGED KD 6.0M",
  numberOfReviews: 0,
  perpetualFlag: false,
  pmExclusive: true,
  specialProdWithAlphaSkuFlag: false,
};

test("check for special order display status", () => {
  expect(SpecialProductStatus(specialOrderObject)).toBeTruthy();
  expect(SpecialProductStatus(specialOrderObject1)).toBeFalsy();
  expect(SpecialProductStatus(specialOrderObject2)).toBeTruthy();
  expect(SpecialProductStatus(specialOrderObject3)).toBeTruthy();
  expect(SpecialProductStatus(null)).toBeFalsy();
  expect(SpecialProductStatus(undefined)).toBeFalsy();
});
