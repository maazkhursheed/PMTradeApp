import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { finalize, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import OrderHistorySchema, { OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { invokeOnPath, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { convertToPlaneJS, isResponseOk } from "~root/Lib/DataHelper";
import { fixDatePayload, getItemByTokenNumber, parseOrder, startOfDate } from "~root/Lib/OrderHistoryHelper";
import { cleanMQTTQueue, PREFIX_TRADEAPP, STCEventScreenNames } from "~root/Lib/STCHelper";
import NavigationService from "~root/Navigation/NavigationService";
import { IDependencies } from "~root/Reducers/CreateStore";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";

export const epicOrderHistoryRequest: Epic = (action$, state$, { db }: IDependencies) =>
  action$.pipe(
    ofType(getType(OrderHistoryActions.request)),
    mergeMap(() => {
      const todayOrders = db.objects(OrderHistorySchema.name).filtered("date = $0", startOfDate(new Date()));
      const previousOrder = db.objects(OrderHistorySchema.name).filtered("date != $0", startOfDate(new Date()));

      db.write(() => {
        R.map(
          R.compose(
            cleanMQTTQueue,
            R.ifElse(R.propEq("status", OrderHistoryStatus.QrCodeGenerate), R.compose(R.concat(PREFIX_TRADEAPP), R.propOr("", "token")), R.propOr("", "token")),
          ),
        )(previousOrder);
        db.delete(previousOrder);
      });

      const sortedOrders = R.compose(
        R.sort(R.descend(R.compose((time: any) => new Date(time), R.prop("time")))),
        R.map(convertToPlaneJS),
      )(todayOrders) as any[];
      return of(OrderHistoryActions.success(sortedOrders));
    }),
  );

export const epicCheckOrderToProcessInDb: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(OrderHistoryActions.checkOrderStatusInDb)),
    mergeMap(action => {
      const query = "date = $0 AND (status = $1 OR status = $2 OR status = $3 OR status = $4)";
      const todayOrders = db
        .objects(OrderHistorySchema.name)
        .filtered(
          query,
          startOfDate(new Date()),
          OrderHistoryStatus.InReview,
          OrderHistoryStatus.PendingConfirmation,
          OrderHistoryStatus.QrCodeGenerate,
          OrderHistoryStatus.InProgress,
          OrderHistoryStatus.Resume,
        );

      const actions: Array<{}> = [];
      let navigation: STCEventScreenNames | undefined = STCEventScreenNames.EnterDetails;
      if (todayOrders.length >= 1) {
        const token = R.propOr("", "token")(todayOrders[0]) as string;
        return api.hybris.validateToken(token).pipe(
          mergeMap(response => {
            if (isResponseOk(response) && R.compose(RA.isNotNilOrEmpty, R.prop("data"))(response)) {
              const statusAPI = R.pathOr("", ["data", "body", "state"])(response);
              actions.push(OrderHistoryActions.validateTokenSuccess());
              if (statusAPI === OrderHistoryStatus.Cancelled || statusAPI === OrderHistoryStatus.Expired) {
                cleanMQTTQueue(token);
                cleanMQTTQueue(PREFIX_TRADEAPP + token);
                db.write(() => {
                  db.create(OrderHistorySchema.name, { token, status: statusAPI }, true);
                });
              } else {
                const status = todayOrders[0].status;
                if (status === OrderHistoryStatus.QrCodeGenerate || status === OrderHistoryStatus.QrCodeGeneratePrev || status === OrderHistoryStatus.Resume) {
                  navigation = STCEventScreenNames.QrCode;
                } else if (status === OrderHistoryStatus.InProgress || status === OrderHistoryStatus.InProgressPrev) {
                  navigation = STCEventScreenNames.InProgress;
                } else if (
                  status === OrderHistoryStatus.InReview ||
                  status === OrderHistoryStatus.PendingConfirmation ||
                  status === OrderHistoryStatus.InReviewPrev
                ) {
                  navigation = STCEventScreenNames.ReviewOrders;
                }
                if (navigation) {
                  actions.push(StcReviewOrderActions.updateItem(convertToPlaneJS(todayOrders[0])));
                }
              }
            } else {
              navigation = undefined;
              actions.push(OrderHistoryActions.validateTokenFailure());
            }
            if (navigation) {
              actions.push(StcActions.switchScreen(navigation, undefined));
            }

            return from(actions).pipe(
              finalize(() => {
                if (navigation) {
                  setTimeout(() => {
                    NavigationService.navigate("STCDetail");
                  }, 100);
                }
              }),
            );
          }),
        );
      } else {
        actions.push(OrderHistoryActions.validateTokenSuccess());
      }

      if (navigation) {
        actions.push(StcActions.switchScreen(navigation, undefined));
      }
      return from(actions).pipe(
        finalize(() => {
          if (navigation) {
            setTimeout(() => {
              NavigationService.navigate("STCDetail");
            }, 100);
          }
        }),
      );
    }),
  );

export const epicUpdateOrderHistoryItem: Epic = (action$, state$, { db }: IDependencies) =>
  action$.pipe(
    ofType(getType(OrderHistoryActions.updateItem)),
    mergeMap(async action => {
      await new Promise(resolve => {
        db.write(() => {
          db.create(OrderHistorySchema.name, fixDatePayload(action.payload), true);
          resolve();
        });
      });

      return of(OrderHistoryActions.request());
    }),
    mergeMap(obs$ => from(obs$)),
  );

export const epicRequestOrderReview: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcReviewOrderActions.request)),
    mergeMap(async (action: any) => {
      const item = getItemByTokenNumber(db, action.payload) as any;
      if (item) {
        const params = {
          orderId: item.orderId,
          branchID: item.branchId,
          parentBranchId: item.branchId,
          customerId: item.clientId,
          jobAccountId: item.jobAccount,
          fulfilmentBranchId: item.fulfilmentBranchId,
          orderType: item.status === OrderHistoryStatus.Confirmed ? "OR" : "SU",
          includeOrderDetails: "Y",
          transactionSource: "YardAppSTC",
        };

        return api.hybris.getOrderListDetails(params).pipe(
          mergeMap(response => {
            if (response.ok && R.path(["data", "tradeAccount"], response)) {
              const order = R.compose(R.path(["orders", "0"]), parseOrder)(response.data);

              if (!order) {
                action.meta?.onSuccess?.(true);
              }
              return of(StcReviewOrderActions.success(response.data));
            } else {
              return of(StcReviewOrderActions.failure({ action, response })).pipe(
                finalize(() => {
                  if (shouldInvokeFailure(response)) {
                    invokeOnPath(["meta", "onFailure"], action);
                  }
                }),
              );
            }
          }),
        );
      } else {
        return of(StcReviewOrderActions.failure({ action, response: undefined })).pipe(finalize(() => invokeOnPath(["meta", "onFailure"], action)));
      }
    }),
    mergeMap(obs$ => from(obs$)),
  );

