import R from "ramda";
import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IOrderHistoryObject } from "~root/Db/OrderHistorySchema";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  request: createStandardAction("STC_REVIEW_ORDER_REQUEST")<string, IAlertCallbacks>(),
  success: createStandardAction("STC_REVIEW_ORDER_SUCCESS")<{}>(),
  updateItem: createStandardAction("STC_REVIEW_ORDER_UPDATE_ITEM")<IOrderHistoryObject>(),
  failure: createStandardAction("STC_REVIEW_ORDER_FAILURE")<FailureRequestParam>(),
  requestOrderConfirm: createStandardAction("STC_REVIEW_ORDER_CONFIRM_REQUEST")<string, IAlertCallbacks>(),
  successOrderConfirm: createAction("STC_REVIEW_ORDER_CONFIRM_SUCCESS"),
  failureOrderConfirm: createStandardAction("STC_REVIEW_ORDER_CONFIRM_FAILURE")<FailureRequestParam>(),
  showLoader: createAction("ORDER_HISTORY_LOADER_SHOW"),
  hideLoader: createAction("ORDER_HISTORY_LOADER_HIDE"),
  resumeOrder: createStandardAction("STC_RESUME_ORDER_REQUEST")<string, IAlertCallbacks>(),
  resumeOrderFailure: createAction("STC_RESUME_ORDER_FAILURE"),
  resumeOrderSuccess: createAction("STC_RESUME_ORDER_SUCCESS"),
  resetItem: createAction("STC_RESET_ITEM"),
};

export const StcReviewOrderActions = actionCreators;

export interface StcReviewOrderState {
  data?: any | null;
  item?: IOrderHistoryObject;
  fetching?: boolean | null;
  waitingForEvent?: boolean | null;
}

export type StcReviewOrderAction = PayloadAction<string, StcReviewOrderState>;

export type ImmutableStcReviewOrderState = SI.ImmutableObject<StcReviewOrderState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableStcReviewOrderState = SI.from({
  data: null,
  fetching: null,
  waitingForEvent: null,
});

/* ------------- Reducers ------------- */

export const request: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: true, data: undefined });

export const success: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState, action: AnyAction) =>
  state.merge({
    fetching: false,
    data: action.payload,
  });

export const updateItem: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState, action: AnyAction) =>
  state.merge({
    fetching: false,
    item: R.mergeRight(state.item, action.payload),
  });

export const requestOrderConfirm: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: true });

export const successOrderConfirm: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState, action: AnyAction) =>
  state.merge({ fetching: false });

export const showLoader: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ waitingForEvent: true });

export const hideLoader: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState, action: AnyAction) =>
  state.merge({ waitingForEvent: false });

export const failure: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: false, data: undefined });

export const failureOrderConfirm: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: false });

export const resumeOrder: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: true });

export const resumeOrderFailure: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: false });

export const resumeOrderSuccess: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ fetching: false });

export const resetItem: Reducer<ImmutableStcReviewOrderState> = (state: ImmutableStcReviewOrderState) => state.merge({ item: undefined });
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableStcReviewOrderState> = {
  request,
  failure,
  success,
  requestOrderConfirm,
  successOrderConfirm,
  failureOrderConfirm,
  showLoader,
  updateItem,
  hideLoader,
  resumeOrder,
  resumeOrderSuccess,
  resumeOrderFailure,
  resetItem,
};

export const StcReviewOrderReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default StcReviewOrderReducer;
