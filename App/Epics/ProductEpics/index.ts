import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { finalize, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { getRequestParams, isResponseOk, mapSanitizedItems, sanitizeSolrSearchForDb } from "~root/Lib/DataHelper";
import { EnumRelatedAndAlternateReferenceType } from "~root/Lib/ProductHelper";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { ProductDetailsActions } from "~root/Reducers/ProductDetailsReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";

export const getHeadersForCart = (state$: StateObservable<any>) => {
  const tradeAccount = state$.value.connectTrade.selectedTradeAccount;
  const jobAccount = state$.value.jobAccounts.selectedJobAccount;
  if (jobAccount) {
    return {
      fulfillmentbranch: state$.value.branchList?.selectedBranch?.branchCode,
      parentbranch: tradeAccount?.branch?.branchCode,
      tradeaccount: tradeAccount?.uid,
      jobaccount: jobAccount.JobId,
    };
  }
  return {
    fulfillmentbranch: state$.value.branchList?.selectedBranch?.branchCode,
    parentbranch: tradeAccount?.branch?.branchCode,
    tradeaccount: tradeAccount?.uid,
  };
};

export const epicProductClear: Epic = (action$, state$, { db }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.clearProducts)),
    mergeMap(response => of(ProductActions.success(undefined))),
  );

export const epicProductDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductDetailsActions.requestProductDetails)),
    mergeMap(action => {
      const param = getRequestParams(state$);

      return api.hybris.getProductDetails(action.payload, param).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(ProductDetailsActions.successProductDetails(response.data)).pipe(finalize(() => invokeOnPath(["meta", "onSuccess"], action)));
          } else {
            return of(
              ProductDetailsActions.failureProductDetails({
                action,
                response,
              }),
              AppActions.appGenericErrorVisibility(true),
            ).pipe(
              finalize(() => {
                if (shouldInvokeFailure(response)) {
                  invokeOnPath(["meta", "onFailure"], action);
                }
              }),
            );
          }
        }),
      );
    }),
  );

export const epicRelatedAndSubstituteProducts: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.requestRelatedAndSubstituteProducts)),
    mergeMap(action => {
      action.payload.referenceType === EnumRelatedAndAlternateReferenceType.SIMILAR
        ? ProductActions.relatedAndSubstituteAlternateProductsSuccess(undefined)
        : ProductActions.relatedAndSubstituteRelatedProductsSuccess(undefined);

      return api.hybris.getRelatedAndSubstituteProducts(action.payload, getHeadersForCart(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            let data: any;
            data = R.map(R.compose(mapSanitizedItems(state$.value), sanitizeSolrSearchForDb, R.prop("target")), response?.data?.references);
            const refType = response?.data?.references[0]?.referenceType;
            return EnumRelatedAndAlternateReferenceType.SIMILAR === refType
              ? of(ProductActions.relatedAndSubstituteAlternateProductsSuccess(data))
              : of(ProductActions.relatedAndSubstituteRelatedProductsSuccess(data));
          } else {
            return of(ProductActions.relatedAndSubstituteProductsFailure({ action, response }));
          }
        }),
      );
    }),
  );
