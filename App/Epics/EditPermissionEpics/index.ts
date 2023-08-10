import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { IDependencies } from "~root/Reducers/CreateStore";
import { EditPermissionActions } from "~root/Reducers/EditPermissionsReducers";
import { getEmail } from "~root/Reducers/LoginReducers";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";

export const epicUpdatePermission: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EditPermissionActions.editPermissionRequest)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      return api.hybris
        .updateUserPermission({
          userId: email,
          accountId: state$.value.connectTrade.selectedTradeAccount.uid,
          ...action.payload,
        })
        .pipe(mergeMap(response => onResponse(action, response)));
    }),
  );

const onResponse = (action: any, response: any) => {
  if (response.ok) {
    action.meta && action.meta.onSuccess && action.meta.onSuccess();
    return of(EditPermissionActions.editPermissionSuccess(), TeamActions.getTeamData());
  } else {
    action.meta && action.meta.onFailure && action.meta.onFailure();
    return of(EditPermissionActions.failure({ action, response }));
  }
};

export const epicUpdateInvite: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EditPermissionActions.editInviteRequest)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      return api.hybris
        .updateUserInvite({
          invitedBy: email,
          selectedTradeAccount: state$.value.connectTrade.selectedTradeAccount.uid,
          ...action.payload,
        })
        .pipe(mergeMap(response => onResponse(action, response)));
    }),
  );

export const epicDeleteInvite: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EditPermissionActions.deleteInviteRequest)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      return api.hybris
        .deleteUserInvite({
          selectedTradeAccount: state$.value.connectTrade.selectedTradeAccount.uid,
          mobileNumber: action.payload,
        })
        .pipe(
          mergeMap(response => {
            if (response.ok) {
              if (action.meta && action.meta.onSuccess) {
                action.meta.onSuccess();
              }
              return of(EditPermissionActions.deleteInviteSuccess(), TeamActions.getTeamData());
            } else {
              if (action.meta && action.meta.onFailure) {
                action.meta.onFailure();
              }
              return of(EditPermissionActions.failure({ action, response }));
            }
          }),
        );
    }),
  );

export const epicSendInvite: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(EditPermissionActions.sendInviteRequest)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      return api.hybris
        .sendInvite({
          invitedBy: email,
          selectedTradeAccount: state$.value.connectTrade.selectedTradeAccount.uid,
          ...action.payload,
        })
        .pipe(
          mergeMap(response => {
            if (response.ok) {
              action.meta?.onSuccess?.();
              return of(EditPermissionActions.sendInviteSuccess(), TeamActions.getTeamData());
            } else {
              action.meta?.onFailure?.();
              return of(EditPermissionActions.failure({ action, response }));
            }
          }),
        );
    }),
  );
