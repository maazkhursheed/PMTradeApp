import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { JobItem } from "~root/Types/JobAccounts";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */
export const SELECTED_JOB_ACCOUNT = "SelectedJobAccount";
const actionCreators = {
  request: createStandardAction("JOB_ACCOUNTS_REQUEST")<undefined, IAlertCallbacks>(),
  selectJobAccount: createStandardAction("JOB_ACCOUNTS_SELECTED")<JobItem | undefined>(),
  success: createStandardAction("JOB_ACCOUNTS_SUCCESS")<JobItem[]>(),
  failure: createStandardAction("JOB_ACCOUNTS_FAILURE")<FailureRequestParam>(),
  selectJobAccountSuccess: createStandardAction("SELECT_JOB_ACCOUNT_SUCCESS")(),
};

export const JobAccountsActions = actionCreators;

export interface JobAccountsState {
  data?: JobItem[];
  error?: boolean;
  fetching?: boolean;
  selectedJobAccount?: JobItem;
}

export type JobAccountsAction = PayloadAction<string, JobAccountsState>;

export type ImmutableJobAccountsState = SI.ImmutableObject<JobAccountsState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableJobAccountsState = SI.from({});

/* ------------- Reducers ------------- */

export const request: Reducer<ImmutableJobAccountsState> = (state: any) => state.merge({ fetching: true });

export const success: Reducer<ImmutableJobAccountsState> = (state: any, action: AnyAction & { payload?: JobItem[] }) => {
  return state.merge({ fetching: false, error: false, data: action.payload });
};

export const failure: Reducer<ImmutableJobAccountsState> = (state: any) => state.merge({ fetching: false, error: true, data: [] });

export const selectJobAccount: Reducer<ImmutableJobAccountsState> = (state: any, action: any) =>
  state.merge({ fetching: false, selectedJobAccount: action.payload });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableJobAccountsState> = {
  request,
  failure,
  success,
  selectJobAccount,
};

export const JobAccountsReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default JobAccountsReducer;
