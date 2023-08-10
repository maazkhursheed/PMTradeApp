import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { SignUpParams } from "~root/Types/SignUpDetails";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestSignUp: createStandardAction("SIGN_UP_REQUEST")<IAlertCallbacks>(),
  onSuccess: createStandardAction("SIGN_UP_SUCCESS")<any>(),
  requestCreateUser: createStandardAction("CREATE_USER_REQUEST")<SignUpParams, IAlertCallbacks>(),
  createUserSuccess: createStandardAction("CREATE_USER_SUCCESS")<any>(),
  requestUpdateUser: createStandardAction("UPDATE_USER_REQUEST")<SignUpParams, IAlertCallbacks>(),
  updateUserSuccess: createStandardAction("UPDATE_USER_SUCCESS")<any>(),
  onFailure: createStandardAction("SIGN_UP_FAILURE")<FailureRequestParam>(),
  licenseStatus: createStandardAction("SIGN_UP_USER_STATUS")<any>(),
};

export const SignUpActions = actionCreators;

export interface SignUpState {
  data?: any;
  fetching: boolean;
  licenseStatus: boolean;
}

export type SignUpActions = PayloadAction<string, SignUpState>;

export type ImmutableSignUpState = SI.ImmutableObject<SignUpState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableSignUpState = SI.from({
  data: [],
  fetching: false,
  licenseStatus: false,
});

/* ------------- Reducers ------------- */

export const requestSignUp: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState, action) =>
  state.merge({
    fetching: true,
  });

export const onSuccess: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState, { payload }) =>
  state.merge({
    data: payload,
    fetching: false,
  });

export const requestCreateUser: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState, action) =>
  state.merge({
    fetching: true,
  });

export const createUserSuccess: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState, { payload }) =>
  state.merge({
    data: payload,
    fetching: false,
  });

export const requestUpdateUser: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState, action) =>
  state.merge({
    fetching: true,
  });

export const updateUserSuccess: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState, { payload }) =>
  state.merge({
    data: payload,
    fetching: false,
  });

export const onFailure: Reducer<ImmutableSignUpState> = (state: ImmutableSignUpState) =>
  state.merge({
    fetching: false,
  });

const licenseStatus: Reducer<ImmutableSignUpState> = (state, { payload }) => state.merge({ licenseStatus: payload });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableSignUpState> = {
  requestSignUp,
  onSuccess,
  onFailure,
  requestCreateUser,
  createUserSuccess,
  requestUpdateUser,
  updateUserSuccess,
  licenseStatus,
};

export const SignUpReducer = mapReducers(INITIAL_STATE, reducerMap, SignUpActions);

export default SignUpReducer;
