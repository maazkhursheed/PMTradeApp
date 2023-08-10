import * as R from "ramda";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { EnumQuoteType } from "~root/Lib/QuoteHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestQuotesList: createStandardAction("REQUEST_QUOTES_LIST")<any, IAlertCallbacks>(),
  quotesListSuccess: createStandardAction("QUOTES_LIST_SUCCESS")<any>(),
  quotesListFailure: createStandardAction("QUOTES_LIST_FAILURE")<any>(),
  requestQuotesListDetails: createStandardAction("REQUEST_QUOTES_LIST_DETAILS")<any, IAlertCallbacks>(),
  quotesListDetailsSuccess: createStandardAction("QUOTES_LIST_DETAILS_SUCCESS")<any>(),
  quotesListDetailsFailure: createStandardAction("QUOTES_LIST_DETAILS_FAILURE")<any>(),
  requestQuoteProducts: createStandardAction("REQUEST_QUOTE_PRODUCTS")<any, IAlertCallbacks>(),
  quoteProductsSuccess: createStandardAction("QUOTE_PRODUCTS_SUCCESS")<any>(),
  quoteProductsFailure: createStandardAction("QUOTE_PRODUCTS_FAILURE")<any>(),
  updateProductQuantity: createStandardAction("UPDATE_QUOTE_PRODUCT_QUANTITY")<any, IAlertCallbacks>(),
  updateQuoteProductQuanitytSuccess: createStandardAction("UPDATE_QUOTE_PRODUCT_QUANTITY_SUCCESS")<any>(),
  updateQuoteProductQuanitytFailure: createStandardAction("UPDATE_QUOTE_PRODUCT_QUANTITY_FAILURE")<any>(),
  addOwnProduct: createStandardAction("ADD_OWN_PRODUCT")<any, IAlertCallbacks>(),
  addOwnProductSuccess: createStandardAction("ADD_OWN_PRODUCT_SUCCESS")<any>(),
  addOwnProductFailure: createStandardAction("ADD_OWN_PRODUCT_FAILURE")<any>(),
  swapProduct: createStandardAction("SWAP_PRODUCT")<any, IAlertCallbacks>(),
  swapProductSuccess: createStandardAction("SWAP_PRODUCT_SUCCESS")<any>(),
  swapProductFailure: createStandardAction("SWAP_PRODUCT_FAILURE")<any>(),
  deleteQuoteProduct: createStandardAction("DELETE_QUOTE_PRODUCT")<any, IAlertCallbacks>(),
  deleteQuoteProductSuccess: createStandardAction("DELETE_QUOTE_PRODUCT_SUCCESS")<any>(),
  deleteQuoteProductFailure: createStandardAction("DELETE_QUOTE_PRODUCT_FAILURE")<any>(),
  clearQuoteProductsList: createStandardAction("CLEAR_QUOTE_PRODUCTS_LIST")(),
  updateQuoteMarkupPercent: createStandardAction("UPDATE_QUOTE_MARKUP_PERCENT")<any, IAlertCallbacks>(),
  updateQuoteMarkupPercentSuccess: createStandardAction("UPDATE_QUOTE_MARKUP_PERCENT_SUCCESS")<any>(),
  updateQuoteMarkupPercentFailure: createStandardAction("UPDATE_QUOTE_MARKUP_PERCENT_FAILURE")<any>(),
  requestLabourCost: createStandardAction("REQUEST_LABOUR_COST")<any, IAlertCallbacks>(),
  requestLabourCostSuccess: createStandardAction("REQUEST_LABOUR_COST_SUCCESS")<any>(),
  requestLabourCostFailure: createStandardAction("REQUEST_LABOUR_COST_FAILURE")<any>(),
  updateQuoteDetails: createStandardAction("UPDATE_QUOTE_DETAILS")<any, IAlertCallbacks>(),
  updateQuoteDetailsSuccess: createStandardAction("UPDATE_QUOTE_DETAILS_SUCCESS")<any>(),
  updateQuoteDetailsFailure: createStandardAction("UPDATE_QUOTE_DETAILS_FAILURE")<any>(),
  updateQuoteJobStatus: createStandardAction("UPDATE_QUOTE_JOB_STATUS")<any, IAlertCallbacks>(),
  updateQuoteJobStatusSuccess: createStandardAction("UPDATE_QUOTE_JOB_STATUS_SUCCESS")<any>(),
  updateQuoteJobStatusFailure: createStandardAction("UUPDATE_QUOTE_JOB_STATUS_FAILURE")<any>(),
  updateQuoteCompanyDetails: createStandardAction("UPDATE_QUOTE_COMPANY_DETAILS")<any, IAlertCallbacks>(),
  updateQuoteCompanyDetailsSuccess: createStandardAction("UPDATE_QUOTE_COMPANY_DETAILS_SUCCESS")<any>(),
  updateQuoteCompanyDetailsFailure: createStandardAction("UPDATE_QUOTE_COMPANY_DETAILS_FAILURE")<any>(),
  addNewJob: createStandardAction("ADD_NEW_JOB")<any, IAlertCallbacks>(),
  addNewJobSuccess: createStandardAction("ADD_NEW_JOB_SUCCESS")<any>(),
  addNewJobFailure: createStandardAction("ADD_NEW_JOB_FAILURE")<any>(),
  createLabourCost: createStandardAction("CREATE_LABOUR_COST")<any, IAlertCallbacks>(),
  createLabourCostSuccess: createStandardAction("CREATE_LABOUR_COST_SUCCESS")<any>(),
  createLabourCostFailure: createStandardAction("CREATE_LABOUR_COST_FAILURE")<any>(),
  deleteLabourCost: createStandardAction("DELETE_LABOUR_COST")<any, IAlertCallbacks>(),
  deleteLabourCostSuccess: createAction("DELETE_LABOUR_COST_SUCCESS"),
  deleteLabourCostFailure: createStandardAction("DELETE_LABOUR_COST_FAILURE")<any>(),
  requestCompanyDetails: createStandardAction("REQUEST_COMPANY_DETAILS")<any, IAlertCallbacks>(),
  companyDetailsSuccess: createStandardAction("COMPANY_DETAILS_SUCCESS")<any>(),
  companyDetailsFailure: createStandardAction("COMPANY_DETAILS_FAILURE")<any>(),
  updateLabourCost: createStandardAction("UPDATE_LABOUR_COST")<any, IAlertCallbacks>(),
  updateLabourCostSuccess: createStandardAction("UPDATE_LABOUR_COST_SUCCESS")<any>(),
  updateLabourCostFailure: createStandardAction("UPDATE_LABOUR_COST_FAILURE")<any>(),
  requestViewQuote: createStandardAction("REQUEST_VIEW_QUOTE")<any, IAlertCallbacks>(),
  viewQuoteSuccess: createStandardAction("VIEW_QUOTE_SUCCESS")<any>(),
  viewQuoteFailure: createStandardAction("VIEW_QUOTE_FAILURE")<any>(),
  clearViewQuote: createAction("CLEAR_VIEW_QUOTE"),
  requestMarkCompleted: createStandardAction("REQUEST_MARK_COMPLETE")<any, IAlertCallbacks>(),
  markCompletedSuccess: createAction("MARK_COMPLETE_SUCCESS"),
  markCompletedFailure: createStandardAction("MARK_COMPLETE_FAILURE")<any>(),
  requestMaterialsReprice: createStandardAction("REQUEST_MATERIALS_REPRICE")<any, IAlertCallbacks>(),
  materialsRepriceSuccess: createStandardAction("MATERIALS_REPRICE_SUCCESS")<any>(),
  materialsRepriceFailure: createStandardAction("MATERIALS_REPRICE_FAILURE")<any>(),
  selectQuoteType: createStandardAction("SELECT_QUOTE_TYPE")<EnumQuoteType>(),
  sendEmailQuote: createStandardAction("SEND_EMAIL_QUOTE")<any, IAlertCallbacks>(),
  sendEmailQuoteSuccess: createStandardAction("SEND_EMAIL_QUOTE_SUCCESS")<any>(),
  sendEmailQuoteFailure: createStandardAction("SEND_EMAIL_QUOTE_FAILURE")<any>(),
  changeQuoteStatus: createStandardAction("CHANGE_QUOTE_STATUS")<any, IAlertCallbacks>(),
  changeQuoteStatusSuccess: createStandardAction("CHANGE_QUOTE_STATUS_SUCCESS")(),
  changeQuoteStatusFailure: createStandardAction("CHANGE_QUOTE_STATUS_FAILURE")<any>(),
  uploadImageFileToQuote: createStandardAction("UPLOAD_IMAGE_FILE_TO_QUOTE")<any, IAlertCallbacks>(),
  uploadImageFileToQuoteSuccess: createStandardAction("UPLOAD_IMAGE_FILE_TO_QUOTE_SUCCESS")<any>(),
  uploadImageFileToQuoteFailure: createStandardAction("UPLOAD_IMAGE_FILE_TO_QUOTE_FAILURE")<any>(),
  getQuoteMedia: createStandardAction("GET_QUOTE_MEDIA")<any, IAlertCallbacks>(),
  getQuoteMediaSuccess: createStandardAction("GET_QUOTE_MEDIA_SUCCESS")<any>(),
  getQuoteMediaFailure: createStandardAction("GET_QUOTE_MEDIA_FAILURE")<any>(),
  requestDefaultDisplayOptionsForQuotes: createStandardAction("REQUEST_DISPLAY_OPTIONS_QUOTES")<any>(),
  defaultDisplayOptionsForQuotesSuccess: createStandardAction("DISPLAY_OPTIONS_QUOTES_SUCCESS")<any>(),
  defaultDisplayOptionsForQuotesFailure: createStandardAction("DISPLAY_OPTIONS_QUOTES_FAILURE")<any>(),
  updateDisplayOptionsForQuotes: createStandardAction("UPDATE_DISPLAY_OPTIONS_QUOTES")<any, IAlertCallbacks>(),
  updateDisplayOptionsForQuotesSuccess: createStandardAction("UPDATE_DISPLAY_OPTIONS_QUOTES_SUCCESS")<any>(),
  updateDisplayOptionsForQuotesFailure: createStandardAction("UPDATE_DISPLAY_OPTIONS_QUOTES_FAILURE")<any>(),
  deleteQuoteMedia: createStandardAction("DELETE_QUOTE_MEDIA")<any, IAlertCallbacks>(),
  deleteQuoteMediaSuccess: createStandardAction("DELETE_QUOTE_MEDIA_SUCCESS")<any>(),
  deleteQuoteMediaFailure: createStandardAction("DELETE_QUOTE_MEDIA_FAILURE")<any>(),
  updateQuoteMedia: createStandardAction("UPDATE_QUOTE_MEDIA")<any, IAlertCallbacks>(),
  updateQuoteMediaSuccess: createStandardAction("UPDATE_QUOTE_MEDIA_SUCCESS")<any>(),
  updateQuoteMediaFailure: createStandardAction("UPDATE_QUOTE_MEDIA_FAILURE")<any>(),
  deleteQuote: createStandardAction("DELETE_QUOTE")<any, IAlertCallbacks>(),
  deleteQuoteSuccess: createAction("DELETE_QUOTE_SUCCESS"),
  deleteQuoteFailure: createStandardAction("DELETE_QUOTE_FAILURE")<any>(),
};

