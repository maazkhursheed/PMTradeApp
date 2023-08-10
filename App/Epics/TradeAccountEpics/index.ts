// import {Epic, ofType} from "redux-observable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as R from "ramda";
import * as Keychain from "react-native-keychain";
import { Epic, ofType } from "redux-observable";
import { from, of, zip } from "rxjs";
import { debounceTime, filter, map, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import * as JobAccounts from "~root/Lib/JobAccountsHelper";
import { getIndexedTradeAccount, getTradeAccountCount, hasTradeAccounts } from "~root/Lib/LoginHelper";
import { hasPermissionFromArray, transformResponseToAvailablePermission } from "~root/Lib/PermissionHelperLib";
import { transformTradeList } from "~root/Lib/TradeAccountsHelper";
import NavigationService from "~root/Navigation/NavigationService";
import { AppActions } from "~root/Reducers/AppReducers";
import { BranchDetailsActions, SELECTED_BRANCH } from "~root/Reducers/BranchDetailReducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { CONNECTED_TRADE_ACCOUNT, ConnectTradeActions } from "~root/Reducers/ConnectTradeReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { JobAccountsActions, SELECTED_JOB_ACCOUNT } from "~root/Reducers/JobAccountsReducers";
import { getEmail, LoginActions } from "~root/Reducers/LoginReducers";
import { NotificationActions } from "~root/Reducers/NotificationReducers";
import { OrderJourneyActions } from "~root/Reducers/OrderJourneyReducers";
import { PermissionActions } from "~root/Reducers/PermissionReducers";
import { PermissionTypes } from "~root/Types/Permissions";
import { KEY_AZURE, KEY_HYBRIS } from "../LoginEpics";

const PREVIOUS_LOGGED_UID = "previousLoggedInUID";
export const epicValidatePermissions: Epic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(getType(PermissionActions.validatePermissionRecheck)),
    mergeMap(action => {
      const transformedPermissions = action.payload.permissions ? action.payload.permissions : state$.value.permission.availablePermissions;

      if (hasPermissionFromArray(action.payload.permissionsToCheck, transformedPermissions)) {
        invokeOnPath(["meta", "onSuccess"], action);
      } else {
        NavigationService.navigate("Dashboard", {
          screen: "OrderDeliveries",
        });
      }

      return of(AppActions.voidAction());
    }),
  );

