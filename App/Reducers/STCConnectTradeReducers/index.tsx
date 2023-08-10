import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  onSelectedSTCTradeAccount: createStandardAction("STC_SELECTED_TRADE_ACCOUNT")<any, IAlertCallbacks>(),
  failure: createStandardAction("STC_TRADE_ACCOUNT_FAILURE")<FailureRequestParam>(),
};

export const STCConnectTradeActions = actionCreators;

export interface STCConnectTradeState {
  fetching: boolean;
  selectedSTCTradeAccount?: any;
}

export type STCConnectTradeActions = PayloadAction<string, STCConnectTradeState>;

export type ImmutableConnectTradeState = SI.ImmutableObject<STCConnectTradeState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableConnectTradeState = SI.from({
  fetching: false,
  selectedSTCTradeAccount: {},
});

/* ------------- Reducers ------------- */

export const onSelectedSTCTradeAccount: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    fetching: true,
  });

export const failure: Reducer<ImmutableConnectTradeState> = (state: ImmutableConnectTradeState, { payload }) =>
  state.merge({
    fetching: false,
  });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableConnectTradeState> = {
  onSelectedSTCTradeAccount,
  failure,
};

export const STCConnectTradeReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default STCConnectTradeReducer;
