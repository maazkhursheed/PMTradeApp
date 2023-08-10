import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import * as R from "ramda";
import { Alert } from "react-native";
import UXCam from "react-native-ux-cam";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { finalize, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { masterOnHoldMessage } from "~root/Lib/AlertsHelper";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { isResponseOk } from "~root/Lib/DataHelper";
import { fetchHybrisJobs } from "~root/Lib/JobAccountsHelper";
import { decodeJWTToken } from "~root/Lib/LoginHelper";
import { startOfDate } from "~root/Lib/OrderHistoryHelper";
import { hasPermissionFromArray, transformResponseToAvailablePermission } from "~root/Lib/PermissionHelperLib";
import { KEY_PREVIOUS_TRADEACCOUNT } from "~root/Lib/STCHelper";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { getEmail } from "~root/Reducers/LoginReducers";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { STCConnectTradeActions } from "~root/Reducers/STCConnectTradeReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import { StcReviewOrderActions } from "~root/Reducers/StcReviewOrderReducers";
import { PermissionTypes } from "~root/Types/Permissions";

export const epicRequestExpiryToken: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcActions.requestExpiryToken)),
    mergeMap((action: any) => {
      return of(StcActions.successExpiryToken()).pipe(finalize(() => invokeOnPath(["meta", "onSuccess"], action)));
    }),
  );

export const epicSTCAuthTokenRequest: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(StcActions.purchaseToken)),
    mergeMap((action: any) => {
      const digitalID = R.compose(R.prop("sub"), decodeJWTToken, R.path(["login", "tempToken", "accessToken"]))(state$.value);

      const deviceId = R.path(["notification", "token"])(state$.value);
      const branchId = R.path(["connectTrade", "selectedTradeAccount", "branch", "branchCode"])(state$.value);
      const clientId = R.path(["connectTrade", "selectedTradeAccount", "custId"])(state$.value);
      const poNumber = action.payload;
      let jobAccount = R.path(["jobAccounts", "selectedJobAccount", "JobNumber"])(state$.value);
      jobAccount = jobAccount ? jobAccount : clientId;

      const customerName = R.path(["login", "userData", "name"])(state$.value);
      const contactNumber = R.path(["login", "userData", "mobileNumber"])(state$.value);
      const accountName = R.path(["connectTrade", "selectedTradeAccount", "name"], state$.value);

      return api.hybris
        .getPurchaseToken({
          digitalID,
          branchId,
          jobAccount,
          clientId,
          additionalinfo: [{ ref_Number: poNumber }],
          deviceId: "",
          customerName,
          contactNumber,
        })
        .pipe(
          mergeMap(responseToken => {
            if (responseToken.ok && !R.path(["data", "isError"], responseToken)) {
              // MCReactModule.setContactKey(R.pathOr("NOTAVAILABLE", ["body", "subscriberkey"], responseToken.data));
              const token = responseToken.data.body.tokenId;
              const item = {
                orderId: "",
                poNumber,
                accountName,
                expiryDate: responseToken.data.body.expire,
                branchId,
                fulfilmentBranchId: branchId,
                jobAccount,
                clientId,
                date: startOfDate(new Date()),
                time: moment().toISOString(),
                token,
                status: OrderHistoryStatus.QrCodeGenerate,
                resumeCount: "0",
              };
              return of(StcActions.purchaseTokenCompleted(), OrderHistoryActions.updateItem(item), StcReviewOrderActions.updateItem(item)).pipe(
                finalize(() => invokeOnPath(["meta", "onSuccess"])(action)),
              );
            } else {
              // MCReactModule.setContactKey(R.pathOr("NOTAVAILABLE", ["body", "subscriberkey"], responseToken.data));
              return of(StcActions.stcTokenfailure({ response: undefined, action })).pipe(finalize(() => invokeOnPath(["meta", "onFailure"])(action)));
            }
          }),
        );
    }),
  );

export const epicSTCOnTradeAccountSelection: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(STCConnectTradeActions.onSelectedSTCTradeAccount)),
    mergeMap(action => {
      const data = state$.value.login.userData;

      const masterOnHold = R.propOr(false, "masterOnHold", action.payload);
      if (masterOnHold) {
        UXCam.setAutomaticScreenNameTagging(false);
        Alert.alert(undefined, masterOnHoldMessage);
        return of(
          STCConnectTradeActions.failure({
            action,
            response: undefined,
          }),
        );
      }
      return api.hybris.getPermissionList(getEmail(data), R.prop("uid", action.payload)).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const transformedPermissions = transformResponseToAvailablePermission(response.data);
            if (hasPermissionFromArray([PermissionTypes.PlaceOrders, PermissionTypes.AccountOwner, PermissionTypes.UserAdmin], transformedPermissions)) {
              const selectedTradeAcc = action.payload;
              AsyncStorage.setItem(KEY_PREVIOUS_TRADEACCOUNT, JSON.stringify(selectedTradeAcc));
              const actions = [];
              const email = getEmail(state$.value.login.userData);
              return api.hybris.getJobAccounts(email, selectedTradeAcc.uid).pipe(
                mergeMap(responseArray => {
                  if (isResponseOk(responseArray)) {
                    const jobs = fetchHybrisJobs(responseArray.data);
                    if (action.meta && action.meta.onSuccess) {
                      action.meta.onSuccess(jobs);
                    }
                    actions.push(StcActions.stcJobAccountList(jobs));
                    return from(actions);
                  } else {
                    invokeOnPath(["meta", "onFailure"], action);
                    actions.push(AppActions.appGenericErrorVisibility(true));
                    actions.push(
                      STCConnectTradeActions.failure({
                        action,
                        response: undefined,
                      }),
                    );
                    return from(actions);
                  }
                }),
              );
            } else {
              return of(
                AppActions.appGenericErrorVisibility(true),
                STCConnectTradeActions.failure({
                  action,
                  response: undefined,
                }),
              );
            }
          } else {
            return of(
              AppActions.appGenericErrorVisibility(true),
              STCConnectTradeActions.failure({
                action,
                response: undefined,
              }),
            );
          }
        }),
      );
    }),
  );
