import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Platform } from "react-native";
import MQTT from "sp-react-native-mqtt";
import AppConfig from "~root/Config/AppConfig";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";

const md5 = require("md5");

export const KEY_PREVIOUS_TRADEACCOUNT = "previousTradeAccount";

export const PREFIX_TRADEAPP = "tradeapp-";

export const fetchTradeAccountName = R.ifElse(
  R.pathSatisfies(RA.isNotNilOrEmpty, ["jobAccounts", "selectedJobAccount"]),
  R.pathOr("", ["jobAccounts", "selectedJobAccount", "SearchName"]),
  R.pathOr("", ["connectTrade", "selectedTradeAccount", "name"]),
);

export enum STCEventScreenNames {
  EnterDetails = "STCGetStarted",
  Dashboard = "Dashboard",
  QrCode = "STCQrCodeContainer",
  InProgress = "STCInProgress",
  ReviewOrders = "STCReviewOrders",
  GatePass = "STCGatePass",
  ConfirmOrderPurchaseProof = "STCConfirmOrderPurchaseProof",
}

/**
 * This helper function returns MQTT client with host name and other details provided
 */
export const createMQQTClient = async (clientId: string, clean: boolean = false) => {
  return MQTT.createClient({
    tls: AppConfig.ENVIRONMENT === "SIT",
    host: AppConfig.MQTT_HOST,
    port: Number(AppConfig.MQTT_PORT),
    clientId,
    user: AppConfig.MQTT_USER,
    pass: AppConfig.MQTT_PASS,
    clean,
    auth: true,
  });
};

export const cleanMQTTQueue = async (clientId: string) => {
  const client = await createMQQTClient(clientId, true);
  client.connect();
  client.on("connect", () => {
    client.disconnect();
  });
};

/**
 * This helper function returns MQTT client with host name and other details provided
 */
export const createMQTTClientPublisher = async (clientId: string, clean: boolean = false) => {
  return MQTT.createClient({
    tls: AppConfig.ENVIRONMENT === "SIT",
    host: AppConfig.MQTT_HOST,
    port: Number(AppConfig.MQTT_PORT),
    clientId,
    user: AppConfig.MQTT_USER_PUBLISHER,
    pass: AppConfig.MQTT_PASS_PUBLISHER,
    clean,
    auth: true,
  });
};

export const getStep1FeatureFlowEventObj = (obj: any) => {
  const eventObj = {
    event: "feature_flow",
    feature_type: "STC",
    step: 1,
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    storeName: obj.props.selectedBranch?.name ?? "",
  };
  return eventObj;
};

export const getStep1BeginCheckoutEventObj = (obj: any) => {
  const eventObj = {
    event: "begin_checkout",
    feature_type: "STC",
    step: 2,
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    last_screen: "Dashboard",
    parent_branch: obj.props.selectedTradeAccount?.branch?.branchCode ?? "",
    jobReference: obj.state.poNumber ?? "",
    fulfillment_branch: "",
    order_id: "",
    suspended_id: "",
    storeName: obj.props.selectedBranch?.name ?? "",
  };
  return eventObj;
};

export const getStep2QrCodeEventObj = (obj: any) => {
  const eventObj = {
    event: "begin_checkout",
    feature_type: "stc",
    step: 3,
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    jobReference: obj.props.poNumber ?? "",
    parent_branch: obj.props.selectedTradeAccount?.branch?.branchCode ?? "",
    fulfillment_branch: obj.props.orderItem?.fulfilmentBranchId ?? "",
    last_screen: obj.lastScreen,
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    order_id: "",
    suspended_id: obj.props.orderItem.orderId ?? "",
    addedUsing: "Skip The Counter",
    stcFlowCount: obj.props.orderItem.resumeCount ?? 1,
    storeName: obj.props.selectedBranch?.name ?? "",
  };
  return eventObj;
};

