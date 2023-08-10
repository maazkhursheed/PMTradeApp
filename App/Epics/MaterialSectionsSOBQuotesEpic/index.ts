import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import { getHeadersForQuotes } from "../QuotesEpic";

export const epicGetSOBQuotes: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SectionSOBQuotesActions.getSOBQuotes)),
    mergeMap(action => {
      return api.hybris.getSOBQuotes(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(SectionSOBQuotesActions.getSOBQuotesSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(SectionSOBQuotesActions.getSOBQuotesFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicDeleteSectionsSOBQuotes: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SectionSOBQuotesActions.deleteSectionsSOBQuotes)),
    mergeMap(action => {
      const quoteId = state$.value?.quotes?.quotesListDetails?.code;
      return api.hybris.deleteSectionsSOBQuotes(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(SectionSOBQuotesActions.deleteSectionsSOBQuotesSuccess(response.data), SectionSOBQuotesActions.getSOBQuotes({ quoteId }));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(SectionSOBQuotesActions.deleteSectionsSOBQuotesFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicCreateSectionsSOBQuotes: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SectionSOBQuotesActions.createSectionsSOBQuotes)),
    mergeMap(action => {
      return api.hybris.createSectionsSOBQuotes(action.payload, getHeadersForQuotes(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            const quoteId = R.pathOr("", ["value", "quotes", "quotesListDetails", "code"])(state$);
            return of(SectionSOBQuotesActions.createSectionsSOBQuotesSuccess(response), SectionSOBQuotesActions.getSOBQuotes({ quoteId: quoteId }));
          } else {
            if (action?.meta?.onFailure) {
              action.meta.onFailure(response.data);
            }
            return of(SectionSOBQuotesActions.createSectionsSOBQuotesFailure({ action, response }));
          }
        }),
      );
    }),
  );
