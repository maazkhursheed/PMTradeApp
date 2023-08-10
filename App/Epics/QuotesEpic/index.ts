import * as R from "ramda";
import { Epic, ofType, StateObservable } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import AppConfig from "~root/Config/AppConfig";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { QuotesActions } from "~root/Reducers/QuotesReducer";

export const epicQuotesList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestQuotesList)),
    mergeMap(action => {
      return api.hybris.getQuotesList(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.quotesListSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.quotesListFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicQuotesListDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestQuotesListDetails)),
    mergeMap(action => {
      return api.hybris.getQuotesListDetails(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.quotesListDetailsSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.quotesListDetailsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetQuoteProducts: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestQuoteProducts)),
    mergeMap(action => {
      return api.hybris.getQuoteProducts(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            if (action.payload.currentPage > 0) {
              const previousEntries = state$.value.quotes?.quotesProducts?.entries || [];
              const newEntries = response.data.entries || [];
              const data = { ...response.data, entries: [...previousEntries, ...newEntries] };
              return of(QuotesActions.quoteProductsSuccess(data));
            } else {
              return of(QuotesActions.quoteProductsSuccess(response.data));
            }
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.quoteProductsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateQuoteProductQuantity: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateProductQuantity)),
    mergeMap(action => {
      return api.hybris.updateQuoteProductQuantity(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(QuotesActions.requestQuotesListDetails(quoteId, {}), QuotesActions.updateQuoteProductQuanitytSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateQuoteProductQuanitytFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteQuoteProduct: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.deleteQuoteProduct)),
    mergeMap(action => {
      return api.hybris.deleteQuoteProduct(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const currentPage = R.pathOr(0, ["value", "quotes", "pagination", "currentPage"])(state$);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            const sobId = R.pathOr("", ["value", "sectionSOBQuotes", "sobId"])(state$);

            return of(
              QuotesActions.deleteQuoteProductSuccess(response.data),
              QuotesActions.requestQuoteProducts({ currentPage, quoteId, sobId }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, action.meta),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.deleteQuoteProductFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicAddOwnProduct: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.addOwnProduct)),
    mergeMap(action => {
      return api.hybris.addOwnProduct(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const currentPage = R.pathOr(0, ["value", "quotes", "pagination", "currentPage"])(state$);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            const sobId = R.pathOr("", ["value", "sectionSOBQuotes", "sobId"])(state$);
            return of(
              // FIXME: remove following (requestQuoteProducts) API call once base price added with add own product API
              QuotesActions.requestQuoteProducts({ currentPage, quoteId, sobId }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
              QuotesActions.addOwnProductSuccess(response.data),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.addOwnProductFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicSwapProduct: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.swapProduct)),
    mergeMap(action => {
      return api.hybris.addOwnProduct(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            // invokeOnPath(["meta", "onSuccess"], action);
            return of(
              QuotesActions.deleteQuoteProduct({ quoteId: action?.payload?.existingQuoteId, entryNumber: action?.payload?.existingEntryNumber }, action.meta),
              // QuotesActions.requestQuoteProducts({ currentPage, quoteId, sobId }, action.meta),
              // QuotesActions.requestQuotesListDetails(quoteId, {}),
              QuotesActions.swapProductSuccess(response.data),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.addOwnProductFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateQuoteMarkupPercent: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateQuoteMarkupPercent)),
    mergeMap(action => {
      return api.hybris.updateQuoteMarkupPercent(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.updateQuoteMarkupPercentSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateQuoteMarkupPercentFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateQuoteDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateQuoteDetails)),
    mergeMap(action => {
      return api.hybris.updateQuoteDetails(action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
              QuotesActions.updateQuoteDetailsSuccess(response.data),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateQuoteDetailsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateQuoteJobStatus: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateQuoteJobStatus)),
    mergeMap(action => {
      return api.hybris.updateQuoteJobStatus(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
              QuotesActions.updateQuoteJobStatusSuccess(response.data),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateQuoteJobStatusFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateQuoteCompanyDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateQuoteCompanyDetails)),
    mergeMap(action => {
      return api.hybris.updateQuoteCompanyDetails(action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.requestCompanyDetails(action.payload.urlParams, {}), QuotesActions.updateQuoteCompanyDetailsSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateQuoteCompanyDetailsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicNewJob: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.addNewJob)),
    mergeMap(action => {
      return api.hybris.addNewJob(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            if (action.meta?.onSuccess) {
              action.meta.onSuccess(response.data.quoteId);
            }
            return of(QuotesActions.addNewJobSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.addNewJobFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicRequestLabourCost: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestLabourCost)),
    mergeMap(action => {
      return api.hybris.requestLabourCost(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.requestLabourCostSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.requestLabourCostFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicCreateLabourCost: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.createLabourCost)),
    mergeMap(action => {
      return api.hybris.createLabourCostAndOtherCosts(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.createLabourCostSuccess(response.data),
              QuotesActions.requestLabourCost(action.payload.urlParams, {}),
              QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
            );
          } else {
            if (action.meta?.onFailure) {
              action.meta.onFailure({ ...response.data, status: response.status });
            }
            return of(QuotesActions.createLabourCostFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicSendEmailQuote: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.sendEmailQuote)),
    mergeMap(action => {
      return api.hybris.sendEmailQuote(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
              QuotesActions.sendEmailQuoteSuccess(response.data),
            );
          } else {
            if (action.meta?.onFailure) {
              action.meta.onFailure({ ...response.data, status: response.status });
            }
            return of(QuotesActions.sendEmailQuoteFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteLabourCost: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.deleteLabourCost)),
    mergeMap(action => {
      return api.hybris.deleteLabourCostAndOtherCosts(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.deleteLabourCostSuccess(),
              QuotesActions.requestLabourCost(action.payload, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.deleteLabourCostFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetCompanyDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestCompanyDetails)),
    mergeMap(action => {
      return api.hybris.getCompanyDetails(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.companyDetailsSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.companyDetailsFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateLabourCost: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateLabourCost)),
    mergeMap(action => {
      return api.hybris.updateLabourCostAndOtherCosts(action.payload.urlParams, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.requestLabourCost(action.payload.urlParams, {}), QuotesActions.updateLabourCostSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateLabourCostFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicViewQuote: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestViewQuote)),
    mergeMap(action => {
      return api.hybris.viewQuote(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.viewQuoteSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.viewQuoteFailure({ action, response }));
          }
        }),
      );
    }),
  );
export const epicMaterialsReprice: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestMaterialsReprice)),
    mergeMap(action => {
      return api.hybris.getMaterialsReprice(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(QuotesActions.requestQuotesListDetails(quoteId, {}), QuotesActions.materialsRepriceSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.materialsRepriceFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const getHeadersForQuotes = (state$: StateObservable<any>) => {
  const tradeAccount = state$.value?.connectTrade?.selectedTradeAccount;
  const jobAccount = state$.value?.jobAccounts?.selectedJobAccount;
  if (jobAccount) {
    return {
      fulfillmentbranch: state$.value?.branchList?.selectedBranch?.branchCode,
      parentbranch: tradeAccount?.branch?.branchCode,
      tradeaccount: tradeAccount?.uid,
      jobaccount: jobAccount?.JobId,
    };
  }
  return {
    fulfillmentbranch: state$.value?.branchList?.selectedBranch?.branchCode,
    parentbranch: tradeAccount?.branch?.branchCode,
    tradeaccount: tradeAccount?.uid,
  };
};

export const epicMarkComplete: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestMarkCompleted)),
    mergeMap(action => {
      return api.hybris.markAsCompleted(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(QuotesActions.requestQuotesListDetails(quoteId, {}), QuotesActions.markCompletedSuccess());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.markCompletedFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicChangeQuoteStatus: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.changeQuoteStatus)),
    mergeMap(action => {
      return api.hybris.changeQuoteStatus(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}),
              QuotesActions.requestQuotesListDetails(quoteId, {}),
              QuotesActions.changeQuoteStatusSuccess(),
            );
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.changeQuoteStatusFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicuploadImageFileToQuote: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.uploadImageFileToQuote)),
    mergeMap(action => {
      return api.hybris.uploadImageFileToQuote(action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(QuotesActions.requestQuotesListDetails(quoteId, {}), QuotesActions.uploadImageFileToQuoteSuccess(response.data));
          } else {
            if (action.meta?.onFailure) {
              action.meta.onFailure({ ...response.data, status: response.status });
            }
            return of(QuotesActions.uploadImageFileToQuoteFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetQuoteMedia: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.getQuoteMedia)),
    mergeMap(action => {
      return api.hybris.getQuoteMedia(action.payload.params, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.getQuoteMediaSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.getQuoteMediaFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDefaultDisplayOptionsForQuotes: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.requestDefaultDisplayOptionsForQuotes)),
    mergeMap(action => {
      return api.hybris.getDefaultDisplayOptionsForQuotes(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.defaultDisplayOptionsForQuotesSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.defaultDisplayOptionsForQuotesFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateDisplayOptionsForQuotes: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateDisplayOptionsForQuotes)),
    mergeMap(action => {
      return api.hybris.updateDisplayOptionsForQuotes(action.payload.params, action.payload.bodyParams, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(QuotesActions.updateDisplayOptionsForQuotesSuccess(response.data), QuotesActions.requestQuotesListDetails(quoteId, {}));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.updateDisplayOptionsForQuotesFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteQuoteMedia: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.deleteQuoteMedia)),
    mergeMap(action => {
      return api.hybris.deleteQuoteMedia(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.deleteQuoteMediaSuccess(action.payload));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.deleteQuoteMediaFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUpdateQuoteMedia: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.updateQuoteMedia)),
    mergeMap(action => {
      return api.hybris.updateQuoteMedia(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(
              QuotesActions.updateQuoteMediaSuccess(action.payload),
              QuotesActions.getQuoteMedia({
                params: { quoteId },
              }),
            );
          } else {
            if (action.meta?.onFailure) {
              action.meta.onFailure({ ...response.data, status: response.status });
            }
            return of(QuotesActions.updateQuoteMediaFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteQuote: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(QuotesActions.deleteQuote)),
    mergeMap(action => {
      return api.hybris.deleteQuote(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES }, {}), QuotesActions.deleteQuoteSuccess());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(QuotesActions.deleteQuoteFailure({ action, response }));
          }
        }),
      );
    }),
  );