export const QuotesActions = actionCreators;

export interface QuotesState {
  quotesList?: any | null;
  quotesListDetails?: any | null;
  quotesProducts?: any | null;
  fetching: boolean;
  ownProduct?: any | null;
  labourOtherCost?: any | null;
  addNewJob?: any | null;
  updateQuote?: any | null;
  companyDetails?: any | null;
  viewQuote: any | null;
  quoteMedia?: any | null;
  displayOptionsQuote?: any | null;
}

export type QuotesActions = PayloadAction<string, QuotesState>;

export type ImmutableQuotesState = SI.ImmutableObject<QuotesState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableQuotesState = SI.from({
  quotesList: undefined,
  quotesListDetails: undefined,
  quotesProducts: undefined,
  fetching: false,
  ownProduct: undefined,
  labourOtherCost: undefined,
  updateQuote: undefined,
  addNewJob: undefined,
  companyDetails: undefined,
  viewQuote: undefined,
  quoteMedia: undefined,
  displayOptionsQuote: undefined,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const requestMarkCompleted: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const markCompletedSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const markCompletedFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const requestQuotesList: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const quotesListSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, quotesList: payload });

// @ts-ignore
export const quotesListFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false, quotesList: undefined });

// @ts-ignore
export const requestQuotesListDetails: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const quotesListDetailsSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, quotesListDetails: payload });

