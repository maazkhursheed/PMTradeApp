import * as R from "ramda";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { InboxMessage } from "~root/Types/InboxMessage";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  voidAction: createAction("VOID_ACTION"),
  notificationReceived: createStandardAction("NOTIFICATION_RECEIVED")<{}>(),
  notificationInboxItemPressed: createStandardAction("NOTIFICATION_INBOX_ITEM_PRESSED")<string, {}>(),
  landOnScreen: createStandardAction("APP_LANDED_ON_SCREEN")<boolean>(),
  tokenSuccess: createStandardAction("NOTIFICATION_TOKEN_SUCCESS")<string>(),
  setIsFromNotification: createStandardAction("SET_NOTIFICATION_PAYLOAD")<boolean>(),
  setNotificationPayload: createStandardAction("SET_IS_FROM_NOTIFICATION")<any>(),
  getInboxMessages: createStandardAction("GET_INBOX_MESSAGES")(),
  getInboxMessagesSuccess: createStandardAction("GET_INBOX_MESSAGES_SUCCESS")<any>(),
  notificationsViewed: createStandardAction("NOTIFICATIONS_VIEWED")(),
  setUnreadMessagesCount: createStandardAction("SET_UNREAD_MESSAGES_COUNT")<any>(),
};

export const NotificationActions = actionCreators;

export interface NotificationState {
  token?: string | null;
  notificationPayload?: any | undefined;
  isFromNotification: boolean;
  landedOnScreen: boolean;
  messages: InboxMessage[];
  unreadMessagesCount: number;
}

export type StcAction = PayloadAction<string, NotificationState>;

export type ImmutableNotificationState = SI.ImmutableObject<NotificationState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableNotificationState = SI.from({
  token: "",
  landedOnScreen: false,
  notificationPayload: undefined,
  isFromNotification: false,
  messages: [],
  unreadMessagesCount: 0,
});

/* ------------- Reducers ------------- */

export const tokenSuccess: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) => state.merge({ token: payload });

export const landOnScreen: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) => state.merge({ landedOnScreen: payload });

export const setNotificationPayload: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) =>
  state.merge({ notificationPayload: payload });

export const setIsFromNotification: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) =>
  state.merge({ isFromNotification: payload });

export const getInboxMessagesSuccess: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) =>
  state.merge({ messages: payload });

export const getInboxMessages: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) => state;

export const notificationReceived: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) => state;

export const notificationInboxItemPressed: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) => state;

export const notificationsViewed: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) => state;

export const voidAction: Reducer<ImmutableNotificationState> = R.identity;

export const setUnreadMessagesCount: Reducer<ImmutableNotificationState> = (state: ImmutableNotificationState, { payload }) =>
  state.merge({ unreadMessagesCount: payload });

/* ------------- Hookup Reducers To Types ------------- */
const reducerMap: ReducerMap<typeof actionCreators, ImmutableNotificationState> = {
  voidAction,
  tokenSuccess,
  landOnScreen,
  setNotificationPayload,
  setIsFromNotification,
  getInboxMessagesSuccess,
  getInboxMessages,
  notificationReceived,
  notificationInboxItemPressed,
  notificationsViewed,
  setUnreadMessagesCount,
};

export const NotificationReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default NotificationReducer;
