import R from "ramda";
import Contacts from "react-native-contacts";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { isResponseOk } from "~root/Lib/DataHelper";
import { IDependencies } from "~root/Reducers/CreateStore";
import { getEmail } from "~root/Reducers/LoginReducers";
import { TeamActions } from "~root/Reducers/ManageTeamReducers";

export const epicGetContacts: Epic = action$ =>
  action$.pipe(
    ofType(getType(TeamActions.contactsRequest)),
    mergeMap(async (action: any) => {
      let data = null;
      let contactsAllowed = false;
      if (action.payload) {
        await new Promise(async (resolve, reject) => {
          Contacts.getAll()
            .then(contacts => {
              contactsAllowed = true;
              action.meta.onSuccess && action.meta.onSuccess();
              data = contacts;
              resolve();
            })
            .catch(err => {
              if (err === "denied") {
                contactsAllowed = false;
                action.meta.onFailure && action.meta.onFailure();
              }
              resolve();
            });
        });
      } else {
        action.meta.onFailure && action.meta.onFailure();
      }
      return of(TeamActions.contactsSuccess(data), TeamActions.isContactsAllowed(contactsAllowed));
    }),
    mergeMap(response => {
      return from(response);
    }),
  );

export const epicSearchContacts: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(TeamActions.contactsSearch)),
    mergeMap((action: any) => {
      const result = state$.value.manageTeam.contacts.filter((item: any) => {
        const searchText = action.payload.toLowerCase();
        const itemData = `${(item.givenName || "").toLowerCase()}
      ${(item.familyName || "").toLowerCase()}
      ${item.phoneNumbers.map((param: any) => param.number)}`;
        return itemData.indexOf(searchText) > -1;
      });
      return of(TeamActions.searchResult(result));
    }),
  );

export const epicSetTeamData: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(TeamActions.getTeamData)),
    mergeMap(action => {
      const email = getEmail(state$.value.login?.userData);
      if (!email) {
        return of(TeamActions.failure());
      }
      return api.hybris.getTeamMembers(email, state$.value.connectTrade.selectedTradeAccount.uid).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const data = R.map(
              R.applySpec({
                response: R.identity,
                name: R.prop("name"),
                phone: R.prop("mobileNumber"),
                status: R.prop("inviteStatus"),
              }),
            )(response.data.inviteUsers);
            return of(TeamActions.successTeamData(data));
          } else {
            return of(TeamActions.failure({ action, response }), TeamActions.successTeamData([]));
          }
        }),
      );
    }),
  );

export const epicGetInviteDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(TeamActions.getInviteDetail)),
    mergeMap(action => {
      return api.hybris.getInviteDetails(action.payload).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            if (action.meta.onSuccess) {
              action.meta.onSuccess(response.data);
            }
            return of(TeamActions.success());
          } else {
            return of(TeamActions.failure({ action, response: undefined }));
          }
        }),
      );
    }),
  );