// @ts-ignore
export const quotesListDetailsFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) =>
  state.merge({ fetching: false, quotesListDetails: undefined, quoteMedia: undefined });

// @ts-ignore
export const requestQuoteProducts: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const quoteProductsSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, quotesProducts: payload });

// @ts-ignore
export const quoteProductsFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false, quotesProducts: undefined });

// @ts-ignore
export const updateProductQuantity: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateQuoteProductQuanitytSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  if (state.quotesProducts) {
    let entries = [...state.quotesProducts.entries];
    entries.splice(R.findIndex(R.propEq("entryNumber", payload.entry.entryNumber), entries), 1, payload.entry);
    return state.merge({
      fetching: false,
      quotesListDetails: { ...state.quotesListDetails, totalPrice: payload.subTotal },
      quotesProducts: { ...state.quotesProducts, entries: entries },
    });
  } else {
    return state;
  }
};

// @ts-ignore
export const updateQuoteProductQuanitytFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteQuoteProduct: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const deleteQuoteProductSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) =>
  state.merge({
    fetching: false,
  });

// @ts-ignore
export const deleteQuoteProductFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const clearQuoteProductsList: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ quotesProducts: null });

//@ts-ignore
export const updateQuoteMarkupPercent: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

//@ts-ignore
export const updateQuoteMarkupPercentSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, quotesListDetails: payload });

