import * as R from "ramda";
import { LatLng } from "react-native-maps";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { ImmutableCartState } from "~root/Reducers/CartReducer";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestAddress: createStandardAction("ADDRESS_REQUEST")<string, IAlertCallbacks | undefined>(),
  requestAddUpdateDeliveryAddress: createStandardAction("ADD_UPDATE_DELIVERY_ADDRESS_REQUEST")<{ address: string; geocode: {} }, IAlertCallbacks | undefined>(),
  clearAddress: createAction("ADDRESS_CLEAR"),
  requestGeocode: createStandardAction("GEOCODE_REQUEST")<string, IAlertCallbacks>(),
  geocodeSuccess: createStandardAction("GEOCODE_SUCCESS")<LatLng | undefined>(),
  addUpdateDeliveryAddressSuccess: createStandardAction("ADD_UPDATE_DELIVERY_ADDRESS_SUCCESS")<any>(),
  addressSuccess: createStandardAction("ADDRESS_SUCCESS")<any>(),
  setSelectedAddress: createStandardAction("SELECT_ADDRESS")<string | undefined>(),
  failureAddress: createStandardAction("REQUEST_ADDRESS_ERROR")<FailureRequestParam>(),
  failureGeocode: createStandardAction("REQUEST_GEOCODE_ERROR")<FailureRequestParam>(),
  reset: createAction("RESET_ADDRESS_JOB_ACCOUNT"),
  requestPlaceOrderApi: createStandardAction("CALL_PLACE_ORDER")<any, IAlertCallbacks>(),
  placeOrderApiSuccess: createStandardAction("PLACE_ORDER_SUCCESS")<any>(),
  placeOrderApiFailure: createStandardAction("PLACE_ORDER_FAILURE")<any>(),
  requestPreviouslyUsedAddresses: createStandardAction("REQUEST_PREVIOUSLY_USED_ADDRESSES")<IAlertCallbacks>(),
  previouslyUsedAddressesSuccess: createStandardAction("PREVIOUSLY_USED_ADDRESSES_SUCCESS")<any>(),
  addressDistanceDriveTime: createStandardAction("ADDRESS_DISTANCE_TIME")<any, IAlertCallbacks>(),
  addressDistanceDriveTimeSuccess: createStandardAction("ADDRESS_DISTANCE_TIME_SUCCESS")<any>(),
  addressDistanceDriveTimeFailure: createStandardAction("ADDRESS_DISTANCE_TIME_FAILURE")<any>(),
};

export const AddressActions = actionCreators;

export interface AddressState {
  addressSuggestions: string[];
  previouslyUsedAddresses: any[];
  fetchingAddress: boolean;
  placeOrderLoading: boolean;
  selectedAddress: string | undefined;
  fetching: boolean;
  geocode?: LatLng;
  addressDistanceDriveTime?: any;
}

export type ImmutableAddressState = SI.ImmutableObject<AddressState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableAddressState = SI.from({
  addressSuggestions: [],
  previouslyUsedAddresses: [],
  fetchingAddress: false,
  fetching: false,
  selectedAddress: undefined,
  placeOrderLoading: false,
  geocode: undefined,
  addressDistanceDriveTime: undefined,
});

/* ------------- Reducers ------------- */

export const addressSuccess: Reducer<ImmutableAddressState> = (state: ImmutableAddressState, { payload }) =>
  state.merge({ fetchingAddress: false, addressSuggestions: payload });

export const requestAddress: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetchingAddress: true, addressSuggestions: [] });

export const requestGeocode: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetching: true });

export const geocodeSuccess: Reducer<ImmutableAddressState> = (state: ImmutableAddressState, { payload }) => state.merge({ fetching: false, geocode: payload });

export const clearAddress: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ addressSuggestions: [], fetchingAddress: false });

export const reset: Reducer<ImmutableAddressState> = R.always(INITIAL_STATE);

export const setSelectedAddress: Reducer<ImmutableAddressState> = (state: ImmutableAddressState, { payload }) => state.merge({ selectedAddress: payload });

export const failureAddress: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetchingAddress: false });

export const failureGeocode: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetching: false });

export const requestAddUpdateDeliveryAddress: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) => state.merge({ fetchingAddress: true });

export const addUpdateDeliveryAddressSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) => state.merge({ fetchingAddress: false });

export const requestPlaceOrderApi: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) => state.merge({ placeOrderLoading: true });

export const placeOrderApiSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) => state.merge({ placeOrderLoading: false });

export const placeOrderApiFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) => state.merge({ placeOrderLoading: false });

export const requestPreviouslyUsedAddresses: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetchingAddress: true });

export const previouslyUsedAddressesSuccess: Reducer<ImmutableAddressState> = (state: ImmutableAddressState, { payload }) =>
  state.merge({ fetchingAddress: false, previouslyUsedAddresses: payload });

export const addressDistanceDriveTime: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetching: true });

export const addressDistanceDriveTimeSuccess: Reducer<ImmutableAddressState> = (state: ImmutableAddressState, { payload }) => {
  let addressDistanceDriveTime = payload;
  if (payload?.results?.[0].value?.distance === "unavailable") {
    const resultObject = payload.results[0];
    addressDistanceDriveTime = {
      ...payload,
      ...{ results: [{ ...resultObject, value: { ...resultObject.value, distance: null, drive_time: null } }] },
    };
  }
  return state.merge({ fetching: false, addressDistanceDriveTime });
};

export const addressDistanceDriveTimeFailure: Reducer<ImmutableAddressState> = (state: ImmutableAddressState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableAddressState> = {
  addressSuccess,
  requestAddress,
  clearAddress,
  geocodeSuccess,
  requestGeocode,
  setSelectedAddress,
  reset,
  failureAddress,
  failureGeocode,
  requestAddUpdateDeliveryAddress,
  addUpdateDeliveryAddressSuccess,
  requestPlaceOrderApi,
  placeOrderApiSuccess,
  placeOrderApiFailure,
  requestPreviouslyUsedAddresses,
  previouslyUsedAddressesSuccess,
  addressDistanceDriveTime,
  addressDistanceDriveTimeSuccess,
  addressDistanceDriveTimeFailure,
};

export const OrderDetailsReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default OrderDetailsReducer;
