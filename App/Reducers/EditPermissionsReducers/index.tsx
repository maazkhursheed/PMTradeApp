import { Reducer } from "redux";
import SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { IEditPermissionReq } from "~root/Lib/ManageTeamHelper";
import { mapReducers, ReducerMap } from "~root/Lib/ReduxHelpers";
import { FailureRequestParam } from "~root/Types/CommonTypes";
const { createAction, createStandardAction } = deprecated;
const actionCreators = {
  editPermissionRequest: createStandardAction("EDIT_PERMISSION_REQUEST")<IEditPermissionReq, IAlertCallbacks>(),
  editPermissionSuccess: createAction("EDIT_PERMISSION_SUCCESS"),
  editInviteRequest: createStandardAction("EDIT_INVITE_REQUEST")<IEditPermissionReq, IAlertCallbacks>(),
  editInviteSuccess: createAction("EDIT_INVITE_SUCCESS"),
  sendInviteRequest: createStandardAction("SEND_INVITE_REQUEST")<IEditPermissionReq, IAlertCallbacks>(),
  sendInviteSuccess: createAction("SEND_INVITE_SUCCESS"),
  deleteInviteRequest: createStandardAction("DELETE_INVITE_REQUEST")<string, IAlertCallbacks>(),
  deleteInviteSuccess: createAction("DELETE_INVITE_SUCCESS"),
  failure: createStandardAction("INVITE_FAILURE")<FailureRequestParam>(),
};

export const EditPermissionActions = actionCreators;

export interface EditPermissionState {
  fetching: boolean;
}

export type ImmutableEditPermissionState = SI.ImmutableObject<EditPermissionState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: EditPermissionState = SI.from({
  fetching: false,
});

/* ------------- Reducers ------------- */
const editInviteRequest: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: true,
  });
const editInviteSuccess: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: false,
  });

const editPermissionRequest: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: true,
  });
const editPermissionSuccess: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: false,
  });

const sendInviteRequest: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: true,
  });
const sendInviteSuccess: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: false,
  });

const deleteInviteRequest: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: true,
  });
const deleteInviteSuccess: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: false,
  });

export const failure: Reducer<ImmutableEditPermissionState> = state =>
  state.merge({
    fetching: false,
  });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableEditPermissionState> = {
  editInviteRequest,
  editInviteSuccess,
  editPermissionRequest,
  editPermissionSuccess,
  sendInviteRequest,
  sendInviteSuccess,
  deleteInviteRequest,
  deleteInviteSuccess,
  failure,
};

export const EditPermissionReducers = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default EditPermissionReducers;
