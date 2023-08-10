import AsyncStorage from "@react-native-async-storage/async-storage";
import * as R from "ramda";
import { LatLng } from "react-native-maps";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { finalize, map, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getHeaders } from "~root/Epics/CartEpics";
import { getFormattedAddresses, invokeOnPath, renameKeys, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { isCoreLogicResponseOk, isResponseOk } from "~root/Lib/DataHelper";
import * as JobAccounts from "~root/Lib/JobAccountsHelper";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { IDependencies } from "~root/Reducers/CreateStore";
import { JobAccountsActions, SELECTED_JOB_ACCOUNT } from "~root/Reducers/JobAccountsReducers";
import { getEmail } from "~root/Reducers/LoginReducers";
import { OrderJourneyActions } from "~root/Reducers/OrderJourneyReducers";

export const epicAddressValidation: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AddressActions.requestAddress)),
    mergeMap(action => {
      return api.addressValidation.getAddressSuggestions(action.payload).pipe(
        map(response => {
          if (isCoreLogicResponseOk(response)) {
            invokeOnPath(["meta", "onSuccess"], action);
            if (response.data.suggestions && response.data.suggestions.length === 0) {
              invokeOnPath(["meta", "onFailure"], action);
            }
            return AddressActions.addressSuccess(R.map(R.prop("text"), response.data.suggestions));
          } else {
            if (shouldInvokeFailure(response)) {
              invokeOnPath(["meta", "onFailure"], action);
            }
            return AddressActions.failureAddress({ action, response });
          }
        }),
      );
    }),
  );

export const epicAddressGeoCode: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AddressActions.requestGeocode)),
    mergeMap(action => {
      return api.addressValidation.getGeoCode(action.payload).pipe(
        map(response => {
          if (isCoreLogicResponseOk(response)) {
            let latLong = R.path(["locations", "0", "location"])(response.data);
            latLong = {
              x: isNaN(latLong?.x) ? 0 : latLong?.x,
              y: isNaN(latLong?.y) ? 0 : latLong?.y,
            };
            latLong = latLong ? (renameKeys({ x: "longitude", y: "latitude" })(latLong) as LatLng) : undefined;
            action.meta?.onSuccess?.(latLong);
            return AddressActions.geocodeSuccess(latLong);
          } else {
            if (shouldInvokeFailure(response)) {
              invokeOnPath(["meta", "onFailure"], action);
            }
            return AddressActions.failureGeocode({ action, response });
          }
        }),
      );
    }),
  );

export const epicJobAccountAndBranches: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(OrderJourneyActions.requestJobAccountsAndBranch)),
    mergeMap(action => {
      const selectedTradeAcc = state$.value.connectTrade.selectedTradeAccount;
      const email = getEmail(state$.value.login.userData) as string;
      return api.hybris.getJobAccounts(email, selectedTradeAcc.uid).pipe(
        mergeMap(async responseArray => {
          const actions = [];
          actions.push(AddressActions.clearAddress());
          actions.push(AddressActions.setSelectedAddress(undefined));
          const selectedJobAccount = await AsyncStorage.getItem(SELECTED_JOB_ACCOUNT);
          const jobAccount = selectedJobAccount ? JSON.parse(selectedJobAccount) : undefined;
          actions.push(JobAccountsActions.selectJobAccount(jobAccount));

          let jobAccounts = [];

          if (isResponseOk(responseArray)) {
            jobAccounts = JobAccounts.fetchHybrisJobs(responseArray.data);
            actions.push(JobAccountsActions.success(jobAccounts));
          } else {
            actions.push(JobAccountsActions.failure({ response: responseArray, action }));
          }
          actions.push(OrderJourneyActions.success());
          return from(actions).pipe(
            finalize(() => {
              invokeOnPath(["meta", "onSuccess"], action);
            }),
          );
        }),
        mergeMap(obj => from(obj)),
      );
    }),
  );

