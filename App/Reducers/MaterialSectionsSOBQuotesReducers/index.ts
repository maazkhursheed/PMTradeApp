import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import {IAlertCallbacks} from "~root/Lib/AlertsHelper";

const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  createSectionsSOBQuotes: createStandardAction("CREATE_SECTION_SOB_QUOTE")<any, IAlertCallbacks>(),
  createSectionsSOBQuotesSuccess: createStandardAction("CREATE_SECTION_SOB_QUOTE_SUCCESS")<any>(),
  createSectionsSOBQuotesFailure: createStandardAction("CREATE_SECTION_SOB_QUOTE_FAILURE")<any>(),
  getSOBQuotes: createStandardAction("SOB_QUOTE")<any>(),
  deleteSectionsSOBQuotes: createStandardAction("DELETE_SECTION_SOB_QUOTE")<any>(),
  deleteSectionsSOBQuotesSuccess: createStandardAction("DELETE_SECTION_SOB_QUOTE_SUCCESS")<any>(),
  deleteSectionsSOBQuotesFailure: createStandardAction("DELETE_SECTION_SOB_QUOTE_FAILURE")<any>(),
  getSOBQuotesSuccess: createStandardAction("SOB_QUOTE_SUCCESS")<any>(),
  getSOBQuotesFailure: createStandardAction("SOB_QUOTE_FAILURE")<any>(),
  setSOBScreenInfo: createStandardAction("SET_SOB_SCREEN_INFO")<any>(),
};

export const SectionSOBQuotesActions = actionCreators;

export interface SectionSOBQuotesState {
  SOBQuotesList?: any | null;
  sectionSOBQuotesList?: any | null;
  productSOBScreenName?: any | null;
  sobId?: any | null;
  fetching: boolean;
}

export type SectionSOBQuotesActions = PayloadAction<string, SectionSOBQuotesState>;

export type ImmutableSectionSOBQuotesState = SI.ImmutableObject<SectionSOBQuotesState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableSectionSOBQuotesState = SI.from({
  SOBQuotesList: undefined,
  sectionSOBQuotesList: undefined,
  productSOBScreenName: undefined,
  sobId: undefined,
  fetching: false,
});

/* ------------- Reducers ------------- */
// @ts-ignore
export const getSOBQuotes: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState) => state.merge({ fetching: true });
export const deleteSectionsSOBQuotes: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState, { payload }) =>
  state.merge({ fetching: false });
// @ts-ignore
export const getSOBQuotesSuccess: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState, { payload }) =>
  state.merge({ fetching: false, SOBQuotesList: payload });

export const deleteSectionsSOBQuotesSuccess: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState, { payload }) =>
  state.merge({ fetching: false });

export const deleteSectionsSOBQuotesFailure: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState, { payload }) =>
  state.merge({ fetching: false });

// @ts-ignore
export const getSOBQuotesFailure: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState) => state.merge({ fetching: false });
// @ts-ignore
export const createSectionsSOBQuotes: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const createSectionsSOBQuotesSuccess: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState, { payload }) =>
  state.merge({ fetching: false, sectionSOBQuotesList: payload });

// @ts-ignore
export const createSectionsSOBQuotesFailure: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState) =>
  state.merge({ fetching: false });

// @ts-ignore
export const setSOBScreenInfo: Reducer<ImmutableSectionSOBQuotesState> = (state: ImmutableSectionSOBQuotesState, { payload }) =>
  state.merge({ productSOBScreenName: payload.screenName, sobId: payload.sobId });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableSectionSOBQuotesState> = {
  getSOBQuotes,
  deleteSectionsSOBQuotes,
  deleteSectionsSOBQuotesFailure,
  deleteSectionsSOBQuotesSuccess,
  getSOBQuotesSuccess,
  getSOBQuotesFailure,
  createSectionsSOBQuotes,
  createSectionsSOBQuotesSuccess,
  createSectionsSOBQuotesFailure,
  setSOBScreenInfo,
};

export const MaterialSectionsSOBQuotesReducers = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default MaterialSectionsSOBQuotesReducers;
