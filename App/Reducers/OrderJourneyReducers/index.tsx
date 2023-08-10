import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  success: createAction("ORDER_JOURNEY_SUCCESS"),
  requestJobAccountsAndBranch: createStandardAction("ORDER_JOURNEY_JOB_ACCOUNT_AND_BRANCH_DETAILS")<OrderTypes | undefined, IAlertCallbacks>(),
};

export const OrderJourneyActions = actionCreators;

export interface OrderJourneyState {
  fetching?: boolean;
}

export type OrderJourneyAction = PayloadAction<string, OrderJourneyState>;

export type ImmutableOrderJourneyState = SI.ImmutableObject<OrderJourneyState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableOrderJourneyState = SI.from({
  fetching: false,
});

/* ------------- Reducers ------------- */

export const requestJobAccountsAndBranch: Reducer<ImmutableOrderJourneyState> = (state: any) => state.merge({ fetching: true });

export const success: Reducer<ImmutableOrderJourneyState> = (state: any) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableOrderJourneyState> = {
  success,
  requestJobAccountsAndBranch,
};

export const OrderJourneyReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default OrderJourneyReducer;
