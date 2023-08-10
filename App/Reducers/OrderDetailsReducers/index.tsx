import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import OrderDetailModel from "~root/Types/OrderDetail";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  request: createStandardAction("ORDER_DETAILS_REQUEST")<OrderDetailModel, IAlertCallbacks>(),
  success: createStandardAction("ORDER_DETAILS_SUCCESS")<OrderDetailModel>(),
  failure: createStandardAction("ORDER_DETAILS_FAILURE")<FailureRequestParam>(),
  clearOrderDetailsData: createStandardAction("CLEAR_ORDER_DETAILS_DATA")<boolean>(),
};

export const OrderDetailsActions = actionCreators;

export interface OrderDetailsState {
  data?: OrderDetailModel;
  fetching: boolean;
}

export type OrderDetailsAction = PayloadAction<string, OrderDetailsState>;

export type ImmutableOrderDetailsState = SI.ImmutableObject<OrderDetailsState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableOrderDetailsState = SI.from({
  data: undefined,
  fetching: false,
});

/* ------------- Reducers ------------- */

export const request: Reducer<ImmutableOrderDetailsState> = (state: ImmutableOrderDetailsState, action) =>
  state.merge({
    fetching: true,
    data: undefined,
  });

export const success: Reducer<ImmutableOrderDetailsState> = (state: ImmutableOrderDetailsState, { payload }) =>
  state.merge({
    data: payload,
    fetching: false,
  });

export const failure: Reducer<ImmutableOrderDetailsState> = (state: ImmutableOrderDetailsState) => state.merge({ fetching: false });

export const clearOrderDetailsData: Reducer<ImmutableOrderDetailsState> = (state: ImmutableOrderDetailsState, { payload }) =>
  state.merge({
    data: undefined,
    fetching: payload,
  });
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableOrderDetailsState> = {
  request,
  success,
  failure,
  clearOrderDetailsData,
};

export const OrderDetailsReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default OrderDetailsReducer;
