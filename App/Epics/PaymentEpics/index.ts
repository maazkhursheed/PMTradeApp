import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath } from "../../Lib/CommonHelper";
import { isResponseOk } from "../../Lib/DataHelper";
import { IDependencies } from "../../Reducers/CreateStore";
import { getEmail } from "../../Reducers/LoginReducers";
import { PaymentStatusActions } from "../../Reducers/PaymentReducers";
import { getHeaders } from "../CartEpics";

export const epicGetPaymentStatus: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(PaymentStatusActions.requestPaymentStatus)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      const cartId = state$.value.cart.userCart?.code;
      const sessionId = "000004000027565604b23f0eecd2de30?status=success";

      return api.hybris.getPaymentStatus(email, cartId, getHeaders(state$), sessionId).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(PaymentStatusActions.paymentStatusSuccess(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(PaymentStatusActions.onFailure({ action, response }));
          }
        }),
      );
    }),
  );
