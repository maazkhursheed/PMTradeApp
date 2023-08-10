import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, getType, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { ImmutableLoginState, LoginActions } from "~root/Reducers/LoginReducers";
import { ConnectOwnerTradeParams, ConnectTradeParams } from "~root/Types/BranchDetail";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */
export const CONNECTED_TRADE_ACCOUNT = "ConnectedTradeAccount";
const actionCreators = {
  requestConnectTradeAcc: createStandardAction("CONNECT_TRADE_ACCOUNT")<ConnectTradeParams, IAlertCallbacks>(),
  onSuccessConnectTradeAcc: createStandardAction("CONNECT_TRADE_SUCCESS")<any>(),
  onGetFilteredList: createStandardAction("FILTERED_LIST")<any>(),

  onSetupTradeAccountListUserInfo: createStandardAction("SET_TRADE_ACCOUNT_LIST_USERINFO")<any>(),
  onSelectedTradeAccount: createStandardAction("SELECTED_TRADE_ACCOUNT")<any, IAlertCallbacks>(),
  onSelectedTradeAccountSuccess: createStandardAction("SELECTED_TRADE_ACCOUNT_SUCCESS")<any>(),

  resetTradeAccountFilterList: createAction("GET_TRADE_ACCOUNT_LIST_USERINFO"),
  onSuccessFilteredAccounts: createStandardAction("SUCCESS_FILTERED_TRADE_ACCOUNT_LIST_USERINFO")<any>(),

  requestConnectOwnerTradeAcc: createStandardAction("CONNECT_OWNER_TRADE_ACCOUNT")<ConnectOwnerTradeParams, IAlertCallbacks>(),

  onSuccessTradeTemporaryAccess: createStandardAction("SUCCESS_TRADE_TEMPORARY_ACCESS")<any>(),
  failure: createStandardAction("TRADE_ACCOUNT_FAILURE")<FailureRequestParam>(),

  selectFirstTradeAccount: createStandardAction(getType(LoginActions.userSuccess))<any>(),

  requestTradeAccList: createAction("TRADE_ACCOUNT_LIST"),
  onSuccessTradeAccList: createStandardAction("TRADE_ACCOUNT_LIST_SUCCESS")<any>(),

  onLinkTradeAccount: createStandardAction("LINK_TRADE_ACCOUNT")<ConnectOwnerTradeParams, IAlertCallbacks>(),
  newTradeAccountAdded: createStandardAction("NEW_TRADE_ACCOUNT_ADDED")<any, IAlertCallbacks>(),
  removeNewTradeAccountFromState: createStandardAction("REMOVE_NEW_TRADE_ACCOUNT_ADDED")(),
  requestLinkableConnectAccount: createStandardAction("LINKABLE_CONNECT_ACCOUNT_LIST")<ConnectOwnerTradeParams, IAlertCallbacks>(),
  onSuccessLinkableConnectAccounts: createStandardAction("LINKABLE_CONNECT_ACCOUNT_LIST_SUCCESS")<any>(),
};

export const ConnectTradeActions = actionCreators;

export interface ConnectTradeState {
  dataTradeList?: any;
  dataConnectTrade?: any;
  fetching: boolean;
  dataFiltered?: any;
  selectedTradeAccount?: any;
  dataTradeListUserInfo?: any;
  searchTerm?: string;
  filteredAccounts?: [];
  dataTemporaryAccess: any;
  linkableConnectAccounts: any;
  linkableConnectAccountsCount: any;
  newTradeAccountData: any;
}

export type ConnectTradeActions = PayloadAction<string, ConnectTradeState>;

export type ImmutableConnectTradeState = SI.ImmutableObject<ConnectTradeState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableConnectTradeState = SI.from({
  dataTradeList: undefined,
  dataConnectTrade: undefined,
  fetching: false,
  dataFiltered: [],
  selectedTradeAccount: {},
  dataTradeListUserInfo: [],
  searchTerm: "",
  filteredAccounts: [],
  dataTemporaryAccess: { temporaryAccess: false, endDate: "-" },
  linkableConnectAccountsCount: 0,
  linkableConnectAccounts: undefined,
  newTradeAccountData: undefined,
});

/* ------------- Reducers ------------- */

export const requestConnectTradeAcc: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, action) =>
  state.merge({
    fetching: true,
    dataConnectTrade: undefined,
  });

export const onSuccessConnectTradeAcc: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    dataConnectTrade: payload,
    fetching: false,
  });

export const requestConnectOwnerTradeAcc: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, action) =>
  state.merge({
    fetching: true,
    dataConnectTrade: undefined,
  });

export const onSelectedTradeAccount: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    fetching: true,
  });

export const onSelectedTradeAccountSuccess: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    selectedTradeAccount: payload,
    fetching: false,
  });

export const onSetupTradeAccountListUserInfo: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    dataTradeListUserInfo: payload,
    filteredAccounts: payload,
    fetching: false,
  });

export const resetTradeAccountFilterList: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState) =>
  state.merge({
    filteredAccounts: state.dataTradeListUserInfo,
  });

export const onGetFilteredList: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) => state.merge({ searchTerm: payload });

export const onSuccessFilteredAccounts: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({ filteredAccounts: payload });

export const onSuccessTradeTemporaryAccess: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({ dataTemporaryAccess: payload });

export const selectFirstTradeAccount: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    fetching: false,
  });

export const failure: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    fetching: false,
  });

export const requestTradeAccList: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) => state.merge({ fetching: true });

export const onSuccessTradeAccList: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    dataTradeListUserInfo: payload,
    fetching: false,
  });

export const requestLinkableConnectAccount: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({ linkableConnectAccounts: undefined, fetching: true });

export const onSuccessLinkableConnectAccounts: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    linkableConnectAccounts: payload.accounts,
    fetching: false,
    linkableConnectAccountsCount: payload.count,
  });

export const onLinkTradeAccount: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, action) =>
  state.merge({
    fetching: true,
    dataConnectTrade: undefined,
  });

const newTradeAccountAdded: Reducer<ImmutableLoginState> = (state, { payload, meta }) => {
  const temp = payload.connectedTradeAccounts;
  let returnData: undefined;
  if (temp && temp.length > 0) {
    returnData = temp[0];
  }
  return state.merge({ newTradeAccountData: returnData, fetching: false });
};

const removeNewTradeAccountFromState: Reducer<ImmutableLoginState> = state => {
  return state.merge({ newTradeAccountData: undefined });
};

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableConnectTradeState> = {
  onSuccessTradeTemporaryAccess,
  onSuccessFilteredAccounts,
  onGetFilteredList,
  resetTradeAccountFilterList,
  onSelectedTradeAccount,
  onSelectedTradeAccountSuccess,
  onSetupTradeAccountListUserInfo,
  requestConnectTradeAcc,
  onSuccessConnectTradeAcc,
  requestConnectOwnerTradeAcc,
  selectFirstTradeAccount,
  failure,
  requestTradeAccList,
  onSuccessTradeAccList,
  requestLinkableConnectAccount,
  onSuccessLinkableConnectAccounts,
  onLinkTradeAccount,
  newTradeAccountAdded,
  removeNewTradeAccountFromState,
};

export const ConnectTradeReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ConnectTradeReducer;
