import { ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { isResponseOk } from "~root/Lib/DataHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { MarketingTileActions } from "~root/Reducers/MarketingTileReducer";

export const epicGetMarketingTileInfo = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MarketingTileActions.requestMarketingTiles)),
    mergeMap(action => {
      return api.hybris.getMarketingTile({}).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(MarketingTileActions.successMarketingTiles(response.data));
          } else {
            return of(MarketingTileActions.failure({ action, response }));
          }
        }),
      );
    }),
  );
