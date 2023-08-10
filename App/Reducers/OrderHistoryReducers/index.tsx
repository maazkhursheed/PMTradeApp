import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IOrderHistoryObject } from "~root/Db/OrderHistorySchema";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  request: createAction("ORDER_HISTORY_REQUEST"),
  success: createStandardAction("ORDER_HISTORY_SUCCESS")<IOrderHistoryObject[]>(),
  checkOrderStatusInDb: createAction("ORDER_HISTORY_ORDER_PROGRESS"),
  updateItem: createStandardAction("ORDER_HISTORY_UPDATE_ITEM")<IOrderHistoryObject>(),
  validateTokenFailure: createAction("VALIDATE_TOKEN_FAILURE"),
  validateTokenSuccess: createAction("VALIDATE_TOKEN_SUCCESS"),
};

export const OrderHistoryActions = actionCreators;

export interface OrderHistoryState {
  data?: IOrderHistoryObject[];
  fetching?: boolean | null;
}

export type OrderHistoryAction = PayloadAction<string, OrderHistoryState>;

export type ImmutableOrderHistoryState = SI.ImmutableObject<OrderHistoryState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableOrderHistoryState = SI.from({
  data: [],
  fetching: null,
});

/* ------------- Reducers ------------- */

export const request: Reducer<any> = (state: ImmutableOrderHistoryState) => state.merge({ fetching: true });

export const updateItem: Reducer<any> = (state: ImmutableOrderHistoryState) => state.merge({ fetching: true });

export const success: Reducer<any> = (state: ImmutableOrderHistoryState, action: AnyAction & { payload?: any }) =>
  state.merge({
    fetching: false,
    data: action.payload,
  });

export const checkOrderStatusInDb: Reducer<any> = (state: ImmutableOrderHistoryState) =>
  state.merge({
    fetching: true,
  });

export const validateTokenFailure: Reducer<any> = (state: ImmutableOrderHistoryState) =>
  state.merge({
    fetching: false,
  });

export const validateTokenSuccess: Reducer<any> = (state: ImmutableOrderHistoryState) =>
  state.merge({
    fetching: false,
  });
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableOrderHistoryState> = {
  request,
  success,
  updateItem,
  checkOrderStatusInDb,
  validateTokenFailure,
  validateTokenSuccess,
};

export const OrderHistoryReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default OrderHistoryReducer;