export const epicOnTradeAccountSelection: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    filter(
      R.compose(
        // @ts-ignore
        R.includes(R.__, R.map(getType, [LoginActions.userSuccess, ConnectTradeActions.onSelectedTradeAccount, PermissionActions.validatePermission])),
        R.prop("type"),
      ),
    ),
    mergeMap(async action => {
      let data: any;
      let iteration = 0;
      const connectTradeAccount = await AsyncStorage.getItem(CONNECTED_TRADE_ACCOUNT);
      let tradeAccount = connectTradeAccount && action.type === getType(LoginActions.userSuccess) ? JSON.parse(connectTradeAccount) : undefined;
      if (action.type === getType(LoginActions.userSuccess)) {
        const previousLoggedInUid = await AsyncStorage.getItem(PREVIOUS_LOGGED_UID).catch(err => console.log(err));
        if (previousLoggedInUid !== action.payload.uid) {
          await AsyncStorage.setItem(PREVIOUS_LOGGED_UID, action.payload.uid);
          await AsyncStorage.removeItem(CONNECTED_TRADE_ACCOUNT);
          await AsyncStorage.removeItem(SELECTED_JOB_ACCOUNT);
          await AsyncStorage.removeItem(SELECTED_BRANCH);
          tradeAccount = undefined;
        }
      }

      switch (action.type) {
        case getType(LoginActions.userSuccess): {
          iteration = R.propOr(0, "iteration", action);
          data = {
            selectedTradeAccount: tradeAccount ? tradeAccount : getIndexedTradeAccount(iteration, action.payload),
            userData: action.payload,
          };
          break;
        }
        case getType(ConnectTradeActions.onSelectedTradeAccount): {
          await AsyncStorage.setItem(CONNECTED_TRADE_ACCOUNT, JSON.stringify(action.payload));
          await AsyncStorage.removeItem(SELECTED_JOB_ACCOUNT);
          data = {
            selectedTradeAccount: action.payload,
            userData: state$.value.login.userData,
          };
          break;
        }
        case getType(PermissionActions.validatePermission): {
          data = {
            selectedTradeAccount: state$.value.connectTrade.selectedTradeAccount,
            userData: state$.value.login.userData,
          };
          break;
        }
      }

      const tradeAccountCount = getTradeAccountCount(data.userData);
      if (!data.userData.isLicenseUpdated || !hasTradeAccounts(data.userData)) {
        return of(
          action.type === getType(LoginActions.userSuccess)
            ? LoginActions.failure({ action, response: undefined })
            : ConnectTradeActions.failure({ action, response: undefined }),
        );
      }

      return zip(
        api.hybris.getPermissionList(getEmail(data.userData), R.prop("uid", data.selectedTradeAccount)),
        api.hybris.getBranchDetails({
          branchId: data.selectedTradeAccount?.branch?.branchID,
          depotsRequired: true,
          fields: "FULL",
        }),
      ).pipe(
        mergeMap(response => {
          const email = getEmail(state$.value.login.userData);
          if (isResponseOk(response[0])) {
            return api.hybris.getJobAccounts(email, data.selectedTradeAccount.uid).pipe(
              map(responseJob => {
                return [...response, responseJob];
              }),
            );
          } else {
            return of(response);
          }
        }),
        mergeMap(async response => {
          if (isResponseOk(response[0]) && isResponseOk(response[1])) {
            const transformedPermissions = transformResponseToAvailablePermission(response[0].data);
            const selectedJobAccount = await AsyncStorage.getItem(SELECTED_JOB_ACCOUNT);
            let jobAccount;
            if (action.payload.prevJobId && response[2]) {
              const jobAccountsForPrev = JobAccounts.fetchHybrisJobs(response[2].data);
              // @ts-ignore
              jobAccount = R.find(R.propEq("JobId", action.payload.prevJobId), jobAccountsForPrev);
            } else {
              jobAccount =
                selectedJobAccount && action.type !== getType(ConnectTradeActions.onSelectedTradeAccount) ? JSON.parse(selectedJobAccount) : undefined;
            }

            const selectedBranch = await AsyncStorage.getItem(SELECTED_BRANCH);
            const selectedBranchObj = selectedBranch ? JSON.parse(selectedBranch) : undefined;

            const actions = [
              PermissionActions.permissionSuccess(transformedPermissions),
              // BranchDetailsActions.setBranchDetails(response[1].data.pointOfServices[0]),
              LoginActions.loginSuccess(),
              JobAccountsActions.selectJobAccount(jobAccount),
              ConnectTradeActions.onSelectedTradeAccountSuccess(data.selectedTradeAccount),
            ];

            if (action.type === getType(LoginActions.userSuccess)) {
              actions.push(CartActions.requestUserCart());
            }

            if (action.type === getType(PermissionActions.validatePermission)) {
              // @ts-ignore
              actions.push(
                PermissionActions.validatePermissionRecheck(
                  {
                    permissionsToCheck: action.payload,
                    permissions: transformedPermissions,
                  },
                  action.meta,
                ),
              );
            } else {
              const branches = response[1].data.pointOfServices;
              if (branches.length >= 1) {
                actions.push(BranchDetailsActions.onSelectBranch(selectedBranchObj ? selectedBranchObj : branches[0]));
              }
              actions.push(BranchDetailsActions.branchDepotSuccess(branches));
              actions.push(OrderJourneyActions.requestJobAccountsAndBranch(undefined, {}));

              let jobAccounts;
              if (isResponseOk(response[2]) && response[2].data) {
                jobAccounts = JobAccounts.fetchHybrisJobs(response[2].data);
              }
              actions.push(JobAccountsActions.success(jobAccounts));
              action.meta?.onSuccess?.(jobAccounts);
            }
            actions.push(NotificationActions.getInboxMessages());
            return R.apply(of, actions);
          } else {
            if (action.type === getType(LoginActions.userSuccess) && iteration < tradeAccountCount - 1) {
              if (data.selectedTradeAccount?.uid === JSON.parse(connectTradeAccount)?.uid) {
                await AsyncStorage.removeItem(CONNECTED_TRADE_ACCOUNT);
                await AsyncStorage.removeItem(SELECTED_JOB_ACCOUNT);
              }

              return of(R.mergeRight(action, { iteration: iteration + 1 }));
            }

            invokeOnPath(["meta", "onFailure"], action);
            return of(
              action.type === getType(LoginActions.userSuccess)
                ? LoginActions.failure({ action, response: response[0] })
                : ConnectTradeActions.failure({
                    action,
                    response: response[0],
                  }),
            );
          }
        }),
        mergeMap(obj => from(obj)),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const epicTradeAccount: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ConnectTradeActions.requestConnectTradeAcc)),
    mergeMap(action => {
      // const {ofFailure, params} = action.payload;
      const email = getEmail(state$.value.login.userData);
      const reqParams = {
        email,
        // TODO This should always be true -- Check with Waqas
        isAccountOwner: state$.value.permission.availablePermissions[PermissionTypes.AccountOwner],
        accountId: action.payload.accountId,
        branchId: action.payload.branchId,
      };

      return api.hybris.connectTradeAccount(reqParams).pipe(
        mergeMap(response => {
          if (isResponseOk(response.ok)) {
            return of(ConnectTradeActions.onSuccessConnectTradeAcc(response.data));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(ConnectTradeActions.failure({ response, action }));
          }
        }),
      );
    }),
  );

