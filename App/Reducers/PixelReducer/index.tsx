import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */
export const KEY_IS_RETURNING_USER = "KEY_IS_RETURNING_USER";

const actionCreators = {
  failure: createStandardAction("PIXEL_FAILURE")(),
  pixelRequest: createStandardAction("PIXEL_REQUEST")<string, {}>(),
  pixelSuccess: createStandardAction("PIXEL_SUCCESS")(),
  setPixelUrl: createStandardAction("PIXEL_SET_URL")<string>(),
};

export const PixelActions = actionCreators;

export interface PixelState {
  url?: string;
}

export type ImmutablePixelState = SI.ImmutableObject<PixelState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutablePixelState = SI.from({
  url: "",
});

/* ------------- Reducers ------------- */

export const setPixelUrl: Reducer<ImmutablePixelState> = (state, { payload }) => state.merge({ url: payload });

export const pixelSuccess: Reducer<ImmutablePixelState> = (state, { payload }) => state.merge({});

export const pixelRequest: Reducer<ImmutablePixelState> = (state, { payload }) => state.merge({});

export const failure: Reducer<ImmutablePixelState> = (state, { payload }) => state.merge({});

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutablePixelState> = {
  setPixelUrl,
  failure,
  pixelRequest,
  pixelSuccess,
};

export const PixelReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default PixelReducer;