export const getStep3InProgressEventObj = (obj: any) => {
  const eventObj = {
    event: "begin_checkout",
    step: 4,
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    jobReference: obj.props.poNumber ?? "",
    parent_branch: obj.props.selectedTradeAccount?.branch?.branchCode ?? "",
    fulfillment_branch: obj.props.orderItem?.fulfilmentBranchId ?? "",
    last_screen: obj.lastScreen,
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    feature_type: "STC",
    order_id: "",
    suspended_id: obj.orderNumber ?? "",
    addedUsing: "Skip The Counter",
    stcFlowCount: obj.props.orderItem?.resumeCount ?? 1,
    storeName: obj.props.selectedBranch?.name ?? "",
  };
  return eventObj;
};

export const getStep4ReviewEventObj = (obj: any) => {
  const eventObj = {
    event: "feature_flow",
    feature_type: "STC",
    step: 5,
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    storeName: obj.props.selectedBranch?.name ?? "",
  };
  return eventObj;
};

export const getStep4ItemReviewEventObj = (obj: any) => {
  const order = R.path(["orders", "0"], obj.props.data);
  const orderLines = R.propOr([], "orderLines", order);
  const itemsArr = orderLines.map((item: any) => {
    return {
      item_id: item.sku,
      item_name: item.description,
      price: Number(Number(item.unitPrice).toFixed(2)),
      item_brand: "",
      item_category: "",
      item_category_2: "",
      item_category_3: "",
      item_category_4: "",
      item_variant: "",
      quantity: Number(item.qtyOrdered),
    };
  });
  const eventObj = {
    event: "begin_checkout",
    step: 6,
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    jobReference: obj.props.orderItem?.poNumber ?? "",
    parent_branch: obj.props.selectedTradeAccount?.branch?.branchCode ?? "",
    fulfillment_branch: obj.props.orderItem?.fulfilmentBranchId ?? "",
    last_screen: obj.lastScreen,
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    order_id: "",
    suspended_id: obj.props.orderItem?.orderId ?? "",
    stcFlowCount: obj.props.orderItem?.resumeCount ?? 1,
    feature_type: "stc",
    items: itemsArr,
    addedUsing: "Skip The Counter",
    storeName: obj.props.selectedBranch?.name ?? "",
  };
  return eventObj;
};

export const getStep5GatePassEventObj = (obj: any) => {
  const email = obj.props.userData.uid;
  const name = email.substring(0, email.lastIndexOf("@"));
  const domain = email.substring(email.lastIndexOf("@") + 1);
  let totalPrice = 0.0;
  const itemsOrder = obj.orderLines.map((item: any) => {
    totalPrice += Number(item.unitPrice) * Number(item.qtyOrdered);
    return {
      item_id: item.sku,
      item_name: item.description,
      price: Number(Number(item.unitPrice).toFixed(2)),
      item_brand: "",
      item_category: "",
      item_category_2: "",
      item_category_3: "",
      item_category_4: "",
      item_variant: "",
      quantity: Number(item.qtyOrdered),
    };
  });
  const eventObj = {
    event: "purchase",
    step: 7,
    feature_type: "STC",
    location: getBranchTownRegion(obj.props.selectedBranch),
    device_type: Platform.OS,
    jobReference: obj.props.item ? obj.props.item?.poNumber : "",
    parent_branch: obj.props.selectedTradeAccount?.branch?.branchCode ?? "",
    last_screen: "STCReviewOrders",
    userId: obj.props.digitalId ?? "",
    accountId: obj.props.selectedAccountId ?? "",
    userType: obj.props.userType,
    loginStatus: "login",
    u1: name,
    u2: domain,
    u3: md5(email),
    order_id: obj.props.item ? obj.props.item?.orderId : "",
    suspended_id: "",
    packing_id: obj.order?.packNumber ?? "",
    stcFlowCount: obj.props.item ? obj.props.item?.resumeCount : 1,
    addedUsing: "Skip The Counter",
    storeName: obj.props.selectedBranch?.name ?? "",
    items: itemsOrder,
    transaction_id: obj.props.reviewOrders ? obj.props.reviewOrders?.transactionId : "",
    value: Number(Number(totalPrice).toFixed(2)),
    currency: obj.props.userData.currency.isocode ?? "",
  };
  return eventObj;
};
