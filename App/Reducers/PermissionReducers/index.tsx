import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { AvailablePermissionType } from "~root/Types/Permissions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  // Map of permissions in payload, IsAdmin in meta
  validatePermission: createStandardAction("VALIDATE_PERMISSION")<any, IAlertCallbacks>(),
  validatePermissionRecheck: createStandardAction("VALIDATE_PERMISSION_RECHECK")<any, IAlertCallbacks>(),
  permissionSuccess: createStandardAction("PERMISSION_SUCCESS")<any>(),
};

export const PermissionActions = actionCreators;

export interface PermissionState {
  availablePermissions: AvailablePermissionType;
}

export type ImmutablePermissionState = SI.ImmutableObject<PermissionState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutablePermissionState = SI.from({
  availablePermissions: {},
});

/* ------------- Reducers ------------- */

const permissionSuccess: Reducer<ImmutablePermissionState> = (state, action) =>
  // @ts-ignore
  state.merge({ availablePermissions: action.payload });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutablePermissionState> = {
  permissionSuccess,
};

export const PermissionReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default PermissionReducer;
