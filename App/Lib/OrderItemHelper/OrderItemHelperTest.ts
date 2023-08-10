import R from "ramda";
import { curryMomentFormat } from "~root/Lib/CommonHelper";
import { getFulfilmentBranchIdOnOrderDetail } from "~root/Lib/DataHelper";
import OrderItemHelper, {
  getCollectionDetials,
  getDeliveryText,
  getEstimatedDeliveryDate,
  getHeaderText,
  getHeaderTextForItems,
  getOrderMessage,
  getSupplier,
  getSupplierObjects,
  hasDirectSupplyMessage,
  isDirectSupplier,
  isSupplierObjectNotNil,
} from "~root/Lib/OrderItemHelper";
import { HeaderMessage, OrderData, OrdersList, OriginalResponse, SampleCollection } from "~root/Lib/SampleResponses";
import { Colors } from "~root/Themes";

test("get expected header text on order detail summary page", () => {
  expect(getHeaderText(OrderData)).toBe("Collect (includes special items from supplier)");
  expect(getHeaderText(R.assocPath(["headerDetails", "isDelivered"], true, OrderData))).toBe(curryMomentFormat("lll", OrderData.requestDate));
  expect(getHeaderText(R.assocPath(["headerDetails", "isEstimated"], true, OrderData))).toBe(getEstimatedDeliveryDate(OrderData));
});
test("get color of the header text according to the type of delivery", () => {
  expect(new OrderItemHelper(OrderData.status, OrderData.fulfilmentType).getColor()).toBe(Colors.tickGreen);
  expect(new OrderItemHelper(OrderData.status, R.assoc("fulfilmentType", "Delivery", OrderData).fulfilmentType).getColor()).toBe(Colors.lightBlue);
});
test("get icon of the header text according to the status of the order", () => {
  expect(new OrderItemHelper(OrderData.status).getIcon()).toBe("ic_picking");
  expect(new OrderItemHelper(R.assoc("status", "PICKED, READY FOR DELIVERY", OrderData).status).getIcon()).toBe("ic_ontruck_copy");
});
test("returns expected header text according to the delivery type", () => {
  expect(getDeliveryText(R.assoc("deliveryType", "Standard Delivery", HeaderMessage))).toBe("Standard Delivery");
  expect(getDeliveryText(R.assoc("directShip", "Y", R.assoc("supplierDirectMessage", "Delivery (Direct From Supplier)", HeaderMessage)))).toBe(
    "Delivery (Direct From Supplier)",
  );
  expect(getDeliveryText(HeaderMessage)).toBe("Collect");
  expect(getDeliveryText(R.assoc("fulfilmentType", "Delivery", HeaderMessage))).toBe("");
});
test("returns boolean value if supplier message is present or not", () => {
  expect(hasDirectSupplyMessage(HeaderMessage)).toBe(false);
  expect(hasDirectSupplyMessage(R.assoc("supplierDirectMessage", "Message", HeaderMessage))).toBe(true);
});
test("returns supplier details if available, undefined otherwise", () => {
  expect(R.map(getSupplier, OrdersList)).toBeTruthy();
  expect(getSupplier(OrdersList)).toBeFalsy();
  expect(
    R.map(
      getSupplier,
      R.set(
        R.lensIndex(0),
        R.assoc(
          "orderLines",
          R.init(R.map(R.assocPath(["supplier", "supplierName"], ""), R.flatten(R.map(R.prop("orderLines"), OrdersList)))),
          R.head(OrdersList),
        ),
        OrdersList,
      ),
    ),
  ).toStrictEqual([undefined, undefined]);
});
test("returns supplier name in case order is direct supply false otherwise", () => {
  expect(isDirectSupplier(OriginalResponse)).toBe(false);
  expect(isDirectSupplier(R.assocPath(["orderLines", "supplier", "supplierName"], "Henry", OriginalResponse))).toBe(false);
  expect(isDirectSupplier(R.assoc("directShip", "Y", R.assocPath(["orderLines", "supplier", "supplierName"], "Henry", OriginalResponse)))).toBe(true);
});
test("get header text on order items", () => {
  expect(getHeaderTextForItems(OrderData)).toBe("");
  expect(getHeaderTextForItems(R.assocPath(["headerDetails", "isDelivered"], true, OrderData))).toBe(curryMomentFormat("lll", OrderData.requestDate));
  expect(getHeaderTextForItems(R.assocPath(["headerDetails", "isEstimated"], true, OrderData))).toBe(getEstimatedDeliveryDate(OrderData));
});
test("get list of supplier names", () => {
  expect(
    getSupplierObjects([
      {
        LineNumber: 1,
        Supplier: {
          SupplierName: "WINSTONE WALLBOARDS LTD",
          SupplierPODate: "2019-11-05T00:00:00",
        },
      },
      {
        LineNumber: 2,
        Supplier: {
          SupplierName: "",
          SupplierPODate: "2019-11-05T00:00:00",
        },
      },
    ]),
  ).toStrictEqual([
    {
      SupplierName: "WINSTONE WALLBOARDS LTD",
      SupplierPODate: "2019-11-05T00:00:00",
    },
  ]);
  expect(
    getSupplierObjects([
      {
        LineNumber: 1,
        Supplier: {
          SupplierName: "WINSTONE WALLBOARDS LTD",
          SupplierPODate: "2019-11-05T00:00:00",
        },
      },
      {
        LineNumber: 2,
        Supplier: {
          SupplierName: "WINSTONE",
          SupplierPODate: "2019-11-05T00:00:00",
        },
      },
    ]),
  ).toStrictEqual([
    {
      SupplierName: "WINSTONE WALLBOARDS LTD",
      SupplierPODate: "2019-11-05T00:00:00",
    },
    {
      SupplierName: "WINSTONE",
      SupplierPODate: "2019-11-05T00:00:00",
    },
  ]);
  expect(
    getSupplierObjects([
      {
        LineNumber: 1,
        Supplier: {
          SupplierName: "WINSTONE WALLBOARDS LTD",
          SupplierPODate: "",
        },
      },
      {
        LineNumber: 2,
        Supplier: {
          SupplierName: "",
          SupplierPODate: "2019-11-05T00:00:00",
        },
      },
    ]),
  ).toStrictEqual([]);
});