export const epicJobAccounts: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(JobAccountsActions.request)),
    mergeMap(action => {
      const selectedTradeAcc = state$.value.connectTrade.selectedTradeAccount;
      const email = getEmail(state$.value.login.userData) as string;
      return api.hybris.getJobAccounts(email, selectedTradeAcc.uid).pipe(
        map(response => {
          if (isResponseOk(response)) {
            const jobAccounts = JobAccounts.fetchHybrisJobs(response.data);
            if (jobAccounts.length > 0) {
              return JobAccountsActions.success(JobAccounts.fetchHybrisJobs(response.data));
            } else {
              return JobAccountsActions.failure({ action, response });
            }
          } else {
            return JobAccountsActions.failure({ action, response });
          }
        }),
      );
    }),
  );

export const epicAddUpdateDeliveryAddress: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AddressActions.requestAddUpdateDeliveryAddress)),
    mergeMap(action => {
      const addressArr = action?.payload?.address?.split(",");
      const geocode = action?.payload?.geocode;
      const email = R.path(["login", "userData", "uid"], state$.value) as string;
      return api.hybris
        .addUpdateDeliveryAddress(
          email,
          state$.value.cart.userCart?.code,
          {
            line1: addressArr[0],
            line2: addressArr[1],
            town: addressArr[2],
            district: "",
            postalCode: addressArr[3],
            country: {
              isocode: "NZ",
            },
            addressGeoLocation: geocode || {
              longitude: 0,
              latitude: 0,
            },
            entranceGeoLocation: {
              longitude: 0,
              latitude: 0,
            },
            dropGeoLocation: {
              longitude: 0,
              latitude: 0,
            },
          },
          getHeaders(state$),
        )
        .pipe(
          mergeMap(response => {
            if (isResponseOk(response)) {
              invokeOnPath(["meta", "onSuccess"], action);
              return of(AddressActions.addUpdateDeliveryAddressSuccess(response.data), CartActions.requestUserCartDetail());
            } else {
              invokeOnPath(["meta", "onFailure"], action);
              return of(AddressActions.failureAddress({ action, response }));
            }
          }),
        );
    }),
  );

export const epicPlaceOrder: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AddressActions.requestPlaceOrderApi)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData) as string;
      const placeOrder = api.hybris.placeOrderApi(email, state$.value.cart.userCart?.code, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            action.meta?.onSuccess?.();
            return of(AddressActions.placeOrderApiSuccess(response));
          } else {
            action.meta?.onFailure?.();
            return of(AddressActions.placeOrderApiFailure(response));
          }
        }),
      );
      if (!action.payload) {
        return placeOrder;
      } else {
        return api.hybris.siteContactApi(action.payload.contact, email, state$.value.cart.userCart?.code, getHeaders(state$)).pipe(
          mergeMap(responseSite => {
            if (isResponseOk(responseSite)) {
              return api.hybris.saveDeliveryInfoToUserSessionCart(email, state$.value.cart.userCart?.code, action.payload.delivery, getHeaders(state$)).pipe(
                mergeMap(response => {
                  if (isResponseOk(response)) {
                    return placeOrder;
                  } else {
                    action.meta?.onFailure?.();
                    return of(AddressActions.placeOrderApiFailure(response));
                  }
                }),
              );
            } else {
              action.meta?.onFailure?.();
              return of(AddressActions.placeOrderApiFailure(responseSite));
            }
          }),
        );
      }
    }),
  );

export const epicRequestPreviouslyUsedAddresses: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AddressActions.requestPreviouslyUsedAddresses)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      const cartId = state$.value.cart.userCart?.code;
      return api.hybris.requestPreviouslyUsedAddresses(email, cartId, getHeaders(state$)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            if (response.data.siteAddress.length > 0) {
              action.payload.onSuccess(getFormattedAddresses(response.data.siteAddress)[0]);
            }
            return of(AddressActions.previouslyUsedAddressesSuccess(response.data.siteAddress));
          } else {
            invokeOnPath(["payload", "onFailure"], action);
            return of(AddressActions.failureAddress({ action, response }));
          }
        }),
      );
    }),
  );

export const epicAddressDistanceDriveTime: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AddressActions.addressDistanceDriveTime)),
    mergeMap(action => {
      return api.addressDistanceDriveTimeAPI.getDistanceDriveTime(action.payload).pipe(
        map(response => {
          if (isCoreLogicResponseOk(response)) {
            return AddressActions.addressDistanceDriveTimeSuccess(response.data);
          } else {
            return AddressActions.addressDistanceDriveTimeFailure({ action, response });
          }
        }),
      );
    }),
  );
