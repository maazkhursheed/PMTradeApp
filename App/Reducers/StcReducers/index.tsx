import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { STCEventScreenNames } from "~root/Lib/STCHelper";
import { ImmutableConnectTradeState } from "~root/Reducers/ConnectTradeReducers";
import { ImmutableJobAccountsState } from "~root/Reducers/JobAccountsReducers";
import { ImmutableProductState } from "~root/Reducers/ProductReducers";
import { ImmutableStcReviewOrderState } from "~root/Reducers/StcReviewOrderReducers";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { JobItem } from "~root/Types/JobAccounts";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  switchScreen: createStandardAction("STC_SWITCH_SCREEN")<string, {} | undefined>(),
  purchaseToken: createStandardAction("STC_AUTH_TOKEN")<string, IAlertCallbacks>(),
  purchaseTokenCompleted: createAction("STC_AUTH_TOKEN_COMPLETED"),
  stcTokenfailure: createStandardAction("LOGIN_FAILURE")<FailureRequestParam>(),

  requestExpiryToken: createStandardAction("REQUEST_EXPIRY_TOKEN")<undefined, IAlertCallbacks>(),
  successExpiryToken: createAction("SUCCESS_EXPIRY_TOKEN"),
  failureExpiryToken: createAction("FAILURE_EXPIRY_TOKEN"),

  stcJobAccountList: createStandardAction("STC_JOB_ACCOUNTS_SUCCESS")<JobItem[]>(),
  setJobAccount: createStandardAction("STC_SET_JOBACCOUNT")<JobItem | undefined>(),
  failure: createStandardAction("STC_TOGGLE_FEATURE_FAILURE")<FailureRequestParam>(),
  request: createStandardAction("STC_REVIEW_ORDER_SUBTOTAL_REQUEST")<string>(),
  success: createStandardAction("STC_REVIEW_ORDER_SUBTOTAL_SUCCESS")<{}>(),
  requestSTCStockPrice: createStandardAction("REQUEST_STC_CART_STOCK_PRICE")<any>(),
  successSTCCart: createStandardAction("STC_PRODUCT_SUCCESS_CART")<any>(),
};

export const StcActions = actionCreators;

export interface StcState {
  data?: string | null;
  stcJobAccount: any;
  fetching?: boolean | null;
  jobAccountList?: JobItem[];
  stcToggleFlag: boolean;
  stcSubTotal: number | null;
  cartData?: any;
  navigation?: { screen: STCEventScreenNames; params: {} };
}

export type StcAction = PayloadAction<string, StcState>;

export type ImmutableStcState = SI.ImmutableObject<StcState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableStcState = SI.from({
  data: null,
  fetching: null,
  stcJobAccount: null,
  jobAccountList: [],
  stcToggleFlag: true,
  stcSubTotal: null,
  cartData: [],
  navigation: undefined,
});

/* ------------- Reducers ------------- */

export const setJobAccount: Reducer<ImmutableStcState> = (state: ImmutableStcState, action: any) => state.merge({ stcJobAccount: action.payload });

export const switchScreen: Reducer<ImmutableStcState> = (state: ImmutableStcState, action: any) =>
  state.merge({ navigation: { screen: action.payload, params: action.meta } });

export const requestExpiryToken: Reducer<ImmutableStcState> = (state: ImmutableStcState) => state.merge({ fetching: true });

export const successExpiryToken: Reducer<ImmutableStcState> = (state: ImmutableStcState, action: any) => state.merge({ fetching: false });

export const failureExpiryToken: Reducer<ImmutableStcState> = (state: ImmutableStcState, action: any) => state.merge({ fetching: false });

export const purchaseToken: Reducer<ImmutableStcState> = (state, action) => state.merge({ fetching: true });

export const purchaseTokenCompleted: Reducer<ImmutableStcState> = (state, action) => state.merge({ fetching: false });

export const stcTokenfailure: Reducer<ImmutableStcState> = state => state.merge({ fetching: false });

export const stcJobAccountList: Reducer<ImmutableJobAccountsState> = (state: any, action: AnyAction & { payload?: JobItem[] }) => {
  return state.merge({
    fetching: false,
    error: false,
    jobAccountList: action.payload,
  });
};

export const stcToggleFeatureFlag: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) => state.merge({ fetching: true });

export const stcSetToggleFeatureFlag: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    stcToggleFlag: payload,
    fetching: false,
  });

export const failure: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    fetching: false,
  });

export const requestSTCStockPrice: Reducer<ImmutableProductState> = (state: ImmutableProductState, { payload }) => state.merge({ fetching: true });

export const request: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: true, data: undefined });

export const success: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState, action: AnyAction) =>
  state.merge({
    fetching: false,
    data: action.payload,
  });
const successSTCCart: Reducer<ImmutableProductState> = (state: any, { payload }) => state.merge({ cartData: payload });
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableStcState> = {
  setJobAccount,
  requestExpiryToken,
  successExpiryToken,
  failureExpiryToken,
  purchaseToken,
  purchaseTokenCompleted,
  stcTokenfailure,
  stcJobAccountList,
  stcToggleFeatureFlag,
  stcSetToggleFeatureFlag,
  failure,
  requestSTCStockPrice,
  request,
  success,
  switchScreen,
  successSTCCart,
};

export const StcReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default StcReducer;