test("check whether supplier details are sufficiently provided or not", () => {
  expect(
    isSupplierObjectNotNil({
      SupplierName: "WINSTONE WALLBOARDS LTD",
      SupplierPODate: "2019-11-05T00:00:00",
    }),
  ).toBeTruthy();
  expect(
    isSupplierObjectNotNil({
      SupplierName: "WINSTONE WALLBOARDS LTD",
      SupplierPODate: "",
    }),
  ).toBeFalsy();
  expect(
    isSupplierObjectNotNil({
      SupplierName: "",
      SupplierPODate: "2019-11-05T00:00:00",
    }),
  ).toBeFalsy();
  expect(
    isSupplierObjectNotNil({
      SupplierName: "",
      SupplierPODate: "",
    }),
  ).toBeFalsy();
});

test("get supplier direct message or undefined if none", () => {
  expect(getOrderMessage(HeaderMessage)).toBeFalsy();
  expect(getOrderMessage(R.assoc("supplierDirectMessage", "Direct Supply", HeaderMessage))).toBe("Direct Supply");
});
test("get address and branch details of collection", () => {
  expect(getCollectionDetials(SampleCollection)).toStrictEqual({
    branch: "PLACEMAKERS THAMES",
    address: "79 KOPU RD, P O BOX 510, THAMES",
  });
  expect(getCollectionDetials(R.assocPath(["data", "tradeAccount", "orders", "0", "deliveryAddress"], {}, SampleCollection))).toStrictEqual({
    branch: "PLACEMAKERS THAMES",
    address: "",
  });
});

let navigateToOrderDetailFromNotification = {
  route: {
    key: "OrderDetails-zXOJnarz1CbZxPaZpE06X",
    name: "OrderDetails",
    params: {
      data: {
        notifyType: "ORDER_DETAIL",
        orderId: "1418276",
        pdoNumber: "1418276",
        customerId: "A1JUN",
        index: 0,
        jobId: "A1JUN",
        branchId: "36211",
        fulfilmentBranchId: "36211",
      },
    },
  },
};

let navigateToOrderDetailFromMyOrders = {
  route: {
    key: "OrderDetails-lb2nUbeSUhzg-FInI5uzG",
    name: "OrderDetails",
    params: {
      data: {
        orderId: "1420071",
        pdoNumber: "1420071",
        index: 1,
        jobId: "ANDLA",
      },
      fulfilmentBranchId: "362",
    },
  },
};
test("get fulfillmentId when coming to order detail from push notification", () => {
  expect(getFulfilmentBranchIdOnOrderDetail(navigateToOrderDetailFromNotification)).toEqual("36211");
});

test("get fulfillmentId when coming to order detail from order screen", () => {
  expect(getFulfilmentBranchIdOnOrderDetail(navigateToOrderDetailFromMyOrders)).toEqual("362");
});
