import * as R from "ramda";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { IItemListRequestParam } from "~root/Types/SearchAPITypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  newListAdded: createStandardAction("MY_LIST_NEW_ITEM_ADDED")<string>(),
  clearNewList: createAction("NEW_LIST_ITEMS_CLEAR"),
  successAllLists: createStandardAction("SEARCH_LIST_ALL_SUCCESS")<any>(),
  successListDetail: createStandardAction("SEARCH_LIST_DETAIL_SUCCESS")<any>(),
  success: createAction("SEARCH_LIST_ACTION_SUCCESS"),
  getAllList: createStandardAction("SEARCH_ALL_LIST")<undefined, IAlertCallbacks>(),
  renameList: createStandardAction("SEARCH_LIST_RENAME")<any, IAlertCallbacks>(),
  renameListSuccess: createAction("SEARCH_LIST_RENAME_SUCCESS"),
  requestMyList: createStandardAction("SEARCH_MY_LISTS")<string>(),
  addItemToList: createStandardAction("SEARCH_ADD_ITEM")<IItemListRequestParam, IAlertCallbacks>(),
  addItemToNewList: createStandardAction("SEARCH_ADD_ITEM_NEW_LIST")<IItemListRequestParam, IAlertCallbacks>(),
  removeItemFromList: createStandardAction("SEARCH_REMOVE_ITEM")<IItemListRequestParam, IAlertCallbacks>(),
  addList: createStandardAction("SEARCH_ADD_LIST")<string, IAlertCallbacks>(),
  removeList: createStandardAction("SEARCH_REMOVE_LIST")<string, IAlertCallbacks>(),
  failure: createStandardAction("SEARCH_LIST_FAILURE")<FailureRequestParam>(),
  deleteItem: createStandardAction("MY_LIST_DELETE_ITEM")<any, IAlertCallbacks>(),
  deleteItemSuccess: createStandardAction("MY_LIST_DELETE_ITEM_SUCCESS")<string>(),
};

export const MyListActions = actionCreators;

export interface MyListState {
  myLists: any[];
  newLists: any[];
  fetching: boolean;
  selectedListData: any;
}

export type ImmutableMyListState = SI.ImmutableObject<MyListState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableMyListState = SI.from({
  myLists: [],
  newLists: [],
  selectedListData: [],
  fetching: false,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const request: Reducer<ImmutableMyListState> = (state: ImmutableMyListState) => state.merge({ fetching: true });

// @ts-ignore
export const requestMyList: Reducer<ImmutableMyListState> = (state: ImmutableMyListState) => state.merge({ fetching: true, selectedListData: [] });

// @ts-ignore
export const failure: Reducer<ImmutableMyListState> = (state: ImmutableMyListState) => state.merge({ fetching: false });

// @ts-ignore
export const successAllLists: Reducer<ImmutableMyListState> = (state: ImmutableMyListState, action: any) =>
  state.merge({ fetching: false, myLists: action.payload });

// @ts-ignore
export const success: Reducer<ImmutableMyListState> = (state: ImmutableMyListState) => state.merge({ fetching: false });

// @ts-ignore
export const successListDetail: Reducer<ImmutableMyListState> = (state: ImmutableMyListState, action: any) =>
  state.merge({ fetching: false, selectedListData: action.payload });

// @ts-ignore
export const clearNewList: Reducer<ImmutableMyListState> = (state: ImmutableMyListState, action: any) => {
  return state.merge({ newLists: [] });
};

// @ts-ignore
export const newListAdded: Reducer<ImmutableMyListState> = (state: ImmutableMyListState, action: any) => {
  return state.merge({
    newLists: [R.find(R.propEq("listName", action.payload))(state.myLists)],
  });
};
// @ts-ignore
export const removeList: Reducer<ImmutableMyListState> = (state: ImmutableMyListState, action: any) => {
  return state.merge({ fetching: true, newLists: [] });
};

// @ts-ignore
export const deleteItemSuccess: Reducer<ImmutableMyListState> = (state: ImmutableMyListState, action: any) => {
  return state.merge({
    selectedListData: R.compose(R.reject(R.propEq("SKU", action.payload)), R.clone)(state.selectedListData),
  });
};
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableMyListState> = {
  newListAdded,
  clearNewList,
  getAllList: request,
  renameList: request,
  requestMyList: request,
  addItemToList: request,
  addItemToNewList: request,
  addList: request,
  removeItemFromList: request,
  deleteItemSuccess,
  removeList,
  successAllLists,
  successListDetail,
  success,
  requestMyList,
  failure,
};

export const MyListReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default MyListReducer;
