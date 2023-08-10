import moment from "moment";
import R from "ramda";
import { isDateNil, momentFn } from "~root/Lib/CommonHelper";
import { getOrderMessage, getSupplier, hasDirectSupplyMessage } from "~root/Lib/OrderItemHelper";
import { AddressObject } from "~root/Types/Address";
import OrderDetailModel from "~root/Types/OrderDetail";
import { OrderItemGroupType, OrderSort, OrderStatus } from "~root/Types/OrderItem";

const isNilOrEmpty = R.either(R.isNil, R.isEmpty);

// @ts-ignore
const fixOrderItemData = (data, customerId) =>
  R.compose(
    R.flatten,
    R.map((toFix: any) =>
      R.compose(
        // @ts-ignore
        R.map(
          R.mergeDeepRight({
            accountName: toFix.accountName,
            customerId,
            accountId: toFix.accountId,
          }),
        ),
        R.propOr([], "orders"),
      )(toFix),
    ),
  )(data);

export const getOrderData = R.curry((data: any, customerId: string, jobAccount: any) => {
  const jobData = fixOrderItemData(data.jobAccount, customerId);

  if (jobAccount) {
    return fixOrderItemData(R.filter(R.propEq("accountName", jobAccount.JobName), data.jobAccount), customerId);
  }
  return R.concat(jobData, fixOrderItemData([data.tradeAccount], customerId));
});

export const GroupOrderItem = (sort: any, data: OrderDetailModel[]): OrderItemGroupType | undefined => {
  let groupedData;
  let viewLens;
  const toMilliSeconds = x => {
    return moment(x).valueOf();
  };
  const sorted = R.sortBy(R.compose(toMilliSeconds, R.prop("requestDate")), data);

  switch (sort) {
    case OrderSort.ETA:
      // @ts-ignore
      return R.compose(
        R.fromPairs,
        // @ts-ignore
        R.sortBy(
          R.compose(
            R.cond([
              [R.equals("Past"), R.always(3)],
              [R.equals("Upcoming"), R.always(2)],
              [R.equals("Tomorrow"), R.always(1)],
              [R.equals("Today"), R.always(0)],
            ]),
            R.head,
          ),
        ),
        R.toPairs,
        R.groupBy(R.prop("groupby_eta")),
      )(sorted);
    case OrderSort.JobName:
      groupedData = R.groupBy(R.path(["jobDetails", "jobName"]))(sorted);
      viewLens = R.view(R.lensIndex(0));
      // @ts-ignore
      return R.compose(R.fromPairs, R.sortBy(viewLens), R.toPairs)(groupedData);
  }
};

const isCollectFromBranch = R.both(R.propEq("DirectShip", "N"), R.propEq("fulfilmentType", "Pickup"));

const transformOrders = R.map(
  // @ts-ignore
  R.applySpec({
    sku: R.prop("SKU"),
    detail: R.prop("Description"),
    quantity: R.prop("QtyOrdered"),
    uom: R.prop("UnitOfMeasure"),
  }),
);

export const getAddressObject = R.compose(
  R.applySpec({
    country: R.always({ isocode: "NZ" }),
    line1: R.head,
    line2: R.nth(1),
    town: R.nth(2),
    postalCode: R.last,
  }),
  R.map(R.trim),
  R.split(","),
) as (address: string) => AddressObject;

export const getDeliveryAddress = R.compose(R.join(", "), R.reject(isNilOrEmpty), R.values, R.prop("DeliveryAddress"));

const composeDeliveryObject = (data: any) => {
  const filterList = R.ifElse(
    isNilOrEmpty,
    R.always(undefined),
    R.compose(R.join("\n"), R.reject(R.isNil), R.ifElse(R.compose(R.equals("String"), R.type), R.of, R.identity)),
  );

  const deliveryRequirementPath = R.prop("DeliveryRequirements");
  const siteRequirement = R.compose(filterList, R.prop("SiteRequirements"));
  const truckRequirement = R.compose(filterList, R.prop("TruckRequirements"));

  return R.ifElse(
    R.propEq("fulfilmentType", "Delivery"),
    R.compose(
      R.assoc("address", getDeliveryAddress(data)),
      // @ts-ignore
      R.applySpec({
        site_requirements: siteRequirement,
        truck_requirements: truckRequirement,
        delivery_requirements: R.prop("AdditionalInformation"),
      }),
      deliveryRequirementPath,
    ),
    R.always(undefined),
  )(data);
};

const getCollection = R.curry((collection, data) => {
  return R.ifElse(
    isCollectFromBranch,
    R.always({
      address: collection.address,
      branch: collection.branch,
    }),
    R.always(undefined),
  )(data);
});

const getHeaderDetails = R.applySpec({
  isDelivered: R.both(R.propEq("orderStatus", OrderStatus.Delivered), R.propEq("fulfilmentType", "Delivery")),
  isEstimated: R.compose(
    R.not,
    R.anyPass([R.propEq("orderStatus", OrderStatus.Missed), R.propEq("orderStatus", OrderStatus.Delivered), hasDirectSupplyMessage]),
  ),
  DSP: R.compose(R.ifElse(R.equals("Not Required"), R.always(""), R.identity), R.prop("DSP")),
  text: getOrderMessage,
});

const isDSOrder = () => {};

const getRequestedDate = R.ifElse(R.compose(isDateNil, R.prop("deliveryDate")), R.prop("requestDate"), R.prop("deliveryDate"));

export default R.curry((collection, data) =>
  R.compose(
    R.map(
      R.applySpec({
        orderItems: R.compose(transformOrders, R.propOr([], "orderLines")),
        orderNumber: R.prop("orderNumber"),
        customerId: R.prop("customerId"),
        fulfilmentBranchId: R.prop("fulfilmentBranchId"),
        fulfilmentType: R.prop("fulfilmentType"),
        status: R.prop("orderStatus"),
        isDsOrder: isDSOrder,
        requestDate: R.compose(momentFn, getRequestedDate),
        delivery: composeDeliveryObject,
        jobDetails: R.applySpec({
          processor: R.compose(R.over(R.lensProp("When"), momentFn), R.propOr({}, "orderProcessed")),
          jobPoNumber: R.prop("customerPOReference"),
          jobDeliveryType: R.prop("deliveryType"),
          jobId: R.prop("accountId"),
          jobName: R.prop("accountName"),
        }),
        supplier: getSupplier,
        collection: getCollection(collection),
        headerDetails: getHeaderDetails,
        siteContact: R.compose(R.head, R.prop("siteContact")),
        original: R.identity,
      }),
    ),
    R.reject(R.isNil),
    R.prop("orders"),
  )(data),
);
