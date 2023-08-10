import * as R from "ramda";
import { Reducer } from "redux";
import SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { IPermissionState } from "~root/Containers/EditTeamMemberContainer/EditTeamMemberContainer";
import { alwaysNull, isNilOrEmpty } from "~root/Lib/CommonHelper";
import { formatCreditLimitText, hasCreditLimitAPI, isValidEndDate, isValidStartDate } from "~root/Lib/ManageTeamHelper";
import SwitchValues from "~root/Lib/ManageTeamHelper/SwitchValues";
import { mapReducers, ReducerMap } from "~root/Lib/ReduxHelpers";
import { validateCreditLimit } from "~root/Lib/StringHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { PermissionTypes } from "~root/Types/Permissions";

const { createAction, createStandardAction } = deprecated;
export interface GetPermissionParams {
  isAdmin?: boolean;
}

export interface SetPermissionParams {
  permissionList: SwitchValues;
}

const actionCreators = {
  clearTeamData: createAction("TEAM_DATA_CLEAR"),
  getTeamData: createAction("TEAM_REQUEST"),
  successTeamData: createStandardAction("TEAM_SUCCESS")<any[]>(),
  success: createAction("TEAM_REQUEST_SUCCESS"),
  searchTeamData: createStandardAction("TEAM_SEARCH")<string>(),
  contactsRequest: createStandardAction("CONTACTS_REQUEST")<any, {}>(),
  contactsSuccess: createStandardAction("CONTACTS_SUCCESS")<any>(),
  contactsSearch: createStandardAction("CONTACTS_SEARCH")<string>(),
  searchResult: createStandardAction("SEARCH_RESULT")<any>(),
  clear: createAction("CLEAR_LIST"),
  getPermissions: createStandardAction("GET_PERMISSION")<GetPermissionParams>(),
  setPermissions: createStandardAction("SET_PERMISSION")<SetPermissionParams>(),
  failure: createStandardAction("TEAM_MEMBERS_FAILURE")<FailureRequestParam>(),
  permissionAPIs: createStandardAction("CHANGE_PERMISSION_FROM_API")<any>(),
  adminClick: createStandardAction("CHANGE_ADMIN_CHECKBOX")<boolean>(),
  creditChange: createStandardAction("REQUEST_CREDIT_CHANGE")<string>(),
  toggleSwitch: createStandardAction("REQUEST_TOGGLE_SWITCH")<PermissionTypes>(),
  startDateChange: createStandardAction("REQUEST_DATE_START")<Date>(),
  endDateChange: createStandardAction("REQUEST_DATE_END")<Date>(),
  getInviteDetail: createStandardAction("REQUEST_INVITE_DETAIL")<string, {}>(),
  resetPermission: createAction("RESET_PERMISSION"),
  isContactsAllowed: createStandardAction("CONTACTS_ALLOWED")<boolean>(),
};

export const TeamActions = actionCreators;

export interface TeamState {
  data: any[];
  searchedData: any[];
  fetching: boolean;
  contacts: any[];
  keyword: string;
  searchData: any;
  filteredContacts: any[];
  permissionState: IPermissionState;
  contactsAllowed: boolean;
}

export type ImmutableTeamState = SI.ImmutableObject<TeamState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableTeamState = SI.from({
  data: [],
  searchedData: [],
  fetching: false,
  searchData: undefined,
  contacts: [],
  keyword: "",
  filteredContacts: [],
  permissionState: {
    creditError: undefined,
    creditLimit: "",
    dateError: undefined,
    startDate: new Date(),
    isAdmin: false,
    endDate: undefined,
    switches: {},
  },
  contactsAllowed: false,
});

/* ------------- Reducers ------------- */

const onEndDate = (state, { payload }) =>
  state.merge({
    permissionState: R.ifElse(
      isValidEndDate(R.__, state.permissionState.startDate),
      R.always(
        R.evolve(
          {
            endDate: R.always(payload),
            dateError: alwaysNull,
          },
          state.permissionState,
        ),
      ),
      R.always(R.assoc("dateError", "Please provide a valid end date", state.permissionState)),
    )(payload),
  });

