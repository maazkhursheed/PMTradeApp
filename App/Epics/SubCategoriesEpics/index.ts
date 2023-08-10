import R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getHeaders } from "~root/Epics/CartEpics";
import { isResponseOk } from "~root/Lib/DataHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { SubCategoriesActions } from "~root/Reducers/SubCategoriesReducers";

export const epicGetSubCategories: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SubCategoriesActions.requestSubCategories)),
    mergeMap(action => {
      return api.hybris.requestSubCategories(action.payload, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            if (action.meta && action.meta.onSuccess) {
              action.meta.onSuccess(R.pathOr([], ["data"], response));
            }
            return of(SubCategoriesActions.successSubCategories());
          } else {
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure();
            }
            return of(SubCategoriesActions.failureSubCategories({ action, response }));
          }
        }),
      );
    }),
  );
