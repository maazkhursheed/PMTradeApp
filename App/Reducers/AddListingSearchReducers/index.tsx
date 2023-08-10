import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { ISearchSolrParams } from "~root/Types/SearchAPITypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  request: createStandardAction("REQUEST_SOLR_SEARCH_LISTING")<ISearchSolrParams | undefined>(),
  success: createStandardAction("SEARCH_SOLR_LIST_SUCCESS")<any>(),
  failure: createStandardAction("SEARCH_FAILURE")<FailureRequestParam>(),
};

export const SearchListActions = actionCreators;

export interface SearchListState {
  listing?: any;
  fetching: boolean;
}

export type ImmutableSearchListState = SI.ImmutableObject<SearchListState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableSearchListState = SI.from({
  listing: undefined,
  fetching: false,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const request: Reducer<ImmutableSearchListState> = (state: ImmutableSearchListState) => state.merge({ fetching: true });

// @ts-ignore
export const success: Reducer<ImmutableSearchListState> = (state: ImmutableSearchListState, { payload }) => state.merge({ fetching: false, listing: payload });

// @ts-ignore
export const failure: Reducer<ImmutableSearchListState> = (state: ImmutableSearchListState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableSearchListState> = {
  request,
  success,
  failure,
};

export const SearchListReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default SearchListReducer;