export const epicConfirmOrder: Epic = (action$, state$, { db, api }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcReviewOrderActions.requestOrderConfirm)),
    mergeMap(action => {
      const item = getItemByTokenNumber(db, action.payload) as any;
      if (item) {
        const param = {
          sourceTransactionId: item.token,
          parentBranchId: item.branchId,
          fulfilmentBranchId: item.fulfilmentBranchId,
          accountCode: item.jobAccount ? item.jobAccount : item.clientId,
          orderId: item.orderId,
        };
        return api.hybris.orderConfirm(param).pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              invokeOnPath(["meta", "onSuccess"], action);
              return of(StcReviewOrderActions.successOrderConfirm());
            } else {
              if (shouldInvokeFailure(response)) {
                invokeOnPath(["meta", "onFailure"], action);
              }
              return of(StcReviewOrderActions.failureOrderConfirm({ action, response }));
            }
          }),
        );
      } else {
        invokeOnPath(["meta", "onFailure"], action);
        return of(
          StcReviewOrderActions.failureOrderConfirm({
            action,
            response: undefined,
          }),
        );
      }
    }),
  );

export const epicSTCRequestOrderReview: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcActions.request)),
    mergeMap(async (action: any) => {
      const item = getItemByTokenNumber(db, action.payload) as any;
      if (item) {
        const params = {
          orderNumber: item.orderId,
          branchID: item.branchId,
          parentBranchId: item.branchId,
          customerId: item.clientId,
          jobAccountId: item.jobAccount,
          fulfilmentBranchId: item.fulfilmentBranchId,
          orderType: item.status === OrderHistoryStatus.Confirmed ? "OR" : "SU",
          includeOrderDetails: "Y",
          transactionSource: "YardAppSTC",
        };

        return api.hybris.getOrderList(params).pipe(
          mergeMap(response => {
            if (response.ok && R.path(["data", "tradeAccount"], response)) {
              const skuList = R.compose(R.map(R.prop("sku")), R.propOr([], "orderLines"), R.path(["orders", "0"]), parseOrder)(response.data);
              const actions = [StcActions.requestSTCStockPrice({ item, skuList }), StcActions.success(response.data)];

              return from(actions);
            } else {
              return of(StcReviewOrderActions.failure({ action, response })).pipe(
                finalize(() => {
                  if (shouldInvokeFailure(response)) {
                    invokeOnPath(["meta", "onFailure"], action);
                  }
                }),
              );
            }
          }),
        );
      } else {
        return of(StcReviewOrderActions.failure({ action, response: undefined })).pipe(finalize(() => invokeOnPath(["meta", "onFailure"], action)));
      }
    }),
    mergeMap(obs$ => from(obs$)),
  );

export const epicResumeOrderRequest: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcReviewOrderActions.resumeOrder)),
    mergeMap(action => {
      return api.hybris.validateToken(action.payload, "Resume").pipe(
        mergeMap(response => {
          if (isResponseOk(response) && R.compose(RA.isNotNilOrEmpty, R.prop("data"))(response)) {
            // const statusAPI = R.pathOr("", ["data", "body", "state"])(response);
            /*NavigationService.navigate("STCDetail", {
              screen: "QrCodeContainer",
              params: {
                isResumedOrder: true,
              },
            });*/
            invokeOnPath(["meta", "onSuccess"], action);
            return of(StcReviewOrderActions.resumeOrderSuccess());
          } else {
            return of(StcReviewOrderActions.resumeOrderFailure());
          }
        }),
      );
    }),
  );
