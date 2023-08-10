import R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { CountryListActions } from "~root/Reducers/CountryListReducers";
import { IDependencies } from "~root/Reducers/CreateStore";

export const epicGetCountryList: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(CountryListActions.requestCountryList)),
    mergeMap(action => {
      return api.hybris.getCountriesList().pipe(
        mergeMap(response => {
          if (response.ok) {
            return of(CountryListActions.onSuccess(R.compose(R.reject(R.propEq("isocode", "NZ")), R.prop("countries"))(response.data)));
          } else {
            return of(CountryListActions.onFailure({ action, response }));
          }
        }),
      );
    }),
  );
