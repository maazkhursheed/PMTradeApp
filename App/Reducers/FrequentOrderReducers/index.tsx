import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestFrequentOrder: createAction("FREQUENT_ORDER_PRODUCTS"),
  successFrequentOrder: createStandardAction("SEARCH_TOP40_SUCCESS")<any>(),
  failure: createStandardAction("SEARCH_FAILURE")<FailureRequestParam>(),
};

export const FrequentOrderActions = actionCreators;

export interface FrequentOrderState {
  top40: any[];
  fetching: boolean;
}

export type ImmutableFrequentOrderState = SI.ImmutableObject<FrequentOrderState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableFrequentOrderState = SI.from({
  top40: [],
  fetching: false,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const request: Reducer<ImmutableSearchState> = (state: ImmutableFrequentOrderState) => state.merge({ fetching: true });

// @ts-ignore
export const failure: Reducer<ImmutableFrequentOrderState> = (state: ImmutableFrequentOrderState) => state.merge({ fetching: false });

// @ts-ignore
export const success: Reducer<ImmutableFrequentOrderState> = (state: ImmutableFrequentOrderState, action: any) =>
  state.merge({ fetching: false, top40: action.payload.products });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableFrequentOrderState> = {
  requestFrequentOrder: request,
  successFrequentOrder: success,
  failure,
};

export const FrequentOrderReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default FrequentOrderReducer;
