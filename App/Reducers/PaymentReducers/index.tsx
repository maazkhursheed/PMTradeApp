import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { createAction, deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestPaymentStatus: createStandardAction("PAYMENT_STATUS_REQUEST")<IAlertCallbacks>(),
  paymentStatusSuccess: createStandardAction("PAYMENT_STATUS_SUCCESS")<any>(),
  onFailure: createAction("PAYMENT_STATUS_FAILURE")<any>(),
};

export const PaymentStatusActions = actionCreators;

export interface PaymentStatusState {
  paymentStatus: string;
  fetching: boolean;
}

export type PaymentStatusActions = PayloadAction<string, PaymentStatusState>;

export type ImmutablePaymentStatusState = SI.ImmutableObject<PaymentStatusState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutablePaymentStatusState = SI.from({
  paymentStatus: "",
  fetching: false,
});

/* ------------- Reducers ------------- */

export const requestPaymentStatus: Reducer<ImmutablePaymentStatusState> = (state: ImmutablePaymentStatusState) => state.merge({ fetching: true });

export const paymentStatusSuccess: Reducer<ImmutablePaymentStatusState> = (state: ImmutablePaymentStatusState, { payload }) =>
  state.merge({ fetching: false, paymentStatus: payload });

export const onFailure: Reducer<ImmutablePaymentStatusState> = (state: ImmutablePaymentStatusState) =>
  state.merge({ fetching: false, paymentStatus: undefined });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutablePaymentStatusState> = {
  requestPaymentStatus,
  paymentStatusSuccess,
  onFailure,
};

export const PaymentReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default PaymentReducer;