//@ts-ignore
export const updateQuoteMarkupPercentFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const addOwnProduct: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const addOwnProductSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  // FIXME: this should included with base price on entries array
  // let entries = [...state.quotesProducts.entries];
  // entries.splice(R.findIndex(R.propEq("entryNumber", payload.entry.entryNumber), entries), 1, payload.entry);
  return state.merge({
    fetching: false,
    ownProduct: { ...state.ownProduct },
    // quotesProducts: { ...state.quotesProducts, entries: entries },
  });
};

// @ts-ignore
export const addOwnProductFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const swapProduct: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const swapProductSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  // FIXME: this should included with base price on entries array
  // let entries = [...state.quotesProducts.entries];
  // entries.splice(R.findIndex(R.propEq("entryNumber", payload.entry.entryNumber), entries), 1, payload.entry);
  return state.merge({
    fetching: false,
    ownProduct: { ...state.ownProduct },
    // quotesProducts: { ...state.quotesProducts, entries: entries },
  });
};

// @ts-ignore
export const swapProductFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const requestLabourCost: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const requestLabourCostSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, labourOtherCost: payload });

// @ts-ignore
export const requestLabourCostFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateQuoteDetails: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateQuoteDetailsSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  return state.merge({
    fetching: false,
    updateQuote: payload,
  });
};

// @ts-ignore
export const updateQuoteDetailsFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateQuoteJobStatus: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateQuoteJobStatusSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  return state.merge({
    fetching: false,
    updateQuote: payload,
  });
};

// @ts-ignore
export const updateQuoteJobStatusFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateQuoteCompanyDetailsFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateQuoteCompanyDetails: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateQuoteCompanyDetailsSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  return state.merge({
    fetching: false,
    updateQuote: payload,
  });
};

// @ts-ignore
export const addNewJob: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const addNewJobFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const addNewJobSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => {
  return state.merge({
    fetching: false,
    addNewJob: { ...state.ownProduct },
  });
};

// @ts-ignore
export const createLabourCost: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const createLabourCostSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const createLabourCostFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const sendEmailQuote: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const sendEmailQuoteSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const sendEmailQuoteFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteLabourCost: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const deleteLabourCostSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteLabourCostFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const requestCompanyDetails: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const companyDetailsSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, companyDetails: payload });

// @ts-ignore
export const companyDetailsFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) =>
  state.merge({ fetching: false, companyDetails: undefined });

// @ts-ignore
export const updateLabourCost: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateLabourCostSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateLabourCostFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const requestViewQuote: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const viewQuoteSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, viewQuote: payload });

// @ts-ignore
export const viewQuoteFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false, viewQuote: undefined });

// @ts-ignore
export const clearViewQuote: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false, viewQuote: undefined });

// @ts-ignore
export const requestMaterialsReprice: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const materialsRepriceSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const materialsRepriceFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const changeQuoteStatus: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const changeQuoteStatusSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const changeQuoteStatusFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const uploadImageFileToQuote: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({});

// @ts-ignore
export const uploadImageFileToQuoteSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) => state.merge({});

// @ts-ignore
export const uploadImageFileToQuoteFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({});

// @ts-ignore
export const getQuoteMedia: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const getQuoteMediaSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, quoteMedia: payload });

// @ts-ignore
export const getQuoteMediaFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const requestDefaultDisplayOptionsForQuotes: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const defaultDisplayOptionsForQuotesSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({ fetching: false, displayOptionsQuote: payload });

// @ts-ignore
export const defaultDisplayOptionsForQuotesFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) =>
  state.merge({ fetching: false, displayOptionsQuote: undefined });

