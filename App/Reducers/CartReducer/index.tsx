import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { ApplyVoucherParams } from "~root/Types/BranchDetail";
import { FailureRequestParam } from "~root/Types/CommonTypes";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createStandardAction, createAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  swapCartProduct: createStandardAction("SWAP_CART_PRODUCT")<any, IAlertCallbacks>(),
  swapCartProductSuccess: createStandardAction("SWAP_CART_PRODUCT_SUCCESS")<any>(),
  swapCartProductFailure: createStandardAction("SWAP_CART_PRODUCT_FAILURE")<any>(),
  checkFulfilmentEligibility: createStandardAction("REQUEST_FULFILMENT_ELIGIBILITY")<any, IAlertCallbacks>(),
  successFulfilmentEligibility: createStandardAction("FULFILMENT_ELIGIBILITY_SUCCESS")<any>(),
  requestUserCart: createStandardAction("REQUEST_USER_CART")(),
  userCartSuccess: createStandardAction("USER_CART_SUCCESS")<any>(),
  addProductToCartRequest: createStandardAction("ADD_PRODUCT_TO_CART_REQUEST")<any, IAlertCallbacks>(),
  addProductToCartSuccess: createStandardAction("ADD_PRODUCT_TO_CART_SUCCESS")<number>(),
  deleteCartEntry: createStandardAction("CART_DELETE_ENTRY_ACTION")<any, IAlertCallbacks>(),
  requestUserCartDetail: createStandardAction("REQUEST_USER_CART_DETAIL")<undefined, IAlertCallbacks | undefined>(),
  userCartDetailSuccess: createStandardAction("USER_CART_DETAIL_SUCCESS")<any>(),
  payNowAndPayCallBackSuccess: createStandardAction("PAY_NOW_AND_APY_CALL_BACK_SUCCESS")<any>(),
  requestDeleteAppliedVoucher: createStandardAction("REQUEST_DELETE_APPLIED_VOUCHER")<ApplyVoucherParams, IAlertCallbacks>(),
  deleteAppliedVoucherSuccess: createStandardAction("DELETE_APPLIED_VOUCHER_SUCCESS")<any>(),
  requestApplyVoucher: createStandardAction("REQUEST_APPLY_VOUCHER")<ApplyVoucherParams, IAlertCallbacks>(),
  applyVoucherSuccess: createStandardAction("APPLY_VOUCHER_SUCCESS")<any>(),
  updateItemQuantityRequest: createStandardAction("UPDATE_ITEM_QUANTITY_REQUEST")<any, IAlertCallbacks>(),
  failure: createStandardAction("USER_CART_FAILURE")<FailureRequestParam>(),
  cartItemUpdateMap: createStandardAction("CART_ITEM_UDPATE_MAP")<any>(),
  cartItemDeleteMap: createStandardAction("CART_ITEM_DELETE_MAP")<any>(),
  requestSaveDeliveryInfoToUserSessionCart: createStandardAction("SAVE_DELIVERY_INFO_USER_CART_REQUEST")<string, IAlertCallbacks | undefined>(),
  saveDeliveryInfoToUserSessionCartSuccess: createStandardAction("SAVE_DELIVERY_INFO_USER_CART_SUCCESS")<any>(),
  failureDeliveryInfo: createStandardAction("REQUEST_SAVE_DELIVERY_INFO_ERROR")<FailureRequestParam>(),
  requestSaveCartContactDetails: createStandardAction("SAVE_CART_CONTACT_DETAILS")<any, IAlertCallbacks | undefined>(),
  saveCartContactDetailsSuccess: createStandardAction("SAVE_CART_CONTACT_DETAILS_SUCCESS")<any>(),
  saveCartContactDetailsFailure: createStandardAction("SAVE_CART_CONTACT_DETAILS_FAILURE")<FailureRequestParam>(),
  updateRequestDateTime: createStandardAction("UPDATE_REQUEST_DATE_AND_TIME")<{
    requestDate: string;
    requestTime: string;
  }>(),
  updateOptionalRequirements: createStandardAction("UPDATE_OPTIONAL_REQUIREMENTS")<{
    siteRequirements?: string[];
    truckRequirements?: string[];
    additionalInfo?: string;
  }>(),
  deleteSiteContactDetails: createStandardAction("DELETE_SITE_CONTACT_DETAILS")<any, IAlertCallbacks>(),
  deleteSiteContactDetailsSuccess: createStandardAction("DELETE_SITE_CONTACT_DETAILS_SUCCESS")(),
  deleteSiteContactDetailsFailure: createStandardAction("DELETE_SITE_CONTACT_DETAILS_FAILURE")<FailureRequestParam>(),
  requestSaveCartInfo: createStandardAction("SAVE_CART_INFO")<any, IAlertCallbacks | undefined>(),
  saveCartInfoSuccess: createStandardAction("SAVE_CART_INFO_SUCCESS")<any>(),
  saveCartInfoFailure: createStandardAction("SAVE_CART_INFO_FAILURE")<FailureRequestParam>(),
  requestDeliveryRequirements: createStandardAction("REQUEST_DELIVERY_REQUIREMENTS")<IAlertCallbacks | undefined>(),
  deliveryRequirementsSuccess: createStandardAction("REQUEST_DELIVERY_REQUIREMENTS_SUCCESS")<any>(),
  deliveryRequirementsFailure: createStandardAction("REQUEST_DELIVERY_REQUIREMENTS_FAILURE")<FailureRequestParam>(),
};

