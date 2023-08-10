import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestSearchSuggestions: createStandardAction("SEARCH_SUGGESTIONS_REQUEST")<string>(),
  successSearchSuggestions: createStandardAction("SEARCH_SUGGESTIONS_SUCCESS")<[]>(),
  resetFields: createAction("SEARCH_SUGGESTIONS_RESET"),
  setTerm: createStandardAction("SEARCH_SUGGESTION_TERM")<string>(),
  failureSearchSuggestions: createStandardAction("SEARCH_SUGGESTIONS_FAILURE")<FailureRequestParam>(),
};

export const SearchSuggestionsActions = actionCreators;

export interface SearchSuggestionsState {
  data: [];
  all: [];
  term: string;
  fetching: boolean;
}

export type SearchSuggestionsAction = PayloadAction<string, SearchSuggestionsState>;

export type ImmutableSearchSuggestionsState = SI.ImmutableObject<SearchSuggestionsState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableSearchSuggestionsState = SI.from({
  data: [],
  term: "",
  all: [],
  fetching: false,
});

/* ------------- Reducers ------------- */

export const requestSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (
  state: ImmutableSearchSuggestionsState,
  action: AnyAction & { payload: string },
) => state.merge({ fetching: true });

export const successSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (
  state: ImmutableSearchSuggestionsState,
  action: AnyAction & { payload: any },
) =>
  state.merge({
    fetching: false,
    data: action.payload?.data,
    all: action.payload?.all,
  });

export const failureSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState) => state.merge({ fetching: false });

export const resetFields: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState) => INITIAL_STATE;

export const setTerm: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState, action: any) => state.merge({ term: action.payload });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableSearchSuggestionsState> = {
  requestSearchSuggestions,
  failureSearchSuggestions,
  successSearchSuggestions,
  setTerm,
  resetFields,
};

export const SearchSuggestionsReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default SearchSuggestionsReducer;
