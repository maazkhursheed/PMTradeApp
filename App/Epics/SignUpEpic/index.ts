import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import { connectableListCount, transformTradeConnectableList } from "~root/Lib/TradeAccountsHelper";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { SignUpActions } from "~root/Reducers/SignUpReducers";

export const epicGetUpdateUserStatus: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(SignUpActions.requestUpdateUser)),
    mergeMap(action => {
      const meta = action.meta;
      return api.hybris.updateUser(action.payload).pipe(
        mergeMap(response => {
          if (response.ok) {
            return of(SignUpActions.updateUserSuccess(response.data), LoginActions.userSuccess(response.data, meta));
          } else {
            meta.onFailure && meta.onFailure();
            return of(SignUpActions.onFailure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetUpdateUserTradeAccountStatus: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(ConnectTradeActions.requestConnectOwnerTradeAcc)),
    mergeMap(action => {
      const meta = action.meta;
      const tradeAccount = R.path(["connectTrade", "selectedTradeAccount", "uid"], state$.value);

      const param = tradeAccount
        ? {
            ...action.payload,
            selectedTradeAccount: tradeAccount,
          }
        : action.payload;

      return api.hybris.updateTradeAccount(param).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["onSuccess"], meta);
            return of(LoginActions.userSuccess(response.data, meta));
          } else {
            meta.onFailure && meta.onFailure(R.path(["data", "error"], response));
            return of(ConnectTradeActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicLinkTradeAccountAtSignup: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ConnectTradeActions.onLinkTradeAccount)),
    mergeMap(action => {
      const meta = action.meta;

      return api.hybris.linkConnectableTradeAccounts(action.payload).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["onSuccess"], meta);
            return of(LoginActions.userSuccess(response.data, meta), ConnectTradeActions.newTradeAccountAdded(response.data, meta));
          } else {
            if (shouldInvokeFailure(response)) {
              meta.onFailure && meta.onFailure(R.path(["data", "error"], response));
            }
            return of(ConnectTradeActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicGetUserTradeAccountList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ConnectTradeActions.requestLinkableConnectAccount)),
    mergeMap(action => {
      const meta = action.meta;
      const param = action.payload;

      return api.hybris.showConnectableTradeAccounts(param).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            invokeOnPath(["onSuccess"], meta);
            return of(
              ConnectTradeActions.onSuccessLinkableConnectAccounts({
                accounts: transformTradeConnectableList(response.data),
                count: connectableListCount(response.data),
              }),
            );
          } else {
            if (shouldInvokeFailure(response)) {
              meta.onFailure && meta.onFailure(R.path(["data", "error"], response));
            }
            return of(ConnectTradeActions.failure({ action, response }));
          }
        }),
      );
    }),
  );
