import * as R from "ramda";
import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { OrderSort } from "~root/Types/OrderItem";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  request: createStandardAction("EXISTING_ORDERS_REQUEST")<undefined, IAlertCallbacks>(),
  success: createStandardAction("EXISTING_ORDERS_SUCCESS")<any>(),
  failure: createStandardAction("EXISTING_ORDERS_FAILURE")<FailureRequestParam>(),
};

export const ExistingOrdersActions = actionCreators;

export interface ExistingOrdersState {
  data?: any | null;
  fetching: boolean;
}

export type ExistingOrdersAction = PayloadAction<string, ExistingOrdersState>;

export type ImmutableExistingOrdersState = SI.ImmutableObject<ExistingOrdersState>;

/* ------------- Initial State ------------- */

export const InitialFilter = {
  sort: R.compose(R.head, R.keys)(OrderSort),
  status: [],
};

export const INITIAL_STATE: ImmutableExistingOrdersState = SI.from({
  data: [],
  fetching: false,
});

/* ------------- Reducers ------------- */

export const request: Reducer<ImmutableExistingOrdersState> = (state: ImmutableExistingOrdersState) => state.merge({ fetching: true });

export const success: Reducer<ImmutableExistingOrdersState> = (state: ImmutableExistingOrdersState, action: AnyAction & { payload?: any }) => {
  return state.merge({
    fetching: false,
    data: action.payload,
  });
};

export const failure: Reducer<ImmutableExistingOrdersState> = (state: ImmutableExistingOrdersState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableExistingOrdersState> = {
  request,
  failure,
  success,
};

export const ExistingOrdersReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ExistingOrdersReducer;
