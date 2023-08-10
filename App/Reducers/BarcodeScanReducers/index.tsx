import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

type SolrSuccessCallback = (page: number) => void;

const actionCreators = {
  requestSearchSolr: createStandardAction("SCAN_BARCODE_REQUEST_SOLR_SEARCH")<ISearchSolrParams | undefined>(),
  success: createStandardAction("SCAN_BARCODE_PRODUCT_SUCCESS")<any, string>(),
  failure: createStandardAction("SCAN_BARCODE_PRODUCT_FAILURE")<FailureRequestParam>(),
  clearBarCodeProducts: createAction("CLEAR_BARCODE_PRODUCTS"),
};

export const BarcodeActions = actionCreators;

export interface BarcodeScanState {
  product?: any | null;
  fetching: boolean;
  error: boolean;
}

export type ProductAction = PayloadAction<string, BarcodeScanState>;

export type ImmutableBarcodeScanState = SI.ImmutableObject<BarcodeScanState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableBarcodeScanState = SI.from({
  product: undefined,
  fetching: false,
  error: false,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const request: Reducer<ImmutableBarcodeScanState> = (state: ImmutableBarcodeScanState, { payload }) => state.merge({ fetching: true, error: false });

// @ts-ignore
export const failure: Reducer<ImmutableBarcodeScanState> = (state: ImmutableBarcodeScanState) => state.merge({ fetching: false, error: true });

// @ts-ignore
export const success: Reducer<ImmutableBarcodeScanState> = (state: ImmutableBarcodeScanState, action: AnyAction & { payload?: any }) =>
  state.merge({
    product: action.payload,
    fetching: false,
    error: false,
  });

// @ts-ignore
export const clearBarCodeProducts: Reducer<ImmutableBarcodeScanState> = (state: ImmutableBarcodeScanState) => state.merge(INITIAL_STATE);

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableBarcodeScanState> = {
  success,
  failure,
  requestSearchSolr: request,
  clearBarCodeProducts,
};

export const BarcodeScanReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default BarcodeScanReducer;
