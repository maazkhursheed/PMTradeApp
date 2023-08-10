import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

type SolrSuccessCallback = (page: number) => void;

const actionCreators = {
  requestRelatedAndSubstituteProducts: createStandardAction("RELATED_SUBSTITUTE_PRODUCTS_REQUEST")<any, IAlertCallbacks>(),
  relatedAndSubstituteProductsFailure: createStandardAction("RELATED_SUBSTITUTE_PRODUCTS_FAILURE")<FailureRequestParam>(),
  relatedAndSubstituteAlternateProductsSuccess: createStandardAction("RELATED_SUBSTITUTE_ALTERNATE_PRODUCTS_SUCCESS")(),
  relatedAndSubstituteRelatedProductsSuccess: createStandardAction("RELATED_SUBSTITUTE_RELATED_PRODUCTS_SUCCESS")(),
  requestSearchSolr: createStandardAction("REQUEST_SOLR_SEARCH")<ISearchSolrParams | undefined, SolrSuccessCallback | undefined>(),
  success: createStandardAction("PRODUCT_SUCCESS")<any, string>(),
  updateFacets: createStandardAction("UPDATE_FACETS")<any>(),
  failure: createStandardAction("PRODUCT_FAILURE")<FailureRequestParam>(),
  clearCart: createAction("CART_CLEAR"),
  clearProducts: createAction("CLEAR_DB_PRODUCTS"),
  cartChange: createStandardAction("CART_QUANTITY_CHANGE")<any, IAlertCallbacks>(),
  requestTopCategoryProducts: createStandardAction("TOP_CATEGORY_PRODUCTS_REQUEST")<string, IAlertCallbacks>(),
  topCategoryProductsfailure: createStandardAction("TOP_CATEGORY_PRODUCTS_FAILURE")<FailureRequestParam>(),
  topCategoryProductsSuccess: createStandardAction("TOP_CATEGORY_PRODUCTS_SUCCESS")(),
};

export const ProductActions = actionCreators;

export interface ProductState {
  data?: any | null;
  dataSearch?: any | null;
  fetching: boolean;
  productDetails?: any;
  productDetailsLoader: boolean;
  facets: any;
  isShowReset: boolean;
  fetchingTopCategoryProducts: boolean;
  substituteAlternateProducts?: any;
  substituteRelatedProducts?: any;
}

export const showDeliveryTime = () => {
  const time = new Date().getHours();
  if (time < 7) {
    return "(Your order will be delivered in the morning after 7 AM)";
  } else if (time < 16) {
    return "(Delivered in 1-2 hrs depending on branch)";
  } else {
    return "(Your order will be delivered tomorrow)";
  }
};

export type ProductAction = PayloadAction<string, ProductState>;

export type ImmutableProductState = SI.ImmutableObject<ProductState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableProductState = SI.from({
  data: undefined,
  dataSearch: undefined,
  fetching: false,
  productDetails: undefined,
  productDetailsLoader: false,
  facets: undefined,
  isShowReset: false,
  fetchingTopCategoryProducts: false,
  substituteAlternateProducts: undefined,
  substituteRelatedProducts: undefined,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const request: Reducer<ImmutableProductState> = (state: ImmutableProductState, { payload }) => state.merge({ fetching: true });

// @ts-ignore
export const failure: Reducer<ImmutableProductState> = (state: ImmutableProductState) => state.merge({ fetching: false, productDetailsLoader: false });

// @ts-ignore
export const success: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any; meta: any }) => {
  if (action.payload === undefined) {
    return state.merge({
      data: undefined,
      dataSearch: undefined,
      fetching: false,
    });
  } else if (action.meta?.length) {
    return state.merge({ dataSearch: action.payload, fetching: false });
  } else {
    return state.merge({
      data: action.payload,
      fetching: false,
    });
  }
};

// @ts-ignore
export const updateFacets: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any }) => {
  return state.merge({
    facets: action.payload?.allFacets,
    isShowReset: action.payload?.isShowReset,
  });
};

// @ts-ignore
export const requestRelatedAndSubstituteProducts: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any }) => {
  return state.merge({ fetching: true });
};

// @ts-ignore
export const relatedAndSubstituteProductsFailure: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any }) => {
  return state.merge({ fetching: false });
};

// @ts-ignore
export const relatedAndSubstituteAlternateProductsSuccess: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction) => {
  return state.merge({ substituteAlternateProducts: action?.payload, fetching: false });
};

// @ts-ignore
export const relatedAndSubstituteRelatedProductsSuccess: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction) => {
  return state.merge({ substituteRelatedProducts: action?.payload, fetching: false });
};

// @ts-ignore
export const requestTopCategoryProducts: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any }) => {
  return state.merge({ fetchingTopCategoryProducts: true });
};

// @ts-ignore
export const topCategoryProductsfailure: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any }) => {
  return state.merge({ fetchingTopCategoryProducts: false });
};

// @ts-ignore
export const topCategoryProductsSuccess: Reducer<ImmutableProductState> = (state: ImmutableProductState) => {
  return state.merge({ fetchingTopCategoryProducts: false });
};
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableProductState> = {
  success,
  failure,
  requestSearchSolr: request,
  updateFacets,
  requestTopCategoryProducts,
  topCategoryProductsSuccess,
  topCategoryProductsfailure,
  requestRelatedAndSubstituteProducts,
  relatedAndSubstituteProductsFailure,
  relatedAndSubstituteAlternateProductsSuccess,
  relatedAndSubstituteRelatedProductsSuccess,
};

export const ProductReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ProductReducer;
