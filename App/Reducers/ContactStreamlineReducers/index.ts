import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { createAction, deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";

const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestContacts: createStandardAction("CONTACTSTREAMLINE_CONTACTS_REQUEST")<IAlertCallbacks>(),
  onSuccessContacts: createStandardAction("CONTACTSTREAMLINE_CONTACTS_SUCCESS")<any>(),
  onFailure: createAction("CONTACTSTREAMLINE_FAILURE")<any>(),
  saveContact: createStandardAction("SAVE_CONTACT")<any>(),
};

export const ContactStreamlineAction = actionCreators;

export interface ContactStreamLineState {
  contactList: any[];
  fetching: boolean;
}

export type ContactStreamlineAction = PayloadAction<string, ContactStreamLineState>;

export type ImmutableContactStreamlineState = SI.ImmutableObject<ContactStreamLineState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableContactStreamlineState = SI.from({
  contactList: [],
  fetching: false,
});

/* ------------- Reducers ------------- */

export const requestContacts: Reducer<ImmutableContactStreamlineState> = (state: ImmutableContactStreamlineState) => state.merge({ fetching: true });

export const onSuccessContacts: Reducer<ImmutableContactStreamlineState> = (state: ImmutableContactStreamlineState, { payload }) =>
  state.merge({ fetching: false, contactList: payload });

export const onFailure: Reducer<ImmutableContactStreamlineState> = (state: ImmutableContactStreamlineState) =>
  state.merge({ fetching: false, contactList: undefined });

export const saveContact: Reducer<ImmutableContactStreamlineState> = (state: ImmutableContactStreamlineState, { payload }) =>
  state.merge({
    contactList: state.contactList ? [payload, ...state.contactList] : [payload],
  });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableContactStreamlineState> = {
  requestContacts,
  onSuccessContacts,
  onFailure,
  saveContact,
};

export const ContactStreamlineReducers = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ContactStreamlineReducers;
