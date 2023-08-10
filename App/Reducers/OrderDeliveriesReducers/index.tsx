import * as R from "ramda";
import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { isToday } from "~root/Lib/CommonHelper";
import { isImportant } from "~root/Lib/OrderListHelper";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import FilterModel from "~root/Types/Filter";
import OrderDetailModel from "~root/Types/OrderDetail";
import { EnumOrderType, OrderSort, OrderStatus } from "~root/Types/OrderItem";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  request: createStandardAction("ORDER_DELIVERIES_REQUEST")<undefined, IAlertCallbacks>(),
  // Need to change once get the API response
  success: createStandardAction("ORDER_DELIVERIES_SUCCESS")<any>(),
  failure: createStandardAction("ORDER_DELIVERIES_FAILURE")<FailureRequestParam>(),
  selectOrderType: createStandardAction("SELECT_ORDER_TYPE")<EnumOrderType>(),
  filter: createStandardAction("ORDER_FILTER")<any>(),
  reset: createAction("ORDER_DELIVERIES_RESET"),
};

export const OrderDeliveriesActions = actionCreators;

export interface OrderDeliveriesState {
  data?: OrderDetailModel[] | null;
  filteredData?: OrderDetailModel[] | null;
  selectedOrderType: EnumOrderType;
  fetching: boolean;
  count: number;
  filterCount: number;
  filter: FilterModel;
}

export type OrderDeliveriesAction = PayloadAction<string, OrderDeliveriesState>;

export type ImmutableOrderDeliveriesState = SI.ImmutableObject<OrderDeliveriesState>;

/* ------------- Initial State ------------- */

export const InitialFilter = {
  sort: R.compose(R.head, R.keys)(OrderSort),
  status: [],
};

export const INITIAL_STATE: ImmutableOrderDeliveriesState = SI.from({
  data: [],
  count: 0,
  filterCount: 0,
  filteredData: [],
  selectedOrderType: EnumOrderType.Important,
  fetching: false,
  filter: InitialFilter,
});

/* ------------- Reducers ------------- */

export const request: Reducer<ImmutableOrderDeliveriesState> = (state: ImmutableOrderDeliveriesState) => state.merge({ fetching: true });

export const success: Reducer<ImmutableOrderDeliveriesState> = (state: ImmutableOrderDeliveriesState, action: AnyAction & { payload?: any }) => {
  if (!action.payload) {
    return failure(state, action);
  }

  let data = filterWithOrderType(state, action.payload);
  const count = R.compose(R.length, R.filter(R.compose(isToday, R.prop("requestDate"))))(action.payload);

  let selectedOrderType = state.selectedOrderType;
  if (state.selectedOrderType === EnumOrderType.Important && data.length === 0) {
    selectedOrderType = EnumOrderType.All;
    data = filterWithOrderType(state, action.payload, selectedOrderType);
  }

  return state.merge({
    fetching: false,
    selectedOrderType,
    data: action.payload,
    filteredData: data,
    count,
  });
};

export const failure: Reducer<ImmutableOrderDeliveriesState> = (state: ImmutableOrderDeliveriesState) => state.merge({ fetching: false });

function applyFilterInternal(filterModel: FilterModel, data: OrderDetailModel[]): OrderDetailModel[] {
  if (R.isEmpty(filterModel.status)) {
    return data;
  } else {
    // @ts-ignore
    return R.filter(value =>
      R.includes(
        R.toLower(value.status),
        R.map(
          R.compose(R.toLower, (key: any) => OrderStatus[key]),
          filterModel.status,
        ),
      ),
    )(data);
  }
}

function filterWithOrderType(state: OrderDeliveriesState, data: OrderDetailModel[], selectedOrderType?: EnumOrderType) {
  const filteredData = applyFilterInternal(state.filter, data);

  const orderType = selectedOrderType ? selectedOrderType : state.selectedOrderType;
  switch (orderType) {
    case EnumOrderType.Important:
      return R.filter(isImportant, filteredData);
    case EnumOrderType.Pickup:
      return R.filter((value: OrderDetailModel) => value.fulfilmentType === "Pickup")(filteredData);
    case EnumOrderType.Delivery:
      return R.filter((value: OrderDetailModel) => value.fulfilmentType === "Delivery")(filteredData);
    case EnumOrderType.All:
      return filteredData;
  }
}

const selectOrderType: Reducer<ImmutableOrderDeliveriesState> = (state, { payload }) => {
  const newState = state.merge({ selectedOrderType: payload });
  return newState.merge({
    filteredData: filterWithOrderType(newState, newState.data),
  });
};

export const filter: Reducer<ImmutableOrderDeliveriesState> = (state: ImmutableOrderDeliveriesState, action: AnyAction) => {
  const newState = state.merge({ filter: action.payload });
  return newState.merge({
    filteredData: filterWithOrderType(newState, newState.data),
    filterCount: newState.filter.status.length,
  });
};

export const reset: Reducer<ImmutableOrderDeliveriesState> = R.always(INITIAL_STATE);

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableOrderDeliveriesState> = {
  request,
  selectOrderType,
  failure,
  success,
  filter,
  reset,
};

export const OrderDeliveriesReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default OrderDeliveriesReducer;
