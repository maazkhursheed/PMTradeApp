import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase as firebaseAnalytics } from "@react-native-firebase/analytics";
import moment from "moment";
import * as R from "ramda";
import { Platform } from "react-native";
import Auth0 from "react-native-auth0";
import * as Keychain from "react-native-keychain";
import MCReactModule from "react-native-marketingcloudsdk";
import Toast from "react-native-toast-message";
import { Epic, ofType } from "redux-observable";
import { PendoSDK } from "rn-pendo-sdk";
import { from, of } from "rxjs";
import { catchError, delay, filter, first, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import AppConfig from "~root/Config/AppConfig";
import OrderHistorySchema, { OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { isAuth0UserCancel } from "~root/Lib/AlertsHelper";
import { generateTransactionId, invokeOnPath, isNilOrEmpty } from "~root/Lib/CommonHelper";
import { isResponseOk, publishLogInEvents_Solace } from "~root/Lib/DataHelper";
import {
  decodeJWTToken,
  extractDigitalIdFromJWTPayload,
  extractEmailFromJWTPayload,
  extractFirstNameFromJWTPayload,
  extractLastNameFromJWTPayload,
  extractPhoneNumberFromJWTPayload,
  extractSignUpFromJWTPayload,
  hasTradeAccounts,
  isUserNotExistInHybris,
} from "~root/Lib/LoginHelper";
import { getLocationPermission } from "~root/Lib/PermissionHelperLib";
import { cleanMQTTQueue, KEY_PREVIOUS_TRADEACCOUNT, PREFIX_TRADEAPP } from "~root/Lib/STCHelper";
import { transformTradeList, updateSelectedTradeAccountFromUserInfo } from "~root/Lib/TradeAccountsHelper";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { AppActions } from "~root/Reducers/AppReducers";
import { ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { LoginActions } from "~root/Reducers/LoginReducers";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import { InitialFilter, OrderDeliveriesActions } from "~root/Reducers/OrderDeliveriesReducers";
import { PermissionActions } from "~root/Reducers/PermissionReducers";
import { KEY_IS_RETURNING_USER } from "~root/Reducers/PixelReducer";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";

let auth0: Auth0 | undefined = undefined;
const getAuth0 = () => {
  if (auth0) {
    return auth0;
  }
  auth0 = new Auth0({
    domain: AppConfig.AUTH0_ENDPOINT,
    clientId: AppConfig.AUTH0_CLIENT_ID,
  });
  return auth0;
};

export const KEY_AZURE = "Azure";
export const KEY_HYBRIS = "Hybris";

const KEY_FIRST_APP_LAUNCH = "keyFirstAppLaunch";

Array.prototype.randomVal = function () {
  return this[Math.floor(Math.random() * this.length)];
};

export const epicUnAuthorizedCall: Epic = action$ => {
  return action$.pipe(
    filter(action => R.pathEq(["payload", "response", "status"], 401, action)),
    mergeMap(async action => {
      try {
        const azureLogin = await Keychain.getInternetCredentials(KEY_AZURE);
        const hybrisLogin = await Keychain.getInternetCredentials(KEY_HYBRIS);
        return of(LoginActions.requestRefreshToken([azureLogin.password, hybrisLogin.password], R.path(["payload", "action", "meta"], action)));
      } catch (e) {
        invokeOnPath(["payload", "action", "meta", "onFailure"], action);
        return of(LoginActions.failure({ action, response: undefined }));
      }
    }),
    mergeMap(response => from(response)),
  );
};

export const epicRequestError503: Epic = action$ => {
  return action$.pipe(
    filter(action => R.pathEq(["payload", "response", "status"], 503, action)),
    mergeMap(action => {
      return of(AppActions.appError503Visibility(true));
    }),
  );
};

export const epicRefreshToken: Epic = action$ => {
  let currentAction: any;
  return action$.pipe(
    ofType(getType(LoginActions.requestRefreshToken)),
    mergeMap(async action => {
      currentAction = action;

      let azureToken;
      let hybrisToken;
      const auth0 = getAuth0();
      try {
        azureToken = await auth0.auth.refreshToken({
          refreshToken: action.payload[0],
        });
        hybrisToken = await auth0.auth.refreshToken({
          refreshToken: action.payload[1],
        });
      } catch (e) {
        invokeOnPath(["meta", "onFailure"], currentAction);
        return of(LoginActions.logoutRequest(undefined, currentAction.meta));
      }

      return of(LoginActions.tokenSuccess([azureToken, hybrisToken, false], action.meta));
    }),
    mergeMap(response => from(response)),
  );
};

export const epicCheckLoginDb: Epic = action$ =>
  action$.pipe(
    ofType(getType(LoginActions.checkDbLogin)),
    delay(1000),
    mergeMap(async action => {
      const firstLaunch = await AsyncStorage.getItem(KEY_FIRST_APP_LAUNCH).catch(console.log);

      if (firstLaunch !== "true") {
        try {
          await Keychain.resetInternetCredentials(KEY_AZURE);
          await Keychain.resetInternetCredentials(KEY_HYBRIS);

          await AsyncStorage.setItem(KEY_FIRST_APP_LAUNCH, "true");
        } catch (e) {}
      }

      let azureLogin: false | Keychain.UserCredentials | undefined;
      let hybrisLogin: false | Keychain.UserCredentials | undefined;
      try {
        azureLogin = await Keychain.getInternetCredentials(KEY_AZURE);
        hybrisLogin = await Keychain.getInternetCredentials(KEY_HYBRIS);
      } catch (e) {
        invokeOnPath(["meta", "onFailure"], action);
        return of(LoginActions.failure({ action, response: undefined }));
      }
      if (azureLogin && hybrisLogin) {
        return of(LoginActions.requestRefreshToken([azureLogin.password, hybrisLogin.password], action.meta));
      } else {
        if (!action.payload) {
          if (action.meta) {
            action.meta.onFailure({ error: "a0.session.user_cancelled" });
          }
          return of(LoginActions.failure({ action, response: undefined }));
        }
        let azureTokenResponse: any;
        const auth0 = getAuth0();
        return from(
          auth0.webAuth.authorize({
            prompt: action.payload,
            scope: AppConfig.AUTH0_SCOPE,
            audience: AppConfig.AUTH0_AUDIENCE,
          }),
        ).pipe(
          mergeMap(response => {
            azureTokenResponse = response;
            return from(
              auth0.webAuth.authorize({
                scope: AppConfig.AUTH0_SCOPE,
                audience: AppConfig.HYBRIS_AUDIENCE,
              }),
            );
          }),
          mergeMap(response => {
            return of(LoginActions.tokenSuccess([azureTokenResponse, response, true], action.meta));
          }),
          catchError(err => {
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure(err);
            }

            if (!isAuth0UserCancel(err)) {
              return from(auth0.webAuth.clearSession({})).pipe(
                mergeMap(stub => {
                  return of(LoginActions.failure({ action, response: undefined }));
                }),
                catchError(err2 => {
                  return of(LoginActions.failure({ action, response: undefined }));
                }),
              );
            } else {
              return of(LoginActions.failure({ action, response: undefined }));
            }
          }),
        );
      }
    }),
    mergeMap(response => from(response)),
  );

export const epicTokenSuccess: Epic = (action$, state$, { api, store }: IDependencies) => {
  let payload: any;
  let meta: any;
  let actualAction: any;
  let retResponse: any;
  return action$.pipe(
    ofType(getType(LoginActions.tokenSuccess)),
    mergeMap(action => {
      meta = action.meta;
      payload = action.payload as any[];
      actualAction = action;
      return api.hybris.getSubscriptionKey();
    }),
    mergeMap(async response => {
      retResponse = response;
      if (response.ok) {
        const authPayload = decodeJWTToken(payload[0].idToken);
        const email = extractEmailFromJWTPayload(authPayload);
        const signUp = actualAction.signUp || extractSignUpFromJWTPayload(authPayload);
        const mobileNumber = extractPhoneNumberFromJWTPayload(authPayload);
        const firstName = extractFirstNameFromJWTPayload(authPayload);
        const lastName = extractLastNameFromJWTPayload(authPayload);
        const digitalID = extractDigitalIdFromJWTPayload(authPayload) as string;
        const clientId = PREFIX_TRADEAPP + state$.value.notification.token; // + ((await firebaseMessaging.messaging().getToken().catch(console.log)) || "");

        await firebaseAnalytics.analytics().setUserId(digitalID);
        await firebaseAnalytics.analytics().setUserProperty("digitalId", digitalID);

        api.hybris.setAuthorization(response.data.access_token, payload[0].accessToken, payload[1].accessToken, email);

        try {
          if (payload[0].refreshToken) {
            await Keychain.setInternetCredentials(KEY_AZURE, email, payload[0].refreshToken);
            await Keychain.setInternetCredentials(KEY_HYBRIS, email, payload[1].refreshToken);
          }
        } catch (e) {}

        const param = {
          email,
          mobileNumber,
          firstName,
          lastName,
          countryOfOrgin: "NZ",
          updateLicense: true,
          digitalID,
        };

        if (extractSignUpFromJWTPayload(authPayload)) {
        }
        return (signUp ? api.hybris.createUser(param) : api.hybris.getUserInfo(email)).pipe(
          mergeMap((resInfo: any) => {
            retResponse = resInfo;
            state$
              .pipe(
                filter(value => !isNilOrEmpty(value.permission.availablePermissions)),
                first(),
              )
              .subscribe(() => {
                const greetings = ["Kia ora, ", "Hello, ", "Hi, ", "Welcome, "].randomVal();
                state$.pipe(first()).subscribe(() => {
                  store().dispatch(NotificationActions.landOnScreen(true));
                  Toast.show({
                    type: "greetings",
                    text1: greetings,
                    text2: retResponse.data?.name,
                    topOffset: Platform.OS === "ios" ? 50 : 30,
                    visibilityTime: 3000,
                    // @ts-ignore
                    onClose: () => {
                      store().dispatch(NotificationActions.landOnScreen(false));
                    },
                  });
                });
              });
            if (resInfo.ok) {
              const token = state$.value.notification.token;
              const time: string = moment().toISOString();
              let type = "";
              let dataschema = "";
              let source = "";

              try {
                if (payload[2]) {
                  type = "com.fbu.pmk.idm.user.login";
                  dataschema = "fbu/pmk/loginnotification";
                  source = `fbu/pmk/idm/user/login/nolocality/tradeapp/v1/${token}`;
                } else {
                  type = "com.fbu.pmk.idm.token.refresh";
                  dataschema = "fbu/pmk/tokenrefreshnotification";
                  source = `fbu/pmk/idm/token/refresh/nolocality/tradeapp/v1/${token}`;
                }
              } catch (e) {
                console.log(e);
              }

              if (resInfo.data.cimSubscriberKey) {
                MCReactModule.setContactKey(resInfo.data.cimSubscriberKey);
                console.log(resInfo.data.cimSubscriberKey);
                publishLogInEvents_Solace(clientId, {
                  specversion: "0.1",
                  type,
                  source,
                  id: generateTransactionId(),
                  dataschema,
                  subject: resInfo.data.cimSubscriberKey,
                  time,
                  datacontentType: "application/json",
                  data: {
                    id: resInfo.data.cimSubscriberKey,
                    firstName,
                    lastName,
                    emails: [
                      {
                        email,
                        isPrimary: true,
                      },
                    ],
                    mobileNumbers: [
                      {
                        mobileNumber,
                        isPrimary: true,
                      },
                    ],
                    digitalId: digitalID,
                    deviceIds: [
                      {
                        deviceId: token,
                        isPrimary: true,
                      },
                    ],
                    created: time,
                    updated: time,
                  },
                });
              }

              // Setup location privacy consent
              getLocationPermission();

              PendoSDK.endSession();
              PendoSDK.startSession(clientId, null, null, null);
              return of(LoginActions.userSuccess(retResponse.data, meta));
            } else {
              if (isUserNotExistInHybris(retResponse)) {
                return of(R.mergeRight(actualAction, { signUp: true }));
              }
              invokeOnPath(["meta", "onFailure"], actualAction);
              return of(
                LoginActions.failure({
                  action: actualAction,
                  response: retResponse,
                }),
              );
            }
          }),
        );
      } else {
        invokeOnPath(["meta", "onFailure"], actualAction);
        return of(LoginActions.failure({ action: actualAction, response: retResponse }));
      }
    }),
    mergeMap(response => from(response)),
  );
};

export const epicGetUserInfo: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(LoginActions.getUserInfo)),
    mergeMap(action => {
      const email = R.path(["login", "userData", "uid"], state$.value);
      return api.hybris.getUserInfo(email).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const actions = [];
            const transformedTradeList = transformTradeList(response.data);
            actions.push(ConnectTradeActions.onSetupTradeAccountListUserInfo(transformedTradeList));

            if (action.meta?.onSuccess) {
              const updatedInfoSelectedAccount = updateSelectedTradeAccountFromUserInfo(
                state$.value.connectTrade?.selectedTradeAccount?.uid,
                transformedTradeList,
              );
              if (updatedInfoSelectedAccount) {
                actions.push(ConnectTradeActions.onSelectedTradeAccountSuccess(updatedInfoSelectedAccount));
              }
            }
            setTimeout(() => invokeOnPath(["meta", "onSuccess"], action), 500);
            actions.push(LoginActions.getUserInfoSuccess());
            return R.apply(of, actions);
          } else {
            return of(LoginActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicUserSuccess: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(LoginActions.userSuccess)),
    mergeMap((action: any) => {
      if (hasTradeAccounts(action.payload)) {
        return of(ConnectTradeActions.onSetupTradeAccountListUserInfo(transformTradeList(action.payload)));
      } else {
        return of(LoginActions.failure({ action, response: undefined }));
      }
    }),
  );

export const epicLogout: Epic = (action$, state$, { api, db }: IDependencies) =>
  action$.pipe(
    ofType(getType(LoginActions.logoutRequest)),
    mergeMap((action: any) => {
      const auth0 = getAuth0();
      return from(auth0.webAuth.clearSession({})).pipe(
        mergeMap(response => {
          api.hybris.deleteToken();

          Keychain.resetInternetCredentials(KEY_AZURE);
          Keychain.resetInternetCredentials(KEY_HYBRIS);
          AsyncStorage.removeItem(KEY_PREVIOUS_TRADEACCOUNT);
          AsyncStorage.removeItem(KEY_IS_RETURNING_USER);
          PendoSDK.endSession();
          db.write(() => {
            db.objects(OrderHistorySchema.name)
              .snapshot()
              .forEach(value => {
                if (value.status !== OrderHistoryStatus.Confirmed) {
                  cleanMQTTQueue(value.status === OrderHistoryStatus.QrCodeGenerate ? value.token : PREFIX_TRADEAPP + value.token);
                  value.status = OrderHistoryStatus.Cancelled;
                }
              });
          });
          invokeOnPath(["meta", "onSuccess"], action);
          return from([
            NotificationActions.landOnScreen(false),
            LoginActions.logoutSuccess(),
            AddressActions.reset(),
            OrderDeliveriesActions.filter(InitialFilter),
            OrderDeliveriesActions.reset(),
            StcReviewOrderActions.updateItem(undefined),
            ConnectTradeActions.onSelectedTradeAccountSuccess(undefined),
            PermissionActions.permissionSuccess({}),
          ]);
        }),
        catchError(err => {
          invokeOnPath(["meta", "onFailure"], action);
          return of(LoginActions.failure({ action, response: undefined }));
        }),
      );
    }),
  );