export const epicGetTradeAccountFilteredList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ConnectTradeActions.onGetFilteredList)),
    filter(R.compose(R.gte(R.__, 0), R.length, R.prop("payload"))),
    debounceTime(2),
    mergeMap(action => {
      const tradeAccounts = state$.value.connectTrade.dataTradeListUserInfo;
      if (action.payload !== "") {
        const t = tradeAccounts.reduce((result, item) => {
          const { title, data } = item;
          const filteredData = data.filter(element => {
            return (element.name || "").includes(action.payload) || (element.custId || "").includes(action.payload);
          });

          if (filteredData.length !== 0) {
            result.push({
              title,
              data: filteredData,
            });
          }
          return result;
        }, []);
        return of(ConnectTradeActions.onSuccessFilteredAccounts(t));
      } else {
        return of(ConnectTradeActions.onSuccessFilteredAccounts(state$.value.connectTrade.dataTradeListUserInfo));
      }
    }),
  );

export const epicGetTradeAccountList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ConnectTradeActions.requestTradeAccList)),
    mergeMap(action => {
      const email = getEmail(state$.value.login.userData);
      return api.hybris.getUserInfo(email).pipe(
        mergeMap(response => {
          if (response.ok) {
            return of(ConnectTradeActions.onSetupTradeAccountListUserInfo(transformTradeList(response.data)));
          } else {
            return of(ConnectTradeActions.failure({ action, response }));
          }
        }),
      );
    }),
  );

export const epicNewTradeAccountAdded: Epic = action$ => {
  return action$.pipe(
    ofType(getType(ConnectTradeActions.newTradeAccountAdded)),
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

export const epicSelectJobAccount: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(JobAccountsActions.selectJobAccount)),
    mergeMap(() => of(JobAccountsActions.selectJobAccountSuccess())),
  );
