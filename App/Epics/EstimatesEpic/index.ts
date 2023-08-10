import * as R from "ramda";
import { Epic, ofType, StateObservable } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import { getEstimatedProductList, getEstimatedProductListCount } from "~root/Lib/EstimatesHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { EstimatesActions } from "~root/Reducers/EstimatesReducer";

export const epicEstimatesList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EstimatesActions.requestEstimatesList)),
    mergeMap(action => {
      return api.hybris.getEstimatesList(action.payload, getEstimatesHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(EstimatesActions.estimatesListSuccess(response.data?.estimateList));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(EstimatesActions.estimatesListFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicEstimatesListById: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EstimatesActions.requestEstimatesListById)),
    mergeMap(action => {
      return api.hybris.getEstimatesListDetails(action.payload, getEstimatesHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(EstimatesActions.estimatesListByIdSuccess(response.data?.estimateList));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(EstimatesActions.estimatesListByIdFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicEstimatesListDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EstimatesActions.requestEstimatesListDetails)),
    mergeMap(action => {
      return api.hybris.getEstimatesListDetails(action.payload, getEstimatesHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const sectionId = R.pathOr(0, ["payload", "sectionId"], action);
            const lines = getEstimatedProductList(sectionId, response.data);
            const estimatesListDetailsTotalCount = getEstimatedProductListCount(sectionId, response.data);
            return of(EstimatesActions.estimatesListDetailsSuccess({ lines, estimatesListDetailsTotalCount, pageNo: action.payload.pageNo }));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(EstimatesActions.estimatesListDetailsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const getEstimatesHeaders = (state$: StateObservable<any>) => {
  const tradeAccount = state$?.value?.connectTrade?.selectedTradeAccount;
  const selectedJobAccount = state$?.value?.jobAccounts?.selectedJobAccount;
  const parentBranchCode = state$?.value?.connectTrade?.selectedTradeAccount?.branch?.branchCode; // Comments from Sravan to use associated branch instead of selected Branch
  if (selectedJobAccount) {
    return {
      parentbranch: parentBranchCode,
      tradeaccount: tradeAccount?.uid,
      jobaccount: selectedJobAccount?.JobId,
    };
  }
  return {
    parentbranch: parentBranchCode,
    tradeaccount: tradeAccount?.uid,
  };
};
