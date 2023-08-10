import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { EstimatesDetailParams, EstimatesListByIdParams } from "~root/Types/Estimates";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestEstimatesList: createStandardAction("REQUEST_ESTIMATES_LIST")<any, IAlertCallbacks>(),
  estimatesListSuccess: createStandardAction("ESTIMATES_LIST_SUCCESS")<any>(),
  estimatesListFailure: createStandardAction("ESTIMATES_LIST_FAILURE")<any>(),
  requestEstimatesListById: createStandardAction("REQUEST_ESTIMATES_LIST_BY_ID")<EstimatesListByIdParams, IAlertCallbacks>(),
  estimatesListByIdSuccess: createStandardAction("ESTIMATES_LIST_BY_ID_SUCCESS")<any>(),
  estimatesListByIdFailure: createStandardAction("ESTIMATES_LIST_BY_ID_FAILURE")<any>(),
  requestEstimatesListDetails: createStandardAction("REQUEST_ESTIMATES_LIST_DETAILS")<EstimatesDetailParams, IAlertCallbacks>(),
  estimatesListDetailsSuccess: createStandardAction("ESTIMATES_LIST_DETAILS_SUCCESS")<any>(),
  estimatesListDetailsFailure: createStandardAction("ESTIMATES_LIST_DETAILS_FAILURE")<any>(),
};

export const EstimatesActions = actionCreators;

export interface EstimatesState {
  estimatesList?: any | null;
  estimatesListById?: any | null;
  estimatesListDetails?: any | null;
  estimatesListDetailsTotalCount: number;
  fetching: boolean;
}

export type EstimatesAction = PayloadAction<string, EstimatesState>;

export type ImmutableEstimatesState = SI.ImmutableObject<EstimatesState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableEstimatesState = SI.from({
  estimatesList: undefined,
  estimatesListById: undefined,
  estimatesListDetails: undefined,
  estimatesListDetailsTotalCount: 0,
  fetching: false,
});

/* ------------- Reducers ------------- */
// @ts-ignore
export const requestEstimatesList: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState) => state.merge({ fetching: true });

// @ts-ignore
export const estimatesListSuccess: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState, { payload }) =>
  state.merge({ fetching: false, estimatesList: payload });

// @ts-ignore
export const estimatesListFailure: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState) =>
  state.merge({ fetching: false, estimatesList: undefined });

// @ts-ignore
export const requestEstimatesListById: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState) => state.merge({ fetching: true });

// @ts-ignore
export const estimatesListByIdSuccess: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState, { payload }) =>
  state.merge({ fetching: false, estimatesListById: payload });

// @ts-ignore
export const estimatesListByIdFailure: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState) =>
  state.merge({ fetching: false, estimatesListById: undefined });

// @ts-ignore
export const requestEstimatesListDetails: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState) => state.merge({ fetching: true });

// @ts-ignore
export const estimatesListDetailsSuccess: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState, { payload }) =>
  state.merge({
    fetching: false,
    estimatesListDetails: payload.pageNo > 1 ? [...state.estimatesListDetails, ...payload.lines] : payload.lines,
    estimatesListDetailsTotalCount: payload.estimatesListDetailsTotalCount,
  });

// @ts-ignore
export const estimatesListDetailsFailure: Reducer<ImmutableEstimatesState> = (state: ImmutableEstimatesState) =>
  state.merge({ fetching: false, estimatesListDetails: undefined });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableEstimatesState> = {
  requestEstimatesList,
  estimatesListSuccess,
  estimatesListFailure,
  requestEstimatesListDetails,
  estimatesListDetailsFailure,
  estimatesListDetailsSuccess,
  requestEstimatesListById,
  estimatesListByIdSuccess,
  estimatesListByIdFailure,
};

export const EstimatesReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default EstimatesReducer;