export const CartActions = actionCreators;

export interface CartState {
  userCart?: any | null;
  fetching: boolean;
  cartEntriesCount: number;
  userCartDetail?: any | null;
  voucherInfo?: any | null;
  itemUpdateMap: any;
  itemDeleteMap: any;
  isPromoAPIInProgress: boolean;
  eligibility?: any;
  fetchingDeliveryInfo?: boolean;
  requestDate?: string;
  requestTime?: string;
  siteRequirements?: string[];
  truckRequirements?: string[];
  additionalInfo?: string;
  codeOfContactDeleting: number;
  fetchingContactInfo?: boolean;
  checkingEligibility: boolean;
  savingCartInfo: boolean;
  deliveryRequirements: any;
  fetchingDeliveryRequirements: boolean;
  payNowDetails: any;
  payCallBackDetails: any;
}

export type CartAction = PayloadAction<string, CartState>;

export type ImmutableCartState = SI.ImmutableObject<CartState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableCartState = SI.from({
  userCart: undefined,
  fetching: false,
  cartEntriesCount: 0,
  userCartDetail: undefined,
  voucherInfo: undefined,
  itemUpdateMap: {},
  itemDeleteMap: {},
  isPromoAPIInProgress: false,
  siteRequirements: [],
  truckRequirements: [],
  additionalInfo: "",
  codeOfContactDeleting: -1,
  fetchingContactInfo: false,
  checkingEligibility: false,
  savingCartInfo: false,
  deliveryRequirements: undefined,
  fetchingDeliveryRequirements: false,
  payNowDetails: [],
  payCallBackDetails: [],
});

/* ------------- Reducers ------------- */
// @ts-ignore
export const addProductToCartRequest: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) => state.merge({ fetching: true });

// @ts-ignore
export const addProductToCartSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({ fetching: false, cartEntriesCount: payload });

// @ts-ignore
export const requestUserCart: Reducer<ImmutableCartState> = (state: ImmutableCartState) => state.merge({ fetching: true });

// @ts-ignore
export const failure: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    fetching: false,
    isPromoAPIInProgress: false,
    checkingEligibility: false,
  });

const userCartSuccess: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    userCart: payload,
    fetching: false,
    cartEntriesCount: payload.entries.length,
  });

const requestUserCartDetail: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetching: true });

const userCartDetailSuccess: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    userCartDetail: payload,
    fetching: false,
    cartEntriesCount: payload?.entries?.length,
    checkingEligibility: false,
  });

const payNowAndPayCallBackSuccess: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    payNowDetails: payload?.payNowDetails,
    payCallBackDetails: payload?.payCallBackDetails,
    fetching: false,
  });

const requestApplyVoucher: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetching: true, isPromoAPIInProgress: true });

const applyVoucherSuccess: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    voucherInfo: payload,
    fetching: false,
    isPromoAPIInProgress: false,
  });

const requestDeleteAppliedVoucher: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetching: true, isPromoAPIInProgress: true });

const deleteAppliedVoucherSuccess: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    voucherInfo: payload,
    fetching: false,
    isPromoAPIInProgress: false,
  });

const updateItemQuantityRequest: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetching: true });

const request: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetching: true });

const cartItemUpdateMap: Reducer<ImmutableCartState> = (state: any, { payload }) => {
  let itemUpdateMap = JSON.parse(JSON.stringify(state.itemUpdateMap));
  itemUpdateMap[payload.code] = payload.value;
  return state.merge({ itemUpdateMap: itemUpdateMap });
};

