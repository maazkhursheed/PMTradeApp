import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction, PayloadMetaAction } from "typesafe-actions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

export interface IEmailRequest {
  subject: string;
  fromAddress: string;
  templatePath: any;
  onSuccess: () => void;
  onFailure?: (alertTitle: string, alertMsg: string, alertBtnTxt?: string) => void;
  recipientEmail: string | undefined;
  isPersisted?: boolean;
  realmId?: string | undefined;
}

const actionCreators = {
  failure: createStandardAction("EMAIL_FAILURE")<PayloadMetaAction<string, IEmailRequest, any>>(),
  emailRequest: createStandardAction("EMAIL_REQUEST")<IEmailRequest, any>(),
  emailSuccess: createStandardAction("EMAIL_SUCCESS")<any>(),
};

export const EmailActions = actionCreators;

export interface EmailState {
  fetching: boolean;
}

export type EmailAction = PayloadAction<string, EmailState>;

export type ImmutableEmailState = SI.ImmutableObject<EmailState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableEmailState = SI.from({
  fetching: false,
});

/* ------------- Reducers ------------- */

export const failure: Reducer<ImmutableEmailState> = state => state.merge({ fetching: false });

export const emailRequest: Reducer<ImmutableEmailState> = state => state.merge({ fetching: true });

export const emailSuccess: Reducer<ImmutableEmailState> = state => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableEmailState> = {
  failure,
  emailRequest,
  emailSuccess,
};

export const EmailReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default EmailReducer;