// @ts-ignore
export const updateDisplayOptionsForQuotes: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateDisplayOptionsForQuotesSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateDisplayOptionsForQuotesFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteQuoteMedia: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const deleteQuoteMediaSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({
    fetching: false,
    quoteMedia: { quoteMedia: state.quoteMedia?.quoteMedia?.filter((mediaItem: any) => mediaItem.quoteMediaPK !== payload.quoteMediaPK) },
  });

// @ts-ignore
export const deleteQuoteMediaFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const updateQuoteMedia: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const updateQuoteMediaSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState, { payload }) =>
  state.merge({
    fetching: false,
    quoteMedia: {
      quoteMedia: state.quoteMedia?.quoteMedia?.map((mediaItem: any) => {
        if (mediaItem.quoteMediaPK === payload.quoteMediaPK) {
          return { ...mediaItem, mediaSelected: payload.bodyParams.mediaSelected };
        }
        return mediaItem;
      }),
    },
  });

// @ts-ignore
export const updateQuoteMediaFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteQuote: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: true });

// @ts-ignore
export const deleteQuoteSuccess: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteQuoteFailure: Reducer<ImmutableQuotesState> = (state: ImmutableQuotesState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableQuotesState> = {
  requestQuotesList,
  quotesListSuccess,
  quotesListFailure,
  requestQuotesListDetails,
  quotesListDetailsSuccess,
  quotesListDetailsFailure,
  requestQuoteProducts,
  quoteProductsSuccess,
  quoteProductsFailure,
  updateProductQuantity,
  updateQuoteProductQuanitytSuccess,
  updateQuoteProductQuanitytFailure,
  addOwnProduct,
  addOwnProductSuccess,
  addOwnProductFailure,
  swapProduct,
  swapProductSuccess,
  swapProductFailure,
  deleteQuoteProduct,
  deleteQuoteProductSuccess,
  deleteQuoteProductFailure,
  clearQuoteProductsList,
  updateQuoteMarkupPercentSuccess,
  updateQuoteMarkupPercentFailure,
  updateQuoteMarkupPercent,
  requestLabourCost,
  requestLabourCostSuccess,
  requestLabourCostFailure,
  updateQuoteDetails,
  updateQuoteDetailsSuccess,
  updateQuoteDetailsFailure,
  updateQuoteJobStatus,
  updateQuoteJobStatusSuccess,
  updateQuoteJobStatusFailure,
  updateQuoteCompanyDetails,
  updateQuoteCompanyDetailsSuccess,
  updateQuoteCompanyDetailsFailure,
  addNewJob,
  addNewJobSuccess,
  addNewJobFailure,
  createLabourCost,
  createLabourCostSuccess,
  createLabourCostFailure,
  deleteLabourCost,
  deleteLabourCostSuccess,
  deleteLabourCostFailure,
  requestCompanyDetails,
  companyDetailsSuccess,
  companyDetailsFailure,
  updateLabourCost,
  updateLabourCostSuccess,
  updateLabourCostFailure,
  requestViewQuote,
  viewQuoteFailure,
  viewQuoteSuccess,
  clearViewQuote,
  requestMarkCompleted,
  markCompletedSuccess,
  markCompletedFailure,
  requestMaterialsReprice,
  materialsRepriceSuccess,
  materialsRepriceFailure,
  sendEmailQuote,
  sendEmailQuoteSuccess,
  sendEmailQuoteFailure,
  changeQuoteStatus,
  changeQuoteStatusSuccess,
  changeQuoteStatusFailure,
  uploadImageFileToQuote,
  uploadImageFileToQuoteSuccess,
  uploadImageFileToQuoteFailure,
  getQuoteMedia,
  getQuoteMediaSuccess,
  getQuoteMediaFailure,
  requestDefaultDisplayOptionsForQuotes,
  defaultDisplayOptionsForQuotesSuccess,
  defaultDisplayOptionsForQuotesFailure,
  updateDisplayOptionsForQuotes,
  updateDisplayOptionsForQuotesSuccess,
  updateDisplayOptionsForQuotesFailure,
  deleteQuoteMedia,
  deleteQuoteMediaSuccess,
  deleteQuoteMediaFailure,
  updateQuoteMedia,
  updateQuoteMediaSuccess,
  updateQuoteMediaFailure,
  deleteQuote,
  deleteQuoteSuccess,
  deleteQuoteFailure,
};

export const QuotesReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default QuotesReducer;