const cartItemDeleteMap: Reducer<ImmutableCartState> = (state: any, { payload }) => {
  let itemDeleteMap = JSON.parse(JSON.stringify(state.itemDeleteMap));
  itemDeleteMap[payload.code] = payload.value;
  let count = state.cartEntriesCount;
  payload.value ? count-- : undefined;
  payload.failure ? count++ : undefined;
  return state.merge({ itemDeleteMap: itemDeleteMap, cartEntriesCount: count });
};

const checkFulfilmentEligibility: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    eligibility: undefined,
    fetching: true,
    checkingEligibility: true,
  });

const successFulfilmentEligibility: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({
    eligibility: payload,
    fetching: false,
  });

const requestSaveDeliveryInfoToUserSessionCart: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingDeliveryInfo: true });

const failureDeliveryInfo: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingDeliveryInfo: false });

const saveDeliveryInfoToUserSessionCartSuccess: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingDeliveryInfo: false });

const requestSaveCartContactDetails: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingContactInfo: true });

const saveCartContactDetailsFailure: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingContactInfo: false });

const saveCartContactDetailsSuccess: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingContactInfo: false });

const updateRequestDateTime: Reducer<ImmutableCartState> = (state: any, { payload }) => state.merge({ ...payload });

const updateOptionalRequirements: Reducer<ImmutableCartState> = (state: any, { payload }) => state.merge({ ...payload });

const deleteSiteContactDetails: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({ codeOfContactDeleting: payload, fetchingContactInfo: true });

const deleteSiteContactDetailsSuccess: Reducer<ImmutableCartState> = (state: any) => state.merge({ codeOfContactDeleting: -1, fetchingContactInfo: false });

const deleteSiteContactDetailsFailure: Reducer<ImmutableCartState> = (state: any) => state.merge({ codeOfContactDeleting: -1, fetchingContactInfo: false });

const requestSaveCartInfo: Reducer<ImmutableCartState> = (state: any) => state.merge({ savingCartInfo: true });

const saveCartInfoSuccess: Reducer<ImmutableCartState> = (state: any) => state.merge({ savingCartInfo: false });

const saveCartInfoFailure: Reducer<ImmutableCartState> = (state: any) => state.merge({ savingCartInfo: false });

const requestDeliveryRequirements: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingDeliveryRequirements: true });

const deliveryRequirementsSuccess: Reducer<ImmutableCartState> = (state: any, { payload }) =>
  state.merge({ fetchingDeliveryRequirements: false, deliveryRequirements: payload });

const deliveryRequirementsFailure: Reducer<ImmutableCartState> = (state: any) => state.merge({ fetchingDeliveryRequirements: false });

// @ts-ignore
export const swapCartProduct: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const swapCartProductSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  // FIXME: this should included with base price on entries array
  // let entries = [...state.quotesProducts.entries];
  // entries.splice(R.findIndex(R.propEq("entryNumber", payload.entry.entryNumber), entries), 1, payload.entry);
  return state.merge({
    fetching: false,
  });
};

// @ts-ignore
export const swapCartProductFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableCartState> = {
  requestUserCart,
  userCartSuccess,
  checkFulfilmentEligibility,
  successFulfilmentEligibility,
  failure,
  addProductToCartRequest,
  addProductToCartSuccess,
  requestUserCartDetail,
  userCartDetailSuccess,
  payNowAndPayCallBackSuccess,
  requestApplyVoucher,
  applyVoucherSuccess,
  requestDeleteAppliedVoucher,
  deleteAppliedVoucherSuccess,
  updateItemQuantityRequest,
  deleteCartEntry: request,
  cartItemUpdateMap,
  cartItemDeleteMap,
  requestSaveDeliveryInfoToUserSessionCart,
  saveDeliveryInfoToUserSessionCartSuccess,
  failureDeliveryInfo,
  updateRequestDateTime,
  requestSaveCartContactDetails,
  saveCartContactDetailsSuccess,
  saveCartContactDetailsFailure,
  updateOptionalRequirements,
  deleteSiteContactDetails,
  deleteSiteContactDetailsSuccess,
  deleteSiteContactDetailsFailure,
  requestSaveCartInfo,
  saveCartInfoSuccess,
  saveCartInfoFailure,
  requestDeliveryRequirements,
  deliveryRequirementsSuccess,
  deliveryRequirementsFailure,
  swapCartProduct,
  swapCartProductSuccess,
  swapCartProductFailure,
};

export const CartReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default CartReducer;