const onStartDate = (state, { payload }) =>
  state.merge({
    permissionState: R.ifElse(
      isValidStartDate,
      R.always(
        R.evolve(
          {
            startDate: R.always(payload),
            dateError: alwaysNull,
          },
          state.permissionState,
        ),
      ),
      R.always(R.assoc("dateError", "Please provide a valid start date", state.permissionState)),
    )(payload),
  });

const onSwitchChanged = (state, { payload }) => {
  const switchValue = R.path(["permissionState", "switches", payload], state);
  let permissionState = R.assocPath(["switches", payload], switchValue === SwitchValues.ON ? SwitchValues.OFF : SwitchValues.ON, state.permissionState);
  if (payload === PermissionTypes.PlaceOrders) {
    permissionState =
      switchValue === SwitchValues.ON
        ? // Means we are turning off place order switch so we need to lock it
          R.assocPath(["switches", PermissionTypes.ViewEstimatesGroup], SwitchValues.DISABLED_LOCKED, permissionState)
        : // Means we are turning on place order switch so we need to enable it
          R.assocPath(["switches", PermissionTypes.ViewEstimatesGroup], SwitchValues.OFF, permissionState);
  }

  return state.merge({ permissionState });
};

const onCreditLimit = (state, { payload }) =>
  state.merge({
    permissionState: R.mergeRight(state.permissionState, {
      creditLimit: R.ifElse(validateCreditLimit, formatCreditLimitText, R.identity)(payload),
      creditError: R.ifElse(validateCreditLimit, alwaysNull, R.always("Please provide a valid credit limit"))(payload),
    }),
  });

const onGetPermission = (state, { payload }) => {
  const doesPermissionExist = (permission, payload) =>
    R.compose(R.complement(isNilOrEmpty), R.find(R.propEq("uid", permission)), R.prop("permissionList"))(payload);

  const isAdmin = doesPermissionExist(PermissionTypes.UserAdmin, payload);
  const temporaryAccess = R.propEq("temporaryAccess", true, payload);
  // const hasViewGroup = R.pathEq(["permissionList", "uid"], PermissionTypes.ViewOrdersAndDeliveries, payload);
  const hasPriceGroup = doesPermissionExist(PermissionTypes.ViewPricing, payload);
  const hasPlaceOrder = doesPermissionExist(PermissionTypes.PlaceOrders, payload);
  const hasViewEstimatesGroup = doesPermissionExist(PermissionTypes.ViewEstimatesGroup, payload);
  const hasCreditLimit = hasCreditLimitAPI(payload);

  return state.merge({
    permissionState: {
      creditLimit: R.compose(formatCreditLimitText, R.prop("creditLimit"))(payload),
      startDate: R.propOr(new Date(), "startDate", payload),
      endDate: R.prop("endDate", payload),
      creditError: undefined,
      dateError: undefined,
      isAdmin,
      switches: {
        [PermissionTypes.ViewOrdersAndDeliveries]: SwitchValues.LOCKED,
        [PermissionTypes.ViewPricing]: isAdmin ? SwitchValues.LOCKED : hasPriceGroup ? SwitchValues.ON : SwitchValues.OFF,
        [PermissionTypes.PlaceOrders]: isAdmin ? SwitchValues.LOCKED : hasPlaceOrder ? SwitchValues.ON : SwitchValues.OFF,
        [PermissionTypes.ViewEstimatesGroup]: isAdmin
          ? SwitchValues.LOCKED
          : !hasPlaceOrder
          ? SwitchValues.DISABLED_LOCKED
          : hasViewEstimatesGroup
          ? SwitchValues.ON
          : SwitchValues.OFF,
        [PermissionTypes.TemporaryAccess]: temporaryAccess ? SwitchValues.ON : SwitchValues.OFF,
        [PermissionTypes.CreditLimit]: isAdmin ? SwitchValues.DISABLED : hasCreditLimit ? SwitchValues.ON : SwitchValues.OFF,
      },
    },
  });
};

