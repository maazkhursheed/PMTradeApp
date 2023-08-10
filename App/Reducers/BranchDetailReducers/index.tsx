import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { BranchResponse, OrderTypes } from "~root/Lib/BranchHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */
export const SELECTED_BRANCH = "SelectedBranch";
const actionCreators = {
  requestBranchList: createStandardAction("BRANCH_LIST_REQUEST")<IAlertCallbacks, any>(),
  onSuccess: createStandardAction("BRANCH_LIST_SUCCESS")<any>(),
  onFailure: createStandardAction("BRANCH_DETAIL_FAILURE")<FailureRequestParam>(),
  branchDepotSuccess: createStandardAction("BRANCH_DETAIL_SUCCESS")<any>(),
  onSelectBranch: createStandardAction("SELECT_BRANCH")<BranchResponse>(),
  setOrderType: createStandardAction("SET_ORDER_TYPE")<OrderTypes>(),
  reset: createAction("RESET_BRANCH_DETAIL"),
  setBranchDetails: createStandardAction("SET_SELECTED_BRANCH_GLOBAL")<BranchResponse>(),
  getBranchDetails: createStandardAction("GET_BRANCH_DETAILS")<any>(),
  getOrderFulfilmentBranchDetails: createStandardAction("GET_ORDER_FULFILMENT_BRANCH_DETAILS")<any>(),
  orderFulfilmentBranchDetailSuccess: createStandardAction("ORDER_FULFILMENT_BRANCH_DETAILS_SUCCESS")<any>(),
  requestNearByBranches: createStandardAction("NEARBY_BRANCHES_REQUEST")<any>(),
  onNearByBranchSuccess: createStandardAction("NEARBY_BRANCHES_SUCCESS")<any>(),
  onNearByBranchFailure: createStandardAction("NEARBY_BRANCHES_FAILURE")<FailureRequestParam>(),
  requestStockAvailabilty: createStandardAction("STOCK_AVAILABLE_REQUEST")<any>(),
  stockAvailabilitySuccess: createStandardAction("STOCK_AVAILABLE_SUCCESS")<any>(),
  stockAvailabilityFailure: createStandardAction("STOCK_AVAILABLE_FAILURE")<FailureRequestParam>(),
};

export const BranchDetailsActions = actionCreators;

export interface BranchDetailsListState {
  data?: BranchResponse[];
  dataDepots?: BranchResponse[];
  fetching: boolean;
  branchDetails: any;
  selectedBranch: BranchResponse;
  selectedOrderType: OrderTypes;
  nearbyBranches?: BranchResponse[];
  orderFulfilmentBranch?: BranchResponse;
  productStockData: any;
}

export type BranchDetailsActions = PayloadAction<string, BranchDetailsListState>;

export type ImmutableBranchDetailsListState = SI.ImmutableObject<BranchDetailsListState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableBranchDetailsListState = SI.from({
  data: [],
  dataDepots: [],
  fetching: false,
  selectedBranch: undefined,
  selectedOrderType: undefined,
  nearbyBranches: undefined,
  orderFulfilmentBranch: undefined,
  productStockData: undefined,
});

/* ------------- Reducers ------------- */

export const requestBranchList: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, action) =>
  state.merge({
    fetching: true,
  });

export const onSuccess: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, { payload }) =>
  state.merge({
    data: payload,
    fetching: false,
  });

export const onFailure: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, action) =>
  state.merge({
    fetching: false,
  });

export const branchDepotSuccess: Reducer<ImmutableBranchDetailsListState> = (state, action) =>
  state.merge({
    dataDepots: action.payload,
    fetching: false,
  });

export const getOrderFulfilmentBranchDetails: Reducer<ImmutableBranchDetailsListState> = (state, action) =>
  state.merge({
    fetching: true,
    orderFulfilmentBranch: undefined,
  });

export const orderFulfilmentBranchDetailSuccess: Reducer<ImmutableBranchDetailsListState> = (state, action) =>
  state.merge({
    orderFulfilmentBranch: action.payload,
    fetching: false,
  });

export const onSelectBranch: Reducer<ImmutableBranchDetailsListState> = (state, action) => {
  action.payload ? AsyncStorage.setItem(SELECTED_BRANCH, JSON.stringify(action.payload)) : AsyncStorage.removeItem(SELECTED_BRANCH);
  return state.merge({
    selectedBranch: action.payload,
  });
};

export const setOrderType: Reducer<ImmutableBranchDetailsListState> = (state, action) =>
  state.merge({
    selectedOrderType: action.payload,
  });

export const reset: Reducer<ImmutableBranchDetailsListState> = state =>
  state.merge({
    data: [],
    dataDepots: [],
    selectedBranch: undefined,
  });

export const setBranchDetails: Reducer<ImmutableBranchDetailsListState> = (state, action) =>
  state.merge({
    branchDetails: action.payload,
  });

export const getBranchDetails: Reducer<ImmutableBranchDetailsListState> = (state, action) =>
  state.merge({
    fetching: true,
  });

export const requestNearByBranches: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, action) =>
  state.merge({
    fetching: true,
    nearbyBranches: undefined,
  });

export const onNearByBranchSuccess: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, { payload }) =>
  state.merge({
    nearbyBranches: payload,
    fetching: false,
  });

export const onNearByBranchFailure: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, action) =>
  state.merge({
    fetching: false,
    nearbyBranches: [],
  });

export const requestStockAvailabilty: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, action) =>
  state.merge({
    fetching: true,
    productStockData: undefined,
  });

export const stockAvailabilitySuccess: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, { payload }) =>
  state.merge({
    productStockData: payload,
    fetching: false,
  });

export const stockAvailabilityFailure: Reducer<ImmutableBranchDetailsListState> = (state: ImmutableBranchDetailsListState, action) =>
  state.merge({
    fetching: false,
    productStockData: undefined,
  });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableBranchDetailsListState> = {
  reset,
  requestBranchList,
  onSuccess,
  onFailure,
  branchDepotSuccess,
  onSelectBranch,
  setOrderType,
  setBranchDetails,
  getBranchDetails,
  requestNearByBranches,
  onNearByBranchSuccess,
  onNearByBranchFailure,
  getOrderFulfilmentBranchDetails,
  orderFulfilmentBranchDetailSuccess,
  requestStockAvailabilty,
  stockAvailabilitySuccess,
  stockAvailabilityFailure,
};

export const BranchDetailsReducer = mapReducers(INITIAL_STATE, reducerMap, BranchDetailsActions);

export default BranchDetailsReducer;
