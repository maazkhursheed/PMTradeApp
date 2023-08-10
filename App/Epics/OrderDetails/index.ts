import firebase from "@react-native-firebase/app";
import moment from "moment";
import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { map, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { getOrderDetailsObj, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getCollectionDetials } from "~root/Lib/OrderItemHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { OrderDetailsActions } from "~root/Reducers/OrderDetailsReducers";
import OrderItem, { getOrderData } from "~root/Transforms/OrderItem";

export const epicOrderDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(OrderDetailsActions.request)),
    mergeMap(action => {
      const customerId = action.payload.customerId || state$.value.connectTrade.selectedTradeAccount.custId;
      // orderId: action.payload.pdoNumber, - here pdoNumber is same as orderNumber and orderId
      return api.hybris
        .getOrderListDetails({
          jobAccountId: action.payload.jobId,
          customerId,
          orderId: action.payload.orderId,
          parentBranchId: action.payload.branchId || state$.value.connectTrade.selectedTradeAccount.branch.branchCode,
          fulfilmentBranchId: action.payload.branchId || state$.value.connectTrade.selectedTradeAccount.branch.branchCode,
        })
        .pipe(
          map(response => {
            if (response.ok && R.path(["data", "tradeAccount"], response)) {
              const orderData = R.compose(
                R.find(R.propEq("orderNumber", action.payload.orderId)),
                OrderItem(getCollectionDetials(response)),
                R.assoc("orders", R.__, response.data),
                getOrderData(R.__, customerId, undefined),
              )(response.data);
              // log firebase analytics for orderDetails
              const event = "view_item";
              const params = {
                event,
                feature_type: "Order Detail",
                userId: extractDigitalIdFromJWTPayload(decodeJWTToken(state$.value.login.tempToken.idToken)),
                accountId: getSelectedAccountId(state$.value),
                location: getBranchTownRegion(state$.value.branchList.selectedBranch),
                order_reference: orderData?.orderNumber,
                order_address: orderData?.original?.deliveryAddress?.address1 + "," + orderData?.original?.deliveryAddress?.city,
                order_eta: moment(orderData?.original?.requestDate).format("DD/MM/YYYY"),
                order_fulfilment: orderData?.fulfilmentType,
                itemList: orderData?.original,
              };
              const eventLogObject = getOrderDetailsObj(params);
              firebase.analytics().logEvent(event, eventLogObject);
              // log end
              return OrderDetailsActions.success(orderData);
            } else {
              if (shouldInvokeFailure(response)) {
                action.meta.onFailure && action.meta.onFailure();
              }
              return OrderDetailsActions.failure({ action, response });
            }
          }),
        );
    }),
  );
