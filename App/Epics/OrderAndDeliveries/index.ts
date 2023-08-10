import firebase from "@react-native-firebase/app";
import moment from "moment";
import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getHeaders } from "~root/Epics/CartEpics";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { getOrderListAnalyticsObj, getSelectedAccountId, getTruncatedListItemsByProp, isResponseOk } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload, extractTradeAccountsFromJWTPayload } from "~root/Lib/LoginHelper";
import { getCollectionDetials, getOrdersAddress, getOrdersRequestDate, isDirectSupplier } from "~root/Lib/OrderItemHelper";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { ExistingOrdersActions } from "~root/Reducers/ExistingOrdersReducer";
import { getEmail } from "~root/Reducers/LoginReducers";
import { OrderDeliveriesActions } from "~root/Reducers/OrderDeliveriesReducers";
import OrderItem, { getOrderData } from "~root/Transforms/OrderItem";
import OrderDetailModel from "~root/Types/OrderDetail";

export const epicOrderList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(OrderDeliveriesActions.request)),
    mergeMap(action => {
      const tradeAccounts = extractTradeAccountsFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken));
      if (tradeAccounts.length === 0) {
        return of(AppActions.voidAction());
      }
      if (R.path(["branch", "branchCode"], state$.value.connectTrade.selectedTradeAccount) === undefined) {
        return of(OrderDeliveriesActions.failure({ response: undefined, action }));
      }
      const customerId = state$.value.connectTrade.selectedTradeAccount.custId;
      const jobAccount = state$.value.jobAccounts.selectedJobAccount;

      return api.hybris
        .getOrderList({
          customerId,
          jobAccountId: jobAccount?.JobNumber,
          parentBranchId: state$.value.connectTrade.selectedTradeAccount.branch.branchCode,
          fulfilmentBranchId: state$.value.connectTrade.selectedTradeAccount.branch.branchCode,
        })
        .pipe(
          mergeMap(response => {
            if (response.ok && R.path(["data", "tradeAccount"], response)) {
              const collection = getCollectionDetials(response);
              const actualData = OrderItem(collection, R.assoc("orders", getOrderData(response.data, customerId, jobAccount), response.data));

              const today = moment();
              const tomorrow = moment().add(1, "day");

              // @ts-ignore
              const data = R.map((obj: OrderDetailModel) => {
                const momentDate = moment(obj.requestDate);

                if (isDirectSupplier(obj.original)) {
                  return R.assoc("groupby_eta", "Upcoming", obj);
                } else if (momentDate.isAfter(tomorrow, "day")) {
                  return R.assoc("groupby_eta", "Upcoming", obj);
                } else if (momentDate.isSame(today, "day")) {
                  return R.assoc("groupby_eta", "Today", obj);
                } else if (momentDate.isSame(tomorrow, "day")) {
                  return R.assoc("groupby_eta", "Tomorrow", obj);
                } else {
                  return R.assoc("groupby_eta", "Past", obj);
                }
              }, actualData);

              return of(OrderDeliveriesActions.success(data));
            } else if (state$.value.login.userData) {
              invokeOnPath(["meta", "onFailure"], action);
              return of(OrderDeliveriesActions.failure({ action, response }));
            } else {
              return of(AppActions.voidAction());
            }
          }),
        );
    }),
  );

export const epicOnOrderSuccess: Epic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(getType(OrderDeliveriesActions.success)),
    map(action => {
      const event = "order_list";
      const eventLogObject = getOrderListAnalyticsObj({
        event,
        userId: extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken)),
        accountId: getSelectedAccountId(state$.value),
        location: getBranchTownRegion(state$.value.branchList.selectedBranch),
        order_reference: getTruncatedListItemsByProp("orderNumber", state$.value.orderDeliveries.data),
        order_address: getTruncatedListItemsByProp("order_address", getOrdersAddress(state$.value.orderDeliveries.data)),
        order_eta: getTruncatedListItemsByProp("requestDate", getOrdersRequestDate(state$.value.orderDeliveries.data)),
        order_fulfilment: getTruncatedListItemsByProp("fulfilmentType", state$.value.orderDeliveries.data),
        order_change: "",
        item_id: "",
      });
      firebase.analytics().logEvent(event, eventLogObject);
      return OrderDeliveriesActions.selectOrderType(state$.value.orderDeliveries.selectedOrderType);
    }),
  );

export const epicExistingOrderList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ExistingOrdersActions.request)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      const cartId = state$.value.cart.userCart?.code;

      return api.hybris.requestExistingOrdersList(email, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(ExistingOrdersActions.success(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(ExistingOrdersActions.failure({ action, response }));
          }
        }),
      );
    }),
  );
