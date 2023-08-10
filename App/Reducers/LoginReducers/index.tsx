import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { __getEmail, __getFullName, __getPhoneNumber } from "./LoginHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  // purchaseToken: createStandardAction("STC_AUTH_TOKEN")<undefined, IAlertCallbacks>(),
  // purchaseTokenCompleted: createAction("STC_AUTH_TOKEN_COMPLETED"),
  loginSuccess: createAction("LOGIN_SUCCESS"),
  getUserInfo: createStandardAction("LOGIN_GET_USER_INFO")<void, IAlertCallbacks>(),
  getUserInfoSuccess: createAction("LOGIN_GET_USER_INFO_SUCCESS"),
  checkDbLogin: createStandardAction("LOGIN_CHECK_DB")<string, IAlertCallbacks>(),
  requestRefreshToken: createStandardAction("LOGIN_REFRESH_TOKEN")<string[], IAlertCallbacks>(),
  tokenSuccess: createStandardAction("LOGIN_TOKEN_SUCCESS")<any[], IAlertCallbacks>(),
  tokenRefresh: createAction("LOGIN_REFRESH"),
  logoutRequest: createStandardAction("LOGOUT_REQUEST")<void, IAlertCallbacks>(),
  logoutSuccess: createAction("LOGOUT_SUCCESS"),
  userSuccess: createStandardAction("LOGIN_USER_SUCCESS")<any, IAlertCallbacks>(),
  toggleLoginFetchingStatus: createAction("LOGIN_TOGGLE"),
  failure: createStandardAction("LOGIN_FAILURE")<FailureRequestParam>(),
};

export const LoginActions = actionCreators;

export interface LoginState {
  userData?: any;
  fetching: boolean;
  checkingLogin: boolean;
  tempToken: string;
}

export type LoginAction = PayloadAction<string, LoginState>;

export type ImmutableLoginState = SI.ImmutableObject<LoginState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableLoginState = SI.from({
  userData: undefined,
  fetching: false,
  checkingLogin: false,
  tempToken: "",
});

export const getPhoneNumber = __getPhoneNumber;

export const getEmail = __getEmail;

export const getFullName = __getFullName;

/* ------------- Reducers ------------- */

export const failure: Reducer<ImmutableLoginState> = state => state.merge({ fetching: false, checkingLogin: false });

export const tokenSuccess: Reducer<ImmutableLoginState> = (state, action) =>
  state.merge({
    fetching: true,
    checkingLogin: false,
    tempToken: action.payload[0],
  });

// export const purchaseToken: Reducer<ImmutableLoginState> = (state, action) =>
//   state.merge({fetching: true});

// export const purchaseTokenCompleted: Reducer<ImmutableLoginState> = (state, action) =>
//   state.merge({fetching: false});

export const checkDbLogin: Reducer<ImmutableLoginState> = state => state.merge({ checkingLogin: true });

export const toggleLoginFetchingStatus: Reducer<ImmutableLoginState> = state => state.merge({ checkingLogin: false });

export const requestRefreshToken: Reducer<ImmutableLoginState> = state => state.merge({ checkingLogin: false });

export const logoutRequest: Reducer<ImmutableLoginState> = state => state.merge({ fetching: true });

export const logoutSuccess: Reducer<ImmutableLoginState> = state => state.merge({ fetching: false, userData: undefined });

const getUserInfo: Reducer<ImmutableLoginState> = state => state.merge({ fetching: true });
const getUserInfoSuccess: Reducer<ImmutableLoginState> = state => state.merge({ fetching: false });

const userSuccess: Reducer<ImmutableLoginState> = (state, { payload, meta }) => state.merge({ userData: payload, fetching: false, checkingLogin: false });

const tokenRefresh: Reducer<ImmutableLoginState> = state => state.merge({ fetching: true });

const loginSuccess: Reducer<ImmutableLoginState> = state => state.merge({ fetching: false, checkingLogin: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableLoginState> = {
  failure,
  requestRefreshToken,
  getUserInfo,
  getUserInfoSuccess,
  checkDbLogin,
  tokenSuccess,
  logoutRequest,
  userSuccess,
  logoutSuccess,
  tokenRefresh,
  toggleLoginFetchingStatus,
  loginSuccess,
  // purchaseToken,
  // purchaseTokenCompleted,
};

export const LoginReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default LoginReducer;
