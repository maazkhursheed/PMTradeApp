import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestSubCategories: createStandardAction("SUB_CATEGORIES_REQUEST")<any, IAlertCallbacks>(),
  successSubCategories: createStandardAction("SUB_CATEGORIES_SUCCESS")(),
  failureSubCategories: createStandardAction("SUB_CATEGORIES_FAILURE")<FailureRequestParam>(),
};

export const SubCategoriesActions = actionCreators;

export interface SubCategoriesState {
  fetching: boolean;
}

export type SubCategoriesActions = PayloadAction<string, SubCategoriesState>;

export type ImmutableSubCategoriesState = SI.ImmutableObject<SubCategoriesState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableSubCategoriesState = SI.from({
  fetching: false,
});

/* ------------- Reducers ------------- */

export const requestSubCategories: Reducer<ImmutableSubCategoriesState> = (state: ImmutableSubCategoriesState) => state.merge({ fetching: true });

export const successSubCategories: Reducer<ImmutableSubCategoriesState> = (state: ImmutableSubCategoriesState) => state.merge({ fetching: false });

export const failureSubCategories: Reducer<ImmutableSubCategoriesState> = (state: ImmutableSubCategoriesState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableSubCategoriesState> = {
  requestSubCategories,
  successSubCategories,
  failureSubCategories,
};

export const SubCategoriesReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default SubCategoriesReducer;
