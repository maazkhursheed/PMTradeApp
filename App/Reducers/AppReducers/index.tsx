import * as R from "ramda";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { ERROR_ELEMENTS } from "~root/Lib/AlertsHelper";
import emailClickableFromError from "../../Components/EmailClickableFromError/EmailClickableFromError";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  voidAction: createAction("VOID_ACTION"),
  appError503Visibility: createStandardAction("503_APP_ERROR_VISIBILITY")<boolean>(),
  appGenericErrorVisibility: createStandardAction("GENERIC_APP_ERROR_VISIBILITY")<boolean>(),
  appForceUpdateVisibility: createStandardAction("FORCE_UPDATE_VISIBILITY")<boolean>(),
  setupDeviceToken: createStandardAction("SETUP_DEVICE_TOKEN")<string>(),
  appCustomErrorVisibility: createStandardAction("CUSTOM_APP_ERROR_VISIBILITY")<any>(),
  fetchRemoteConfig: createAction("FETCH_REMOTE_CONFIG"),
  setScreensStatus: createStandardAction("SET_SCREENS_STATUS")<any>(),
  setFeatureToggle: createStandardAction("SET_FEATURE_TOGGLE_STATUS")<any>(),
  // For debug only
  cancelOrders: createAction("CANCEL_ORDERS"),
  setCurrentTabIndex: createStandardAction("SET_CURRENT_TAB_INDEX")<string>(),
};

export const AppActions = actionCreators;

export interface AppState {
  isVisible?: boolean;
  modalContent?: any;
  isForceUpdate?: boolean;
  deviceToken: string;
  screensStatus: any;
  currentTabIndex: string;
  featureToggle: any;
}

export type ImmutableAppState = SI.ImmutableObject<AppState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableAppState = SI.from({
  isVisible: false,
  modalContent: undefined,
  isForceUpdate: false,
  deviceToken: "",
  screensStatus: {},
  currentTabIndex: "",
  featureToggle: {},
});

/* ------------- Reducers ------------- */

export const voidAction: Reducer<ImmutableAppState> = R.identity;

export const appError503Visibility: Reducer<ImmutableAppState> = (state, { payload }) =>
  state.merge({
    isVisible: payload,
    modalContent: payload ? ERROR_ELEMENTS.ERROR_503_ELEMENT : undefined,
  });

export const appGenericErrorVisibility: Reducer<ImmutableAppState> = (state, { payload }) =>
  state.merge({
    isVisible: payload,
    modalContent: payload ? ERROR_ELEMENTS.ERROR_GENERIC_ELEMENT : undefined,
  });

export const appCustomErrorVisibility: Reducer<ImmutableAppState> = (state, { payload }) =>
  state.merge({
    isVisible: payload.isVisible,
    modalContent: payload ? emailClickableFromError(payload.errorMessage) : undefined,
  });

export const appForceUpdateVisibility: Reducer<ImmutableAppState> = (state, { payload }) =>
  state.merge({
    isForceUpdate: payload,
  });

export const setupDeviceToken: Reducer<ImmutableAppState> = (state, { payload }) => state.merge({ deviceToken: payload });

export const setScreensStatus: Reducer<ImmutableAppState> = (state, { payload }) => state.merge({ screensStatus: payload });

export const setFeatureToggle: Reducer<ImmutableAppState> = (state, { payload }) => state.merge({ featureToggle: payload });

export const setCurrentTabIndex: Reducer<ImmutableAppState> = (state, { payload }) => state.merge({ currentTabIndex: payload });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableAppState> = {
  voidAction,
  appError503Visibility,
  appGenericErrorVisibility,
  appForceUpdateVisibility,
  setupDeviceToken,
  appCustomErrorVisibility,
  setScreensStatus,
  setFeatureToggle,
  setCurrentTabIndex,
};

export const AppReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default AppReducer;
