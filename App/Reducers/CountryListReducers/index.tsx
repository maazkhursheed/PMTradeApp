import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestCountryList: createStandardAction("COUNTRY_LIST_REQUEST")<IAlertCallbacks>(),
  onSuccess: createStandardAction("COUNTRY_LIST_SUCCESS")<any>(),
  onFailure: createStandardAction("COUNTRY_LIST_FAILURE")<FailureRequestParam>(),
};

export const CountryListActions = actionCreators;

export interface CountryListState {
  data?: any;
  fetching: boolean;
}

export type ImmutableCountryListState = SI.ImmutableObject<CountryListState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableCountryListState = SI.from({
  data: [],
  fetching: false,
});

/* ------------- Reducers ------------- */

export const requestCountryList: Reducer<ImmutableCountryListState> = (state: ImmutableCountryListState, action) =>
  state.merge({
    fetching: true,
  });

export const onSuccess: Reducer<ImmutableCountryListState> = (state: ImmutableCountryListState, { payload }) =>
  state.merge({
    data: payload,
    fetching: false,
  });

export const onFailure: Reducer<ImmutableCountryListState> = (state: ImmutableCountryListState) =>
  state.merge({
    fetching: false,
  });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableCountryListState> = {
  requestCountryList,
  onSuccess,
  onFailure,
};

export const CountryListReducer = mapReducers(INITIAL_STATE, reducerMap, CountryListActions);

export default CountryListReducer;
