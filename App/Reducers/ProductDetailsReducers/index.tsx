import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestProductDetails: createStandardAction("PRODUCT_DETAILS_REQUEST")<string, IAlertCallbacks>(),
  successProductDetails: createStandardAction("PRODUCT_DETAILS_SUCCESS")<{}>(),
  failureProductDetails: createStandardAction("PRODUCT_DETAILS_FAILURE")<FailureRequestParam>(),
  resetProductDetails: createAction("PRODUCT_DETAILS_RESET"),
};

export const ProductDetailsActions = actionCreators;

export interface ProductDetailsState {
  fetching?: boolean | null;
  data?: any;
}

export type ImmutableProductDetaiState = SI.ImmutableObject<ProductDetailsState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableProductDetaiState = SI.from({
  fetching: false,
  data: undefined,
});

/* ------------- Hookup Reducers To Types ------------- */

export const requestProductDetails: Reducer<ImmutableProductDetaiState> = (state: ImmutableProductDetaiState) => state.merge({ fetching: true });

export const successProductDetails: Reducer<ImmutableProductDetaiState> = (state: ImmutableProductDetaiState, action: any) =>
  state.merge({ fetching: false, data: action.payload });

export const resetProductDetails: Reducer<ImmutableProductDetaiState> = (state: ImmutableProductDetaiState) => INITIAL_STATE;

export const failureProductDetails: Reducer<ImmutableProductDetaiState> = (state: ImmutableProductDetaiState) => state.merge({ fetching: false });

const reducerMap: ReducerMap<typeof actionCreators, any> = {
  requestProductDetails,
  failureProductDetails,
  resetProductDetails,
  successProductDetails,
};

export const ProductDetailsReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ProductDetailsReducer;