const onAdminClick = (state, { payload }) =>
  state.merge({
    permissionState: {
      creditLimit: "",
      creditError: undefined,
      startDate: new Date(),
      dateError: undefined,
      endDate: undefined,
      isAdmin: payload,
      switches: {
        [PermissionTypes.ViewOrdersAndDeliveries]: SwitchValues.LOCKED,
        [PermissionTypes.PlaceOrders]: payload ? SwitchValues.LOCKED : SwitchValues.OFF,
        [PermissionTypes.ViewPricing]: payload ? SwitchValues.LOCKED : SwitchValues.OFF,
        [PermissionTypes.ViewEstimatesGroup]: payload ? SwitchValues.LOCKED : SwitchValues.DISABLED_LOCKED,
        [PermissionTypes.TemporaryAccess]: SwitchValues.OFF,
        [PermissionTypes.CreditLimit]: payload ? SwitchValues.DISABLED : SwitchValues.OFF,
      },
    },
  });

export const successTeamData: Reducer<ImmutableTeamState> = (state: ImmutableTeamState, action) =>
  state.merge({
    data: action.payload,
    searchedData: action.payload,
    fetching: false,
  });

export const contactsSuccess: Reducer<ImmutableTeamState> = (state: ImmutableTeamState, action) =>
  state.merge({
    contacts: action.payload,
    filteredContacts: action.payload,
  });

export const searchResult: Reducer<ImmutableTeamState> = (state: ImmutableTeamState, action) =>
  state.merge({
    filteredContacts: action.payload,
  });

export const clear: Reducer<ImmutableTeamState> = (state: ImmutableTeamState) =>
  state.merge({
    filteredContacts: [],
  });

export const setPermissions: Reducer<ImmutableTeamState> = (state: ImmutableTeamState, action) =>
  state.merge({
    internalPermissions: action.payload,
    fetching: false,
  });

export const getTeamData: Reducer<ImmutableTeamState> = state => state.merge({ fetching: true });

export const clearTeamData: Reducer<ImmutableTeamState> = state => state.merge({ searchedData: [] });

export const failure: Reducer<ImmutableTeamState> = state => state.merge({ fetching: false });

export const success: Reducer<ImmutableTeamState> = state => state.merge({ fetching: false });

export const searchTeamData: Reducer<ImmutableTeamState> = (state, { payload }) =>
  state.merge({
    searchedData: R.filter(
      R.anyPass([
        R.propSatisfies(R.compose(R.startsWith(R.toLower(payload)), R.toLower), "name"),
        R.propSatisfies(R.compose(R.startsWith(R.toLower(payload)), R.toLower), "phone"),
      ]),
    )(state.data),
  });
export const resetPermissions: Reducer<ImmutableTeamState> = state =>
  state.merge({
    permissionState: {
      creditError: undefined,
      creditLimit: "",
      dateError: undefined,
      startDate: new Date(),
      isAdmin: false,
      endDate: undefined,
      switches: {},
    },
  });
export const isContactsAllowed: Reducer<ImmutableTeamState> = (state, action) =>
  state.merge({
    contactsAllowed: action.payload,
  });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableTeamState> = {
  adminClick: onAdminClick,
  toggleSwitch: onSwitchChanged,
  creditChange: onCreditLimit,
  startDateChange: onStartDate,
  endDateChange: onEndDate,
  permissionAPIs: onGetPermission,
  clearTeamData,
  successTeamData,
  searchTeamData,
  getTeamData,
  failure,
  contactsSuccess,
  searchResult,
  clear,
  getInviteDetail: getTeamData,
  setPermissions,
  success,
  resetPermission: resetPermissions,
  isContactsAllowed,
};

export const ManageTeamReducers = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ManageTeamReducers;
