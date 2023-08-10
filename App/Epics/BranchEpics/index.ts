import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { isResponseOk } from "~root/Lib/DataHelper";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { getHeaders } from "../CartEpics";

export const epicGetBranchList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(BranchDetailsActions.requestBranchList)),
    mergeMap(action => {
      return api.hybris.getBranchList(true).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(BranchDetailsActions.onSuccess(response.data.pointOfServices));
          } else {
            return of(BranchDetailsActions.onFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetNearByBranchList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(BranchDetailsActions.requestNearByBranches)),
    mergeMap(action => {
      if (!R.isEmpty(action.payload)) {
        return api.hybris.getNearByBranchList(action.payload).pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              return of(BranchDetailsActions.onNearByBranchSuccess(response.data.stores));
            } else {
              return of(
                BranchDetailsActions.onNearByBranchFailure({
                  action,
                  response,
                }),
              );
            }
          }),
        );
      } else {
        return of(BranchDetailsActions.onNearByBranchFailure({ action, undefined }));
      }
    }),
  );

export const epicGetBranchDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(BranchDetailsActions.getBranchDetails)),
    mergeMap(action => {
      return api.hybris
        .getBranchDetails({
          branchId: state$.value.connectTrade.selectedTradeAccount.branch.branchID,
          depotsRequired: true,
          fields: "FULL",
          ...action.payload,
        })
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              return of(BranchDetailsActions.branchDepotSuccess(response.data.pointOfServices));
            } else {
              return of(BranchDetailsActions.onFailure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicGetStockAvailabilty: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(BranchDetailsActions.requestStockAvailabilty)),
    mergeMap(action => {
      const tradeAccount = state$.value.connectTrade.selectedTradeAccount;
      return api.hybris
        .getStockAvailability(action.payload,  getHeaders(state$))
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              //TODO: slicing needs to be done from hybris end. once the changes are deployed need to remove slice condition here.
              const dataCount = action.payload?.queryText ? 10 : 5;
              return of(BranchDetailsActions.stockAvailabilitySuccess(response?.data?.pointOfServices?.slice(0, dataCount)));
            } else {
              return of(
                BranchDetailsActions.stockAvailabilityFailure({
                  action,
                  response,
                }),
              );
            }
          }),
        );
    }),
  );

export const epicGetOrderFulfilmentBranchDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(BranchDetailsActions.getOrderFulfilmentBranchDetails)),
    mergeMap(action => {
      return api.hybris
        .getBranchDetails({
          branchId: action.payload,
          depotsRequired: true,
          fields: "FULL",
        })
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              let orderFulfilmentBranch = undefined;
              response.data.pointOfServices.forEach(point => {
                if (point.branchCode == action.payload) {
                  orderFulfilmentBranch = point;
                }
              });
              return of(BranchDetailsActions.orderFulfilmentBranchDetailSuccess(orderFulfilmentBranch));
            } else {
              return of(BranchDetailsActions.onFailure({ action, response }));
            }
          }),
        );
    }),
  );
