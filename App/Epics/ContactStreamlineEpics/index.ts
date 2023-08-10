import { ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import { ContactStreamlineAction } from "~root/Reducers/ContactStreamlineReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { getEmail } from "~root/Reducers/LoginReducers";

export const epicContactStreamline = (action$: any, state$: any, { api }: IDependencies) =>
  action$.pipe(
    ofType(ContactStreamlineAction.requestContacts),
    mergeMap(action => {
      const cartId = state$.value.cart.userCart?.code;
      const userId = getEmail(state$.value.login.userData) as string;
      return api.hybris.requestContactsList({ fields: "FULL" }, userId, cartId, getHeadersWithJobAccountCheck(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["payload", "onSuccess"], action);
            return of(ContactStreamlineAction.onSuccessContacts(response.data.contactsList));
          } else {
            invokeOnPath(["payload", "onFailure"], action);
            return of(ContactStreamlineAction.onFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const getHeadersWithJobAccountCheck = state$ => {
  const tradeAccount = state$.value.connectTrade.selectedTradeAccount;
  const jobAccount = state$.value.jobAccounts.selectedJobAccount;
  if (jobAccount) {
    return {
      fulfillmentbranch: state$.value.branchList?.selectedBranch?.branchCode,
      parentbranch: tradeAccount?.branch?.branchCode,
      tradeaccount: tradeAccount?.uid,
      jobaccount: jobAccount.JobId,
    };
  } else {
    return {
      fulfillmentbranch: state$.value.branchList?.selectedBranch?.branchCode,
      parentbranch: tradeAccount?.branch?.branchCode,
      tradeaccount: tradeAccount?.uid,
    };
  }
};
